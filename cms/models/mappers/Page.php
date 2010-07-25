<?php
class Cms_Model_Mapper_Page{    protected $_dbTable;
    public function setDbTable($dbTable)    {        if (is_string($dbTable))         {            $dbTable = new $dbTable();        }
        if (!$dbTable instanceof Zend_Db_Table_Abstract)         {            throw new Exception('Invalid table data gateway provided');        }        $this->_dbTable = $dbTable;		
        return $this;    }
    public function getDbTable()    {        if (null === $this->_dbTable) {            $this->setDbTable('Cms_Model_DbTable_Pages');        }        return $this->_dbTable;    }
    public function save(Cms_Model_Page $page)    {		$data = array(			'path'			=> $page->getPath(),			'controller'	=> $page->getController(),			'action'		=> $page->getAction()
        );
		if (null === ($id = $page->getId())) 		{			//unset($data['id']);			$this->getDbTable()->insert($data);		}		else		{			$this->getDbTable()->update($data, array('id = ?' => $id));		}	}
    public function find($id, Cms_Model_Page $page)    {        $result = $this->getDbTable()->find($id);        if (0 == count($result))         {            return;        }
        $row = $result->current();        $page->setId($row->id)			->setPath($row->path)			->setController($row->controller)			->setAction($row->action);    }
    public function fetchAll()    {        $resultSet = $this->getDbTable()->fetchAll();        $entries   = array();        foreach ($resultSet as $row)         {            $entry = new Cms_Model_Page();            $entry->setId($row->id)                  ->setPath($row->path)                  ->setController($row->controller)                  ->setAction($row->action);            $entries[] = $entry;        }        return $entries;    }
    public function fetchActive()    {		$page = Zend_Controller_Front::getInstance()->getRequest()->getParam('page');		// jesli nie ma page znaczy ze rest lub cms		if( $page == 'cms' )    	{    		$page = new Cms_Model_Page();    		$page->isCms( true );    	}    	    	return $page;    }}