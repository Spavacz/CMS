<?php

class Cms_Model_DbTable_Categories extends Zend_Db_Table_Abstract
{
    protected $_name    = 'categories';
    protected $_primary = 'id';

    public function countChildren( $idParent )
    {
    	$select = $this->select()
    		->from( $this, array('count' => 'COUNT(*)') )
    		->where( 'idParent = ?', (int)$idParent )
    		->where( 'status = 1' );
    	return $this->fetchRow( $select )->count;
    }

}