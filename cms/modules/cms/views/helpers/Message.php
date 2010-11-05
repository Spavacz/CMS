<?php

class Zend_View_Helper_Message extends Zend_View_Helper_Abstract
{

	protected $_message;
	
	public function message()
    {
		$this->_message = new Cms_Message();
		
		// unset session
		Zend_Session::namespaceUnset('message');

		return $this;
    }
    
    public function getMessage()
    {
    	return $this->_message;
    }
    
    /**
     * Turn helper into string
     *
     * @return string
     */
    public function __toString()
    {
    	$message = $this->getMessage();
    	
		if( is_null($message->getText()) )
		{
			return '';
		}
		
		$output = '';
	
		switch( $message->getType() ) 
		{
			case Cms_Message::TYPE_SUCCESS:
				$output .= 'showSuccess(\'';
				break;
			case Cms_Message::TYPE_ERROR:
				$output .= 'showError(\'';
				break;
			case Cms_Message::TYPE_CUSTOM:
			default:
				$output .= 'showCustomMessage(\'';
				break;
		}
		
		$output .= $message->getText() . '\');';
		
		return $output;
    }
    
}
