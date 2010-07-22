Ext.namespace('ImbaShop.Products');

ImbaShop.Products = function(config){       

	if (typeof(config) == 'undefined') config = {};
    
	this.Grid = new ImbaShop.items.ProductsGrid({
		region: 'center'
		,margins: '5 5 5 0'
	});
	
	this.CategoryTree = new ImbaShop.items.CategoryTree({
		region: 'west'
		,width: 250
		,margins: '5 0 5 5'
	});
	
	ImbaShop.Products.superclass.constructor.call(this,
		Ext.applyIf(config,{
			layout: 'border'
			//,title: 'Produkty'
			,bodyStyle:'background-color:#fff;'
			,border: false
			,items: [
				this.CategoryTree
				,
				this.Grid
			]
		})		
	);
}

Ext.extend(ImbaShop.Products, Ext.Panel,{


	showConfigDialog: function(){
		console.log('config');
	}
	
	,showHelpDialog: function(){
		
		
		console.log(this.helpDialog);
		if (typeof(this.helpDialog) == 'object') {
			if (this.helpDialog.hidden == false) 
				return;
		}
		
		this.helpDialog = new ImbaShop.utils.Window({
			title: 'Pomoc'
			,bodyStyle: 'padding: 5px; background-color:#fff;'
			,html: 'Tresc pomocy'
			,hideParent: false
			,modal: false
			,buttons: [{
				text: 'Zamknij'
				,scope: this
				,handler: function(){
					this.helpDialog.destroy();
					delete this.helpDialog;
				}
			}]
		});
	}
});