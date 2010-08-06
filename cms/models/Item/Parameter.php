<?php

/**
 * 
 * Klasa wspomagajaca Item
 * @author spav
 * 
 */

class Cms_Model_Item_Parameter
{
	
	public static function factory( $id, $options = array() )
	{
		if($id == 1 and $options['value'] == 2)
		$parameter = null;
		$dbTable = new Cms_Model_Mapper_Item_Parameter();
		$dbTable->find( (int)$id, $parameter );
		$parameter->setOptions( $options );
		return $parameter;
	}
	
}