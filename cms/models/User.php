<?php

class Cms_Model_User extends Cms_Model
{
	protected $_id;
	protected $_name;
	protected $_surname;
	protected $_email;
	protected $_phone;
	protected $_job;
	protected $_photo;
	protected $_roles;
	protected $_description;
	
	public function setId( $id )
	{
		$this->_id = is_numeric($id) ? (int)$id : null;
		return $this;
	}
	
	public function getId()
	{
		return $this->_id;
	}
	
	/**
	 * Ustawia liste roli uzytkownika
	 * 
	 * @param array $roles
	 */
	public function setRoles( $roles )
	{
		$this->_roles = is_array($roles) ? $roles : null;
		return $this;
	}
	/**
	 * Zwraca liste roli uzytkownika
	 * 
	 * @return array
	 */
	public function getRoles()
	{
		return $this->_roles;
	}
	
	public function setName( $name )
	{
		$this->_name = !empty($name) ? $name : null;
		return $this;
	}
	
	public function getName()
	{
		return $this->_name;
	}
	
	public function setSurname( $surname )
	{
		$this->_surname = !empty($surname) ? $surname : null;
		return $this;
	}
	
	public function getSurname()
	{
		return $this->_surname;
	}
	
	public function setEmail( $email )
	{
		$validator = new Zend_Validate_EmailAddress();
		$this->_email = $validator->isValid($email) ? $email : null;
		return $this;
	}
	
	public function getEmail()
	{
		return $this->_email;
	}
	
	public function setPhone( $phone )
	{
		$this->_phone = !empty($phone) ? $phone : null;
		return $this;
	}
	
	public function getPhone()
	{
		return $this->_phone;
	}
	
	public function setJob( $job )
	{
		$this->_job = !empty($job) ? $job : null;
		return $this;
	}
	
	public function getJob()
	{
		return $this->_job;
	}
	
	public function setPhoto( $photo )
	{
		$this->_photo = !empty($photo) ? $photo : null;
		return $this;
	}
	
	public function getPhoto()
	{
		return $this->_photo;
	}
	
	public function setDescription( $description )
	{
		$this->_description = !empty($description) ? $description : null;
		return $this;
	}
	
	public function getDescription()
	{
		return $this->_description;
	}
}