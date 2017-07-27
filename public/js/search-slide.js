// Slide search bar in and out when icon is clicked
(function(){
	var showSearch = false;
	var currX = -280;
	var targX = -280;
	var moveX = 0;
	var xIntr;
	var width = $(window).width();

	$('#search-bar').css('right', currX);

	$('#pull-search').on('click', function(){
		showSearch = !showSearch;
		if(showSearch){
			targX = 0;
			moveX = 3;
		} else {
			targX = -280;
			moveX = -3;
		}
		xIntr = setInterval(resize, 20);
	});

	function resize(){
		if(currX < targX){
			moveX < 12 ? moveX += .5 : null;
			currX += moveX;
			if(currX + moveX > targX){
				currX = targX;
				clearInterval(xIntr);
			}
		} else {
			moveX > -12 ? moveX -= .5 : null;
			currX += moveX;
			if(currX + moveX < targX){
				currX = targX;
				clearInterval(xIntr);
			}
		}
		$('#search-bar').css('right', currX);
		$('nav').css('width', width-280+(-1*currX));
		$('.app-wrapper').css('width', width-280+(-1*currX));
	}
})();