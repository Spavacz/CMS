$(document).ready(function(){
	// panel admina
	$('#panel').dialog({
		autoOpen: false
	});
	
	// dodawanie strony
	var page_add_title = $("#panel-page-add-title"),
	page_add_url = $("#panel-page-add-url"),
	page_add_layout = $("#panl-page-add-layout"),
	page_add_component = $("#panl-page-add-component"),
	allFields = $([]).add(page_add_title).add(page_add_url).add(page_add_layout).add(page_add_component),
	tips = $(".validateTips");

	function updateTips(t) {
		tips
			.text(t)
			.addClass('ui-state-highlight');
		setTimeout(function() {
			tips.removeClass('ui-state-highlight', 1500);
		}, 500);
	}

	function checkNotEmpty(o,n) {
		var str = jQuery.trim( o.val() );
		if( str == '' ) {
			o.addClass('ui-state-error');
			updateTips( n + ' nie moze byc puste.' );
			return false;
		}
		return true;
	}
	
	function checkLength(o,n,min,max) {
		var str = jQuery.trim( o.val() );
		if ( str.length > max || str.length < min ) {
			o.addClass('ui-state-error');
			updateTips("Dlugosc " + n + " musi byc pomiedzy "+min+" i "+max+".");
			return false;
		}
		return true;
	}
	
	function checkRegexp(o,regexp,n) {
		if ( !( regexp.test( o.val() ) ) ) {
			o.addClass('ui-state-error');
			updateTips(n);
			return false;
		}
		return true;
	}

	
	$("#panel-page-add").dialog({
		autoOpen: false,
		modal: true,
		buttons: {
			'Dodaj strone': function() {
				var bValid = true;
				allFields.removeClass('ui-state-error');

				bValid = bValid && checkNotEmpty( page_add_title, "Title" );
				bValid = bValid && checkLength(page_add_title, "Title", 1, 255 );
				bValid = bValid && checkNotEmpty( page_add_url, "Url" );
				bValid = bValid && checkRegexp( page_add_url,/^([a-z0-9\-\/])+$/i, 'Url moze skladac sie tylko z cyfr, liter, "-" lub "/".' );
				
				if (bValid) {
					if( page_add_url.val().charAt(page_add_url.val().length-1) != '/' ){
						page_add_url.val( page_add_url.val() + '/' );
					}
					
					client.addPage( page_add_title.val(), page_add_url.val(), page_add_layout.val(), page_add_component.val() );
					if(client.error) {
						updateTips( client.error_message );
					} else {
						location.assign( _baseUrl + page_add_url.val() );
					}
				}
			},
			Cancel: function() {
				$(this).dialog('close');
			}
		},
		close: function() {
			allFields.val('').removeClass('ui-state-error');
		}
	});

	
	$(".panel_slide_button").click(function(e){
		e.stopPropagation();
		$('#panel').dialog('open');
		return false;
	});
	$('#panel-page-add-btn').click(function(e){
		e.stopPropagation();
		$('#panel-page-add').dialog('open');
		return false;
	});
});