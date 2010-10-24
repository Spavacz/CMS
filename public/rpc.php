<?php

// Define path to application directory
defined('APPLICATION_PATH')
    || define('APPLICATION_PATH', realpath(dirname(__FILE__) . '/../cms'));

// Define application environment
defined('APPLICATION_ENV')
    || define('APPLICATION_ENV', (getenv('APPLICATION_ENV') ? getenv('APPLICATION_ENV') : 'production'));

// Ensure library/ is on include_path
set_include_path(implode(PATH_SEPARATOR, array(
    realpath(APPLICATION_PATH . '/../library'),
    get_include_path(),
)));

/** Zend_Application */
require_once 'Zend/Application.php';

// Create application, bootstrap, and run
$application = new Zend_Application(
    APPLICATION_ENV,
    APPLICATION_PATH . '/configs/application.ini'
);

$application->bootstrap('autoload');
$application->bootstrap('db');
$application->bootstrap('translate');
$application->bootstrap('auth');

$server = new Zend_Json_Server();
Zend_Registry::set('rpcServer', $server);

$server->setClass('Cms_Rpc_Widget');
$server->setClass('Cms_Rpc_Auth');
$server->setClass('Cms_Rpc_Page');
$server->setClass('Cms_Rpc_Article', 'article');

if ('GET' == $_SERVER['REQUEST_METHOD']) 
{
	// Indicate the URL endpoint, and the JSON-RPC version used:
	$server->setTarget('rpc')
		->setEnvelope(Zend_Json_Server_Smd::ENV_JSONRPC_2);
	// Grab the SMD
	$smd = $server->getServiceMap();
	// Return the SMD to the client
	header('Content-Type: application/json');
	echo $smd;

	return;
}
$server->handle();