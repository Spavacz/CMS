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
    	
    	// pobieram reguly z bazy
    	$pages = new Cms_Model_Mapper_Page();
        // dodaje reguly
    	foreach($pages->fetchAll() as $page)
        {
        	
        	// pomijam strone glowna - idzie z default
        	// @TODO: ustawienia strony glownej - default z nowa akcja
        	if( $page->id != 1 )
        	{
        		$router->addRoute(
				    $page->getPath(),
				    new Zend_Controller_Router_Route( $page->getPath().'*', array(
				    	'controller'	=> $page->getController(),
						'action' 		=> $page->getAction(),
				    	'page'			=> $page
				    ) )
				);
        	}
        }
        
	}
}