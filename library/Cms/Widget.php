<?php
class Cms_Widget
{
	protected $_params;
	protected $_view;
	
	public function __construct( $view, $params, $instanceId = null )
	{
		$this->_view = $view;
		$this->_params = $params;
		$this->_view->params = $params;
		$this->_view->instanceId = 'widget-'.$instanceId;
		
	}
	
	protected function view()
	{
		return $this->_view;
	}
	
	protected function getParam($name, $default = null)
    {
    	if(isset($this->_params[$name]))
    	{
    		return $this->_params[$name];
    	}
    	return $default;
    }
	
}