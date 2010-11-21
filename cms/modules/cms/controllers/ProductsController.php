<?php

class Cms_ProductsController extends Zend_Controller_Action
{

    public function init()
    {
        /* Initialize action controller here */
    	$this->_helper->layout()->setLayout('admin');
    }

    public function indexAction()
    {
    	$mapper = new Cms_Model_Mapper_Item_Product();
    	$this->view->pageLimit = 10;
    	$this->view->pageTotal = ceil( $mapper->countAll() / $this->view->pageLimit );
    }

    public function addAction()
    {
    	$this->view->form = new Cms_Form_Product();
    }
    
    public function editAction()
    {
    	$this->view->form = new Cms_Form_Product();
    	$mapper = new Cms_Model_Mapper_Item_Product();
    	if( !$mapper->find( $this->_getParam('id'), $product = new Cms_Model_Item_Product() ) )
 		{
 			$this->_forward('error', 'error', 'default');
 		}
 		
 		$this->view->form->populate( array(
 			'name'			=> $product->getName(),
 			'description'	=> $product->getDescription()
		) );
 		
 		$this->view->id = $this->_getParam('id');
    }
    
}

