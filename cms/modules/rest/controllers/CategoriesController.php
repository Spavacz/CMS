<?php

class Rest_CategoriesController extends Zend_Rest_Controller
{
	
	public function init()
	{
		// nie chcemy widokow
		$this->_helper->layout()->disableLayout();
		$this->_helper->viewRenderer->setNoRender(true);
	}
	
	public function indexAction()
	{
		$mapper = new Cms_Model_Mapper_Category_Product();
		
		$idParent = $this->_getParam('idParent');		
		$list = $mapper->fetchAll('idParent = '.$idParent);
		
		$categories = array();
		foreach( $list as $category )
		{
			if( $category->getStatus() != 0 )
			{
				$categories[] = array(
					'id' 			=> $category->getId(),
					'idParent'		=> $category->getIdParent(),
					'text'			=> $category->getName(),
					//TODO - ,'leaf'	=> ($category->getId()=="nie ma dzieci") ? true : false, // wtedy nie bedzie mozliwosci rozwiniecia noda
					'cls'			=> 'folder',
					'qtip'			=> $category->getDescription()
				);
			}
		}

		echo trim(json_encode($categories),'{}');
	}
	
	public function getAction()
	{
		$id = $this->_getParam('id');
		$mapper = new Cms_Model_Mapper_Item_Product();
		
		if( !$mapper->find( $id, $product = new Cms_Model_Item_Product() ) )
		{
			$response = array( 'success' => false );
		}
		else
		{
			if( $product->getStatus() != 0 )
			{
				$data = array(
					'id' 			=> $product->getId(),
					'name'			=> $product->getName(),
					'description'	=> $product->getDescription()
				);
				$response = array( 'success' => true, 'data' => $data );
			}
			else 
			{
				$response = array( 'success' => false );
			}
		}
		echo json_encode($response);
	}
	
	public function putAction(){}
	
	public function postAction()
	{
		//TODO - zrobic pro :>
		$post = json_decode(file_get_contents("php://input"), true);		
		
		$data = array(
			'id'			=> (isset($post[1]['id'])) ? $post[1]['id'] : null,
			'idParent'		=> $post[1]['idParent'],
			'name'			=> $post[1]['name'],
			'description'	=> $post[1]['description']
		);
		//
		
		$category = new Cms_Model_Category_Product( $data );
		$categories = new Cms_Model_Mapper_Category_Product();

		if( $categories->save($category) !== false )
		{
			$response = array('success' => true, 'data' => array('id' => $category->getId()) );
		}
		else
		{
			$response = array('success' => false);
		}
		
		echo json_encode($response);
	}
	
	public function deleteAction()
	{
		$id = $this->_getParam('id');
		$mapper = new Cms_Model_Mapper_Category_Product();
		if( $mapper->find( $id, $product = new Cms_Model_Category_Product() ) )
		{
			$mapper->delete($product);
			$response = array( 'success' => true );
		}
		else
		{
			$response = array( 'success' => false );
		}
		
		echo json_encode($response);
	}
	
}