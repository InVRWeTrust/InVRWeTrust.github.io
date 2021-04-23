function parallaxResize () {
	if (!ios) {
		$('#animationCss').prop('disabled', true);
		$("div.parallax-child-1, div.parallax-child-2, div.mid-small").each(function( index ) {

			$(this).removeAttr("style");

			var matrix3d = $(this).css('transform');
			var Z = parseFloat(matrix3d.split(',')[14]);
			var scale = -1 * Z + 1;
			var oWidth = parseFloat($(this).width());
			var oHeight = parseFloat($(this).height());
			var nWidth = Math.ceil( oWidth * scale );
			var nHeight = Math.ceil( oHeight * scale );
			$(this).height( nHeight );
			$(this).width( nWidth );
		});
		$('#animationCss').prop('disabled', false);
	}
}