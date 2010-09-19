<?php

/**
 *
 * Klasa reprezentujaca parametr
 * Parametry mozna dolaczac do czego sie chce
 * @author spav
 *
 */

abstract class Cms_Model_Item_Parameter_Abstract extends Cms_Model
{
	protected $_id;
	protected $_type;
	protected $_name;
	protected $_value;
	protected $_description;
	protected $_optionsValues;

	public function setId( $id )
	{
		$this->_id = is_numeric($id) ? (int)$id : null;
		return $this;
	}

	public function getId()
	{
		return $this->_id;
	}

	public function setType( $type )
	{
		if( class_exists('Cms_Model_Item_Parameter_' . $type) )
		{
			$this->_type = $type;
		}
		return $this;
	}

	public function getType()
	{
		return $this->_type;
	}

	/**
	 * Ustawia nazwe parametru
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

	public function setValue( $value )
	{
		$this->_value = !empty($value) ? $value : null;
		return $this;
	}

	public function getValue()
	{
		return $this->_value;
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

	public function setOptionsValues( $options )
	{
		$this->_optionsValues = $options;
		return $this;
	}

	public function getOptionsValues()
	{
		return is_null($this->_optionsValues) ? array() : $this->_optionsValues;
	}

}