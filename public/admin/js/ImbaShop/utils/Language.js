/**
 * Obiekt z operacjami na jezykach pobierancyh z cookies
 * 
 */

Ext.namespace('ImbaShop.utils.Language');

ImbaShop.utils.Language = {
	
	getAll: function(){
		return Ext.util.JSON.decode(Ext.util.Cookies.get('languages'));
	}
	
	,getAsKeys: function(key){
		
		key = key || 'lang_id';
		
		var langs = this.getAll();
		var ret = {};
		
		Ext.each(langs, function(lang){
			ret[lang[key]] = {};
		});
		
		return ret;
	}
	
	,getCurrentId: function(){
		return Ext.util.Cookies.get('default_language');
	}
	
}
