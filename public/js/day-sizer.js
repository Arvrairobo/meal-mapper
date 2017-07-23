(function(){
	var h = $(window).height();
	$('.recipe-area').css('max-height', h - 445);
	$('.search-results').css('max-height', h - 200);
	$(window).resize(function(){
		var h = $(window).height();
		$('.recipe-area').css('max-height', h - 445);
		$('.search-results').css('max-height', h - 200);
	});
})();