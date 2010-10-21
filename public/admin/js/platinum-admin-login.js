//scripts for login page to run properly
$(function(){
			//tab funciton
			$("ul.tabs").tabs("div.panes > div");
			
			// Closable function
			$('.closable').append('<span class="closelink" title="Close"></span>');
				
			$('.closelink').click(function() {
				$(this).parent().fadeOut('600', function() { $(this).remove(); });
			});
		});