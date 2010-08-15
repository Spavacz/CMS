<?php

/**
 * 
 * Klasa reprezentujaca kategorie
 * @author spav
 * 
 */

abstract class Cms_Model_Category_Abstract extends Cms_Model
{
	protected $_id;
	protected $_idParent;
	protected $_name;
	protected $_description;
	protected $_date_created;
	protected $_date_modified;
	protected $_status = 1;
	
	public function setId( $id )
	{
		$this->_id = is_numeric($id) ? (int)$id : null;
		return $this;
	}
	
	public function getId()
	{
		return $this->_id;
	}
	
	public function setIdParent( $id )
	{
		$this->_idParent = is_numeric($id) ? (int)$id : null;
		return $this;
	}
	
	public function getIdParent()
	{
		return $this->_idParent;
	}
	
	/**
	 * Ustawia nazwe
	 * 
	 * @param array $name
	 */
	public function setName( $name )
	{
		$this->_name = !empty($name) ? $name : null;
		return $this;
	}
	
	public function getName()
	{
		return $this->_name;
	}
	
	public function setDescription( $description )
	{
		$this->_description = !empty($description) ? $description : null;
		return $this;
	}
	
	public function getDescription()
	{
		return $this->_description;
	}
	
	public function setDateCreated( $date )
	{
		$this->_date_created = !empty($date) ? $date : null;
		return $this;
	}
		
	public function getDateCreated()
	{
		return $this->_date_created;
	}		
	
	public function setDateModified( $date )
	{
		$this->_date_modified = !empty($date) ? $date : null;
		return $this;
	}
	
	public function getDateModified()
	{
		return $this->_date_modified;
	}	
	
	public function setStatus( $status )
	{
		$this->_status = (int)$status;
		return $this;
	}
	
	public function getStatus()
	{
		return $this->_status;
	}
}