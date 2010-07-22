Ext.namespace('ImbaShop.items.tabs.ImageTab');

ImbaShop.items.tabs.ImageTab = function(config){

	config = config || {};
	config.title = config.title || i18n.PHOTOS;
	
	if(!Ext.isEmpty(config.disableTitle))
		delete config.title;
	
	fileId = this.getFileDir();
	
	this.initTemplates();	
	//ladowanie informacji o zdjeciach
	this.store = new Ext.data.JsonStore({
	    url: config.listMethod,
		baseParams : {product_id:config.fileDir},
		width:515,
		height:350,				
	    root: 'data',
	    fields: [
	        'name', 'url', 'id',
	        {name:'size', type: 'float'},
	        {name:'lastmod', type:'date', dateFormat:'timestamp'}
	    ],
	    listeners: {
	    	load: {fn:function(){ this.hideMask; this.view.select(0); }, scope:this, single:true}
	    }
		
	});	
	this.store.load();	
    
    this.view = new Ext.DataView({
		tpl: this.thumbTemplate,
		singleSelect: true,
		overClass:'x-view-over',
		itemSelector: 'div.thumb-wrap',
		emptyText : '<div style="padding:10px;">Brak grafik do wyświetlenia.</div>',
		store: this.store,			
		ref:'../imageView',
		plugins: [new Ext.DataView.LabelEditor({dataIndex: 'name'})],
		listeners: {
    		scope:this,
			'selectionchange': {fn:this.showDetails, scope:this, buffer:100},
			//'dblclick'       : {fn:this.doCallback, scope:this},
			'loadexception'  : {fn:this.onLoadException, scope:this},
			'beforeselect'   : {fn:function(view){
		        return view.store.getRange().length > 0;
			}}					
		}
        ,plugins: [
            new Ext.ux.DataView.LightBox({
				nextImage : '/static/images/icons/control_play_blue.png',
				prevImage : '/static/images/icons/control_play_blue2.png',
				event : 'dblclick'
			})
        ]
		,prepareData: this.formatData.createDelegate(this)		
	});
    
	
	
	ImbaShop.items.tabs.ImageTab.superclass.constructor.call(this,
			Ext.apply(config,{
		    	iconCls: 'is-image'
		        ,layout:'border'
		        ,ref:'imageTab'
		        ,overflowText: i18n.IMAGE_INSERT	
				,items:[{
						baseCls: 'img-chooser-view',
						region: 'center',
						ref: 'imagePanel',   
						autoScroll: true,
						border: false,
						items: this.view,
		                tbar:[
						{
							iconCls: 'is-add',
							text: i18n.ADD,
							handler: this.addImage,
							scope: this
						  }, '-', {
							iconCls:'is-delete',
							text: i18n.DELETE,
							ref:'../delBtn',
							handler: this.deleteFile,
							scope: this,
							disabled:true
						  }, '-',
						  {
							  id:'reload',
							  qtip:i18n.RELOAD,
							  iconCls:'x-tbar-loading',
							  scope:this,
							  handler:function(){
								this.view.store.reload();
								this.view.refresh();
						  	  }
						  },
						'->',
						{text: i18n.SEARCH }
		                ,{
		                	xtype: 'textfield',
		                	ref: '../filterFld',
		                	selectOnFocus: true,
		                	width: 100,
		                	listeners: {
		                		'render': {fn:function(fld){		                			
							    	fld.getEl().on('keyup', function(){
							    		this.filter();
							    	}, this, {buffer:500});							    	
		                		}, scope:this}
		                	}
		                }]
		
					},{
						ref: 'detailPanel'
						,region: 'east'
						,border:false
						,split: true
						,collapseMode:'mini'
						,width: 150
						,minWidth: 150
						,maxWidth: 250
					}
				]}
		));
}


