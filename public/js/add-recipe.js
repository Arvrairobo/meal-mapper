(function(){
	// Get user ID from local storage
	var userId = localStorage.getItem('id');
	var name = '';
	
	// Get user data
	$.ajax({
		method: 'GET',
		url: '/api/user/' + userId
	}).done(function(data){
		name = data.firstName + ' ' + data.lastName;
	});

	$('#add-recipe').on('click', function(){
		var url = $('#recipe-url').val();
		$.post({
			url: '/api/scrape/',
			data: {url: url}
		}).done(function(data){
			console.log('data returned');
		});
	});

})();