Ext.namespace('ImbaShop.Cms');

ImbaShop.Cms = function(config){       

	if (typeof(config) == 'undefined') config = {};
    
	this.Grid = new ImbaShop.items.CmsGrid({
		region: 'center'
		,margins: '5 5 5 0'
	});
	
	this.CategoryTree = new ImbaShop.items.CategoryTree({
		region: 'west'
		,width: 250
		,margins: '5 0 5 5'
	});
	
	ImbaShop.Cms.superclass.constructor.call(this,
		Ext.applyIf(config,{
			layout: 'border'
			//,title: 'CMS'
			,bodyStyle:'background-color:#fff;'
			,border: false
			,items: [
				this.CategoryTree
				,
				this.Grid
			]
		})		
	);
}

Ext.extend(ImbaShop.Cms, Ext.Panel,{


	
});