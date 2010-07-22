Ext.namespace('ImbaShop.items.buttons.PublishButton');

ImbaShop.items.buttons.PublishButton = function(config){
	
	if (typeof(config) == 'undefined') config = {};
	
	ImbaShop.items.buttons.PublishButton.superclass.constructor.call(this,
		Ext.applyIf(config,{
	   		text: i18n.PUBLISH
			,iconCls: 'is-publish'
			,ref: '../publishBtn'
			,disabled: false
			,handler: function(){
				this.publish(true)
			}
		})
	);
}

Ext.extend(ImbaShop.items.buttons.PublishButton, Ext.Button,{

});