
//clock
var clock = (function() {

	function init() {
		_setUpListeners();
		
	};

	function _setUpListeners() {
		$(window).on('scroll', _startAnimation);

	};

	function _startAnimation() {
		var clock = $('.clock__container'),
			clockHeight = $(clock).innerHeight(),
			screenHeight = $(window).innerHeight(),
			screenTopEdge = $(window).scrollTop(),
			scrennBottomEdge = screenTopEdge + screenHeight,
			clockTopEdge = clock.offset().top,
			clockBottomEdge = clockTopEdge + clockHeight,
			clockArr = $('.clock__body'),
			itemsArr = $('.clock__item');

		if (clockTopEdge > screenTopEdge && clockBottomEdge < scrennBottomEdge) {
				$(clockArr).each(function(index, element) {
					setTimeout(function() {
						var num = $(element).attr('data-number');
						itemsArr.each(function(index, elem) {
							if ($(elem).hasClass('clock__item--' + num)) {
								$(elem)
									.show()
									.addClass('pulse animated');
							};
						$(element).show();
						});
					}, index*300);
				});
		};
	};

	return {
		init: init
	};

})(); 

clock.init();