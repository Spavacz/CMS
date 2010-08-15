<?phpclass Cms_Model_Mapper_Category_Product{    protected $_dbTable;    public function setDbTable($dbTable)    {        if (is_string($dbTable))         {            $dbTable = new $dbTable();        }        if (!$dbTable instanceof Zend_Db_Table_Abstract)         {            throw new Exception('Invalid table data gateway provided');        }        $this->_dbTable = $dbTable;		        return $this;    }    public function getDbTable()    {        if (null === $this->_dbTable)         {            $this->setDbTable('Cms_Model_DbTable_Categories');        }        return $this->_dbTable;    }	public function save(Cms_Model_Category_Product $category)	{		$dbAdapter = $this->getDbTable()->getAdapter();				$data = array(			'idParent'		=> $category->getIdParent(),			'name'			=> $category->getName(),            'description'	=> $category->getDescription(),			'status'		=> $category->getStatus()		);				if(null === ($id = $category->getId())) 		{			// nowy			$data['date_created'] = new Zend_Db_Expr('NOW()');			$id = $this->getDbTable()->insert( $data );			$category->setId( $id );        } else {        	// edycja			$this->getDbTable()->update( $data, $dbAdapter->quoteInto('id = ?', $id) );		}				return $this;	}    public function find( $id, Cms_Model_Category_Product $category )    {        $result = $this->getDbTable()->find($id);        if (0 == count($result))         {            return false;        }        $row = $result->current();        $category->setId( $row->id )        	->setIdParent( $row->idParent )        	->setName( $row->name )			->setDescription( $row->description )			->setDateCreated( $row->date_created )			->setDateModified( $row->date_modified )			->setStatus( $row->status );					return true;    }        public function fetchAll($where=null)    {        $resultSet = $this->getDbTable()->fetchAll($where);        $entries   = array();        foreach ($resultSet as $row)         {            $entry = new Cms_Model_Category_Product();            $entry->setId( $row->id )            	->setIdParent( $row->idParent )            	->setName( $row->name )				->setDescription( $row->description )				->setDateCreated( $row->date_created )				->setDateModified( $row->date_modified )								->setStatus( $row->status );            $entries[] = $entry;        }        return $entries;    }        /**     * Ustawia status kategorii na 0 - czyli Kosz     *      * @param Cms_Model_Category_Product $category     */	public function delete( Cms_Model_Category_Product $category )    {		$dbTable = $this->getDbTable();    	// Category    	$where = $dbTable->getAdapter()->quoteInto( 'id = ?', $category->getId() );    	return (bool)$dbTable->update(array('status' => 0), $where);    }        /**     * Usuwa Kategorie calkowicie z systemu     * Uwaga - proces nieodwracalny!     *      * @param Cms_Model_Category_Product $category     */    public function purge( Cms_Model_Category_Product $category )    {    	$dbTable = $this->getDbTable();    			// Category    	$where = $dbTable->getAdapter()->quoteInto( 'id = ?', $category->getId() );    	return (bool)$dbTable->delete( $where );    }}