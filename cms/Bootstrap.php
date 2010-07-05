<?php

class Bootstrap extends Zend_Application_Bootstrap_Bootstrap
{

	protected function _initAutoload()
	{
		Zend_Loader_Autoloader::getInstance()->registerNamespace('Cms_');

		list($autoloader) = Zend_Loader_Autoloader::getInstance()->getAutoloaders();
		$autoloader->addResourceTypes(array(
            'widget' => array(
                'namespace' => 'Widget',
                'path'      => 'widgets',
            )
        ));
	}
	
	protected function _initHeaders()
    {
		// Upewniam sie ze mamy juz widok
    	$this->bootstrap( 'View' );

        // Ustawiam title
        $this->getResource( 'View' )->headTitle()
        	->setSeparator(' - ')->append( $this->getOption('appname') );
    }
    
    protected function _initRouter()
    {
    	// potrzebny bedzie FrontController i baza
    	$this->bootstrap( 'FrontController' );
    	
    	$this->getResource('FrontController')->registerPlugin(new Cms_Controller_Plugin_Router());
    }
	
    protected function _initDbRegistry()
    {
		//$this->bootstrap( 'db' );
    	//Zend_Registry::set('db',$this->getResource( 'db' ));
    }
    
	protected function _initAuth()
    {
    	$this->bootstrap( 'db' );
    	$this->bootstrap( 'FrontController' );
    	
    	
    	$this->getResource( 'FrontController' )
    		->registerPlugin( new Cms_Controller_Plugin_Auth(Zend_Layout::getMvcInstance()) );
    }
    
    protected function _initWidgets()
    {
    	$this->bootstrap( 'FrontController' );
    	$this->bootstrap( 'Layout' );
    	$this->bootstrap( 'Auth' );
    	$front = $this->getResource('FrontController');
    	$front->registerPlugin(new Cms_Controller_Plugin_Widgets(Zend_Layout::getMvcInstance()));
    }
    
    protected function _initHelpers()
    {
    	$this->getResource('View')->addHelperPath(
    		realpath(APPLICATION_PATH . '/../library/Cms/View/Helper'), 'Cms_View_Helper');
    }
    
}

/* Funkcja ladnie wyswietlajaca tablice i obiekty */
function _d($data)
{
    if ('development' == APPLICATION_ENV)
    {
		// capture the output of print_r
		$out = print_r($data, true);
		// replace something like '[element] => <newline> (' with <a href="javascript:toggleDisplay('...');">...</a><div id="..." style="display: none;">
		$out = preg_replace('/([ \t]*)(\[[^\]]+\][ \t]*\=\>[ \t]*[a-z0-9 \t_]+)\n[ \t]*\(/iUe',"'\\1<a href=\"javascript:toggleDisplay(\''.(\$id = substr(md5(rand().'\\0'), 0, 7)).'\');\">\\2</a><div id=\"'.\$id.'\" style=\"display: none;\">'", $out);
		// replace ')' on its own on a new line (surrounded by whitespace is ok) with '</div>
		$out = preg_replace('/^\s*\)\s*$/m', '</div>', $out);
		// print the javascript function toggleDisplay() and then the transformed output
		echo '<script language="Javascript">function toggleDisplay(id) { document.getElementById(id).style.display = (document.getElementById(id).style.display == "block") ? "none" : "block"; }</script>'."\n<pre style=\"background-color: white;text-align:left;\">$out</pre>";
	}
}
