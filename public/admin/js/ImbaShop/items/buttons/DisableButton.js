Ext.namespace('ImbaShop.items.buttons.DisableButton');

ImbaShop.items.buttons.DisableButton = function(config){
	
	if (typeof(config) == 'undefined') config = {};
	
	ImbaShop.items.buttons.DisableButton.superclass.constructor.call(this,
		Ext.applyIf(config,{
	   		text: i18n.DISABLE
			,iconCls: 'is-disable'
			,ref: '../disableBtn'
			,disabled: true
			,handler: function(){
				this.disableItem()
			}
		})
	);
}

Ext.extend(ImbaShop.items.buttons.DisableButton, Ext.Button,{

});