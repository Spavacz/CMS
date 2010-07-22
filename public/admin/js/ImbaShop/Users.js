Ext.namespace('ImbaShop.Users');

ImbaShop.Users = function(config){       

	config = config || {};
    
	this.Grid = new ImbaShop.items.UsersGrid({
		region: 'center'
		,border:false
	});	
	
	ImbaShop.Users.superclass.constructor.call(this,
		Ext.applyIf(config,{
			layout: 'border'
			,bodyStyle:'background-color:#fff;'
			,border: false
			,items: this.Grid
		})		
	);
}

Ext.extend(ImbaShop.Users, Ext.Panel,{
	
});