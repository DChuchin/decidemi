
//accordion
var accordion = (function () {

	function init() {
		_setUpListeners();
	};

	function _setUpListeners() {
		$('.accordion__element').on('click', _openAccordion);
	};

	function _openAccordion() {

		if ($(window).width() > 880) {
			var $this = $(this),
				thisItem = $($this).closest('.accordion__item'),
				thisContent = $(thisItem).find('.accordion__content-wrapper'),
				duration = 300;

			if ($(thisItem).hasClass('open')) {
				$(thisItem)
					.removeClass('open');
				$(thisContent)
					.stop(true,true)
					.slideUp(duration);
			} else {
				$(thisItem)
					.addClass('open')
					.find('.accordion__content-wrapper')
					.stop(true,true)
					.slideDown(duration);
				$(thisItem)
					.siblings()
					.removeClass('open')
					.find('.accordion__content-wrapper')
					.stop(true,true)
					.slideUp(duration);
			}	
		}		
	};

	return {
		init: init
	};

})();

accordion.init();