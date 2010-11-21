<?php

class Rest_ArticlesController extends Zend_Rest_Controller
{

	public function init()
	{
		// nie chcemy widokow
		$this->_helper->layout()->disableLayout();
		$this->_helper->viewRenderer->setNoRender(true);
	}

	public function indexAction()
	{
		$mapper = new Cms_Model_Mapper_Item_Article();
		$sort = $this->_getParam( 'sort', 'id' );
		$order = $this->_getParam( 'order', 'desc' );
		$page = $this->_getParam( 'page', 1 );
		$limit = $this->_getParam( 'limit' );
		$list = $mapper->fetchAll(null, $sort.' '.$order, $limit, $page);
		$articles = array();
		foreach( $list as $i => $article )
		{
			$baseurl = new Zend_View_Helper_BaseUrl();
			$articles[$i]['cols'] = $article->toArray();
			$articles[$i]['cols']['status'] = $articles[$i]['cols']['status'] == 1 ? $baseurl->baseUrl('admin/images/icons/ok.png') : $baseurl->baseUrl('admin/images/icons/delete.png');
			$articles[$i]['ctrl'] = array(
				'edit'		=> array(
					'url'	=> $baseurl->baseUrl('cms/articles/edit/id/' . $article->getId()),
					'label'	=> 'Edytuj',
					'img'	=> $baseurl->baseUrl('admin/images/icons/edit.png'),
					'css'	=> 'edit-btn'
				),
				'delete'	=> array(
					'url'	=> '#delete',
					'label'	=> 'Usuń',
					'img'	=> $baseurl->baseUrl('admin/images/icons/delete.png'),
					'css'	=> 'delete-btn'
				)
			);
		}
		$response = array( 'success' => true, 'data' => $articles );
		echo json_encode($response);
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
					'description'	=> $product->getDescription(),
					'parameters'	=> array()
				);
				foreach( $product->getParameters() as $parameter )
				{
					$data['parameters'][] = array(
						'id' 	=> $parameter->getId(),
						'value'	=> $parameter->getValue()
					);
				}
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
			'id'			=> $this->_getParam('id', null),
			'name'			=> $this->_getParam('name', null),
			'description'	=> $this->_getParam('description', null),
			'parameters'	=> array()
		);
		$parametersId = $this->_getParam('parameterId', array());
		$parametersValue = $this->_getParam('parameterValue', array());
		foreach( $parametersId as $i => $idParameter )
		{
			$data['parameters'][] = Cms_Model_Item_Parameter::factory($idParameter, array('value' => $parametersValue[$i]));
		}

		$product = new Cms_Model_Item_Product( $data );
		$products = new Cms_Model_Mapper_Item_Product();
		if( $products->save($product) !== false )
		{
			$response = array('success' => true, 'data' => array('id' => $product->getId()) );
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
		$mapper = new Cms_Model_Mapper_Item_Product();
		if( $mapper->find( $id, $product = new Cms_Model_Item_Product() ) )
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