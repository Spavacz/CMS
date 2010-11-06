<?php

class Zend_View_Helper_AdminBreadcrumbs extends Zend_View_Helper_Abstract
{
    public function adminBreadcrumbs()
    {	
    	$config = new Zend_Config_Xml(APPLICATION_PATH . '/configs/admin_pages.xml');
    	$this->view->navigation(new Zend_Navigation($config));
    	
    	$this->view->navigation()->breadcrumbs()
    		->setMinDepth()
    		->setSeparator('</li><li>')
    		->setPartial('helpers/AdminBreadCrumbs.phtml');
		return $this->view->navigation()->breadcrumbs()->render();
    }
}
