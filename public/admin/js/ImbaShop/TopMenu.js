Ext.namespace('ImbaShop.TopMenu');

ImbaShop.TopMenu = function(config){            

	config = config || {};
	
	ImbaShop.TopMenu.superclass.constructor.call(this,
		Ext.applyIf(config,{
			defaults:{pressed:false,enableToggle:true,toggleHandler:this.toggleButton,scope:this,toggleGroup:'top-menu'}
			,items: [
				'-'
				/*,{
					//menu: this.menu.portal
					text: i18n.DASHBOARD
					,iconCls: 'is-portal'
					,module:'Dashboard'
				}*/
				,{
					text: i18n.PRODUCTS
					,iconCls: 'is-products'
					,ref:'products'
					,module:'Products'						
				},{
					text: i18n.CMS
					,ref:'cms'
					,iconCls: 'is-cms'
					,module:'Cms'
				},{
					text: i18n.EXTRA_FIELDS
					,ref:'extrafields'
					,iconCls: 'is-extra-fields'
					,module: 'ExtraFields'
				}/*,{
					text: i18n.USERS
					,iconCls: 'is-users'
					,module: 'Users'
				}
				,{
					text: i18n.HELP
					,iconCls: 'is-help'
					,module:'Help'
				}*/
				,'-'
				,'->'
				,'-'
				,{
					text: i18n.LOGOUT
					,ref:'logout'
					,iconCls:'is-logout'
					,module: 'Login'
					,action: 'logout'
				}
			]
			
		})
	);
	
	this.loadItems();
}

Ext.extend(ImbaShop.TopMenu, Ext.Toolbar,{
		
		/**
		 * Usuwa zawartosc glownej czesci panelu i wstawia nowa na postawie btn.module 
		 * 
		 * @param {Object} btn - przycisk
		 * @param {Boolean} pressed - status
		 *  
		 */
		toggleButton : function (btn,pressed){
			//console.log(pressed);
			var panel = btn.ownerCt.ownerCt.ownerCt.mainPanel;
			var tools = "[new ImbaShop.items.buttons.CloseButton({scope: element})]";
			var moduleObj = 'new ImbaShop.'+btn.module+'({action:"'+btn.action+'",title:"ImbaShop :: Administration Zone - '+btn.text+'",tools:'+tools+'})';
			
		
			
		
			
			/*
			 * to ladowanie toolsow tez trzeba zdynamizowac, albo jesli bedzie to wprowadzac zakrecenie
			 * w kodzie to przeniesie sie to do konkretnych modulow
			 */
			var element = eval(moduleObj);
			

			//dodanie przycisku pomoc jesli jest zdefiniowana taka funkcja w danym module
			if (Ext.isFunction(element.showHelpDialog)){
				element.tools.unshift(new ImbaShop.items.buttons.HelpButton({scope:element}));
			}
			
			//dodanie przycisku konfiguracja jesli jest zdefiniowana taka funkcja w danym module
			if (Ext.isFunction(element.showConfigDialog)){
				element.tools.unshift(new ImbaShop.items.buttons.ConfigButton({scope:element}));
			}						

			// Imba FIX :P
			try{
				panel.removeAll();
				panel.add(element);
				panel.doLayout();
			}
			catch(e){
				panel.removeAll();
				panel.add(element);
				panel.doLayout();
			}
			
			ImbaShop.currPageEl = element;	
		  }	
		  
		 ,loadItems: function(){
			 //tu bedzie ladowanie dynamiczne calego menu
		 }

		 
		 ,closePanel: function(e){
			var panel = this.ownerCt.ownerCt.mainPanel;				
			panel.removeAll();
			panel.doLayout();				
			ImbaShop.currPageEl = {};				 
		 }

});   