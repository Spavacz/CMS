Ext.namespace('ImbaShop.ExtraFields');

ImbaShop.ExtraFields = function(config){       

	if (typeof(config) == 'undefined') config = {};
    
	this.ExtraFieldsGrid = new ImbaShop.items.ExtraFieldsGrid({
		region: 'center'
		,border:false
		//,margins: '5 5 5 0'
	});
	
	ImbaShop.ExtraFields.superclass.constructor.call(this,
		Ext.applyIf(config,{
			layout: 'border'
			,title: 'Pola dodatkowe'
			,border: false
			,items: [this.ExtraFieldsGrid]
		})		
	);
}

Ext.extend(ImbaShop.ExtraFields, Ext.Panel,{

	
	
});