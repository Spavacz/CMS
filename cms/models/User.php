<?php

class Cms_Model_User extends Cms_Model
{
	protected $id;
	protected $imie;
	protected $nazwisko;
	protected $email;
	protected $telefon;
	protected $stanowisko;
	
	public function setId( $id )
	{
		$this->id = (int)$id;
		return $this;
	}
	
	public function getId()
	{
		return $this->id;
	}
	
	public function setImie( $imie )
	{
		// @TODO
		return $this;
	}
	
	public function getImie()
	{
		// @TODO
	}
	
	public function setNazwisko( $nazwisko )
	{
		// @TODO
		return $this;
	}
	
	public function getNazwisko()
	{
		// @TODO
	}
	
	public function setEmail( $email )
	{
		// @TODO
		return $this;
	}
	
	public function getEmail()
	{
		// @TODO
	}
	
	public function setTelefon( $telefon )
	{
		// @TODO
		return $this;
	}
	
	public function getTelefon()
	{
		// @TODO
	}
	
	public function setStanowisko( $stanowisko )
	{
		// @TODO
		return $this;
	}
	
	public function getStanowisko()
	{
		// @TODO
	}
}