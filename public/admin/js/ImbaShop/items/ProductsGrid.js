Ext.namespace('ImbaShop.items.ProductsGrid');

ImbaShop.items.ProductsGrid = function(config){
	this.store = new Ext.data.JsonStore({
		url: '/api/getProductsInCategory'
			,baseParams: {
				//id: this.ownerCt.ProductsCategoryTree.root.attributes.id//this.parentObject.ProductsCategoryTree.selModel.getSelectedNode() ? this.parentObject.ProductsCategoryTree.selModel.getSelectedNode().attributes.id : this.parentObject.ProductsCategoryTree.root.attributes.id
				state:'A'
				,start:0
				,limit:5
			}
            ,root: 'data'
            ,totalProperty: 'count'
			,autoLoad: false
			,fields: [
               {name: 'product_name'},
               {name: 'product_description'},
               {name: 'product_model'},
               {name: 'price'},
               {name: 'tax'},
               {name: 'state'}
            ]
    });
	
	config = config || {};
	            
	ImbaShop.items.ProductsGrid.superclass.constructor.call(this,
		Ext.applyIf(config,{
			layout:'fit'
			,disabled:true
			,region:'center'
			//,border:false
			,title: 'Produkty'
			,loadMask:true
			,enableDragDrop   : true
			,ddGroup:'tree-grid'
			,store: this.store
			//,autoExpandColumn: 'product_description'
			,sm: new Ext.grid.RowSelectionModel({
				singleSelect:true
				,listeners: {
					scope: this
					,selectionchange: function(selModel){
						if (selModel.selections.items.length > 0){
							this.editBtn.enable();
							this.deleteBtn.enable();
							this.imageBtn.enable();
						} 
						else {
							this.editBtn.disable();
							this.deleteBtn.disable();
							this.imageBtn.disable();
						}
					}
				}	
			})
			,colModel: new Ext.grid.ColumnModel({
		        defaults: {
		            sortable: true
		        },
		        columns: [
		            {header: 'Nazwa', width: 200, sortable: true, dataIndex: 'product_name'},
	         	 	{header: 'Model', sortable: true, dataIndex: 'product_model'},
					{header: 'Cena netto', width: 200, align: 'right', sortable: true, dataIndex: 'price', renderer: ImbaShop.utils.Format.plMoney },
					{header: 'Podatek', width: 100, sortable: true, dataIndex: 'tax', renderer: ImbaShop.utils.Format.percent }
		        ]
		    })
	      
		   	,tbar: [
				new ImbaShop.items.buttons.AddButton({
					scope: this
					,disabled:true
				})
				,new ImbaShop.items.buttons.EditButton({
					scope: this
				})
				,new ImbaShop.items.buttons.DeleteButton({
					scope: this
				})
				,new ImbaShop.items.buttons.ImageButton({
					grid:this
					,disabled:true
					,listMethod:'/api/getProductImages'
					,uploadMethod:'/api/putProductImage'
				})
				,'->'
				,new ImbaShop.items.buttons.ShowPreviewButton({
					scope: this
				})
			]
			,viewConfig: {
	            forceFit:true,
	            enableRowBody:true,
	            showPreview:false,
				emptyText: i18n.PRODUCTS_GRID_EMPTY,
	            getRowClass : function(record, rowIndex, p, store){
	                if(this.showPreview){
	                    p.body = '<p style="padding: 10px;"> <b>Opis:</b> ' + record.data.product_description + '</p>';
	                    return 'x-grid3-row-expanded';
	                }
	                return 'x-grid3-row-collapsed';
	            }
	        }
			,bbar:new Ext.PagingToolbar({
	            store: this.store,
	            pageSize: 5,
	            displayInfo: true,
	            displayMsg: 'Produkty wyświetlane - od: {0}  do: {1} Łączna liczba produktów: {2}',
	            emptyMsg: "Brak produktów do wyświetlenia"
	        })
			,listeners:{
				scope:this
				,celldblclick: function(grid,rowIndex,columnIndex,e){
					this.editDialog();
				}
			}
			,plugins: [ 
				/*new Ext.ux.grid.Search({
					iconCls:'is-search'
					,position:'top'
					,readonlyIndexes:['note']
					,disableIndexes:['pctChange']
					,minChars:2
					,autoFocus:true
					,menuStyle:'checkbox'
					,searchText: 'Szukaj'
					,minCharsTipText: 'Minimalna ilość znaków to: {0}.'
					,selectAllText:'Zaznacz wszystkie'
					,searchTipText: 'test'
					,selectAllText: 'Zaznacz wszystkie'
				})*/
			]		
		})
				
	);
}


