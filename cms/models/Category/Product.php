<?php

/**
 *
 * Klasa reprezentujaca kategorie produktów
 * @author spav
 *
 */

class Cms_Model_Category_Product extends Cms_Model_Category_Abstract
{

	public function hasChildren()
	{
		$mapper = new Cms_Model_Mapper_Category_Product();
		return (bool)$mapper->countChildern( $this->getId() );
	}

}