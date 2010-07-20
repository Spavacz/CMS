<?php
class Cms_Rpc_Auth
{
	public function login( $login, $password, $remember = false )
	{
		$authAdapter = new Cms_Auth_Adapter_DbTable(
		    Zend_Db_Table_Abstract::getDefaultAdapter(),
		    'users',
		    'email',
		    'password',
		    'MD5(?)'
		);
		$translate = Zend_Registry::get('Zend_Translate');
		//var_dump($auth->hasIdentity());
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
		else
		{
			$msg = $result->getMessages();
			throw new Zend_Auth_Exception($translate->_($msg[0]));
		}
			
		return array('code' => $result->getCode(), 'msg' => $result->getMessages());
	}
	
	public function logout()
	{
		Zend_Session::forgetMe();
		Zend_Auth::getInstance()->clearIdentity();
	}
}