<?php

/**
 * Script for creating and loading database etc
 */

// Initialize the application path and autoloading
define('APPLICATION_ENV', 'development');
defined('APPLICATION_PATH')
    || define('APPLICATION_PATH', realpath(dirname(__FILE__) . '/../../cms'));
set_include_path(implode(PATH_SEPARATOR, array(
    APPLICATION_PATH . '/../library',
    get_include_path(),
)));
require_once 'Zend/Loader/Autoloader.php';
Zend_Loader_Autoloader::getInstance();

//Initialize Zend_Application
$application = new Zend_Application(
    APPLICATION_ENV,
    APPLICATION_PATH . '/configs/application.ini'
);

if( isset($_GET['action']))
{
	switch( $_GET['action'] )
	{
		case 'installdb':
			installDb($application);
			break;
		case 'populatedb':
			populateDb($application);
			break;
		case 'lucene':
			createLucene($application);
			break;
		case 'test':
			testLucene($application);
			break;
	}
}

echo '<ul>'
	.' <li><a href="?action=installdb">Create database schema</a></li>'
	.' <li><a href="?action=populatedb">Load sample data</a></li>'
	.' <li><a href="?action=lucene">Create Lucene indexes</a></li>'
	.'</ul>';

function installDb($application)
{
	// Initialize and retrieve DB resource
	$bootstrap = $application->getBootstrap();
	$bootstrap->bootstrap('db');
	$dbAdapter = $bootstrap->getResource('db');

	echo 'Creating schema of CMS Database...<br/>';

	try
	{
        $schemaSql = file_get_contents( APPLICATION_PATH . '/../scripts/schema.mysql.sql' );
	    // use the connection directly to load sql in batches
	    $dbAdapter->getConnection()->exec($schemaSql);
	    echo 'Database Created<br/>';
    }
    catch (Exception $e)
    {
    	echo 'AN ERROR HAS OCCURED:<br/>';
    	echo $e->getMessage() . '<br/>';
    	return false;
	}
}

function populateDb($application)
{
	// Initialize and retrieve DB resource
	$bootstrap = $application->getBootstrap();
	$bootstrap->bootstrap('db');
	$dbAdapter = $bootstrap->getResource('db');

	echo 'Writing sample data to CMS Database...<br/>';

	try
	{
        $dataSql = file_get_contents( APPLICATION_PATH . '/../scripts/data.mysql.sql' );
        // use the connection directly to load sql in batches
        $dbAdapter->getConnection()->exec($dataSql);
		echo 'Data Loaded<br/>';
	}
    catch (Exception $e)
    {
	    echo 'AN ERROR HAS OCCURED:<br/>';
    	echo $e->getMessage() . '<br/>';
    	return false;
	}
}

function createLucene()
{
	// products index
	echo 'Creating products index files...<br/>';
	$index = Zend_Search_Lucene::create( APPLICATION_PATH . '/../data/index-products' );
	echo 'Index created<br/>';

	// fake data
	for($i = 0; $i < 10000; $i++)
	{
		$doc = new Zend_Search_Lucene_Document();
		$doc->addField( Zend_Search_Lucene_Field::Text('url', '/test'.$i) );
		$doc->addField( Zend_Search_Lucene_Field::UnStored('contents', 'test wyszukiwarki lucene '.$i) );
		$index->addDocument($doc);

		$doc = new Zend_Search_Lucene_Document();
		$doc->addField( Zend_Search_Lucene_Field::Text('url', '/test'.$i) );
		$doc->addField( Zend_Search_Lucene_Field::UnStored('contents', 'drugi dokument testowy lucene '.$i) );
		$index->addDocument($doc);

		$doc = new Zend_Search_Lucene_Document();
		$doc->addField( Zend_Search_Lucene_Field::Text('url', '/test'.$i) );
		$doc->addField( Zend_Search_Lucene_Field::UnStored('contents', 'trzeci dokumencik w wyszukiwarce '.$i) );
		$index->addDocument($doc);
	}
}

function testLucene()
{
	$index = Zend_Search_Lucene::open( APPLICATION_PATH . '/../data/index-products' );
	echo '$index->count(): ' . $index->count() . '<br/>';
	echo '$index->numDocs(): ' . $index->numDocs() . '<br/>';

	if( isset($_GET['search']) )
	{
		$hits = $index->find( $_GET['search'] );
		foreach ($hits as $hit)
		{
			_d($hit->url);
			_d($hit->score);
		}
	}

}