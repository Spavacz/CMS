Ext.namespace('ImbaShop.items.CmsGrid');

ImbaShop.items.CmsGrid = function(config){
	this.store = new Ext.data.JsonStore({
		url: '/api/getArticlesInCategory'
			,baseParams: {
				//id: this.ownerCt.ProductsCategoryTree.root.attributes.id//this.parentObject.ProductsCategoryTree.selModel.getSelectedNode() ? this.parentObject.ProductsCategoryTree.selModel.getSelectedNode().attributes.id : this.parentObject.ProductsCategoryTree.root.attributes.id
				state:'A'
				,start:0
				,limit:20
			}
            ,root: 'data'
            ,totalProperty: 'count'
			,autoLoad: false
			,fields: [
               {name: 'article_title'},
               {name: 'article_createdate'},
               {name: 'author'},
               {name: 'published'}
            ]
    });
	
	if (typeof(config) == 'undefined') config = {};
	            
	ImbaShop.items.CmsGrid.superclass.constructor.call(this,
		Ext.applyIf(config,{
			layout:'fit'
			,disabled:true
			,region:'center'
			//,border:false
			,title: i18n.ARTICLES
			,loadMask:true
			,enableDragDrop: true
			,ddGroup:'tree-grid'
			,store: this.store
			//,autoExpandColumn: 'product_description'
			,sm: new Ext.grid.RowSelectionModel({
				singleSelect:false
				,listeners: {
					scope: this
					,selectionchange: function(selModel){
						if (selModel.selections.items.length == 1){
							this.editBtn.enable();
							this.deleteBtn.enable();
							if (selModel.getSelected().json.published == true){
								this.unpublishBtn.enable();
								this.publishBtn.disable();
							}
							else {
								this.unpublishBtn.disable();
								this.publishBtn.enable();
							}
						} 
						else {
							this.editBtn.disable();
							this.deleteBtn.disable();
							this.unpublishBtn.disable();
							this.publishBtn.disable();
						}
					}
				}	
			})
			,colModel: new Ext.grid.ColumnModel({
		        defaults: {
		            sortable: true
		        },
		        columns: [
		            {header: i18n.TITLE, sortable: true, dataIndex: 'article_title'},
	         	 	{header: i18n.CREATEDATE, width: 80, sortable: true, dataIndex: 'article_createdate', renderer: function(val){return val ? new Date(val).format('Y-m-d') : '';}},
					{header: i18n.AUTHOR, width: 100, sortable: true, dataIndex: 'author'},
					{header: i18n.PUBLISHED, width: 50, sortable: true, dataIndex: 'published', renderer: function(val){if (val == true) return i18n.PUBLISHED; else return i18n.UNPUBLISHED;}}
		        ]
		    })
	      
		   	,tbar: [
				new ImbaShop.items.buttons.AddButton({
					scope: this
					,disabled:true
				})
				,new ImbaShop.items.buttons.EditButton({
					scope: this
					,disabled:true
				})
				,new ImbaShop.items.buttons.DeleteButton({
					scope: this
					,disabled:true
				})
				,new ImbaShop.items.buttons.PublishButton({
					scope: this
					,disabled:true
				})
				,new ImbaShop.items.buttons.UnpublishButton({
					scope: this
					,disabled:true
				})
				
			]
			,viewConfig: {
	            forceFit:true
				,emptyText: i18n.CMS_GRID_EMPTY
	        }
			,bbar:new Ext.PagingToolbar({
	            store: this.store,
	            displayInfo: true,
	            pageSize: 20,
	            displayMsg: i18n.PAGINATED_RECORDS_INFO,
	            emptyMsg: i18n.NO_ARTICLES
	        })
			,listeners:{
				scope:this
				,celldblclick: function(grid,rowIndex,columnIndex,e){
					this.editDialog();
				}
			}
		})
				
	);
}

