Ext.namespace('ImbaShop.AdminPanel');
Ext.namespace('ImbaShop.items');
Ext.namespace('ImbaShop.items.buttons');
Ext.namespace('ImbaShop.utils');

ImbaShop.AdminPanel = function(config){          
	
	config = config || {};
  
  	this.id = 'viewport';
  
  	this.mainPanel = new Ext.Panel({
		region:'center'
        ,layout:'fit'
		,border: false
		,closeable:true
		,bodyStyle:'background-color:#fff;'
		,html: 'Dashboard:P'
	});
	
	ImbaShop.AdminPanel.superclass.constructor.call(this,
		Ext.applyIf(config,{
			layout: 'border'			
			,items: [{
					region:'north'
					,border:false
					,height:25
					,ref:'north'
					,tbar: new ImbaShop.TopMenu()
				},
      			this.mainPanel
			]
		})
	);
			
}

Ext.extend(ImbaShop.AdminPanel,Ext.Viewport,{
	
});

   