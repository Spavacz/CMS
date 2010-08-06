<?php

/**
 * 
 * Klasa reprezentujaca parametr typu checkbox
 * @author spav
 * 
 */

class Cms_Model_Item_Parameter_Checkbox extends Cms_Model_Item_Parameter_Abstract
{
	protected $_id;
	protected $_name;
	protected $_value;
	protected $_description;
	protected $_optionsValues;
	
	public function setValue( $value )
	{
		$this->_value = !empty($value) ? 1 : null;
		return $this;
	}
}