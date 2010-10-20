<?php

/**
 * 
 * Klasa reprezentujaca Item
 * @author spav
 * 
 */

abstract class Cms_Model_Item_Abstract extends Cms_Model
{
	protected $_id;
	protected $_name;
	protected $_description;
	protected $_parameters;
	protected $_status = 1;
	protected $_created;
	protected $_modified;
	
	public function setId( $id )
	{
		$this->_id = is_numeric($id) ? (int)$id : null;
		return $this;
	}
	
	public function getId()
	{
		return $this->_id;
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
	
	public function setParameters( $parameters )
	{
		$this->_parameters = $parameters;
		return $this;
	}
	
	public function getParameters()
	{
		if( !is_array($this->_parameters) )
		{
			$this->_parameters = array();
		}
		return $this->_parameters;
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
	
	public function setCreated( $datetime )
	{
		$this->_created = $datetime;
		return $this;
	}
	
	public function getCreated()
	{
		return $this->_created;
	}
	
	public function setModified( $datetime )
	{
		$this->_modified = $datetime;
		return $this;
	}
	
	public function getModified()
	{
		return $this->_modified;
	}
}