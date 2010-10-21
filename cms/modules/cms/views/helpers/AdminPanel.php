<?php

class Cms_View_Helper_AdminPanel extends Zend_View_Helper_Abstract
{
    public function adminPanel()
    {
		if(!Zend_Auth::getInstance()->hasIdentity()) {
			return '';
		}
		return $this->view->partial('helperAdminPanel.phtml');
    }
}
