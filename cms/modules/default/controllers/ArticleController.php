<?php

class ArticleController extends Zend_Controller_Action
{

    public function init()
    {
        /* Initialize action controller here */
    }

    public function indexAction()
    {
		$mapperPage = new Cms_Model_Mapper_Page();
		$mapperArticle = new Cms_Model_Mapper_Item_Article();
		
		$page = $mapperPage->fetchActive();
		$this->view->articles = $mapperArticle->fetchAll( 'idPage = ' . $page->getId() );
    }

}

