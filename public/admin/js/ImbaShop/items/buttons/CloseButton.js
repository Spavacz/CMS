Ext.namespace('ImbaShop.items.buttons.CloseButton');

ImbaShop.items.buttons.CloseButton = function(config){
	
	if (typeof(config) == 'undefined') config = {};
	
	ImbaShop.items.buttons.CloseButton.superclass.constructor.call(this,
		Ext.applyIf(config,{
			qtip: i18n.CLOSE
			,ref: '../closeBtn'
			,handler: this.closeDialog
		})
	);
}

Ext.extend(ImbaShop.items.buttons.CloseButton, Ext.Button,{
	
	closeDialog: function(event, toolEl, panel){
		//this.ownerCt.closePanel();
		console.log(panel);
		panel.destroy();
	}

});
