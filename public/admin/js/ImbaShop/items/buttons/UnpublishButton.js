Ext.namespace('ImbaShop.items.buttons.UnpublishButton');

ImbaShop.items.buttons.UnpublishButton = function(config){
	
	if (typeof(config) == 'undefined') config = {};
	
	ImbaShop.items.buttons.UnpublishButton.superclass.constructor.call(this,
		Ext.applyIf(config,{
	   		text: i18n.UNPUBLISH
			,iconCls: 'is-unpublish'
			,ref: '../unpublishBtn'
			,disabled: false
			,handler: function(){
				this.unpublish()
			}
		})
	);
}

Ext.extend(ImbaShop.items.buttons.UnpublishButton, Ext.Button,{

});