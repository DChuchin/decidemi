
//Parallax

$(document).ready(function(){

	function refreshParallax() {
		jQuery(window).trigger('resize').trigger('scroll');
	};
	
	setInterval(function() {
		refreshParallax();
	}, 500);

	if (!$('html').hasClass('lt-ie8')) {
		$('select').styler();
	};		
});