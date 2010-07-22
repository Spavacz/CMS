/**
 * Uniwersalny obiekt tabow z jezykami
 * 
 * @param {Object} config - konfiguracja indywidualna tabow
 */

Ext.namespace('ImbaShop.utils.LanguageTabs');

ImbaShop.utils.LanguageTabs = Ext.extend(Ext.TabPanel, {
	constructor: function(config){			
	
		config = config || {};
		config.form = config.form || [];
		
		if(Ext.isEmpty(config.inactive))
			this.activeTab = 0;
		
		this.autoScroll = true;
		this.deferredRender = false;
		this.forceLayout = true;
		this.bodyStyle = 'padding: 2px;';								
		this.items = [];
		
		Ext.each(ImbaShop.utils.Language.getAll(), function(item){
			
			this.items.push({
					title: eval('i18n.'+item.description) || item.description
					,lang:item.lang_id
					,iconCls:item.code
					,autoScroll: true
					,ref: '../lang_' + item.lang_id
					,border: false
					,bodyStyle: 'padding: 5px;'
					,xtype:'form'
					,layout: Ext.isEmpty(config.itemsLayout) ? 'form' : config.itemsLayout 
					,labelWidth:60
					,items: config.form
			});

		},this);
		
		ImbaShop.utils.LanguageTabs.superclass.constructor.call(this, config);
		
		
		//this.addListener('afterrender',function(){
			//this.activate(0);
		//	},this);
		
	}
	
	,getFormObject: function(){
		
		var formObject = {};
		
		Ext.each(this.items.items, function(tab){
			formObject[tab.lang] = tab.form.getFieldValues();
		});

		return formObject;
	}
});