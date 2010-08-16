<?php

class Cms_Model_Page extends Zend_Navigation_Page_Mvc
{
    protected $_uri;
    protected $_isCms = false;
	protected $_blocks;

    public function setUri( $uri )
    {
        $this->_uri = (string) $uri;
        return $this;
    }

    public function getUri()
    {
        return $this->_uri;
    }

    public function getBlocks()
    {
    	if( is_null($this->_blocks) )
    	{
    		$blocks = new Cms_Model_Mapper_Block();
    		$this->_blocks = $blocks->fetchAllOnPage( $this );
    	}
    	return $this->_blocks;
    }

	public function getHref()
    {
        if ($this->_hrefCache) {
            return $this->_hrefCache;
        }

        $baseUrl = new Zend_View_Helper_BaseUrl();
        $url = $baseUrl->baseUrl( $this->getUri() );

        return $this->_hrefCache = $url;
    }

    /*public function updateWidgets( $update )
    {
    	$this->getWidgets();
    	// aktualizacja pozycji widgetow
    	foreach( $this->_widgets as $k => $widget )
    	{
    		$this->_widgets[$k]->setPriority($update[$widget->getInstanceId()]['priority']);
    		$this->_widgets[$k]->setPlaceholder($update[$widget->getInstanceId()]['placeholder']);
    	}

    	$widgets = new Cms_Model_Mapper_Widget();
    	// dodac nowe widgety
    	if( is_array($update['add']) )
    	{
	    	foreach( $update['add'] as $id => $new )
	    	{

	    		$widgets->find($id, $widget = new Cms_Model_Widget());
	    		$widget->setPage($this);
	    		$widget->setPriority($new['priority']);
	    		$widget->setPlaceholder($new['placeholder']);
	    		$this->_widgets[] = $widget;
	    	}
    	}
    	return $widgets->updateOnPage($this);
    }*/

    public function isCms( $bool = null )
    {
    	if(is_null($bool))
    	{
    		return $this->_isCms;
    	}
    	else
    	{
    		$this->_isCms = (bool)$bool;
    	}
    }
}
