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
    
    public function editAction()
    {
    	$this->view->form = new Cms_Form_Article();
    	$mapper = new Cms_Model_Mapper_Item_Article();
    	if( !$mapper->find( $this->_getParam('id'), $article = new Cms_Model_Item_Article() ) )
 		{
 			$this->_forward('error', 'error', 'default');
 		}
 		
 		$this->view->form->populate( array(
 			'name'			=> $article->getName(),
 			'description'	=> $article->getDescription(),
 			'text'			=> $article->getText()
 		) );
 		
 		$this->view->id = $this->_getParam('id');
    }
    
}

