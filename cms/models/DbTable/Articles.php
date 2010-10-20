<?php

class Cms_Model_DbTable_Articles extends Zend_Db_Table_Abstract
{
    protected $_name    = 'articles';
    protected $_primary = 'id';
    protected $_dependentTables = array ('Cms_Model_DbTable_Item_Parameters');
}