Ext.extend(ImbaShop.items.ProductsGrid, Ext.grid.GridPanel,{
	
	/**
	 * Dodaje/Edytuje produkt do kategorii - wyswietla okno z formularzem
	 * 
	 * @param {Object} record - dane produktu - w przypadku edycji 
	 */
	addProduct: function(product_id, data){
		this.generateDialog(product_id, data);	
	}


	,generateDialog: function(product_id, productData){
		
		this.formAddDialog = new ImbaShop.utils.MultilanguageTabPanel({
			border: false
			,activeTab: 0
			,items: [{
				title: i18n.PRODUCT_INFORMATIONS
				,iconCls:'is-info'
				,layout: 'fit'
				,multilanguage: true
				,items: new ImbaShop.utils.LanguageTabs({
					border: false
					,form: [{
						name: 'product_name'
						,fieldLabel: i18n.PRODUCT_NAME
						,anchor: '-20px'
						,xtype: 'textfield'
					},{
						name: 'product_model'
						,fieldLabel: i18n.PRODUCT_MODEL
						,anchor: '-20px'
						,xtype: 'textfield'
					},{
						name:'state'
						,xtype:'hidden'
						,value:"A" // narazie na sztywno bo tylko takie pokazujemy w gridzie
					}]
				})
			}, {
				title: i18n.PRODUCT_DESCRIPTION
				,iconCls:'is-description'
				,layout: 'fit'
				,multilanguage: true
				,items: new ImbaShop.utils.LanguageTabs({
					border: false
					,itemsLayout:'fit'
					,form: {
						name: 'product_description'
						,hideLabel: true
						,anchor: '-20px'
						,xtype: 'htmleditor'
						,enableColors: false
						,enableFont:false
						,height:100
					}
				})
			}, {
				title: i18n.PRODUCT_PRICES
				,iconCls:'is-price'
				,multilanguage: false
				,xtype: 'form'
				,bodyStyle: 'padding: 5px;'
				,defaults: {
					anchor: '-20px'
				}
				,items: [{
						name: 'price'
						,fieldLabel: 'Cena netto'
						,xtype: 'numberfield'
					},{
						name: 'tax'
						,fieldLabel: 'Podatek'
						,xtype: 'numberfield'
					},{
						name: 'main_page'
						,fieldLabel: 'Wyswietlac na stronie glownej'
						,xtype: 'checkbox'
				}]
			}
			,new ImbaShop.items.tabs.ImageTab({
				fileDir: product_id
				,listMethod:'/api/getProductImages'
				,uploadMethod:'/api/putProductImage'
			})]			
		});
		
		var extraFields = this.getExtraFields(productData);
		
		//jesli sa pola dodatkowe to dolaczamy zakladke
		if (!Ext.isEmpty(extraFields)){ 
			this.formAddDialog.add({
				title: i18n.PRODUCT_EXTRA_FIELDS
				,iconCls:'is-extra-fields'
				,layout: 'fit'
				,multilanguage: true
				,items: new ImbaShop.utils.LanguageTabs({
					border: false
					,form: extraFields
				})
			});
		}
		
		
		//ustalenie wartosci pol w przypadku edycji rekordu
		if (this.edit){
			Ext.each(this.formAddDialog.items.items, function(tab){
			
				if (tab.multilanguage == true){
					Ext.each(productData, function(lang){
						
						if (typeof(tab['lang_' + lang.lang_id]) != 'undefined'){
							if (!Ext.isEmpty(lang.product)){
								tab['lang_' + lang.lang_id].form.setValues(lang.product);
							}
							if (!Ext.isEmpty(lang.fields)){
								tab['lang_' + lang.lang_id].form.setValues(this.getPropertiesFromArrayOfObjects(lang.fields, 'value'));
							}
							
						}
					},this);
				}
				else {
					if (Ext.isDefined(tab.form) && !Ext.isEmpty(productData[0].product)){
						tab.form.setValues(productData[0].product);
					}
					// to mozna zakomentowac bo dotyczy pol ekstra a one zawsze beda wielojezyczne
					/*if (!Ext.isEmpty(productData[0].fields)){
						tab.form.setValues(productData[0].fields);
					}*/
				}
			},this);
		}
		
		
		
		
		this.win = new ImbaShop.utils.Window({
					title: this.edit ? i18n.PRODUCT_EDIT : i18n.PRODUCT_ADD
					,items: this.formAddDialog
					,scope:this
					,width: 600
					,layout: 'fit'
					,height: 300			
					,scope:this	
					,buttons: [{
						text: i18n.SAVE
						,scope: this
						,handler: function(){
							this.save(product_id);
						}
					},{
						text: i18n.CLOSE
						,scope:this
						,handler: function(){
							this.win.destroy();
						}
					}]		
				});
		
	}
	
	
	,getPropertiesFromArrayOfObjects: function(arr, propertyName){
		
		var newObj = {};
		
		Ext.each(arr, function(item){
			
			if (!Ext.isEmpty(item[propertyName]) && !Ext.isEmpty(item.pfield_id)){
				newObj[item.pfield_id] = item[propertyName];
			}
		});
		
		return newObj;
		
	}
	
	,getExtraFields: function(productData){
		
		var extraFieldsForm = new Array();
		
		if (Ext.isEmpty(productData[0].fields))
			return extraFieldsForm;
			
		var extraFields = productData[0].fields;
		
		Ext.each(extraFields, function(field){
			extraFieldsForm.push({ 
				name: field.pfield_id, //id
				fieldLabel: Ext.isEmpty(field.field_label) ? '<span style="color: red;">**' + field.id + '**</span>' : field.field_label,
				xtype: Ext.isEmpty(field.field_type) ? null : field.field_type,
				vtype: Ext.isEmpty(field.vtype) ? null : field.vtype,
				anchor: '-20'
				
			});
		}, this);
		
		return extraFieldsForm;
		
	}
	
	
	
	
	
	/**
	 * Zapisuje dane produktu
	 */
	
	,save: function(product_id){
		
		var params = this.formAddDialog.getMultilanguageValues();
		//console.log(product_id, params);
		
		Ext.iterate(params, function(key, val, obj){
			
			var txtKeys = new Array();
			var txtVals = new Array();
			
			Ext.iterate(val, function(_key, _val, _obj){
				if (parseInt(_key) == _key && _val != ''){
					txtKeys.push(_key);
					txtVals.push(_val);
				}
			});
			
			val.txtKeys = txtKeys.join("::");
			val.txtVals = txtVals.join("::");
		});
		
		ImbaShop.utils.Ajax({
			url: '/api/editProduct'
			,jsonData: params
			,success: function(resp,scope){
				this.store.reload();
				this.win.destroy();
			}
			,params: {
				product_id: product_id
			}
			,displayResult: true
			,scope: this
		});
		
		/*Ext.Ajax.request({
			url: '/api/editProduct'
		    ,jsonData: params
			,success: function(response){
				var resp = Ext.util.JSON.decode(response.responseText);
				this.store.reload();
				this.win.destroy();
				ImbaShop.utils.Exceptions.success(resp, true);
			}
			,failure: function(response){
				var resp = Ext.util.JSON.decode(response.responseText);
				Ext.Msg.alert('Błąd', 'Nie udało się zapisac produktu');
			}
			,params: {
				product_id: product_id
				
			}
			,scope: this
		});*/
	}
	
	
	
	/**
	 * Tworzy tempowy produkt zeby zwrocic ID 
	 */
	,addDialog: function(){
		var selNode = this.ownerCt.CategoryTree.selModel.getSelectedNode(); //id z tree
		
		if (selNode) 
			var cid = selNode.attributes.category_id;
		else if (Ext.isDefined(this.store.baseParams.id) && this.store.baseParams.id != '')
			var cid = this.store.baseParams.id;
		else {
			alert('zaznacz kategorię');
			return;
		}
			
		
		ImbaShop.utils.Ajax({
			url: '/api/insertProduct'
			,success: function(resp,scope){
				this.getAllExtraFields(resp.data.product_id);	
			}
			, params: {
		        id: null
		        ,state:'T'
				,cid: cid
		    }
			,scope: this
		});
		
		/*Ext.Ajax.request({
			url: '/api/insertProduct',
		    params: {
		        id: null,
		        state:'T'
				,cid: cid
		    },
		    scope:this,
		    success: function(response) {
		    	var resp = Ext.util.JSON.decode(response.responseText);
		    	if (resp.success){
					this.getAllExtraFields(resp.data.product_id);	
		    	}
		    	else {
		    		Ext.Msg.alert('Błąd', 'Nie mozna stworzyc produktu');
		    	}		    	
		    },
		    failure: function(form, action) {
				Ext.Msg.alert('Błąd', 'Nie mozna stworzyc produktu');
		    }
		});		*/
	}

	,editDialog: function(){
		
		var record = this.selModel.getSelected();
		
		if (!record){
			Ext.Msg.alert('Błąd', 'Nie wybrales produktu');
			return;
		}			
		
		this.getProductDetails(record.json.product_id);
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
						url: '/api/delProduct'
						,success: function(resp,scope){
							this.store.reload();
						}
						,params: { product_id: record.json.product_id }
						,displayResult: true
						,scope: this
					});
					
					/*Ext.Ajax.request({
						url: '/api/delProduct',
						scope: this,
						success: function(response){	
							var resp = Ext.util.JSON.decode(response.responseText);
							this.store.reload();
							ImbaShop.utils.Exceptions.success(resp, true);
						},
						failure: function(){
							Ext.Msg.alert('Błąd', 'Nie udało się usunąć produktu');
						},
						params: { product_id: record.json.product_id }
					});*/
				}
				else {
										
				}
				
				
				
			}
		});
	}
	
	,getProductDetails: function(product_id){
		//console.log('product_id',product_id);
		this.edit = true;
		
		ImbaShop.utils.Ajax({
			url: '/api/getProduct'
			,success: function(resp,scope){
				this.addProduct(product_id, resp.data);
			}
			,params: { 
				product_id: product_id
			}
			,scope: this
		});
		
		/*Ext.Ajax.request({
			url: '/api/getProduct',
			scope: this,
		   	success: function(response){
				
				var resp = Ext.util.JSON.decode(response.responseText);
				if (resp.success && resp.data.length > 0) {
					this.addProduct(product_id, resp.data);
				}
				else {
					Ext.Msg.alert('Błąd', 'Nie udalo sie pobrac danych produktu');
				}
			}
			,failure: function(){
				Ext.Msg.alert('Błąd', 'Nie udalo sie pobrac danych produktu');
			}
		   	,params: { 
				product_id: product_id
			}
		});*/
		
	}
	
	,getAllExtraFields: function(product_id){
		
		this.edit = false;
		
		ImbaShop.utils.Ajax({
			url: '/api/getAllExtraFields'
			,success: function(resp,scope){
				this.addProduct(product_id, resp.data);	
			}
			,scope: this
		});
		
		/*Ext.Ajax.request({
			url: '/api/getAllExtraFields',
			scope: this,
		   	success: function(response){
				
				var resp = Ext.util.JSON.decode(response.responseText);
				
				if (resp.success && resp.data.length > 0) {			
					this.addProduct(product_id, resp.data);						
				}
				else {
					Ext.Msg.alert('Błąd', 'Nie udalo sie pobrac danych produktu');
				}
			}
			,failure: function(){
				Ext.Msg.alert('Błąd', 'Nie udalo sie pobrac danych produktu');
			}
		   
		});*/
		
	}
	
});