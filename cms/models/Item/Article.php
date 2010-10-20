<?php

/**
 * 
 * Klasa reprezentujaca Item
 * @author spav
 * 
 */

class Cms_Model_Item_Article extends Cms_Model_Item_Abstract
{
	
	protected $_text;
	protected $_idAuthor;
	
	public function setText( $text )
	{
		$this->_text = trim($text);
		return $this;
	}
	
	public function getText()
	{
		return $this->_text;
	}
	
	public function setIdAuthor( $idAuthor )
	{
		$this->_idAuthor = (int)$idAuthor;
		return $this;
	}
	
	public function getIdAuthor()
	{
		return $this->_idAuthor;
	}
	
}