<?php

class Cms_Action_Helper_User extends Zend_Controller_Action_Helper_Abstract
{
	public function direct()
	{
		return Zend_Registry::get('user');
	}
}