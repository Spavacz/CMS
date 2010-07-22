Ext.namespace('ImbaShop.items.buttons.ShowAllButton');

ImbaShop.items.buttons.ShowAllButton = function(config){
	
	if (typeof(config) == 'undefined') config = {};
	
	ImbaShop.items.buttons.ShowAllButton.superclass.constructor.call(this,
		Ext.applyIf(config,{
	   		text: i18n.PREVIEW
			,iconCls: 'is-show-all'
			,ref: '../showPrevBtn'
			,disabled: false
			,enableToggle: true
			,handler: function(a,b,c){
				console.log(this,a,b,c);
			}
		})
	);
}

Ext.extend(ImbaShop.items.buttons.ShowAllButton, Ext.Button,{

});