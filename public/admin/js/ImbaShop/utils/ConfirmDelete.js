Ext.namespace('ImbaShop.items.ConfirmDelete');

ImbaShop.utils.ConfirmDelete = function(config){
	
	Ext.applyIf(config,{
		title: i18n.DELETE,
		msg: i18n.DELETE_QUESTION_AGREE,
		buttons: Ext.Msg.YESNO,
		fn: function(answer, obj){
			//log(answer, obj);
		},
		icon: Ext.MessageBox.QUESTION
	});
	
	Ext.Msg.show(config);
	
}

