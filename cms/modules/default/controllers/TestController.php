<?php

class TestController extends Zend_Controller_Action
{

    public function init()
    {
        /* Initialize action controller here */
    }

    public function indexAction()
    {
    	$testGroup = $this->_getParam('group', 1);
    	
    	ob_start();
    	switch( $testGroup )
    	{
    		case 1:
    			$this->userTest();
    			break;
    		case 2:
    			$this->parametersTest();
    			break;
    		case 3:
    			$this->productsTest();
    			break;
    	}
    	$output = ob_get_contents();
    	ob_end_clean();
    	
    	$this->view->testGroup = $testGroup;
    	$this->view->output = $output;
    }
    
    public function restProductsAction()
    {
    	
    }
    
    protected function userTest()
    {
    	echo '<h2>Cms_Action_Helper_User Tests - aktualnie zalogowany user:</h2>';
    	_d($this->_helper->user());
    }
    
    protected function parametersTest()
    {
    	echo '<h2>Cms_Model_Item_Parameter Tests:</h2>';
    	$parameters = new Cms_Model_Mapper_Item_Parameter();
    	
    	// wyswietlam dane parametru id = 1
    	echo '<h3>Parameter ID = 1</h3>';
    	$parameters->find( 1, $parameter );
    	_d($parameter);
		
		// dodaje nowy parametr
		echo '<h3>Nowy Parameter</h3>';
    	$data = array(
			'type'			=> 'Selectbox',
			'name'			=> 'Test Parameter',
			'description'	=> 'Test Description',
			'optionsValues'	=> array(
				array('value' => 'Test Option One'),
				array('value' => 'Test Option Two')
			)
		);
		$parameter = new Cms_Model_Item_Parameter_Selectbox( $data );
		$parameters->save($parameter);
		_d($parameter);
		
		// edytuje parametr
		echo '<h3>Wyedytowany Parameter</h3>';
		$options = $parameter->getOptionsValues();
		$options[0]['value'] = 'Test Option One Edit';
		$options[1] = array('value'	=> 'Test Option Three');
		$data = array(
			'name'			=> 'Test Parameter Edit',
			'description'	=> 'Test Description Edit',
			'optionsValues'	=> $options
		);
		$parameter->setOptions($data);
		$parameters->save($parameter);
		_d($parameter);
		
		// usuwam parametr
		echo '<h3>Usuniety Parameter</h3>';
		$parameters->delete($parameter);
		var_dump( $parameters->find( $parameter->getId(), $parameter ) ); // powinno byc false
    }

    protected function productsTest()
    {
    	echo '<h2>Cms_Model_Item_Product Test:</h2>';
    	$products = new Cms_Model_Mapper_Item_Product();

    	// wyswietlam dane produktu id = 1
    	echo '<h3>Product ID = 1</h3>';
    	$products->find( 1, $product = new Cms_Model_Item_Product() );
		_d( $product );
    	
    	// dodaje nowy produkt
    	echo '<h3>Nowy Produkt</h3>';
		$data = array(
			'name'			=> 'Test Product',
			'description'	=> 'Test Description',
			'parameters'	=> array(
				Cms_Model_Item_Parameter::factory(1, array('value' => 1)),
				Cms_Model_Item_Parameter::factory(2, array('value' => 2))
			)
		);
		$product = new Cms_Model_Item_Product( $data );
		$products->save($product);
		$products->find( $product->getId(), $product = new Cms_Model_Item_Product() );
		_d( $product );
		
		// edytuje parametr
		echo '<h3>Edycja Produktu</h3>';
		$data = array(
			'name'			=> 'Test Product Edit',
			'description'	=> 'Test Description Edit',
			'parameters'	=> array(
				Cms_Model_Item_Parameter::factory(2, array('value' => 1)),
				Cms_Model_Item_Parameter::factory(3, array('value' => 1))
			)
		);
		$product->setOptions($data);
		$products->save($product);
		$products->find( $product->getId(), $product = new Cms_Model_Item_Product() );
		_d($product);
				
		// usuwam Product
		echo '<h3>Usuwam Product (trafia do kosza)</h3>';
		$products->delete($product);
		$products->find( $product->getId(), $product = new Cms_Model_Item_Product() );
		_d($product); // status == 0
		
		// niszcze Product
		echo '<h3>Niszcze Product</h3>';
		$products->purge($product);
		var_dump( $products->find( $product->getId(), $product ) ); // powinno wyjsc false
		
    }
    
}

