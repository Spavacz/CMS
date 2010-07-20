<?php

class Cms_Controller_Plugin_Auth extends Zend_Controller_Plugin_Abstract
{
	/**
     * Set the Rewrite Routes
     *
     * @return Cms_Controller_Plugin_Router
     */
	public function routeStartup( $request )
	{
		$auth		= Zend_Auth::getInstance();
		$user		= new Cms_Model_User();
		$userMapper	= new Cms_Model_Mapper_User();
		
		$userMapper->find( $auth->getIdentity(), $user );
		
		Zend_Registry::set( 'user', $user );
		//var_dump($auth->hasIdentity());
	}
}