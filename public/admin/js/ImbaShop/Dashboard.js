Ext.namespace('ImbaShop.Dashboard');

ImbaShop.Dashboard = function(config){       

	if (typeof(config) == 'undefined') config = {};
    
	ImbaShop.Dashboard.superclass.constructor.call(this,
		Ext.applyIf(config,{
			bodyStyle:'background-color:#fff;'
			,border: false
			,html: 'Dashboard'
		})		
	);
}

Ext.extend(ImbaShop.Dashboard, Ext.Panel, {


	showConfigDialog: function(){
		console.log('config');
	}
	
	
});