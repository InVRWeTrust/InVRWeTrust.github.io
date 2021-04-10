function resizeFunctions() {
	parallaxResize();
	fillBack();
}

var firstScroll = true;
$( '#container' ).scroll(function() {
	if (firstScroll) {
		resizeFunctions();
		firstScroll = false;
	}
});