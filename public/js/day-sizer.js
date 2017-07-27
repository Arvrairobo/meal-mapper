(function(){
	var h = $(window).height();
	$('.recipe-area').css('max-height', h - 415);
	$('.search-results').css('max-height', h - 300);
	$(window).resize(function(){
		var h = $(window).height();
		$('.recipe-area').css('max-height', h - 415);
		$('.search-results').css('max-height', h - 300);
	});
})();
// with graphs, 445
// without graphs, 320
$(document).ready(function() {
    $('select').material_select();
    $('.modal').modal();
});