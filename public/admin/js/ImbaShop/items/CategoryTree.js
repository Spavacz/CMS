Ext.namespace('ImbaShop.items.CategoryTree');

ImbaShop.items.CategoryTree = function(config){
	
	config = config || {};
	            
	ImbaShop.items.CategoryTree.superclass.constructor.call(this,
		Ext.applyIf(config,{
			width: 200
	        ,autoScroll: true
			,useArrows: true
			,enableDD: true
			,ddGroup:'tree-grid'
			,appendOnly:false
			,containerScroll: true
	        ,split: true
			,title: i18n.CATEGORY_TITLE
	        ,loader: new Ext.tree.TreeLoader({
				clearOnLoad: false
				,dataUrl: '../rest/categories/'
				,requestMethod:'GET'
				,nodeParameter: 'idParent'		
			})
			,root: {
				nodeType: 'async',
				draggable: false,
				id: '0', // tak jest akurat u mnie w bazie, LK - powinno dzialac w wiekszosci przypadkow
				//category_id: 1,
				expanded: true
			}
	        ,rootVisible: false
	        ,listeners: {
				scope: this
	            ,click: function(n) {
	            	
	        		Grid = this.ownerCt.Grid;
	        		Grid.store.baseParams.id = n.attributes.category_id;
					Grid.store.load();
					Grid.enable();
					Grid.addBtn.enable();
					this.editBtn.enable();
					this.deleteBtn.enable();
					this.disableBtn.enable();
	            },
				containerclick: function(tree, event){
					this.selModel.clearSelections();
					this.disableItems();
				},
				load: function(n){
					if (!Ext.isEmpty(this.pathToExpand)){
						this.expandPath(this.pathToExpand);
						this.pathToExpand = '';
					}			
					this.hideMask();
				},
				nodedragover: function(obj){
					if(typeof(obj.source.grid)=="object" && obj.point!="append"){
						return false;
					}
				},
				movenode: function(tree, node, oldParent, newParent, index){
					var params = {
							category_id: node.attributes.category_id,
							idParent: newParent.attributes.category_id,
							sort: index 
					}
					
					ImbaShop.utils.Ajax({
						url: '/api/editCategory'
						,success: function(resp,scope){
							this.pathToExpand = newParent.getPath();
							this.getRootNode().reload(function(){
								this.disableItems();
							},this);
						}
						,params: params
						,displayResult: true
						,scope: this
					});
					
					/*Ext.Ajax.request({
						url: '/api/editCategory',
						scope: this,
						success: function(response){
							this.pathToExpand = newParent.getPath();
							this.getRootNode().reload(function(){
								this.disableItems();
							},this);
						},
						failure: function(){
							Ext.Msg.alert(i18n.ERROR, i18n.CATEGORY_MOVING_FAILED);
						},
						params: params
					});	*/									
				},
				enddrag: function(panel, node, event){},
				dragdrop: function(panel, node, dd, event){},
				beforeload: this.showMask
	        }
		   	,tbar: [
				new ImbaShop.items.buttons.AddButton({
					scope: this
				})
				,new ImbaShop.items.buttons.EditButton({
					scope: this
				})
				,new ImbaShop.items.buttons.DisableButton({
					scope: this
				})
				,new ImbaShop.items.buttons.DeleteButton({
					scope: this
				})
			]
			,tools: [{ 
				id : 'refresh'
				,text: i18n.REFRESH
				,scope:this
				,handler:function(elem){
					this.getRootNode().reload(function(){
						this.disableItems();
					},this);		
				}
			}]
			
		})
	);
}

