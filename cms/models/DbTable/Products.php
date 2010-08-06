<?php

class Cms_Model_DbTable_Products extends Zend_Db_Table_Abstract
{
    protected $_name    = 'products';
    protected $_primary = 'id';
    protected $_dependentTables = array ('Cms_Model_DbTable_Item_Parameters');
}