<?php

class Cms_ArticlesController extends Zend_Controller_Action
{

    public function init()
    {
        /* Initialize action controller here */
    	$this->_helper->layout()->setLayout('admin');
    }

    public function indexAction()
    {
    	$mapper = new Cms_Model_Mapper_Item_Article();
    	$this->view->articles = $mapper->fetchAll();
    }

    public function addAction()
    {
    	$this->view->form = new Cms_Form_Article();
    }
    
}

