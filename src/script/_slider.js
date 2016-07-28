


//sliders
$(document).ready(function() {

	var experts = $('.experts__profile-list');
	var network = $('.network__list');
	var expertsNav = $('.experts__list');
	var slideNum = 0;
	var smallSlideNum = 0;

	if ($(window).width() < 880) {
		$('html').addClass('mobile');
		initSliders();
	};

	expertsNav.slick({
		slidesToShow: 13,
		draggable: false,
		infinite: false,
		slide: 'li'
	});

	$('.experts__item').on('click', _syncSlider);

	function _syncSlider() {
		var $this = $(this),
			smallSlider = $this.closest('.experts__list')
			smallSlides = smallSlider.find('li'),
			slidersContainer = smallSlider.closest('.experts'),
			bigSlider = slidersContainer.find('.experts__profile-list'),
			bigSlides = bigSlider.find('li'),
			initialSlide = slidersContainer.find('.experts__profile-item--blank'),
			slideNum = $this.attr('data-number');
		_getActive($this);
		bigSlides.each(function(index,element) {
			if (index == slideNum) {
				initialSlide.hide();

				$(element)
					.fadeIn()
					.siblings()
					.hide();
			};
		});

	};

	function _getActive(item) {
		item
			.addClass('active')
			.siblings()
			.removeClass('active');	
	}

	function initSliders() {
		$('.experts__profile-item--blank').hide();
		network.slick({
			adaptiveHeight: true,
			sweepToSlide: true,
			prevArrow: '<button type="button" class="arrow-prev"></button>',
			nextArrow: '<button type="button" class="arrow-next"></button>'
		});
		experts.each(function (index, item) {
			$(item)
				.find('li')
				.show()
		});	
		experts
			.slick({
				slide:'li',
				adaptiveHeight: true,
				sweepToSlide: true,
				prevArrow: '<button type="button" class="arrow-prev"></button>',
				nextArrow: '<button type="button" class="arrow-next"></button>'
			});
		// $(experts).on('afterChange', function(event, slick, currentSlide) {
		// 	slideNum = parseInt(currentSlide);
		// });
	};

	function destroySliders() {
		$('.experts__profile-item--blank').hide();
		
		experts.slick('unslick');
		network.slick('unslick');
		experts.each(function (index, item) {
			$(item)
				.find('li')
				.removeAttr('tabindex')
				.removeAttr('role')
				.removeAttr('aria-describedby')
				.eq(slideNum)
				.css('display', 'block')
				.siblings()
				.hide();
		})
		expertsNav.each(function (index, item) {
			$(item).find('li.active')
			.removeClass('active')
			.closest('ul')
			.find('li')
			.not('.slick-cloned')
			.filter(function() {
				return ($(this).attr('data-number') == slideNum)
			})
			.addClass('active')
		})
			
	};

	$(window).resize(function() {
		if ($(this).width() < 880) {
			if (!$('html').hasClass('mobile')) {
				initSliders();
				$('html').addClass('mobile');
			}
		} else {
			if ($('html').hasClass('mobile')) {
				destroySliders();
				$('html').removeClass('mobile');
			};
		};
	});

	$('.slick-arrow').on('click', function() {
		var $this = $(this);
		var isNextDisabled = $this.attr('aria-disabled');
		var direction = $this.attr('aria-label');

		if (isNextDisabled == 'true') {
			var slider = $(this).closest('ul');
			var countSlides = $(slider).find('li').last().attr('data-number');
			if (direction == 'Next') {
				slider.slick('slickGoTo', 0);
			} else if ($('html').hasClass('mobile')) {
				slider.slick('slickGoTo', countSlides + 1);
			} else {
				slider.slick('slickGoTo', countSlides - 12);
			}
			
		}
	})
});
