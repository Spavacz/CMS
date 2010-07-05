$(document).ready(function(){
	$('form.login').submit( function(e){
		e.stopPropagation();
		var result = client.login($("input[name='login']", e.currentTarget).val(),$("input[name='password']", e.currentTarget).val(), $("input[name='rememberme']:checked", e.currentTarget).val());
		if(client.error) {
			$('p.message',e.currentTarget).html( '<ul><li>' + client.error_message + '</li></ul>' );
		} else {
			location.reload();
		}
		return false;
	});
	
	$('a.logout').click(function(e){
		e.stopPropagation();
		client.logout();
		location.reload();
		return false;
	})
	
});