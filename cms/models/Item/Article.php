<?php

/**
 * 
 * Klasa reprezentujaca Item
 * @author spav
 * 
 */


class Cms_Model_Item_Article extends Cms_Model_Item_Abstract
{
	
	protected $_idPage;
	protected $_page;
	protected $_text;
	protected $_idAuthor;
	
	public function setIdPage( $idPage ) 
	{
		$this->_idPage = (int)$idPage;
		return $this;
	}
	
	public function getIdPage()
	{
		return $this->_idPage;
	}
	
	public function getPage()
	{
		if( is_null($this->_page) )
		{
			$mapper = new Cms_Model_Mapper_Page();
			$mapper->find( $this->getIdPage(), $this->_page = new Cms_Model_Page() );
		}
		return $this->_page;
	}
	
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
	
	public function getUrl()
	{
		$url = trim($this->getPage()->getUri(), '/');
		return Zend_Controller_Front::getInstance()->getBaseUrl() . '/' . $url;
	}
	
	public function toArray()
	{
		return array(
			'id'			=> $this->getId(),
			'name'			=> $this->getName(),
			'status'		=> $this->getStatus(),
			'url'			=> $this->getUrl(),
			'categories'	=> 'todo'
		);
	}
	
}