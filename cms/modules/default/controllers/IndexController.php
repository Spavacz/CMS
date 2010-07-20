<?php

class IndexController extends Zend_Controller_Action
{

    public function init()
    {
        /* Initialize action controller here */
    }

    public function indexAction()
    {
		
    }

    public function testAction()
    {
    	echo '<h2>Cms_Action_Helper_User - aktualnie zalogowany user:</h2>';
    	_d($this->_helper->user());
    }

}

