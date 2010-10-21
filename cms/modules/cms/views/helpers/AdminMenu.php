<?php

class Zend_View_Helper_AdminMenu extends Zend_View_Helper_Abstract
{
    public function adminMenu()
    {
		if(!Zend_Auth::getInstance()->hasIdentity()) {
			return '';
		}
		return $this->view->partial('helpers/AdminMenu.phtml');
    }
}
