$(function(){
			// validator form
			$.validator.messages.required = 'To pole nie może być puste';
			$.validator.defaults.errorElement = 'p';
			$.validator.defaults.errorClass = 'error';		

				// Closable function
			$('.closable').append('<span class="closelink" title="Close"></span>');
				
			$('.closelink').click(function() {
				$(this).parent().fadeOut('600', function() { $(this).remove(); });
			});
			
			// Image actions menu
			$('ul.imageList li').hover(
				function() { $(this).find('ul').css('display', 'none').slideDown('fast').css('display', 'block'); },
				function() { $(this).find('ul').slideUp('fast'); }
			);	
			
			// AutoSuggest plugin setup		
			var data = {items: [
			{value: "21", name: "Mick Jagger"},
			{value: "43", name: "Johnny Storm"},
			{value: "46", name: "Richard Hatch"},
			{value: "54", name: "Kelly Slater"},
			{value: "55", name: "Rudy Hamilton"},
			{value: "79", name: "Michael Jordan"}
			]};
			$("input.autoSuggest").autoSuggest(data.items, {selectedItemProp: "name", searchObjProps: "name"});
			
			
			/* collapsible funciton */
			$('.collapsible').collapsible();
			
			/* Chart*/
			$('table.graph').visualize({type: 'bar',height: '100px', width: '400px'});			
						
			/* Tooltip effect for links */
			$('.tooltip-enabled a').tipsy({gravity: 's'});
			
			//table styling
			$("tr:even").addClass("alt");
			
			//tab funciton
			$("ul.tabbed").tabs("div.panes > div");
			
			//superfish menu setup
        	$("ul.sf-menu").superfish({ 
        	delay:	500,
        	speed: 'fast',
            pathClass:  'current',
            animation:   {opacity:'show'}
        	});
			
			//Modal-Box
			$(".modal-box").click(function() {
      			$('#dialog').modal({overlayClose : true, 
      				position: ["25%",],
      				onClose: function (dialog) {
						dialog.data.fadeOut('fast', function () {
							dialog.container.slideUp('fast', function () {
								dialog.overlay.fadeOut('fast', function () {
									$.modal.close(); // must call this!
								});
							});
						});
			},
			onOpen: function (dialog) {
				dialog.overlay.fadeIn('fast', function () {
					dialog.container.slideDown('fast', function () {
						dialog.data.fadeIn('fast');
					});
				});
			}
		});
					return false;
      			});



	
 						
			//Messages Modal
      		$("#message-link").click(function() {
      			$('#messages-box').modal({overlayClose : true, 
      				containerId : 'messages-box-container',
      				overlayId: 'message-box-overlay',
      				autoPosition : false,
       				containerCss : {position: 'absolute'} //iþe yaramýyor, fixed ile eziliyor!
      				});
      			});
      	     		      		
  
			  $('.imageList a.confirm-image-delete').click(function (e) {
				e.preventDefault();
				// example of calling the confirm function
				// you must use a callback function (and paramater if there is) to perform the "yes" action
				confirm("Do you really want to delete this image?", deleteimage, $(this).attr("rel"));
				  });
				  
			   $('.confirm-link').click(function (e) {
				e.preventDefault();
							// you must use a callback function to perform the "yes" action
					confirm("You are going to : "+ this.href, this.href);
				});
			 	
				//modal image view functionality
				$('.imageList a.image-modal').click(function (e) {
					e.preventDefault();
					show_image(this.href);
				  });
				  
			});
			
		/* =======================================================================
			FUNCTIONS */
			
		/* Implementing image view for image gallery with simplemodal */
		function show_image(src) {
			$('#image-modal').find('img#modal-image')
	      		.attr("src",src);
	      		$('#image-modal').modal({
	      		containerId : 'image-container',
	      		overlayClose : true,
	      		onClose: function (dialog) {
						dialog.data.fadeOut('fast', function () {
							dialog.container.slideUp('fast', function () {
								dialog.overlay.fadeOut('fast', function () {
									$('#image-modal').find('img#modal-image')
	      								.attr("src"," ");
									$.modal.close(); // must call this!
								});
							});
						});
			},
			onOpen: function (dialog) {
				dialog.overlay.fadeIn('fast', function () {
					dialog.container.slideDown('fast', function () {
						dialog.data.fadeIn('fast');
					});
				});
			}

	      		});
		}
		
		/* Overriding Javascript's Alert Dialog */
		function alert(msg) {
			$('#alert').find('div.alert-content')
	      		.html(msg);
	      		$('#alert').modal({
				position: ["25%",],
				containerId: 'confirm-container',
				closeHTML: '<a class="button gray modal-close">OK</a>',
				onClose: function (dialog) {
						dialog.data.fadeOut('fast', function () {
							dialog.container.hide('fast', function () {
								dialog.overlay.fadeOut('fast', function () {
									$.modal.close(); // must call this!
								});
							});
						});
			},
			onOpen: function (dialog) {
				dialog.overlay.fadeIn('fast', function () {
					dialog.container.show('fast', function () {
						dialog.data.fadeIn('fast');
					});
				});
			}
	
				 });
		}
						
		//overrided confirm() func. uses jquery simplemodal
		function confirm(message, callback, param) {
			$('#confirm').modal({
			position: ["25%",],
			containerId: 'confirm-container', 
			onShow: function (dialog) {
				$('.message', dialog.data[0]).append(message);
	
				// if the user clicks "yes"
				$('.yes', dialog.data[0]).click(function () {
					// call the callback
					if ($.isFunction(callback)) {
						callback(param);
					}
					if(typeof callback == 'string')
			            {
			            	window.location.href = callback;
			            }
					// close the dialog
					$.modal.close();
						});
					},
					onClose: function (dialog) {
						dialog.data.fadeOut('fast', function () {
							dialog.container.hide('fast', function () {
								dialog.overlay.fadeOut('fast', function () {
									$.modal.close(); // must call this!
								});
							});
						});
			},
			onOpen: function (dialog) {
				dialog.overlay.fadeIn('fast', function () {
					dialog.container.show('fast', function () {
						dialog.data.fadeIn('fast');
					});
				});
			}

				});
		}	
		
		//Sample image delete function
		function deleteimage(id){
			//delete the image here with ajax/or classic way
			 $("#" + id).fadeOut('slow', function(){
			  	showSuccess("image has been deleted!");
			  	});
		}
		
				
			
		function showCustomMessage(msg)
		{
			$.notifyBar({
		    html: msg,
		    delay: 2000,
		    animationSpeed: "fast"
		  });  
		}

		
		
		function showSuccess(msg)
		{
			$.notifyBar({
		    html: msg,
		    cls: "success",
		    delay: 2000,
		    animationSpeed: "normal"
		  });  
		}

		
		
		function showError(msg)
		{
			$.notifyBar({
		    html: msg,
		    cls: "error",
		    delay: 2000,
		    animationSpeed: "normal"
		  });  
		}