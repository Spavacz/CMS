<?php

class Cms_IndexController extends Zend_Controller_Action
{

    public function init()
    {
        /* Initialize action controller here */
    	$this->_helper->layout()->setLayout('admin');
    }

    public function indexAction()
    {
        if( !Zend_Auth::getInstance()->hasIdentity() )
        {
			$this->_redirect('cms/login');
			die();
        }
        $this->view->name = Zend_Auth::getInstance()->getIdentity()->name;
    }

}

