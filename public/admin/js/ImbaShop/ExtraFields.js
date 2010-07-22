Ext.namespace('ImbaShop.ExtraFields');

ImbaShop.ExtraFields = function(config){       

	if (typeof(config) == 'undefined') config = {};
    
	this.Grid = new ImbaShop.items.ExtraFieldsGrid({
		region: 'center'
		//,margins: '5 5 5 0'
	});
	
	
	ImbaShop.Products.superclass.constructor.call(this,
		Ext.applyIf(config,{
			layout: 'border'
			//,title: 'Pola dodatkowe'
			,bodyStyle:'background-color:#fff;'
			,border: false
			,items: [
				this.Grid
			]
		})		
	);
}

Ext.extend(ImbaShop.ExtraFields, Ext.Panel,{


	
});