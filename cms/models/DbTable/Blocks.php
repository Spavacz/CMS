<?php

/**
* This is the DbTable class for the blocks table.
*/
class Cms_Model_DbTable_Blocks extends Zend_Db_Table_Abstract
{
    /** Table name */
    protected $_name    = 'blocks';
    protected $_primary = 'id';
    
    public function fetchAllOnPage( $page )
    {
    	$select = $this->select()
    		->setIntegrityCheck( false )
    		->from( array('bp' => 'blocks_pages'), array('instanceId' => 'id','placeholder','params','priority') )
    		->join( array('b' => 'blocks'), 'bp.idBlock = b.id', array('id','name') )
    		->where( 'bp.idPage = ?', $page->getId() )
    		->order( 'bp.priority ASC' );
    	return $this->fetchAll( $select );
    }
    
    public function findOnPage( $idInstance )
    {
    	$select = $this->select()
    		->setIntegrityCheck( false )
    		->from( array('bp' => 'blocks_pages'), array('instanceId' => 'id','placeholder','params','priority') )
    		->join( array('b' => 'blocks'), 'bp.idBlock = w.id', array('id','name') )
    		->where( 'b.id = ?', $idInstance )
    		->order( 'b.priority ASC' );
    	return $this->fetchAll( $select )->current();
    }
    
    public function save( Cms_Model_Block $block )
    {
    	if($block->getInstanceId())
    	{
	    	$data = array(
				'placeholder'	=> $block->getPlaceholder(),
				'priority'		=> $block->getPriority(),
	    		'params'		=> serialize($block->getParams())
			);
	    	$this->getAdapter()->update( 'blocks_pages', $data, 'id = '.$block->getInstanceId() );
    	}
    	else
    	{
    		$data = array(
	            'name'			=> $block->getName(),
	        );
	 
	        if (null === ($id = $block->getId())) {
	            //unset($data['id']);
	            $block->setId( $this->insert($data) );
	        } else {
	            $this->update($data, array('id = ?' => $id));
	        }
    	}
    }
    
    // update blokow na stronie
	public function updateOnPage( $page )
    {
    	$blocks = $page->getBlocks();
    	$new = array();
    	foreach( $blocks as $block )
    	{
    		if($block->getInstanceId())
    		{
	    		$data = array(
	    			'placeholder'	=> $block->getPlaceholder(),
	    			'priority'		=> $block->getPriority()
	    		);
	    		$this->getAdapter()->update( 'blocks_pages', $data, 'id = '.$block->getInstanceId() );
    		}
    		else
    		{
    			$data = array(
	    			'idPage'		=> $block->getPage()->getId(),
    				'idBlock'		=> $block->getId(),
    				'placeholder'	=> $block->getPlaceholder(),
    				'priority'		=> $block->getPriority()
	    		);
	    		$this->getAdapter()->insert( 'blocks_pages', $data );
	    		$block->setInstanceId( $this->getAdapter()->lastInsertId() );
	    		$new[] = $block;
    		}
    	}
    	return count($new) ? $new : null;
    }
    
    public function deleteOnPage( Cms_Model_Block $block )
    {
    	$this->getAdapter()->delete( 'blocks_pages', 'id = '.$block->getInstanceId() );
    }
}