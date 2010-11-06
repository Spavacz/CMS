<?php

class Zend_View_Helper_AdminMenu extends Zend_View_Helper_Abstract
{
    public function adminMenu()
    {
		if(!Zend_Auth::getInstance()->hasIdentity()) {
			return '';
		}
		
		$config = new Zend_Config_Xml(APPLICATION_PATH . '/configs/admin_menu.xml');
    	$this->view->navigation(new Zend_Navigation($config));
    	
    	$menu = $this->view->navigation()->menu()
			->setUlClass('sf-menu sf-navbar')
			->render();
		return '<div id="nav">' . $menu . '</div>';
    }
}
