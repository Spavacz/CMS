<?php
class Cms_Rpc_Widget
{
	public function remove( $idInstance )
	{
		if( strpos($idInstance, 'widget-') !== false )
		{
			$idInstance = substr( $idInstance, 7 );			
		}
		$widgets = new Cms_Model_Mapper_Widget();
		$widget = $widgets->findOnPage($idInstance);
		$widgets->deleteOnPage($widget);
		return $widget;
	}
	/** dep **/
	public function update( $idPage, $data )
	{
		$pages = new Cms_Model_Mapper_Page();
		$pages->find($idPage, $page = new Cms_Model_Page());
		$new = $page->updateWidgets( $this->widgetPositionDecode($data) );
		$msg = array();
		// zweracamy html nowych modulow
		if( is_array($new) )
		{
			foreach($new as $widget)
			{
				$class =  $widget->getController();
				$view = new Zend_View();
				$widgetObject = new $class( $view, $widget->getParams(), $widget->getInstanceId() );
	    		// wywolujemy akcje
	    		$widgetObject->{$widget->getAction()}();
	    		// renderujemy widok do placeholdera
	    		$msg[] = array(
	    			'elementId' => 'newWidget_'.$widget->getId(),
	    			'html' => $view->render( $widget->getViewScript() ) 
	    		);
			}
		}
		return $msg;
	}
	
	public function edit( $idPage, $idInstance, $data )
	{
		$widgets = new Cms_Model_Mapper_Widget();
		$widget = $widgets->findOnPage(substr($idInstance,7));
		$params = $this->widgetParamsDecode( $data );
		$widget->setParams( $params );
		$widgets->save($widget);
	}
	
	protected function widgetParamsDecode( $data )
	{
		$params = array();
		foreach($data as $v)
		{
			$params[$v['name']] = $v['value'];
		}
		return $params;
	}
	
	protected function widgetPositionDecode( $data )
    {
    	$decoded = array();
    	$cols = explode('|',$data);
    	foreach( $cols as $colData )
    	{
    		list($col,$widgetsData) = explode('=',$colData);
    		if(!empty($col))
    		{
	    		$widgets = explode(',',$widgetsData);
	    		foreach($widgets as $k => $widget)
	    		{
	    			if(strpos($widget, 'newWidget_') !== false)
	    			{
	    				$decoded['add'][substr($widget, 10)] = array('priority' => $k, 'placeholder' => $col);
	    			}
	    			else
	    			{
	    				$decoded[substr($widget, 7)] = array('priority' => $k, 'placeholder' => $col);
	    			}
	    		}
    		}
    	}
    	return $decoded;
    }
}