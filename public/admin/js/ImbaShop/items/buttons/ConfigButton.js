Ext.namespace('ImbaShop.items.buttons.ConfigButton');

ImbaShop.items.buttons.ConfigButton = function(config){
	
	if (typeof(config) == 'undefined') config = {};
	
	ImbaShop.items.buttons.ConfigButton.superclass.constructor.call(this,
		Ext.applyIf(config,{
			id:'gear'
			,qtip: i18n.CONFIGURATION
			,ref: '../confBtn'
			,handler: function(event, toolEl, panel){
				this.showConfigDialog();
			}
		})
	);
}

Ext.extend(ImbaShop.items.buttons.ConfigButton, Ext.Button,{
	
	 
	configDialog : function(event,object,scope){
		if(scope.configDialog)
			scope.configDialog();
	}

});