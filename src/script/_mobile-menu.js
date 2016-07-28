
//mobile menu
var mobileMenu = (function () {

	function init() {
		_setUpListeners();
	};

	function _setUpListeners() {
		$('.main-header').on('click', _openMobile);
		$('.main-menu__link').on('click', _closeMobile);
		$('.header__logo-container').click(_closeMobile);
		$(window).resize(function() {
			var header = $('.main-header'),
			menu = $('.main-menu');
			if ($(this).width() < 880) {
				if (!header.hasClass('open-menu')) {
					$(menu).hide();
				}
				
			} else {
				$(header).removeClass('open-menu');
				$(menu).show();
			}
				
		})

	};

	function _openMobile(e) {
		if ($(e.target).hasClass('mobile-menu') || $(e.target).hasClass('mobile-menu__line') ) {
			e.preventDefault();
			var header = $('.main-header'),
				menuBtn = $(e.target).closest('.mobile-menu'),
				menu = $('.main-menu');
			$(header).toggleClass('open-menu');
			$(menu).stop(true,true).slideToggle();
		}
	};

	function _closeMobile() {
		if ($('html').hasClass('mobile')) {
			var header = $('.main-header'),
				menu = $('.main-menu');
			$(header).removeClass('open-menu');
			$(menu).stop(true,true).slideUp();
		}
	};

	return {
		init: init
	};

})();

mobileMenu.init();