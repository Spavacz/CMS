Ext.namespace('ImbaShop.items.buttons.ShowPreviewButton');

ImbaShop.items.buttons.ShowPreviewButton = function(config){
	
	if (typeof(config) == 'undefined') config = {};

	ImbaShop.items.buttons.ShowPreviewButton.superclass.constructor.call(this,
		Ext.applyIf(config,{
	   		text: i18n.PREVIEW
			,iconCls: 'is-show-all'
			,ref: '../showPrevBtn'
			,disabled: false
            ,pressed: false
            ,enableToggle:true
            ,toggleHandler: function(btn, pressed){
                var view = this.getView();
                view.showPreview = pressed;
                view.refresh();
            }}
		)
	);
}

Ext.extend(ImbaShop.items.buttons.ShowPreviewButton, Ext.Button,{

});	                