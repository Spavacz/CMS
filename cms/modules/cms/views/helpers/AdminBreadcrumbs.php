<?php

class Zend_View_Helper_AdminBreadcrumbs extends Zend_View_Helper_Abstract
{
    public function adminBreadcrumbs()
    {
		return $this->view->partial('helpers/AdminBreadcrumbs.phtml');
    }
}
