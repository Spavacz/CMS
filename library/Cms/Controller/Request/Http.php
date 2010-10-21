<?php

class Cms_Controller_Request_Http extends Zend_Controller_Request_Http
{
	
	/**
     * Zwraca parametr
     *
     * Rozszerzenie dodatkowo obsluguje obiekty json'a
     * 
     * @param mixed $key
     * @param mixed $default Default value to use if key not found
     * @return mixed
     */
    public function getParam($key, $default = null)
    {
    	$param = parent::getParam($key, $default);
    	if( empty($param) && $key == 'jsonObj' && preg_match('/application\/json/', $_SERVER['CONTENT_TYPE']) )
    	{
    		$param = json_decode(@file_get_contents("php://input"), true);
    	}
        return $param;
    }
	
	/**
     * Zwraca tablice parametrow
     *
     * Rozszerzenie dodatkowo obsluguje obiekty json'a
     *
     * @return array
     */
    public function getParams()
    {
    	$params = parent::getParams();
    	if( preg_match('/application\/json/', $_SERVER['CONTENT_TYPE']) )
    	{
    		$params['jsonObj'] = json_decode(@file_get_contents("php://input"), true);
    	}
    	
        return $params;
    }
	
}