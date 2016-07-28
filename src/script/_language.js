
//choose language
var language = (function () {

	function init() {
		_setUpListeners();
	};

	function _setUpListeners() {
		$('.header__language-link').click(_changeLang);
	};

	function _changeLang(e) {
		e.preventDeafault;

		var link = $(this),
			item = link.closest('li');

		if (!$(item).hasClass('checked')) {
			item
				.addClass('checked')
				.siblings()
				.removeClass('checked');
		};
	};

	return {
		init: init
	};
})();

language.init();