Ext.namespace('ImbaShop.items.buttons.ImageButton'); 

ImbaShop.items.buttons.ImageButton = function(config){

	config = config || {};
	
	ImbaShop.items.buttons.ImageButton.superclass.constructor.call(this,
		Ext.apply(config,{
            	iconCls       : 'is-image'
                ,handler      : this.show
                ,scope        : this
                ,tooltip      : {title: 'Dodaj grafikę'}
                ,overflowText : 'Wstaw grafikę'
    			,text: 'Zdjęcia'			
    			,ref: '../imageBtn'            	
            }
	));
}

Ext.extend(ImbaShop.items.buttons.ImageButton,Ext.Button,{

	show : function(el, callback){
		product_id = (Ext.isObject(this.grid)) ? this.grid.selModel.getSelected().json.product_id : 0;
		
		if(!this.win){
			var cfg = {
		    	title: 'Wstaw grafikę',
		    	layout: 'fit',
				width: 600,
				height: 300,				
				modal: true,
				border:true,
				resizable   : false,				
				closeAction: 'hide',				
				items:new ImbaShop.items.tabs.ImageTab({		
					fileDir: product_id
					,listMethod:'/api/getProductImages'
					,uploadMethod:'/api/putProductImage'
					,disableTitle:true
					,border:false
				})
				,buttons: [{
					text: 'Zamknij'
					,handler: function(){this.win.hide();}
					,scope:this
				}]
				,listeners: {					
					beforeshow: function(){
						this.imageTab.store.setBaseParam('product_id', product_id)
						this.imageTab.store.load();
						this.imageTab.view.refresh();
					}
				}
			};
			Ext.apply(cfg, this.config);
		    this.win = new ImbaShop.utils.Window(cfg);
		}
	    this.win.show(el);

		this.animateTarget = el;

	}
});