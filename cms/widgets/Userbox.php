<?php
class Cms_Widget_Userbox extends Cms_Widget
{
	public function userboxAction()
	{
		$this->view()->logged = Zend_Auth::getInstance()->hasIdentity();
		$this->view()->headScript()->appendFile($this->view()->baseUrl('js/initUserbox.js'));
	}
}