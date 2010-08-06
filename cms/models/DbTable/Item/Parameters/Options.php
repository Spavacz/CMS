<?php

class Cms_Model_DbTable_Item_Parameters_Options extends Zend_Db_Table_Abstract
{
    protected $_name    = 'items_parameters_options';
    protected $_primary = 'id';
    protected $_referenceMap = array (
    	'Parameters'=> array (
    		'columns'=>'idParameter',
    		'refTableClass'=>'Cms_Model_DbTable_Item_Parameters',
    		'refColumns'=>'id'
    	)
    );
}