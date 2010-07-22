/**
 * Wyświetla maske na body podczas ładowania dokumentu
 */
Ext.namespace('ImbaShop.utils.Loading');

ImbaShop.utils.Loading = Ext.extend(Object, { 

        init: function(){
            var loading = Ext.get('loading');
            var mask = Ext.get('loading-mask');
            mask.setOpacity(0.8);
            mask.shift({
                xy: loading.getXY(),
                width: loading.getWidth(),
                height: loading.getHeight(),
                remove: true,
                duration: 1,
                opacity: 0.3,
                easing: 'bounceOut',
                callback: function(){
                    loading.fadeOut({
                        duration: 0.2,
                        remove: true,
						callback: function(){
							loading = new ImbaShop.utils.Loading();
							loading.firebugWarning();
						} 
                    });
                }
            });
        }
		
		
		/**
		 * Sprawdza czy mamy alaczonego firebuga jezeli tak to wyswietla komunikat
		 */
		,firebugWarning : function () {
			
		        var cp = new Ext.state.CookieProvider();		
		        if(window.console && window.console.firebug && ! cp.get('hideFBWarning')){
		            var tpl = new Ext.Template(
		                '<div id="fb" style="border: 1px solid #FF0000; background-color:#FFAAAA; display:none; padding:15px; color:#000000;">' + i18n.FIREBUG_DETECTED + '</div>'
		            );

		            var newEl = tpl.insertFirst('infoPanel');
		
		            Ext.fly('hideWarning').on('click', function() {
		                Ext.fly(newEl).slideOut('t',{remove:true});
		                cp.set('hideFBWarning', true);
		            });
		            Ext.fly(newEl).slideIn();
		        }
		    }	
});