Ext.extend(ImbaShop.items.tabs.ImageTab,Ext.Panel,{

	lookup : {}
	
	,addImage:function(a){

		var dialog,
			fileId = this.getFileDir();

		if (!dialog) {

		  dialog = new Ext.ux.UploadDialog.Dialog({
			url: this.uploadMethod,
			base_params: { product_id : fileId },
			reset_on_hide: true,
			allow_close_on_upload: true,
			upload_autostart: false,
			post_var_name: 'upload',
			diplayImageStore:this.store
		  });

			dialog.on('uploadsuccess', this.onUploadSuccess, this);
		}
		else {
			dialog.base_params['product_id'] = fieldId;
		}
		dialog.show();

	}
	
	,formatData : function(data){
    	data.shortName = data.name.ellipse(15);
    	data.sizeString = this.formatSize(data);
    	data.dateString = new Date(data.lastmod).format("m/d/Y g:i a");
    	this.lookup[data.name] = data;
    	return data;
    }

	,formatSize : function(data){
        if(data.size < 1024) {
            return data.size + " bytes";
        } else {
            return (Math.round(((data.size*10) / 1024))/10) + " KB";
        }
    }

	,deleteFile : function(ed, value){
		
		Ext.Msg.confirm(i18n.CONFIRM, i18n.REMOVE_QUESTION_AGREE, function(opt){
			if(opt === 'yes'){							
				var selNode = this.view.getSelectedNodes();	 
				
				if(selNode && selNode.length > 0){
					selNode     = selNode[0];
					var data    = this.lookup[selNode.id];

					Ext.Ajax.request({
						url: '/api/delProductImage',
						callback: function(){			
							this.view.store.reload();
							this.view.refresh();
						},
						scope: this,
						params: {
							id: data.id,
							product_id : this.getFileDir()
						}
					});
				}	
			}
		}, this);	
	}
	
	,onUploadSuccess : function(dialog, filename, resp_data, record){
		this.view.store.reload();
		this.view.refresh();
	}
	  
	,initTemplates : function(){
		this.thumbTemplate = new Ext.XTemplate(
			'<tpl for=".">',
				'<div class="thumb-wrap" id="{name}">',
				'<div class="thumb"><img src="{url}" title="{name}" /></div>',
				'<span class="x-editable">{shortName}</span></div>',
			'</tpl>'
		);
		this.thumbTemplate.compile();

		this.detailsTemplate = new Ext.XTemplate(
			'<div class="details">',
				'<tpl for=".">',
					'<img src="{url}" style="width: 100px; height: 80px;" /><div class="details-info">',
					'<b>Nazwa:</b>',
					'<span>{name}</span>',
					'<b>Rozmiar:</b>',
					'<span>{sizeString}</span>',
					'<b>Data modyfikacji:</b>',
					'<span>{dateString}</span></div>',
				'</tpl>',
			'</div>'
		);
		this.detailsTemplate.compile();
	}

	,showDetails : function(){
		
	    var selNode = this.view.getSelectedNodes();
	    var detailEl = this.detailPanel.body; 
		if(selNode && selNode.length > 0){
			selNode = selNode[0];
		    var data = this.lookup[selNode.id];
            detailEl.hide();
            this.detailsTemplate.overwrite(detailEl, data);
            detailEl.slideIn('l', {stopFx:true,duration:.2});
            
            this.imagePanel.delBtn.enable();
		}else{
			this.imagePanel.delBtn.disable();
		    detailEl.update('');
		}
	}

	,filter : function(){
		var filter = this.imagePanel.filterFld;
		this.view.store.filter('name', filter.getValue());
		this.view.select(0);
	}

	,reset : function(){
		if(Ext.isDefined(this.win) && this.win.rendered){
			this.filterFld.reset();
			this.view.getEl().dom.scrollTop = 0;
		}
	    this.view.store.clearFilter();		
		this.view.store.sort('name','asc');
		this.view.select(0);
	}

	,doCallback : function(){
        var selNode = this.view.getSelectedNodes()[0];
		var lookup = this.lookup;
		
		var data = lookup[selNode.id];
		var img = Ext.getCmp(this.id);		
		if(this.id == 'xml-form'){
			img.setValue(data.url);
		}
		else {
			img.append('<img src="'+data.url+'" style="width: 250px; height: 190px;" />');
		}
		this.win.hide(this.animateTarget);	
    }

	,onLoadException : function(v,o){
	    this.view.getEl().update('<div style="padding:10px;">'+i18n.DOWNLOAD_FAILD+'</div>');
	}	
	
	
	
	
	
	
	
	/**
	 * Maskuje drzewo
	 */
	,showMask : function(){		
		
		this.mask = new Ext.LoadMask(this.view.getEl(), { msg: i18n.LOADING_ELEMENTS });
		this.mask.show();
	}

	/**
	 * Zdejmuje maske drzewa
	 */	
	,hideMask : function(){
		this.mask.hide();
	}
	
	,getFileDir : function(){
		fileId = this.fileDir;
		
		if(Ext.isObject(this.grid)){			
			fileId = this.grid.selModel.getSelected().json.product_id;
			
			if(Ext.isDefined(this.store)){
				this.store.baseParams['product_id'] = fileId;
			} 
		}		
		return fileId;
	}
	
});

String.prototype.ellipse = function(maxLength){
    if(this.length > maxLength){
        return this.substr(0, maxLength-3) + '...';
    }
    return this;
};