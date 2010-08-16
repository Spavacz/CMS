<?php

class Cms_Controller_Plugin_Widgets extends Zend_Layout_Controller_Plugin_Layout
{

	/**
	 * dispatch widgets
	 */
	public function postDispatch()
	{
		$view = $this->getLayout()->getView();
		if(Zend_Auth::getInstance()->hasIdentity())
		{
			$view->headScript()->appendFile($view->baseUrl('js/initWidgets.js'));
			$view->headScript()->appendFile($view->baseUrl('js/initAdminPanel.js'));

		}
		$pages = new Cms_Model_Mapper_Page();
		$page = $pages->fetchActive(); // to powinno dzialac inczej (cms_navigation->setActive())

		$view->headTitle( $page->getLabel() ); // to powinno byc w jakims plugin_layout czy cos
		$this->getLayout()->pageId = $page->getId(); // to tez

		// dodaje reguly
		if( !$page->isCms() )
		{
			foreach($page->getBlocks() as $block)
			{
				foreach($block->getWidgets() as $widget)
		    	{
		    		// tworzymy obiekt
		    		$class =  $widget->getController();
		    		$widgetObject = new $class( $view, $widget->getParams(), $widget->getInstanceId() );
		    		// wywolujemy akcje
	    			$widgetObject->{$widget->getAction()}();
		    		// renderujemy widok do placeholdera
		    		$view->renderToPlaceholder( $widget->getViewScript(), $block->getPlaceholder() );
		    	}
			}
		}
		else
		{
			// dla cms nie ladujemy widgetow - narazie :>
		}
	}
}