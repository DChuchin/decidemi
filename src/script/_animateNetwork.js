

//animate network
var animateNetwork = (function () {

	function init() {
		_setUpListeners();
	};

	function _setUpListeners() {
		$('.network__wrapper')
			.on('mouseenter', _showBlock)
			.on('mouseleave', _hideBlock)
	};

	function _showBlock() {
		if ($(window).width() > 880) {
			var $this = $(this),
				block = $this.find('.network__content');

			$(block).fadeIn(200);
		}	
	};

	function _hideBlock() {
		if ($(window).width() > 880) {
			var $this = $(this),
				block = $this.find('.network__content');

			$(block).fadeOut(200);
		}
	};

	return {
		init: init
	};

})();

animateNetwork.init();