<?php

class Cms_Controller_Plugin_Auth extends Zend_Controller_Plugin_Abstract
{
	
	public function preDispatch( $request )
	{
		if( !Zend_Auth::getInstance()->hasIdentity() 
			&& $request->getModuleName() == 'cms' 
			&& $request->getControllerName() != 'login' )
		{
			$request->setControllerName('login')->setActionName('index');
		}
	}
	/**
     * Set the Rewrite Routes
     *
     * @return Cms_Controller_Plugin_Router
     */
	public function routeStartup( $request )
	{
		//var_dump($auth->hasIdentity());
	}
}