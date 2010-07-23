<?php

class Rest_LoginController extends Zend_Rest_Controller
{
	
	public function init()
	{
		// nie chcemy widokow
		$this->_helper->layout()->disableLayout();
		$this->_helper->viewRenderer->setNoRender(true);
	}
	
	public function indexAction()
	{
		$response = array( 'success' => Zend_Auth::getInstance()->hasIdentity() );
		echo json_encode($response);
	}
	public function getAction(){}
	public function putAction(){}
	
	public function postAction()
	{
		$login = $this->_getParam('username');
		$password = $this->_getParam('password');
		$remember = $this->_getParam('remember', false);
		
		$authAdapter = new Cms_Auth_Adapter_DbTable(
		    Zend_Db_Table_Abstract::getDefaultAdapter(),
		    'users',
		    'email',
		    'password',
		    'MD5(?)'
		);
		$authAdapter->setIdentity($login);
		$authAdapter->setCredential($password);
		
		$result = $authAdapter->authenticate();
		if ($result->isValid()) 
		{
			if($remember) 
			{
				Zend_Session::rememberMe(14*24*3600); // 14 dni
			}
			$storage = Zend_Auth::getInstance()->getStorage();
			$storage->write($authAdapter->getResultRowObject( null, 'password' ));
		}
		
		$translate = Zend_Registry::get('Zend_Translate');
		$response = array('success' => $result->getCode() != 1 ? false:true, 'msg' => $translate->_($result->getMessages()));
		echo json_encode($response);
	}
	
	public function deleteAction()
	{
		Zend_Session::forgetMe();
		Zend_Auth::getInstance()->clearIdentity();
		
		$response = array( 'success' => true );
		echo json_encode($response);
	}
	
}