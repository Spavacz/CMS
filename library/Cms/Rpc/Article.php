<?php
class Cms_Rpc_Article
{
	protected $_server;
	protected $_message;
	
	protected $_mapper;
	
	public function __construct()
	{
		$this->_server = Zend_Registry::get('rpcServer');
		$this->_message = new Cms_Message();
	}
	
	public function add( $data )
	{
		foreach( $data as $param )
		{
			$data[$param['name']] = $param['value'];
		}
		
		$form = new Cms_Form_Article();
		$valid = $form->processAjax($data);
		if( $valid == 'true' )
		{
			$article = new Cms_Model_Item_Article( $data );
			if( $this->_mapper()->save($article) === false )
			{
				$this->_server->fault('Cos nie pojszlo', Zend_Json_Server_Error::ERROR_INTERNAL);
				return false;
			}
			$this->_message->success( 'Artykuł "' . $article->getName() . '" zapisany' );
			return 'Artykuł "' . $article->getName() . '" zapisany';
		}
		else
		{
			$this->_server->fault($valid, Zend_Json_Server_Error::ERROR_INTERNAL);
			return false;
		}
	}
	
	public function edit( $id, $data )
	{
		foreach( $data as $param )
		{
			$data[$param['name']] = $param['value'];
		}
		
		$form = new Cms_Form_Article();
		$valid = $form->processAjax($data);
		if( $valid == 'true' )
		{
			if( !$this->_mapper()->find( $id, $article = new Cms_Model_Item_Article() ) )
			{
				$this->_server->fault('Article not found', Zend_Json_Server_Error::ERROR_INTERNAL);
				return false;
			}
			$article->setOptions($data);
			if( $this->_mapper()->save($article) === false )
			{
				$this->_server->fault('cos nie pojszlo', Zend_Json_Server_Error::ERROR_INTERNAL);
				return false;
			}
			$this->_message->success( 'Artykuł "' . $article->getName() . '" zapisany' );
			return 'Artykuł "' . $article->getName() . '" zapisany';
		}
		else
		{
			$this->_server->fault($valid, Zend_Json_Server_Error::ERROR_INTERNAL);
			return false;
		}
	}
	
	public function delete( $id )
	{
		$this->_mapper()->find( $id, $article = new Cms_Model_Item_Article() );
		$this->_mapper()->delete( $article );
		//$this->_message->success('Artykuł "' . $article->getName() . '" usunięty');
		return 'Artykuł "' . $article->getName() . '" usunięty';
	}
	
	protected function _mapper()
	{
		if( is_null($this->_mapper) )
		{
			$this->_mapper = new Cms_Model_Mapper_Item_Article();
		}
		return $this->_mapper;
	}
}