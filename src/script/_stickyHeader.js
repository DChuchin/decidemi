
//sticky header
var headerNav = (function () {

	function init() {
		_setUpListeners();
	};

	function _setUpListeners() {
		$('.footer__btn-up').click(_scrollTop);
		$('.header__logo-container').click(_scrollTop);
		$('.main-menu__wrapper').click(_scrollToSection);
	};

	function _scrollTop(e) {
		e.stopPropagation();
		e.preventDefault();

		$('html, body').animate({scrollTop: 0},1000);
	};

	function _scrollToSection(e) {
		e.preventDefault();
		var target = e.target;

		if ($(target).hasClass('main-menu__link')) {
			var href = $(target).attr('href');
			_scrolling(href);
		}
	};

	function _scrolling(anchor) {
		var anchorTop = $(anchor).offset().top 
		if ($('html').hasClass('mobile')) {
			anchorTop -= 72;
		} else {
			anchorTop -= 94;
		}
		$('html, body').animate({scrollTop: anchorTop},1000);
	};

	return {
		init: init
	};

})();

headerNav.init();

var sticky = new Waypoint.Sticky({
  element: $('.header__container')[0],
  offset: -1
});