<?php

class Cms_LoginController extends Zend_Controller_Action
{

    public function init()
    {
        /* Initialize action controller here */
    	$this->_helper->layout()->setLayout('login');
    }

    public function indexAction()
    {
        if( Zend_Auth::getInstance()->hasIdentity() )
        {
        	$this->_redirect('cms');
        	die();
        }
    }

}

