<?php

class Cms_Model_Widget extends Cms_Model
{
    protected $_name;
    protected $_controller;
    protected $_action;
    protected $_id;
    protected $_view;
    protected $_params;
    protected $_placeholder;
    protected $_instanceId;
    protected $_priority;
    protected $_page;

    public function setName($path)
    {
        $this->_name = (string) $path;
        return $this;
    }
 
    public function getName()
    {
        return $this->_name;
    }
 
    public function setController($controller)
    {
        $this->_controller = (string) $controller;
        return $this;
    }
 
    public function getController()
    {
        return 'Cms_Widget_' . ucfirst($this->_controller);
    }
 
    public function setAction($action)
    {
        $this->_action = $action;
        return $this;
    }
 
    public function getAction()
    {
        return $this->_action . 'Action';
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
    
    public function getInstanceId()
    {
    	return $this->_instanceId;
    }
    
    public function setInstanceId( $instanceId )
    {
    	$this->_instanceId = (int) $instanceId;
    	return $this;
    }
    
    public function setView( $view )
    {
    	$this->_view = $view;
    	return $this;
    }
    public function getView()
    {
    	return $this->_view;
    }
    public function getViewScript()
    {
    	return $this->_view . '.phtml';
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
    
    public function setPlaceholder( $placeholder )
    {
    	$this->_placeholder = $placeholder;
    	return $this;
    }
    public function getPlaceholder()
    {
    	return $this->_placeholder;
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
}
