<!DOCTYPE html>
<html>
<head>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      <title>ZeroGravity CMS Setup</title>
	<link type="text/css" href="../css/spav-theme/jquery-ui-1.8.1.custom.css" rel="Stylesheet" />
	<script type="text/javascript" src="../js/jquery-1.4.2.min.js"></script>
	<script type="text/javascript" src="../js/jquery-ui-1.8.1.custom.min.js"></script>
	<script type="text/javascript">
	<!--
	$(function() {
		$("button, input:submit, a").button();
	});
	//-->
	</script>
	
	<style>
	html, form {
		height: 100%;
		width: 100%;
	}
	
	body{
		font-family: Verdana,Arial,sans-serif;
		font-size: 16px;
		height: 100%;
		width: 100%;
		background-color: #3c64a2;
		margin: 0px;
		color: #a0bfef;
	}
	.searchbox{
		margin: 20px auto;
		width: 300px;
		font-size: 24px;
		height: 36px;
	}
	.header{
		font-family: Tahoma,Verdana,Arial,sans-serif;
		font-size: 36px;
		font-weight: bold;
		height: 85px;
		width: 100%;
		line-height: 85px;
		padding-left: 30px;
	}
	.hr_light{
	  	background-color: #a0bfef;
	  	height: 10px;
	}
	.darkbox{
	  	background-color: #3a4556;
	  	min-height: 70%;
		padding: 20px;
	}
	.footer{
		height: 20px;
	}
	.container{
		margin-left:auto;
		margin-right:auto;
		width:800px;
	}
	.controls{
		text-align:center;
		margin-top: 40px;
	}
	#progressbar{
		width: 680px;
		margin: 20px auto 5px;
	}
	#progressdesc{
		font-weight: bold;
		width: 680px;
		margin: 0px auto 40px auto;
	}
	</style>
</head>
<body>
	<div class="header">Zero9ravity CMS Setup</div>
	<div class="hr_light"></div>
	<div class="darkbox">
		<div class="container">
			<div id="progressbar"></div>

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
			echo '<script type="text/javascript">$("#progressbar").progressbar({value: 25});</script>';
			echo '<div id="progressdesc">Step 1 of 4 - Database Schema</div>';
			installDb($application);
			echo '<div class="controls"><a href="?action=populatedb">Load sample data</a> or skip to <a href="?action=lucene">Create search index</a></div>';
			break;
		case 'populatedb':
			echo '<script type="text/javascript">$("#progressbar").progressbar({value: 50});</script>';
			echo '<div id="progressdesc">Step 2 of 4 - Load Sample Data</div>';
			populateDb($application);
			echo '<div class="controls"><a href="?action=lucene">Create search index</a></div>';
			break;
		case 'lucene':
			echo '<script type="text/javascript">$("#progressbar").progressbar({value: 75});</script>';
			echo '<div id="progressdesc">Step 3 of 4 - Create Search Index</div>';
			createLucene($application);
			echo '<div class="controls"><a href="?action=test">Do tests</a> or <a href="../">Go to main page</a></div>';
			break;
		case 'test':
			echo '<script type="text/javascript">$("#progressbar").progressbar({value: 100});</script>';
			echo '<div id="progressdesc">Step 4 of 4 - Test Search Indexes</div>';
			testLucene($application);
			break;
	}
}
else
{
	echo '<script type="text/javascript">$("#progressbar").progressbar({value: 0});</script>';
	echo '<div id="progressdesc">Welcome in ZeroGravity CMS Setup</div>';
	echo '<div class="controls"><a href="?action=installdb">Install DB Schema</a></div>';
}

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
}

function testLucene()
{
	$index = Zend_Search_Lucene::open( APPLICATION_PATH . '/../data/index-products' );

	if( isset($_GET['search']) )
	{
		echo 'Wyniki:<br/>';
		$hits = $index->find( $_GET['search'] );
		foreach ($hits as $hit)
		{
			echo 'Score: ' .$hit->score . ' Url: ' . $hit->url . '<br/>';
		}
	}
	else
	{
		echo 'Creating 300 fake records...<br/>';
		flush();

		// fake data
		for($i = 0; $i < 100; $i++)
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

		echo '$index->count(): ' . $index->count() . '<br/>';
		echo '$index->numDocs(): ' . $index->numDocs() . '<br/>';
	}

	echo '<form method="get" style="text-align:center">
		<input type="hidden" name="action" value="test"/>
		Type <input class="searchbox" type="text" name="search"/> and <input type="submit" value="Search"/>
	</form>';
}
?>
		</div>
	</div>
	<div class="hr_light"></div>
	<div class="footer"></div>
</body>
</html>