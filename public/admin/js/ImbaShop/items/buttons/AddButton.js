Ext.namespace('ImbaShop.items.buttons.AddButton');

ImbaShop.items.buttons.AddButton = function(config){
	
	config = config || {};
	
	ImbaShop.items.buttons.AddButton.superclass.constructor.call(this,
		Ext.applyIf(config,{
	   		text: i18n.ADD
			,iconCls: 'is-add'
			,ref: '../addBtn'
			,disabled: false
			,handler: function(){
				this.addDialog()
			}
		})
	);
}

Ext.extend(ImbaShop.items.buttons.AddButton, Ext.Button,{

});