<?php

class Cms_Message
{
	
	const TYPE_SUCCESS = 1;
	const TYPE_ERROR = 2;
	const TYPE_CUSTOM = 3;
	
	/**
	 * Tresc wiadomosci
	 * 
	 * @var string
	 */
	protected $_text;
	
	/**
	 * Typ wiadomosci
	 * 
	 * @var int
	 */
	protected $_type;
    
	public function __construct()
	{
		$nsMessage = new Zend_Session_Namespace('message');
			
		if( isset($nsMessage->text) ) 
		{
			$this->setText( $nsMessage->text );
		}
		$this->setType( isset($nsMessage->type) ? $nsMessage->type : self::TYPE_SUCCESS );
	}
	
    public function success( $text )
    {
    	$this->set( $text, self::TYPE_SUCCESS );
    	return $this;
    }
    
    public function error( $text )
    {
    	$this->set( $text, self::TYPE_ERROR );
    	return $this;
    }
    
    public function custom( $text )
    {
    	$this->set( $text, self::TYPE_CUSTOM );
    	return $this;
    }
    
    protected function set( $text, $type = self::TYPE_SUCCESS )
    {
    	$this->setText( $text )
    		->setType( $type );
    	
    	// zapis do sesji
    	$message = new Zend_Session_Namespace('message');
    	$message->text = $this->getText();
    	$message->type = $this->getType();
    	
    	return $this;
    }
    	
    public function setText( $text )
    {
    	$this->_text = $text;
    	return $this;
    }
    
    public function getText()
    {
    	return $this->_text;
    }
    
    public function setType( $type )
    {
    	$this->_type = (int)$type;
    	return $this;
    }
    
    public function getType()
    {
    	return $this->_type;
    }
    
}
