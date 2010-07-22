Ext.namespace('ImbaShop.items.ExtraFieldsGrid');

ImbaShop.items.ExtraFieldsGrid = function(config){
	this.store = new Ext.data.JsonStore({
		url: '/api/getExtraFields'
			,baseParams: {
				state:'A'
				,start:0
				,limit:20
			}
            ,root: 'data'
            ,totalProperty: 'count'
			,autoLoad: true
			,fields: [
               {name: 'field_label'},
               {name: 'field_type'},
               {name: 'vtype'}
            ]
    });
	
	if (typeof(config) == 'undefined') config = {};
	            
	ImbaShop.items.ExtraFieldsGrid.superclass.constructor.call(this,
		Ext.applyIf(config,{
			layout:'fit'			
			,loadMask:true
			,store: this.store
			,border: false
			,bbar:new Ext.PagingToolbar({
	            store: this.store,
	            pageSize: 20,
	            displayInfo: true,
	            displayMsg: 'Pola dodatkowe - od: {0}  do: {1} Łączna liczba pól: {2}',
	            emptyMsg: "Brak pól do wyświetlenia"
	        })
			,sm: new Ext.grid.RowSelectionModel({
				singleSelect:true
				,listeners: {
					scope: this
					,selectionchange: function(selModel){
						if (selModel.selections.items.length > 0){
							this.editBtn.enable();
							this.deleteBtn.enable();
						} 
						else {
							this.editBtn.disable();
							this.deleteBtn.disable();
						}
					}
				}	
			})
			,enableDragDrop: true
			,ddGroup: 'extraFieldsDD'
			,ddText: 'Przenies wiersz'
			,colModel: new Ext.grid.ColumnModel({
		        defaults: {
		            sortable: true
		        },
		        columns: [
		            {header: 'Nazwa', width: 200, sortable: false, dataIndex: 'field_label'},
	         	 	{header: 'Typ', sortable: false, dataIndex: 'field_type'},
					{header: 'Validacja', width: 100, sortable: false, dataIndex: 'vtype'}
		        ]
		    })
	      
		   	,tbar: [
				new ImbaShop.items.buttons.AddButton({
					scope: this
				})
				,new ImbaShop.items.buttons.EditButton({
					scope: this
				})
				,new ImbaShop.items.buttons.DeleteButton({
					scope: this
				})				
			]
			,viewConfig: {
	            forceFit:true	    
				,emptyText: i18n.EXTRA_FIELDS_GRID_EMPTY       
	        }
			,listeners:{
				scope:this
				,celldblclick: function(grid,rowIndex,columnIndex,e){
					this.editDialog();
				}
				,afterrender: function(){
					
					var ddrow = new Ext.dd.DropTarget(this.getView().mainBody, {  
					     ddGroup : 'extraFieldsDD',  
					     notifyDrop : function(dd, e, data){  
					     	
					         var sm = data.grid.getSelectionModel();  
					         var rows = sm.getSelections();  
					         var cindex = dd.getDragData(e).rowIndex;  
					         if (sm.hasSelection()) {  
					             for (i = 0; i < rows.length; i++) {  
					                 data.grid.store.remove(data.grid.store.getById(rows[i].id));  
					                 data.grid.store.insert(cindex,rows[i]);  
					                 
					                 ImbaShop.utils.Ajax({
					                 	url: '/api/moveExtraField'
										,displayResult: true
										,params: {
											pfield_id: rows[i].json.pfield_id
											,sort: cindex
										}
										,scope: this
					                 });
					                 
					             }  
					             sm.selectRecords(rows);  
					         }    
					     }  
					});  
				}
			}
		})
				
	);
}

