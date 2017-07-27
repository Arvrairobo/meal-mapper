(function(){
	var h = $(window).height();
	$('.recipe-area').css('max-height', h - 320);
	$('.search-results').css('max-height', h - 200);
	$(window).resize(function(){
		var h = $(window).height();
		$('.recipe-area').css('max-height', h - 320);
		$('.search-results').css('max-height', h - 200);
	});
})();
// with graphs, 445
// without graphs, 320
$(document).ready(function() {
    $('select').material_select();
});