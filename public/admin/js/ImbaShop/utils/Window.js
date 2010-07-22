Ext.namespace('ImbaShop.utils.Window');

/**
 * Uniwersalny obiekt window
 * 
 * @param {Object} config - konfiguracja indywidualna window
 */
ImbaShop.utils.Window = function(config){			
	config = config || {};		

	ImbaShop.utils.Window.superclass.constructor.call(this,
		Ext.applyIf(config,{
			buttonAlign : 'right'
			,closable : true
			,closeAction : 'close'
			,width : 500
			,boxMaxHeight:Ext.getBody().getHeight()-10
			,boxMaxWidth:Ext.getBody().getWidth()-10
			,autoScroll : true
			,hideParent : true
			,modal : true
			,constrainHeader : true
			,y : 10
			,maximizable : true			
			,collapsible : true			
			,initHidden : !(Ext.isEmpty(config.aShow) || config.aShow == true)
			,keys: {
				key: 27, // Esc key
				handler: function(){ this.hide(); },
				scope: this
			}

		})
	);
	/*
    this.addListener('render', function(a,w,h){
    	console.log('afterrender');
		var screenHeight = Ext.getBody().getHeight();	
		if (this.getHeight() > screenHeight){
			this.setAutoScroll(true);
			this.setHeight(screenHeight - 30);
			this.setWidth(this.getWidth() + 20);
		}		
	});
	*/
	if (!Ext.isDefined(config.layout) || config.layout != 'fit'){
		this.maximizable = false;
		this.resizable = false;
	}

	
	if (!config.layout || config.layout != 'fit'){		
		this.on('resize', function(a,w,h){
			a.doLayout();
		});
		this.maximizable = false;
		this.resizable = false;
	}
	
}

Ext.extend(ImbaShop.utils.Window, Ext.Window,{
	
});