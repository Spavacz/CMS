Ext.namespace('ImbaShop.items.buttons.DeleteButton');

ImbaShop.items.buttons.DeleteButton = function(config){
	
	if (typeof(config) == 'undefined') config = {};
	
	ImbaShop.items.buttons.DeleteButton.superclass.constructor.call(this,
		Ext.applyIf(config,{
	   		text: i18n.DELETE
			,iconCls: 'is-delete'
			,ref: '../deleteBtn'
			,disabled: true
			,handler: function(){
				this.deleteConfirm()
			}
		})
	);
}

Ext.extend(ImbaShop.items.buttons.DeleteButton, Ext.Button,{

});