/**
 * Extendowany obiekt TabPanel z metodami do obslugi formularzy wielojezykowych
 * 
 * @param {Object} config - konfiguracja indywidualna
 */

Ext.namespace('ImbaShop.utils.MultilanguageTabPanel');

ImbaShop.utils.MultilanguageTabPanel = Ext.extend(Ext.TabPanel, {
	constructor: function(config){			
		config = config || {};
		
		this.deferredRender = false;
		//this.forceLayout = false;
		
		ImbaShop.utils.MultilanguageTabPanel.superclass.constructor.call(this, config);
	}
	
	,getMultilanguageValues: function(param){
		
		var formValues = ImbaShop.utils.Language.getAsKeys();
					
		Ext.each(this.items.items, function(tab){
			
			if (tab.multilanguage){
				var tabValues = tab.items.items[0].getFormObject();
				for (var i in formValues){
					formValues[i] = Ext.apply(formValues[i], tabValues[i]);
				}
			}
			else {
				if(Ext.isDefined(tab.form)){
					for (var i in formValues){
						formValues[i] = Ext.apply(formValues[i], tab.form.getFieldValues());
					}
				}
			}
		})
		
		if (Ext.isDefined(param)){
			for (var i in formValues){
				formValues[i] = Ext.apply(formValues[i], param);
			}
		}		
		
		return formValues;		
	}
});