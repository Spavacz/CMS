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

		$idParent = $this->_getParam('idParent',0);
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
					'leaf'			=> !$category->hasChildren(),
					'iconCls'		=> 'folder',
					'qtip'			=> $category->getDescription()
				);
			}
		}

		echo trim(json_encode($categories),'{}');
	}

	public function getAction()
	{
		$id = $this->_getParam('id');
		$mapper = new Cms_Model_Mapper_Category_Product();

		if( !$mapper->find( $id, $category = new Cms_Model_Category_Product() ) )
		{
			$response = array( 'success' => false );
		}
		else
		{
			if( $category->getStatus() != 0 )
			{
				$data = array(
					'id' 			=> $category->getId(),
					'idParent'		=> $category->getIdParent(),
					'name'			=> $category->getName(),
					'description'	=> $category->getDescription(),
					'dateCreated'	=> $category->getDateCreated(),
					'dateModified'	=> $category->getDateModified(),
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
		$data = array(
			'id'			=> $this->_getParam('id'),
			'idParent'		=> $this->_getParam('idParent'),
			'name'			=> $this->_getParam('name'),
			'description'	=> $this->_getParam('description')
		);

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
		if( $mapper->find( $id, $category = new Cms_Model_Category_Product() ) )
		{
			$mapper->delete($category);
			$response = array( 'success' => true );
		}
		else
		{
			$response = array( 'success' => false );
		}

		echo json_encode($response);
	}

}