Ext.extend(ImbaShop.items.CmsGrid, Ext.grid.GridPanel,{

	addArticle: function(record){
		
		var params = {};
		
		if (Ext.isEmpty(record.article_id)){
			this.edit = true;
			params.article_id = this.selModel.getSelected().json.article_id;
		}
		else {
			this.edit = false;
			params.article_id = record.article_id;
		}
		
		this.formAddDialog = new ImbaShop.utils.MultilanguageTabPanel({
			border: false
			,activeTab: 0
			,items: [{
				title: i18n.CONTENTS
				,layout: 'fit'
				,multilanguage: true
				,items: new ImbaShop.utils.LanguageTabs({
					border: false
					,form: [{
						name: 'article_title',
						fieldLabel: i18n.TITLE,
						anchor: '-20px',
						xtype: 'textfield'
					},{
						name: 'article_subtitle',
						fieldLabel: i18n.SUBTITLE,
						anchor: '-20px',
						xtype: 'textfield'
					},{
						name: 'intro',
						fieldLabel: i18n.INTRO,
						anchor: '-20px',
						xtype: 'textarea'
					}]
				})
			}, {
				title: i18n.ARTICLE_CONTENT
				,layout: 'fit'
				,multilanguage: true
				,items: new ImbaShop.utils.LanguageTabs({
					border: false
					,itemsLayout:'fit'
					,form: {
						name: 'content',						
						hideLabel: true,
						anchor: '-20px',						
						xtype: 'htmleditor'
					}
				})
			}, {
				title: i18n.CONFIGURATION
				,multilanguage: false
				,xtype: 'form'
				,bodyStyle: 'padding: 5px;'
				,defaults: {
					anchor: '-20px'
				}
				,items: [{
					name: 'published',
					fieldLabel: i18n.PUBLISHED,
					xtype: 'checkbox'
				}, {
					name: 'author',
					fieldLabel: i18n.AUTHOR,
					xtype: 'textfield'
				}, {
					name: 'article_id',
					xtype: 'hidden'
				}, {
					name: 'article_state',
					xtype: 'hidden',
					value: 'A'
				}]
			}]
		});
		
		//ustalenie wartosci pol w przypadku edycji rekordu
		if (this.edit){
			Ext.each(this.formAddDialog.items.items, function(tab){
				if (tab.multilanguage == true){
					Ext.each(record, function(lang){
						
						if (typeof(tab['lang_' + lang.lang_id]) != 'undefined'){
							tab['lang_' + lang.lang_id].form.setValues(lang.article);
						}
					});
				}
				else {
					tab.form.setValues(record[0].article);
				}
			});
		}
		
		
		
				this.win = new ImbaShop.utils.Window({
					title: this.edit ? i18n.ARTICLE_EDIT : i18n.ARTICLE_ADD
					,items: this.formAddDialog
					,scope:this
					,width: 600
					,layout: 'fit'
					,height: 300
					,buttons: [{
						text: i18n.SAVE
						,scope: this
						,handler: function(){
							
							/*if (this.formAddDialog.form.isValid()){
								
								
								var params = {
									id: record ? record.id : null
									,state: record.json ? record.json.state : 'A'
								}
								
								
								this.formAddDialog.form.submit({
									url: '/api/editProduct',//record.json ? '/api/editProduct' : '/api/insertProduct',
								    params: params,
								    scope:this,
								    success: function(form, action) {
									   this.store.reload();
									   this.win.destroy();
								    },
								    failure: function(form, action) {
								        switch (action.failureType) {
								            case Ext.form.Action.CLIENT_INVALID:
								                Ext.Msg.alert('Failure', 'Form fields may not be submitted with invalid values');
								                break;
								            case Ext.form.Action.CONNECT_FAILURE:
								                Ext.Msg.alert('Failure', 'Ajax communication failed');
								                break;
								            case Ext.form.Action.SERVER_INVALID:
								               Ext.Msg.alert('Failure', action.result.msg);
								       }
								    }
								});
							}*/
							
							/*var formValues = ImbaShop.utils.Language.getAsKeys();
					
							Ext.each(this.formAddDialog.items.items, function(tab){
								
								if (tab.multilanguage){
									var tabValues = tab.items.items[0].getFormObject();
									for (var i in formValues){
										formValues[i] = Ext.apply(formValues[i], tabValues[i]);
									}
								}
								else {
									for (var i in formValues){
										formValues[i] = Ext.apply(formValues[i], tab.form.getValues());
									}
								}
							})
							
							if (typeof(param) != 'undefined'){
								for (var i in formValues){
									formValues[i] = Ext.apply(formValues[i], param);
								}
							}*/
							
							
							
							ImbaShop.utils.Ajax({
								url: '/api/editArticleCms'
								,jsonData: this.formAddDialog.getMultilanguageValues(params)
								,success: function(resp,scope){
									this.store.reload();
									this.win.destroy();
								}
								,displayResult: true
								,params: params
								,scope: this
							});
							
							//wyslanie zadania
							/*Ext.Ajax.request({
								url: '/api/editArticleCms'
								,jsonData: this.formAddDialog.getMultilanguageValues(params)
								,success: function(response){
									var resp = Ext.util.JSON.decode(response.responseText);
									if (resp.success){
										ImbaShop.utils.Exceptions.success(resp, true);
										this.store.reload();
										this.win.destroy();
									}
									else
										Ext.Msg.alert('Błąd', 'Nie udało się zapisac artykulu');
								}
								,failure: function(response){
									Ext.Msg.alert('Błąd', 'Nie udało się zapisac artykulu');
								}
								,params: params
								,scope: this
							});*/
							
							
						}
					},{
						text: i18n.CANCEL
						,scope:this
						,handler: function(){
							this.win.destroy();
						}
					}]		
				});
		
	}


	/**
	 * Tworzy tempowy produkt zeby zwrocic ID 
	 */
	,addDialog: function(){
		
		if (this.ownerCt.CategoryTree.selModel.getSelectedNode()) //id z tree
			var cid = this.ownerCt.CategoryTree.selModel.getSelectedNode().attributes.category_id;
		else if (typeof(this.store.baseParams.id) != 'undefined' && this.store.baseParams.id != '')
			var cid = this.store.baseParams.id;
		else {
			Ext.Msg.alert('Błąd', 'Zaznacz kategorię');
			return;
		}
			
		
		ImbaShop.utils.Ajax({
			url: '/api/insertArticleCms'
			,success: function(resp,scope){
				this.addArticle({article_id: resp.data.article_id});	
			}
			,params: {
		        article_id: null,
		        state:'T'
				,cid: cid
		    }
			,scope: this
		});
		
		/*Ext.Ajax.request({
			url: '/api/insertArticleCms',
		    params: {
		        article_id: null,
		        state:'T'
				,cid: cid
		    },
		    scope:this,
		    success: function(response) {
		    	var resp = Ext.util.JSON.decode(response.responseText);
		    	if (resp.success){
		    		this.addArticle({article_id:resp.data.article_id});	
		    	}
		    	else {
					Ext.Msg.alert('Błąd', 'Nie udało się stworzyc artykulu');
		    	}
		    	
		    },
		    failure: function(form, action) {
				Ext.Msg.alert('Błąd', 'Nie udało się stworzyc artykulu');
		    }
		});	*/
	}

	,editDialog: function(){
		
		var record = this.selModel.getSelected();
		
		if (Ext.isEmpty(record)){
			Ext.Msg.alert('Błąd', 'Nie wybrales rekordu');
			return;
		}
		
		//pobieramy dane we wszystkich dostepnych jezykach danego rekordu
		ImbaShop.utils.Ajax({
			url: '/api/getArticleCms'
			,success: function(resp,scope){
				this.addArticle(resp.data);
			}
			,params: {
		        article_id: record.json.article_id		        
		    }
			,scope: this
		});
		
		/*Ext.Ajax.request({
			url: '/api/getArticleCms',
		    params: {
		        article_id: record.json.article_id		        
		    },
		    scope:this,
		    success: function(response) {
		    	var resp = Ext.util.JSON.decode(response.responseText);
		    	if (resp.success){
		    		this.addArticle(resp.data);
		    	}
		    	else {
					Ext.Msg.alert('Błąd', 'Nie mozna pobrac danych artykulu');
		    	}
		    	
		    },
		    failure: function(form, action) {
				Ext.Msg.alert('Błąd', 'Nie mozna pobrac danych artykulu');
				
		    }
		});*/
		
	}
	
	,deleteConfirm: function(){
		
		var record = this.selModel.getSelected();
		if (!record){
			Ext.Msg.alert('Błąd', 'Zaznacz produkt do usunięcia');
			return;
		}
			
		
		new ImbaShop.utils.ConfirmDelete({
			scope: this,
			fn: function(answer, obj){
				
				if (answer == 'yes'){
					ImbaShop.utils.Ajax({
						url: '/api/deleteArticle'
						,success: function(resp,scope){
							this.store.reload();
						}
						,params: { 
							article_id: record.json.article_id
						}
						,displayResult: true
						,scope: this
					});
					
					/*Ext.Ajax.request({
						url: '/api/deleteArticle',
						scope: this,
						success: function(response){
							var resp = Ext.util.JSON.decode(response.responseText);
							if (resp.success){
								this.store.reload();
								ImbaShop.utils.Exceptions.success(resp, true);
							} else
								Ext.Msg.alert('Błąd', 'Nie mozna usunac artykulu');
						},
						failure: function(){
							Ext.Msg.alert('Błąd', 'Nie mozna usunac artykulu');
						},
						params: { 
							article_id: record.json.article_id
						}
					});*/
				}
				else {
					
				}
				
				
				
			}
		});
	}
	
	,publish: function(publish){
		var records = this.getSelectedRows({getOnlyId: true});
		
		ImbaShop.utils.Ajax({
			url: '/api/publishArticle'
			,success: function(resp,scope){
				this.store.reload();
			}
			,params: { 
				article_ids: records,
				publish: publish
			}
			,displayResult: true
			,scope: this
		});
		
		/*Ext.Ajax.request({
			url: '/api/publishArticle',
			scope: this,
			success: function(response){
				var resp = Ext.util.JSON.decode(response.responseText);
				if (resp.success){
					this.store.reload();
					ImbaShop.utils.Exceptions.success(resp, true);
				} else
					Ext.Msg.alert('Błąd', 'Nie mozna zmienic publikacji artykulu');
			},
			failure: function(){
				Ext.Msg.alert('Błąd', 'Nie mozna zmienic publikacji artykulu');
			},
			params: { 
				article_ids: records,
				publish: publish
			}
		});*/
	}
	
	,unpublish: function(){
		this.publish(false);
	}
	
	,getSelectedRows: function(args){
		
		args = args || {};		
		var records = this.selModel.getSelections();
		
		if (args.getOnlyId){
			var ret = new Array();
			Ext.each(records, function(item){
				ret.push(item.json.article_id);
			})			
			return ret;
		}		
		return records;
	}
	
});