Ext.extend(ImbaShop.items.ExtraFieldsGrid, Ext.grid.GridPanel,{

	
	/**
	 * 
	 */
	addDialog: function(record){
		
		var params = {};
		
		//jesli jest record to znaczy ze jest to edycja
		if (!Ext.isEmpty(record)){
			this.edit = true;
			params.pfield_id = record[0].pfield_id
		}
		else {
			this.edit = false;
		}
			
		
		this.formAddDialog = new ImbaShop.utils.MultilanguageTabPanel({
			border: false
			,activeTab: 0
			,items: [{
				title: 'Tresci'
				,layout: 'fit'
				,multilanguage: true
				,items: new ImbaShop.utils.LanguageTabs({
					border: false
					,form: {
						name: 'field_label',
						fieldLabel: 'Opis pola',
						allowBlank: false,
						anchor: '-20px',
						xtype: 'textfield'
					}
				})
			}, {
				title: 'Konfiguracja'
				,multilanguage: false
				,xtype: 'form'
				,bodyStyle: 'padding: 5px;'
				,defaults: {
					anchor: '-20px'
				}
				,items: [{
					name: 'field_type',
					fieldLabel: 'Typ pola',
					xtype: 'combo',
					mode: 'local',
					id: 'qqww',
					editable: false,
					triggerAction: 'all',
					forceSelection: true,
					store: new Ext.data.ArrayStore({
						fields: ['value', 'displayText'],
						data: [['textfield', 'Pole tekstowe'], ['textarea', 'Obszar tekstowy']]
					}),
					valueField: 'value',
					displayField: 'displayText',
					allowBlank: false
				}, {
					name: 'vtype',
					fieldLabel: 'Walidacja',
					xtype: 'combo',
					mode: 'local',
					editable: false,
					triggerAction: 'all',
					forceSelection: true,
					store: new Ext.data.ArrayStore({
						fields: ['value', 'displayText'],
						data: [['email', 'Email'], ['url', 'URL'], ['alpha', 'Tylko litery'], ['alphanum', 'Alfanumeryczne']]
					}),
					valueField: 'value',
					displayField: 'displayText',
					allowBlank: true
				}, {
					name: 'state',
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
							tab['lang_' + lang.lang_id].form.setValues(lang);
						}
					});
				}
				else {
					tab.form.setValues(record[0]);
				}
			});
		}
		
		this.win = new ImbaShop.utils.Window({
			title: (Ext.isDefined(record) ? 'Edytuj' :  'Dodaj' ) + ' pole'
			,items: this.formAddDialog
			,scope:this
			,layout: 'fit'
			,height: 300
			,buttons: [{
				text: 'Zapisz'
				,scope: this
				,handler: function(){
					
					//wyslanie zadania
					ImbaShop.utils.Ajax({
						url: this.edit ? '/api/editExtraFields' : '/api/insertExtraFields'
						,jsonData: this.formAddDialog.getMultilanguageValues()
						,success: function(resp,scope){
							this.store.reload();
							this.win.destroy();
						}
						,displayResult: true
						,params: params
						,scope: this
					});
					
					
					/*Ext.Ajax.request({
						url: this.edit ? '/api/editExtraFields' : '/api/insertExtraFields'
						,jsonData: this.formAddDialog.getMultilanguageValues()
						,success: function(response){
							var resp = Ext.util.JSON.decode(response.responseText);
							this.store.reload();
							this.win.destroy();
						}
						,failure: function(response){
							console.log(response);
						}
						,params: params
						,scope: this
					});*/
					
				}
			},{
				text: 'Anuluj'
				,scope:this
				,handler: function(){
					this.win.destroy();
				}
			}]		
		});
		
	}

	,editDialog: function(){
		
		var record = this.selModel.getSelected();
		
		if (!record){
			Ext.Msg.alert('Błąd', 'Zaznacz pole dodatkowe');
			return;
		}
		
		ImbaShop.utils.Ajax({
			url: '/api/getExtraField',
		    params: {
		        pfield_id: record.json.pfield_id
		    }
		    ,success: function(resp,scope){
		    	this.addDialog(resp.data);
		    }
			,scope: this
		});
		
		//pobieramy dane we wszystkich dostepnych jezykach danego rekordu
		/*Ext.Ajax.request({
			url: '/api/getExtraField',
		    params: {
		        pfield_id: record.json.pfield_id
		    },
		    scope:this,
		    success: function(response) {
		    	var resp = Ext.util.JSON.decode(response.responseText);
		    	if (resp.success){
		    		this.addDialog(resp.data);
		    	}
		    	else {
		    		log('nie mozna pobrac danych pola dodatkowego');
		    	}
		    	
		    },
		    failure: function(form, action) {
				log('nie mozna pobrac danych pola dodatkowego');
		    }
		});*/
		
		
	}
	
	,deleteConfirm: function(){
		
		var record = this.selModel.getSelected();
		
		if (Ext.isEmpty(record)){
			Ext.Msg.alert('Błąd', 'Zaznacz pole do usunięcia');
			return;
		}
			
		
		new ImbaShop.utils.ConfirmDelete({
			scope: this,
			fn: function(answer, obj){
				
				if (answer == 'yes'){
					
					ImbaShop.utils.Ajax({
						url: '/api/delExtraField'
						,success: function(resp,scope){
							this.store.reload();
						}
						,displayResult: true
						,params: { pfield_id: record.json.pfield_id, state:'D' }
						,scope: this
					});
					
					/*Ext.Ajax.request({
						url: '/api/editProductField',
						scope: this,
						success: function(){
							this.store.reload();
						},
						failure: function(){
							Ext.Msg.alert('Błąd', 'Nie udało się usunąć pola');
						},
						params: { id: record.json.id, state:'D' }
					});*/
				}
				else {
					//console.log(this,this.store.reload,this.store);
					
				}
				
				
				
			}
		});
	}
	
});

