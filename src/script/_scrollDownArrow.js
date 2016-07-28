
//scroll down arrow
var scrollArrow = (function () {
	
	var duration = 750,  //duration of blink
		timeOut = 1000,  //timeout before blinking
		arrow = $('.section__scroll-btn');

	function init() {
		_blinkArrow();
		_setUpListeners();
	};

	function _setUpListeners() {
		$('.section__scroll-btn').on('click', _scrollDown);
		$(document).on('scroll', _hideArrow);
		$('.accordion__element').on('mouseenter', function() {
			$(this).find('.accordion__arrow').addClass('flash animated');
		});
		$('.accordion__element').on('mouseleave', function() {
			$(this).find('.accordion__arrow').removeClass('flash animated');
		});
	};

	function _hideArrow() {
		var currentTopEdge = $(document).scrollTop();
		if (currentTopEdge > 610) {
			$(arrow)
				.css('opacity', '0')
				.css('visibility', 'hidden');
		};
	};

	function _scrollDown() {
		$('html, body').animate({scrollTop: 680},500);
		$(arrow).toggleClass('hidden', true);
		return false;
	};

	function _blinkArrow() {
		var currentTopEdge = $(document).scrollTop();

		if (currentTopEdge < 650) {
			setTimeout(function() {
				blink(arrow);
			}, timeOut);
		}			
	};

	function blink(elem) {
		$(elem)
			.fadeOut(duration)
			.fadeIn(duration)
			.fadeOut(duration)
			.fadeIn(duration);
	};



	return {
		init: init
	};

})();

$(document).ready(function() {
	scrollArrow.init();
});
