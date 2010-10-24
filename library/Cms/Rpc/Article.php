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
		$article = new Cms_Model_Item_Article( $data );
		$mapper = new Cms_Model_Mapper_Item_Article();
		if( $mapper->save($article) === false )
		{
			$this->_server->fault('dupa - cos nie pojszlo', Zend_Json_Server_Error::ERROR_INTERNAL);
			return false;
		}
		return 'Artykuł "' . $article->getName() . '" zapisany';
	}
}