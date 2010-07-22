Ext.namespace('ImbaShop.Help');

ImbaShop.Help = function(config){       

	if (typeof(config) == 'undefined') config = {};
    
	ImbaShop.Help.superclass.constructor.call(this,
		Ext.applyIf(config,{
			bodyStyle:'background-color:#fff;'
			,border: false
			,html: 'Pomoc'
		})		
	);
}

Ext.extend(ImbaShop.Help, Ext.Panel, {


	showConfigDialog: function(){
		console.log('config');
	}
	
	
});