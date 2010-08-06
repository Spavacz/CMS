<?php

/**
 * 
 * Klasa reprezentujaca parametr typu checkbox
 * @author spav
 * 
 */

class Cms_Model_Item_Parameter_Selectbox extends Cms_Model_Item_Parameter_Abstract
{
	protected $_id;
	protected $_name;
	protected $_value;
	protected $_description;
	protected $_optionsValues;
	
	public function setValue( $value )
	{
		// @todo sprawdzenie czy opcja istnieje 
		$this->_value = !empty($value) ? $value : null;
		return $this;
	}
	
}