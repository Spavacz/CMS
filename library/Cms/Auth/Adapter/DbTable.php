<?php
class Cms_Auth_Adapter_DbTable extends Zend_Auth_Adapter_DbTable
{
	protected function _authenticateSetup()
    {
    	if($translate = Zend_Registry::get('Zend_Translate'))
    	{
    		$exception = null;

	        if ($this->_tableName == '' || $this->_identityColumn == '' || $this->_credentialColumn == '') {
	            $exception = 'Auth system Error.';
	        } elseif ($this->_identity == '') {
	            $exception = 'A value for the identity was not provided.';
	        } elseif ($this->_credential === null) {
	            $exception = 'A credential value was not provided.';
	        }
	
	        if (null !== $exception) {
	            /**
	             * @see Zend_Auth_Adapter_Exception
	             */
	            require_once 'Zend/Auth/Adapter/Exception.php';
	            throw new Zend_Auth_Adapter_Exception($translate->_($exception));
	        }
	
	        $this->_authenticateResultInfo = array(
	            'code'     => Zend_Auth_Result::FAILURE,
	            'identity' => $this->_identity,
	            'messages' => array()
	            );
	
	        return true;
    	}
    	else
    	{
    		return parent::_authenticateSetup();
    	}
    }
}