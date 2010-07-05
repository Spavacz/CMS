<?php

/**
* This is the DbTable class for the pages table.
*/
class Cms_Model_DbTable_Widgets extends Zend_Db_Table_Abstract
{
    /** Table name */
    protected $_name    = 'widgets';
    protected $_primary = 'id';
    
    public function fetchAllInBlock( $block )
    {
    	$select = $this->select()
    		->setIntegrityCheck( false )
    		->from( array('bw' => 'blocks_widgets'), array('instanceId' => 'id','view','params','priority') )
    		->join( array('w' => 'widgets'), 'bw.idWidget = w.id', array('id','name','controller','action') )
    		->where( 'bw.idBlock = ?', $block->getId() )
    		->order( 'bw.priority ASC' );
    	return $this->fetchAll( $select );
    }
    
    public function findInBlock( $idInstance )
    {
    	$select = $this->select()
    		->setIntegrityCheck( false )
    		->from( array('bw' => 'blocks_widgets'), array('instanceId' => 'id','view','params','priority') )
    		->join( array('w' => 'widgets'), 'pw.idWidget = w.id', array('id','name','controller','action') )
    		->where( 'bw.id = ?', $idInstance )
    		->order( 'bw.priority ASC' );
    	return $this->fetchAll( $select )->current();
    }
    
    public function save( Cms_Model_Widget $widget )
    {
    	if($widget->getInstanceId())
    	{
	    	$data = array(
				'priority'		=> $widget->getPriority(),
	    		'params'		=> serialize($widget->getParams())
			);
	    	$this->getAdapter()->update( 'blocks_widgets', $data, 'id = '.$widget->getInstanceId() );
    	}
    	else
    	{
    		$data = array(
	            'name'			=> $widget->getName(),
	            'controller'	=> $widget->getController(),
	            'action'		=> $widget->getAction()
	        );
	 
	        if (null === ($id = $widget->getId())) {
	            //unset($data['id']);
	            $widget->setId( $this->insert($data) );
	        } else {
	            $this->update($data, array('id = ?' => $id));
	        }
    	}
    }
    
    // update widgetow na stronie
	public function updateInBlock( $block )
    {
    	$widgets = $block->getWidgets();
    	$new = array();
    	foreach( $widgets as $widget )
    	{
    		if($widget->getInstanceId())
    		{
	    		$data = array(
	    			'priority'		=> $widget->getPriority()
	    		);
	    		$this->getAdapter()->update( 'blocks_widgets', $data, 'id = '.$widget->getInstanceId() );
    		}
    		else
    		{
    			$data = array(
	    			'idBlock'		=> $widget->getBlock()->getId(),
    				'idWidget'		=> $widget->getId(),
    				'view'			=> $widget->getView(),
	    			'priority'		=> $widget->getPriority()
	    		);
	    		$this->getAdapter()->insert( 'blocks_widgets', $data );
	    		$widget->setInstanceId( $this->getAdapter()->lastInsertId() );
	    		$new[] = $widget;
    		}
    	}
    	return count($new) ? $new : null;
    }
    
    public function deleteOnPage( Cms_Model_Widget $widget )
    {
    	$this->getAdapter()->delete( 'blocks_widgets', 'id = '.$widget->getInstanceId() );
    }
}