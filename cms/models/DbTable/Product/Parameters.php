<?php

class Cms_Model_DbTable_Product_Parameters extends Zend_Db_Table_Abstract
{
    protected $_name    = 'products_parameters';
    protected $_primary = array('idProduct', 'idParameter');
    protected $_referenceMap = array (
    	'Products'=> array (
    		'columns'=>'idProduct',
    		'refTableClass'=>'Cms_Model_DbTable_Products',
    		'refColumns'=>'id'
    	),
    	'Parameters'=> array (
    		'columns'=>'idParameter',
    		'refTableClass'=>'Cms_Model_DbTable_Item_Parameters',
    		'refColumns'=>'id'
    	)
    );
}