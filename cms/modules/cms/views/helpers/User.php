<?php

class Cms_View_Helper_User extends Zend_View_Helper_Abstract
{
    public function user()
    {
		return Zend_Registry::get('user');
    }
}
