<?php

class Cms_Controller_Plugin_Router extends Zend_Controller_Plugin_Abstract
{
	/**
     * Set the Rewrite Routes
     *
     * @return Cms_Controller_Plugin_Router
     */
	public function routeStartup( $request )
	{
		$front = Zend_Controller_Front::getInstance();
        $router = $front->getRouter();

		//$router->removeDefaultRoutes();

    	// pobieram reguly z bazy
    	$pages = new Cms_Model_Mapper_Page();
    	$iterator = new RecursiveIteratorIterator($pages->fetchNavigation(), RecursiveIteratorIterator::SELF_FIRST);
        // dodaje reguly
        foreach($iterator as $page)
        {
        	$router->addRoute(
			    $page->getUri(),
			    new Zend_Controller_Router_Route( $page->getUri().'*', array(
			    	'controller'	=> $page->getController(),
					'action' 		=> $page->getAction(),
			    	'page'			=> $page
			    ) )
			);
        }

        // regula rest
		$router->addRoute(
			'rest',
			new Zend_Rest_Route($front, array('page' => 'cms'), array('rest'))
		);

		// regula panelu admina
    	$router->addRoute(
		    'cms',
		    new Zend_Controller_Router_Route( 'cms/:controller/:action/*', array('module' => 'cms','page' => 'cms') )
		);
	}
}