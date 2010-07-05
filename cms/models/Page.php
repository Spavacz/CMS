<?php

class Cms_Model_Page
{
    protected $_path;
    protected $_controller;
    protected $_action;
    protected $_id;
	protected $_isCms = false;
	protected $_blocks;
    
    public function __construct(array $options = null)
    {
        if (is_array($options)) {
            $this->setOptions($options);
        }
    }
 
    public function __set($name, $value)
    {
        $method = 'set' . $name;
        if (('mapper' == $name) || !method_exists($this, $method)) {
            throw new Exception('Invalid page property');
        }
        $this->$method($value);
    }
 
    public function __get($name)
    {
        $method = 'get' . $name;
        if (('mapper' == $name) || !method_exists($this, $method)) {
            throw new Exception('Invalid page property');
        }
        return $this->$method();
    }
 
    public function setOptions(array $options)
    {
        $methods = get_class_methods($this);
        foreach ($options as $key => $value) {
            $method = 'set' . ucfirst($key);
            if (in_array($method, $methods)) {
                $this->$method($value);
            }
        }
        return $this;
    }
 
    public function setPath($path)
    {
        $this->_path = (string) $path;
        return $this;
    }
 
    public function getPath()
    {
        return $this->_path;
    }
 
    public function setController($controller)
    {
        $this->_controller = (string) $controller;
        return $this;
    }
 
    public function getController()
    {
        return $this->_controller;
    }
 
    public function setAction($action)
    {
        $this->_action = $action;
        return $this;
    }
 
    public function getAction()
    {
        return $this->_action;
    }
 
    public function setId($id)
    {
        $this->_id = (int) $id;
        return $this;
    }
 
    public function getId()
    {
        return $this->_id;
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
    
    public function updateWidgets( $update )
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
    }
    
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
