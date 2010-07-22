Ext.namespace('ImbaShop.items.buttons.EditButton');

ImbaShop.items.buttons.EditButton = function(config){
	
	if (typeof(config) == 'undefined') config = {};
	
	ImbaShop.items.buttons.EditButton.superclass.constructor.call(this,
		Ext.applyIf(config,{
	   		text: i18n.EDIT
			,iconCls: 'is-edit'
			,ref: '../editBtn'
			,disabled: true
			,handler: function(){
				this.editDialog()
			}
		})
	);
}

Ext.extend(ImbaShop.items.buttons.EditButton, Ext.Button,{

});