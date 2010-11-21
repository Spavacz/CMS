<?php

/**
 * 
 * Klasa reprezentujaca Item
 * @author spav
 * 
 */

class Cms_Model_Item_Product extends Cms_Model_Item_Abstract
{
	
	public function toArray()
	{
		return array(
			'id'			=> $this->getId(),
			'name'			=> $this->getName(),
			'status'		=> $this->getStatus(),
			'description'	=> $this->getDescription(),
			'pages'			=> 'todo'
		);
	}
}