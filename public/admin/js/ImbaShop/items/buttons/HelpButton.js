Ext.namespace('ImbaShop.items.buttons.HelpButton');

ImbaShop.items.buttons.HelpButton = function(config){
	
	if (typeof(config) == 'undefined') config = {};
	
	ImbaShop.items.buttons.HelpButton.superclass.constructor.call(this,
		Ext.applyIf(config,{
			id:'help'
			,qtip: i18n.HELP
			,ref: '../helpBtn'
			,handler: function(event, toolEl, panel){
				this.showHelpDialog();
			}
		})
	);
}

Ext.extend(ImbaShop.items.buttons.HelpButton, Ext.Button,{

});