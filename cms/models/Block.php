<?php

class Cms_Model_Block
{
    protected $_id;
    protected $_name;
	protected $_widgets;
	protected $_placeholder;
	protected $_page;
	protected $_params;
	protected $_instanceId;
	protected $_priority;
    
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
 
	public function setId($id)
    {
        $this->_id = (int) $id;
        return $this;
    }
 
    public function getId()
    {
        return $this->_id;
    }
    
    public function setName( $name )
    {
    	$this->_name = $name;
    	return $this;
    }
    public function getName()
    {
    	return $this->_name;
    }

    public function setPlaceholder( $placeholder )
    {
    	$this->_placeholder = $placeholder;
    	return $this;
    }
    
    public function getPlaceholder()
    {
    	return $this->_placeholder;
    }
    
	public function getInstanceId()
    {
    	return $this->_instanceId;
    }
    
    public function setInstanceId( $instanceId )
    {
    	$this->_instanceId = (int) $instanceId;
    	return $this;
    }
    
	public function setParams( $params )
    {
    	$this->_params = $params;
    	return $this;
    }
    public function getParams()
    {
    	return $this->_params;
    }
    public function getParam($name, $default = null)
    {
    	if(isset($this->_params[$name]))
    	{
    		return $this->_params[$name];
    	}
    	return $default;
    }
    
	public function setPriority( $priority )
    {
    	$this->_priority = (int)$priority;
    	return $this;
    }
    public function getPriority()
    {
    	return $this->_priority;
    }
    
	public function setPage( $page )
    {
    	$this->_page = $page;
    	return $this;
    }
    public function getPage()
    {
    	return $this->_page;
    }
    
    public function getWidgets()
    {
    	if( is_null($this->_widgets) )
    	{
    		$widgets = new Cms_Model_Mapper_Widget();
    		$this->_widgets = $widgets->fetchAllInBlock( $this );
    	}
    	return $this->_widgets;
    }
    
    public function updateWidgets( $update )
    {
    	$this->getWidgets();
    	// aktualizacja pozycji widgetow
    	foreach( $this->_widgets as $k => $widget )
    	{
    		$this->_widgets[$k]->setPriority($update[$widget->getInstanceId()]['priority']);
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
	    		$this->_widgets[] = $widget;
	    	}
    	}
    	return $widgets->updateOnPage($this);
    }
    
}
