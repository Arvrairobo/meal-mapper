// Slide search bar in and out when icon is clicked
(function(){
	var showSearch = true;
	$('#pull-search').on('click', function(){
		showSearch = !showSearch;

		var width = $(window).width();
		if(showSearch){
			$('#search-bar').css('right', 0);
			$('nav').css('width', width-280);
			$('.app-wrapper').css('width', width-320);
		} else {
			$('#search-bar').css('right', -280);
			$('nav').css('width', width);
			$('.app-wrapper').css('width', width);
		}
	})
})()