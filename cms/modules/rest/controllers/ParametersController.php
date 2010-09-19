<?php

class Rest_ParametersController extends Zend_Rest_Controller
{

	public function init()
	{
		// nie chcemy widokow
		$this->_helper->layout()->disableLayout();
		$this->_helper->viewRenderer->setNoRender(true);
	}

	public function indexAction()
	{
		$mapper = new Cms_Model_Mapper_Item_Parameter();

		$list = $mapper->fetchAll();

		$parameters = array();
		foreach( $list as $parameter )
		{
			$parameters[] = array(
				'id' 			=> $parameter->getId(),
				'text'			=> $parameter->getName(),
				'leaf'			=> false,
				'iconCls'		=> $parameter->getType(),
				'qtip'			=> $parameter->getDescription()
			);
		}

		echo trim(json_encode($parameters),'{}');
	}

	public function getAction()
	{
		$id = $this->_getParam('id');
		$mapper = new Cms_Model_Mapper_Item_Parameter();

		if( !$mapper->find( $id, $parameter ) )
		{
			$response = array( 'success' => false );
		}
		else
		{
			$data = array(
				'id' 			=> $parameter->getId(),
				'type' 			=> $parameter->getType(),
				'name'			=> $parameter->getName(),
				'description'	=> $parameter->getDescription(),
				'options'		=> $parameter->getOptionsValues()
			);
			$response = array( 'success' => true, 'data' => $data );
		}
		echo json_encode($response);
	}

	public function putAction(){}

	public function postAction()
	{
		// dodaje nowy parametr
    	/*$data = array(
			'type'			=> 'Selectbox',
			'name'			=> 'Test Parameter',
			'description'	=> 'Test Description',
			'optionsValues'	=> array(
				array('value' => 'Test Option One'),
				array('value' => 'Test Option Two')
			)
		);*/

		$data = array(
			'id'			=> $this->_getParam('id'),
			'type'			=> $this->_getParam('type'),
			'name'			=> $this->_getParam('name'),
			'description'	=> $this->_getParam('description')
		);

		$className = 'Cms_Model_Item_Parameter_' . $data['type'];
		$parameter = new $className( $data );
		$parameters = new Cms_Model_Mapper_Item_Parameter();

		if( $parameters->save($parameter) !== false )
		{
			$response = array('success' => true, 'data' => array('id' => $parameter->getId()) );
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
		$mapper = new Cms_Model_Mapper_Item_Parameter();
		if( $mapper->find( $id, $parameter ) )
		{
			$mapper->delete($parameter);
			$response = array( 'success' => true );
		}
		else
		{
			$response = array( 'success' => false );
		}

		echo json_encode($response);
	}

}