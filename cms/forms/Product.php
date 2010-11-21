<?php

class Cms_Form_Product extends Zend_Form
{
	public $inputElementDecorators = array(
        'ViewHelper',
        'Errors',
       	'Label',
    );
	public $buttonElementDecorators = array(
        'ViewHelper'
    );
    
    public function loadDefaultDecorators()
    {
        $this->setDecorators(array(
            'FormElements',
            'Form',
        ));
    }
	
	public function init()
	{
		$this->setAttrib('id', 'product-form');
		
		$this->addElement( 'text', 'name', array(
			'class'			=> 'full-width required',
			'decorators'	=> $this->inputElementDecorators,
			'label'			=> 'Tytuł',
			'filters'		=> array('StringTrim'),
			'validators'	=> array(
				array('StringLength', false, array(1,255))
			),
			'required'		=> true
		));
		
		$this->addElement( 'textarea', 'description', array(
			'id'			=> 'description',
			'class'			=> 'full-width ckeditor',
			'decorators'	=> $this->inputElementDecorators,
			'rows'			=> 2,
			'label'			=> 'Opis',
			'filters'		=> array('StringTrim'),
			'validators'	=> array(
				array('StringLength', false, array(1,300))
			),
			'required'		=> false
		));
		
		$this->addElement( 'submit', 'save', array(
			'class'			=> 'button big',
			'label'			=> 'Zapisz',
			'decorators'	=> $this->buttonElementDecorators
		));
		
		
		$this->addElement( 'button', 'cancel', array(
			'class'			=> 'button big',
			'label'			=> 'Anuluj',
			'decorators'	=> $this->buttonElementDecorators
		));
		
	}
}