<?php

class Rest_ProductsController extends Zend_Rest_Controller
{

	public function init()
	{
		// nie chcemy widokow
		$this->_helper->layout()->disableLayout();
		$this->_helper->viewRenderer->setNoRender(true);
	}

	public function indexAction()
	{
		$mapper = new Cms_Model_Mapper_Item_Product();
		$list = $mapper->fetchAll();
		$products = array();
		foreach( $list as $product )
		{
			if( $product->getStatus() != 0 )
			{
				$products[] = array(
					'id' 			=> $product->getId(),
					'name'			=> $product->getName(),
					'description'	=> $product->getDescription()
				);
			}
		}
		$response = array( 'success' => true, 'data' => $products );
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