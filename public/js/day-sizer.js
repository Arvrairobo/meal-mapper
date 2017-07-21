(function(){
	var h = $(window).height();
	$('.recipe-area').css('max-height', h - 315);
	$(window).resize(function(){
		var h = $(window).height();
		$('.recipe-area').css('max-height', h - 315);
	});
})();