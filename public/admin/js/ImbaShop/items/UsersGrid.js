Ext.namespace('ImbaShop.items.UsersGrid');

ImbaShop.items.UsersGrid = function(config){
	
	config = config || {};
		
	this.store = new Ext.data.JsonStore({
		url: '/api/getUserList'
            ,root: 'data'
			,autoLoad: true
			,fields: [
			   {name: 'id'},
               {name: 'firstname'},
               {name: 'lastname'},
               {name: 'email'},
               {name: 'locale'}, 
               {name: 'timezone'}
            ]
    });
	            
	ImbaShop.items.UsersGrid.superclass.constructor.call(this,
		Ext.applyIf(config,{
			layout:'fit'
			,region:'center'
			,loadMask:true
			,store: this.store
			,sm: new Ext.grid.RowSelectionModel({
				singleSelect:false
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
			,colModel: new Ext.grid.ColumnModel({
		        defaults: {
		            sortable: true
		        },
		        columns: [
		            {header: i18n.FIRSTNAME, width: 200, sortable: true, dataIndex: 'firstname'},
	         	 	{header: i18n.LASTNAME, sortable: true, dataIndex: 'lastname'},
					{header: i18n.EMAIL, width: 200, sortable: true, dataIndex: 'email'}
		        ]  
		    })
	      
		   	,tbar: [
				new ImbaShop.items.buttons.AddButton({
					scope: this
					,disabled:false
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
	        }
			,bbar:new Ext.PagingToolbar({
	            store: this.store,
	            displayInfo: true,
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


Ext.extend(ImbaShop.items.UsersGrid, Ext.grid.GridPanel,{
	
	formAddDialog: {
			xtype:'form'
			,defaults:{xtype:'textfield'}
			,items:[{
				fieldLabel:'ss'
				,name:'saaa'
			},{
				fieldLabel:'sdss'
					,name:'sdd'
			}]
	}
	

	
	,loginForm : {
	    labelWidth: 85,
		url:'index.php',
	    width: 230,
		border:false,
		bodyStyle:'padding:10px;',
		defaults:{xtype:'textfield',allowBlank: false},
	    items: [{
	        	fieldLabel: 'Użytkownik',
	        	name: 'user',
		    	autoCreate:{tag: "input", type: "text", autocomplete: "on"}
			},{
		        fieldLabel: 'Hasło',
		        name: 'pass',
		        inputType: 'password',
			    autoCreate:{tag: "input", type: "password", autocomplete: "on"}
	    	}			
		]
	}						
	
	,passwordForm : {
		labelWidth: 85,
		url:'index.php',
		width: 230,
		border:false,
		bodyStyle:'padding:10px;',
		
		defaults:{xtype:'textfield',allowBlank: false,scope:this,},
		items:[{
		        hiddenName: 'password',
		        name: 'password',
		        fieldLabel: 'Hasło',
		        inputType: 'password',		    
				ref:'password',
		        enableKeyEvents: true,
		        listeners: {
					scope:this,
		            keyup: function(fld, event) {
						console.log(fld, event,this);
		                this.passwordChanged(fld.getValue());                
		            }
		        }
		    }
			,{
				fieldLabel: 'Potwierdź hasło',
		        hiddenName: 'confirmpassword',
		        inputType: 'password',
		        blankText: 'passwords must match',
		        invalidText: 'Hasła nie pasują do siebie',
		        validator: function () {
		            var t = true;
		            var f = false;
		            if (this.getValue() == this.ownerCt.password.getValue()) {
		                //Ext.getCmp('savechanges').enable();
		                return t;
		                return f;
		            }
		            else {
		                //Ext.getCmp('savechanges').disable();
		            }
		        }
		    }
			,new Ext.BoxComponent({
		        height:15,
		        autoEl: {html: "<div><span id='strengthbar' style='width:135px;'/></div>"}
		    })]
	}




	/**
	 * Tworzy tempowy produkt zeby zwrocic ID 
	 */
	,addDialog: function(record){
		
		this.win = new ImbaShop.utils.Window({
			title: Ext.isEmpty(record) ? i18n.PRODUCT_ADD : i18n.PRODUCT_EDIT
			,items: [this.loginForm,this.passwordForm]		        
			,scope:this
			,width: 600
			,xtype: 'form'
			,height: 300
			,buttons: [{
				text: i18n.SAVE
				,scope: this
			}]
		});

	}

	,editDialog: function(){
		
		var record = this.selModel.getSelected();
		
		if (!record)
			log('nie wybrales rekordu');
		
		//pobieramy dane we wszystkich dostepnych jezykach danego rekordu
		Ext.Ajax.request({
			url: '/api/getArticleCms',
		    params: {
		        id: record.json.id		        
		    },
		    scope:this,
		    success: function(response) {
		    	var resp = Ext.util.JSON.decode(response.responseText);
		    	if (resp.success)
		    		this.addArticle(resp.data);
		    	else 
		    		log('nie mozna pobrac danych pola dodatkowego');
		    },
		    failure: function(form, action) {
				log('nie mozna pobrac danych pola dodatkowego');
		    }
		});
		
	}
	
	
	
	
	
	,getSelectedRows: function(args){
		
		args = args || {};		
		var records = this.selModel.getSelections();
		
		if (args.getOnlyId){
			var ret = new Array();
			Ext.each(records, function(item){
				ret.push(item.json.id);
			})			
			return ret;
		}		
		return records;
	}
	
	,pbar : null

	/**
	 * Wysyla zadanie do serwera z danymi z formularza
	 */
	,submit: function(){		
		if (this.loginForm.form.isValid()) {
			this.loginForm.form.send({
		        method: 'POST',
				waitTitle: 'Proszę czekać',
		        waitMsg:'Trwa autoryzacja',
				success: function(form,action){
					console.log(form,action);
					//Login.win.hide();
				}   
			});				
		}
	}
			
				
	/**
	 * Sprawdza siłe hasła i aktualizuje pasek obrazujący siłe
	 * @param {Object} pwdValue
	 */
    ,passwordChanged : function(pwdValue) {
		
	    if (this.pbar == null) {
	        this.pbar = new Ext.ProgressBar({
	            text:'',
	            id:'pbar',
	            renderTo:'strengthbar'
	        });
	    }
	
	    var strongRegex = new RegExp("^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$", "g");
	    var mediumRegex = new RegExp("^(?=.{7,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$", "g");
	    var enoughRegex = new RegExp("(?=.{6,}).*", "g");
		
	    if (pwdValue.length==0) {
	        this.pbar.updateProgress(0, 'Wpisz hasło');
	    } else if (false == enoughRegex.test(pwdValue)) {
	        this.pbar.updateProgress(.25, 'Wprowadź więcej znaków');
	    } else if (strongRegex.test(pwdValue)) {
	        this.pbar.updateProgress(1, 'Hasło jest silne!');
	    } else if (mediumRegex.test(pwdValue)) {
	        this.pbar.updateProgress(.75, 'Hasło jest średnie');
	    } else { 
	        this.pbar.updateProgress(.25, 'Hasło jest słabe');
	    }
	}
		
	
});