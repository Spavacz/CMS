<?php
class Cms_Rpc_Article
{
	protected $_server;
	
	public function __construct()
	{
		$this->_server = Zend_Registry::get('rpcServer');
	}
	
	public function add( $data )
	{
		//print_r($data);
		parse_str($data, $data);
		
		$form = new Cms_Form_Article();
		$valid = $form->processAjax($data);
		if( $valid == 'true' )
		{
			$article = new Cms_Model_Item_Article( $form->getValues() );
			$mapper = new Cms_Model_Mapper_Item_Article();
			if( $mapper->save($article) === false )
			{
				$this->_server->fault('cos nie pojszlo', Zend_Json_Server_Error::ERROR_INTERNAL);
				return false;
			}
			return 'Artykuł "' . $article->getName() . '" zapisany';
		}
		else
		{
			$this->_server->fault($valid, Zend_Json_Server_Error::ERROR_INTERNAL);
			return false;
		}
	}
}