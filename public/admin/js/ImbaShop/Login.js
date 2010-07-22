Ext.app.JSONRPC_API = {"transport":"POST","envelope":"JSON-RPC-2.0","contentType":"application\/json","SMDVersion":"2.0","target":"rpc","services":{"remove":{"envelope":"JSON-RPC-2.0","transport":"POST","parameters":[{"type":"any","name":"idInstance","optional":false}],"returns":"null"},"update":{"envelope":"JSON-RPC-2.0","transport":"POST","parameters":[{"type":"any","name":"idPage","optional":false},{"type":"any","name":"data","optional":false}],"returns":"null"},"edit":{"envelope":"JSON-RPC-2.0","transport":"POST","parameters":[{"type":"any","name":"idPage","optional":false},{"type":"any","name":"idInstance","optional":false},{"type":"any","name":"data","optional":false}],"returns":"null"},"login":{"envelope":"JSON-RPC-2.0","transport":"POST","parameters":[{"type":"any","name":"login","optional":false},{"type":"any","name":"password","optional":false},{"type":"any","name":"remember","optional":true,"default":false}],"returns":["null","null"]},"logout":{"envelope":"JSON-RPC-2.0","transport":"POST","parameters":[],"returns":"null"},"addPage":{"envelope":"JSON-RPC-2.0","transport":"POST","parameters":[{"type":"any","name":"title","optional":false},{"type":"any","name":"url","optional":false},{"type":"any","name":"layout","optional":false},{"type":"any","name":"component","optional":true}],"returns":["null","null"]}},"methods":{"remove":{"envelope":"JSON-RPC-2.0","transport":"POST","parameters":[{"type":"any","name":"idInstance","optional":false}],"returns":"null"},"update":{"envelope":"JSON-RPC-2.0","transport":"POST","parameters":[{"type":"any","name":"idPage","optional":false},{"type":"any","name":"data","optional":false}],"returns":"null"},"edit":{"envelope":"JSON-RPC-2.0","transport":"POST","parameters":[{"type":"any","name":"idPage","optional":false},{"type":"any","name":"idInstance","optional":false},{"type":"any","name":"data","optional":false}],"returns":"null"},"login":{"envelope":"JSON-RPC-2.0","transport":"POST","parameters":[{"type":"any","name":"login","optional":false},{"type":"any","name":"password","optional":false},{"type":"any","name":"remember","optional":true,"default":false}],"returns":["null","null"]},"logout":{"envelope":"JSON-RPC-2.0","transport":"POST","parameters":[],"returns":"null"},"addPage":{"envelope":"JSON-RPC-2.0","transport":"POST","parameters":[{"type":"any","name":"title","optional":false},{"type":"any","name":"url","optional":false},{"type":"any","name":"layout","optional":false},{"type":"any","name":"component","optional":true}],"returns":["null","null"]}}};



var dupa = Ext.Direct.addProvider(Ext.apply(Ext.app.JSONRPC_API, {
        'type'     : 'zfprovider',
        'url'      : Ext.app.JSONRPC_API
        ,paramsAsHash :false
    }));




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
	    //,url: '/api/login'	    
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
		//,url: '/api/login'
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
		
			loginForm.getForm().submit({
				method: 'POST',    	
				params: {
                    foo: 'bar',
                    uid: 34
                }
			});
		}
		
	}
			

	/**
	 * Funkcja wylogowujaca :)
	 */
	,logout:function(){																
		ImbaShop.utils.Ajax({
			url: '/api/logout',
			success: function(a,b,c){
				window.location.href = '/';
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