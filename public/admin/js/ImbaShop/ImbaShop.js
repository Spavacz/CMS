Ext.namespace('ImbaShop');
Ext.namespace('ImbaShop.AdminPanel');
Ext.namespace('ImbaShop.items');
Ext.namespace('ImbaShop.items.buttons');
Ext.namespace('ImbaShop.utils');

ImbaShop = function(config){  
	config  = config || {};
	ImbaShop.superclass.constructor.call(this,
			Ext.applyIf(config,{
				language:'pl_PL'
			})
	);
}

Ext.extend(ImbaShop,Ext.Container,{
	
});