Ext.extend(ImbaShop.items.CategoryTree, Ext.tree.TreePanel,{

	/**
	 * Wylacza standardowe przyciski ktore na starcie sa wylaczone i grida
	 */
	disableItems: function(){
		this.deleteBtn.disable();
		this.editBtn.disable();
		this.ownerCt.Grid.disable();
	}

	/**
	 * Wyswietla okno z mozliwoscia dodania/edycji kategorii
	 * @param {object} record - dane zaznaczonego noda w drzewie kategorii - w wypadku edycji
	 */
	,addDialog: function(record){

		this.formAddDialog = new ImbaShop.utils.LanguageTabs({
			border: false
			,inactive: true
			,form: [{
					name: 'name'
					,fieldLabel: i18n.CATEGORY_NAME
					,xtype: 'textfield'
					,anchor: '-20px'							
				},{
					name: 'description'
					,fieldLabel: i18n.CATEGORY_DESCRIPTION
					,xtype: 'htmleditor'
					,height: 200
					,anchor: '-20px'							
				},{
					name: 'idParent'
					,xtype: 'hidden'
					,value: record ? record.idParent : (!Ext.isEmpty(this.selModel.getSelectedNode()) ? this.selModel.getSelectedNode().id : this.getRootNode().id)
			}]
		});

		this.win = new ImbaShop.utils.Window({
			title: Ext.isDefined(record) ? i18n.CATEGORY_EDIT : i18n.CATEGORY_ADD
			,items: this.formAddDialog
			,resizable:true
			,width: 650
			,buttons: [{
				text: i18n.SAVE
				,scope: this
				,handler: function(){
					this.saveCategory(record);
				}
			},{
				text: i18n.CANCEL
				,handler: function(){
					this.win.destroy();
				}
				,scope:this
			}]
		});		
		
		//ustalenie wartosci pol w przypadku edycji rekordu		
		if (record){		
			Ext.each(record, function(lang){				
				if (Ext.isDefined(this.win['lang_' + lang.lang_id])){					
					this.win['lang_' + lang.lang_id].form.setValues(lang);
				}
			},this);
		}		
		
		this.formAddDialog.activate(0);
	}
	

	/**
	 * Zapisuje dane o kategorii
	 * 
	 * @param {Object} record
	 */
	,saveCategory: function(record){	
		
		//wyslanie zadania
		
		ImbaShop.utils.Ajax({
			url: '../rest/categories/'
			,jsonData: this.formAddDialog.getFormObject()
			,success: function(resp,scope){
				
				this.win.destroy();
					
				var selected = this.selModel.getSelectedNode();
				if (!Ext.isEmpty(selected))
					var selectedId = selected.id;

				if (selected){
					if (record){ //jesli edytujemy
						if (selected.isLeaf()){
							selected.parentNode.reload(function(root){
								this.root.findChild('id', selectedId, true).select();
							}, this);
						}
						else {
							selected.parentNode.reload(function(root){
								this.root.findChild('id', selectedId, true).select();
							}, this);
						}
					}
					else { //jesli dodajemy
						if (selected.isLeaf()){
							selected.parentNode.reload(function(root){
								this.root.findChild('id', selectedId, true).reload();
							}, this);
						}
						else {
							selected.reload(function(root){
								this.root.findChild('id', selectedId, true).reload();
							}, this);
						}
					}
					
						
				}
				else {
					this.getRootNode().reload();
				}
				this.deleteBtn.disable();
				this.editBtn.disable();
				this.ownerCt.Grid.disable();
				
			}
			,params: {
				id: !Ext.isEmpty(this.selModel.getSelectedNode()) ? this.selModel.getSelectedNode().attributes.category_id : null
			}
			,displayResult: true
			,scope: this
		});
		
		/*Ext.Ajax.request({
			url: record ? '/api/editCategory' : '/api/insertCategory'
			,jsonData: this.formAddDialog.getFormObject()
			,success: function(response){
				var resp = Ext.util.JSON.decode(response.responseText);
				if (resp.success){
					this.win.destroy();
					
					ImbaShop.utils.Exceptions.success(resp, true);
					
					var selected = this.selModel.getSelectedNode();
					if (!Ext.isEmpty(selected))
						var selectedId = selected.id;

					if (selected){
						if (record){ //jesli edytujemy
							if (selected.isLeaf()){
								selected.parentNode.reload(function(root){
									this.root.findChild('id', selectedId, true).select();
								}, this);
							}
							else {
								selected.parentNode.reload(function(root){
									this.root.findChild('id', selectedId, true).select();
								}, this);
							}
						}
						else { //jesli dodajemy
							if (selected.isLeaf()){
								selected.parentNode.reload(function(root){
									this.root.findChild('id', selectedId, true).reload();
								}, this);
							}
							else {
								selected.reload(function(root){
									this.root.findChild('id', selectedId, true).reload();
								}, this);
							}
						}
						
							
					}
					else {
						this.getRootNode().reload();
					}
					this.deleteBtn.disable();
					this.editBtn.disable();
					this.ownerCt.Grid.disable();
					
				}
				else {
					Ext.Msg.alert(i18n.ERROR, "Nie zapisano zmian");
				}
				
			}
			,failure: function(response){
				Ext.Msg.alert(i18n.ERROR, "Nie zapisano zmian");
			}
			,params: {category_id: !Ext.isEmpty(this.selModel.getSelectedNode()) ? this.selModel.getSelectedNode().id : null}
			,scope: this
		});*/
		
	}


	/**
	 * Edycja Elementu drzewa - kategorii
	 * @param {Object} - Dane elementu do edycji 
	 */
	,editDialog: function(record){		
		if (!record){
			record = this.selModel.getSelectedNode();
		}			
		if (!record){
			console.log('nie wybrales rekordu');
			return;
		}				
			
		//pobieramy dane we wszystkich dostepnych jezykach danego rekordu
		ImbaShop.utils.Ajax({
			url: '/api/getCategory'
			,success: function(resp,scope){
				this.addDialog(resp.data);
			}
			,params: {
		       category_id: record.attributes.category_id
		    }
			,scope: this
		});
		
		
		/*Ext.Ajax.request({
			url: '/api/getCategory',
		    params: {
		       category_id: record.id
		    },
		    scope:this,
		    success: function(response) {
		    	var resp = Ext.util.JSON.decode(response.responseText);
		    	if (resp.success){
		    		this.addDialog(resp.data);
		    	}
		    	else {
		    		Ext.Msg.alert(i18n.ERROR, "Nie pobrano danych kategorii");
		    	}
		    	
		    },
		    failure: function(form, action) {
				Ext.Msg.alert(i18n.ERROR, "Nie pobrano danych kategorii");
		    }
		});*/
		
	}
	
	
	/**
	 * Wywietla pytanie o potwierdzenie skasowania kategorii, i wysyla zadanie o usuniecie
	 * @param {Object} record
	 */
	,deleteConfirm: function(record){
		
		new ImbaShop.utils.ConfirmDelete({
			scope: this,
			fn: function(answer, obj){
				if(answer=="yes"){
					
					ImbaShop.utils.Ajax({
						url: '../rest/categories'
						,success: function(resp,scope){
							this.pathToExpand = this.selModel.getSelectedNode().getPath();
							this.getRootNode().reload();
						}
						,params: {
							id:this.selModel.getSelectedNode().id
							,_method: 'DELETE'
						}
						,displayResult: true
						,scope: this
					});
					
				}
			}
		});
	}
	
	
	/**
	 * wylacza noda
	 * @param {Object} record
	 */
	,disableItem: function(record){
		
		
		ImbaShop.utils.Ajax({
			url: '/api/delCategory'
			,success: function(resp,scope){
				this.pathToExpand = this.selModel.getSelectedNode().getPath();
				this.getRootNode().reload();
			}
			,params: {id:this.selModel.getSelectedNode().attributes.category_id}
			,displayResult: true
			,scope: this
		});
					
	}
	
	
	/**
	 * Maskuje drzewo
	 */
	,showMask : function(){		
		this.mask = new Ext.LoadMask(this.getEl(), { msg: i18n.LOADING_ELEMENTS });
		this.mask.show();
	}

	
	/**
	 * Zdejmuje maske drzewa
	 */	
	,hideMask : function(){
		this.mask.hide();
	}
	
});