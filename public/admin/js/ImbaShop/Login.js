Ext.namespace('ImbaShop.Login');

/**
 * Klasa do wyswietlania okna logowania
 * 
 * @param {Object} config
 */
ImbaShop.Login = function (config){

	config = config || {};
	

	if(Ext.isString(config.action)){
		eval('this.'+config.action+'();');
		return {};
	}
	
	if (!Ext.isDefined(config.redirect))
		config.redirect = true;	
	
	/**
	 * Formularz z  polami do logowania
	 */
	this.loginForm = new Ext.form.FormPanel({
	    labelWidth: 85
	    ,url: '../rest/login'	    
		,border:false
		,bodyStyle:'padding:10px;'
		,defaults:{xtype:'textfield',allowBlank: false,anchor:'-20'}
	    ,items: [{
	    		fieldLabel: i18n.USERNAME
	        	,name: 'username'
		    	,autoCreate:{tag: "input", type: "text", autocomplete: "on"}
			},{
		        fieldLabel: i18n.PASSWORD
		        ,name: 'password'
		        ,inputType: 'password'
			    ,autoCreate:{tag: "input", type: "password", autocomplete: "on"}
	    	},{
		    	fieldLabel: i18n.LANGUAGE,
		    	xtype:'iconcombo',
	    	    displayField:'description',
	    	    valueField: 'lang_id',
	    	    iconClsField: 'code',
	    	    triggerAction: 'all',
	    	    editable:false,
	    	    ref:'../lang',
	    	    forceSelection:true,
		    	store:new Ext.data.JsonStore({			    	    
		    		url: '../stub-json'
		    	    ,root: 'data'
		    	    ,autoLoad:true
		    	    ,fields: [
		    	             'lang_id'
		    	            ,{	
		    	            	name:'description'
		    	            	,convert:function(v,rec){
		    	            		return  eval('i18n.'+v) || v;
		    	            	}
		    	            }
		    	    		,'code'
		    	    ]
		    	    ,scope:this		    	    
		    	    ,listeners:{
		    	    	load:function(store,records,options){		    			
		    				var lang = Ext.util.Cookies.get('default_language');		    				
		    				Ext.util.Cookies.set('languages',Ext.util.JSON.encode(store.reader.jsonData.data));		    				
		    				if(lang) this.scope.lang.setValue(lang);	    				
		    	    	}
		    	    }
		    	})
				,listeners:{
					select:function(){
						Ext.util.Cookies.set('default_language',this.getValue());
					}
				}
          	}			
		]
	});						

	
	/**
	 * Formularz z polami do zmiany hasła
	 */
	this.passwordForm = new Ext.form.FormPanel({
		labelWidth: 85
		,url: '/api/login'
		,width: 230
		,border:false
		,bodyStyle:'padding:10px;'
		,defaults:{xtype:'textfield',allowBlank: false}
		,items:[{
		        hiddenName: 'password'
		        ,name: 'password'
		        ,fieldLabel: 'Hasło'
		        ,inputType: 'password'		    
				,ref:'password'
		        ,enableKeyEvents: true
		        ,listeners: {
					scope:this
		            ,keyup: function(fld, event) {
		                this.passwordChanged(fld.getValue());           
		            }
		        }
		    }
			,{
				fieldLabel: 'Potwierdź hasło'
		        ,hiddenName: 'confirmpassword'
		        ,inputType: 'password'
		        ,blankText: 'Hasła muszą pasować do siebie'
		        ,invalidText: 'Hasła nie pasują do siebie'
		        ,validator: function () {
					return (this.getValue() == this.ownerCt.password.getValue())		           
		        }
		    }
			,{
		        height:15
				,xtype:'box'
		        ,autoEl: {html: "<div><span id='strengthbar' style='width:135px;'/></div>"}
		    }]
	});
	
	
	ImbaShop.Login.superclass.constructor.call(this,
        Ext.applyIf(config,{
		    
		    title: i18n.LOGIN
			,width: 300
		    ,closable: false
		    ,maximizable:false
		    ,resizable: false
			,draggable: false
			,modal:true
			,closeAction: 'hide'		    
			,initHidden:false				
		    ,items: [this.loginForm]
		    ,defaultButton:this.loginForm.form.findField('username')
			,buttons: [			    
	          	'->',
				{
				    text: i18n.LOGIN,
				    formBind: true,
				    handler: this.submit,
				    scope: this
				}
			],
			keys: [{
			    key: Ext.EventObject.ENTER,
			    fn: this.submit,
			    scope: this
			}]
		    ,listeners: {
				show: function(){					
					this.loginForm.form.reset();
				}
			}
		})
	);
} 


Ext.extend(ImbaShop.Login, ImbaShop.utils.Window,{ 
	
	pbar : null

	
	/**
	 * Wysyla zadanie do serwera z danymi z formularza
	 */
	,submit:function(){
		loginForm = this.items.items[0];
		if (loginForm.getForm().isValid()) {
			Ext.MessageBox.progress(i18n.LOGININ,i18n.WAIT,i18n.CONNECTING);	
			Ext.MessageBox.updateProgress(0.05,i18n.CONNECTED);
			Ext.MessageBox.updateProgress(0.10,'Autoryzacja');
						
			loginForm.getForm().submit({
				method: 'POST',    			 
				success: function(response, back){    					
					Ext.MessageBox.updateProgress(0.15,'Autoryzowano');
					
					if (this.redirect) {
						var redirect = 'index.html';
						window.location = redirect;
						var x = 0.10;
			            for(var i = 1; i < 100; i++){
			               setTimeout(function(){
	      					   	x += 0.20;
	      					   	Ext.MessageBox.updateProgress(x, 'Trwa przekierowywanie');
	      					   }, i*3000);
			            }
					}
					else {
						this.destroy();
						Ext.MessageBox.hide();
					} 			
		            
				},
				scope:this,
				failure: function(form, action){
					
					Ext.MessageBox.updateProgress(0.15,'Brak autoryzacji');				
					
					obj = Ext.util.JSON.decode(action.response.responseText);
					
					if (action.failureType == 'server') {						
						msg = i18n.LOGIN_FAILD;
					}
					else if (action.failureType === Ext.form.Action.CONNECT_FAILURE) {
						msg = 'Status:'+action.response.status+': '+ action.response.statusText;
	                }
					else if (action.failureType === Ext.form.Action.SERVER_INVALID){
	                    // server responded with success = false
	                    msg = action.result.errormsg;
	                }
	                else {
	                	msg = i18n.SERVER_ERROR;
					}
                	
					Ext.Msg.show({
						   title:i18n.LOGININ,
						   msg: msg,
						   buttons: Ext.Msg.OK,
						   icon: Ext.MessageBox.ERROR
					});					
					
					loginForm.getForm().setValues({username:'',password:''})
				}


			});
		}
		
	}
			

	/**
	 * Funkcja wylogowujaca :)
	 */
	,logout:function(){																
		ImbaShop.utils.Ajax({
			url: '../rest/login'
			,params: {
				_method : 'DELETE'
			}
			,success: function(a,b,c){
				window.location.href = 'login.html';
			}
		});
	}	

			
	/**
	 * Sprawdza siłe hasła i aktualizuje pasek obrazujący siłe
	 * @param {Object} pwdValue
	 */
    ,passwordChanged : function(pwdValue) {
		
	    if (this.pbar == null) {
	        this.pbar = new Ext.ProgressBar({
	            text:''
	            ,id:'pbar'
	            ,renderTo:'strengthbar'
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