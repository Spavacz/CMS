<?php

/**
* This is the DbTable class for the pages table.
*/
class Cms_Model_DbTable_Pages extends Zend_Db_Table_Abstract
{
    /** Table name */
    protected $_name    = 'pages';
    protected $_primary = 'id';
}