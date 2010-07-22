/**
 * Uniwersalny obiekt Ajax
 * 
 * @param {Object} config - konfiguracja indywidualna 
 */
ImbaShop.utils.Ajax = function(config){
	
	if (!Ext.isDefined(config.url)){
		ImbaShop.utils.Exceptions.log(i18n.NO_URL);
		return false;
	}
	
	if (Ext.isDefined(config.success)) {
		var success = config.success;
	}
	
	if (Ext.isDefined(config.failure)) {
		var failure = config.failure;
	}
	
	config.method = config.method || 'POST';
	config.displayResult = config.displayResult || false;
	config.scope = config.scope || this
	
	config.success = function(resp, options){		
		try {
			var resp = Ext.util.JSON.decode(resp.responseText);
			
			if (ImbaShop.utils.Exceptions.success(resp, config.displayResult)){
				
				if (Ext.isFunction(success)) {
					success.call(config.scope, resp, options);
				}
			}
			else {
				if (Ext.isFunction(failure)) failure.call(config.scope, resp, options);
			}
		} catch(e){
			if (Ext.isFunction(failure)) failure.call(config.scope, resp, options);
			ImbaShop.utils.Exceptions.failure(i18n.SERVER_BAD_RESPONSE);
		}
	}
	
	config.failure = function(response, opts) {		
		ImbaShop.utils.Exceptions.failure({message: response.status});
    }
	
	Ext.Ajax.request(config);
}