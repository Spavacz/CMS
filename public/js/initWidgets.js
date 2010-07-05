$(document).ready(function(){
	// widgety
	$.fn.EasyWidgets({
		effects: { 
			widgetClose: 'fade',
			widgetAdd: 'fade',
			widgetExtend: 'slide',
			widgetCollapse: 'slide'
		},
		callbacks : {
			onChangePositions : function(data){
				var newWidgets = client.update(_pageId, data);
				for(var i = 0; i < newWidgets.length; i++) {
					var newWidget = $(newWidgets[i].html);
					$('#'+newWidgets[i].elementId).replaceWith(newWidget);
					//newWidget.getElementsByClassName('.widget-content').fadeIn();
				}
				if(i > 0) {
					//$('#panel').dialog('close');
					$.fn.AddEasyWidget();
				}
			},
			onClose : function(link, widget){
				client.remove(widget[0].id);
			},
			onStop : function(e, ui) {
				$(ui.item[0].getElementsByClassName('widget-content-loading')).addClass('loading');
			}
				
		}
	});
});