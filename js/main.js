; (function () {

	'use strict';

	var isMobile = {
		Android: function () {
			return navigator.userAgent.match(/Android/i);
		},
		BlackBerry: function () {
			return navigator.userAgent.match(/BlackBerry/i);
		},
		iOS: function () {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
		Opera: function () {
			return navigator.userAgent.match(/Opera Mini/i);
		},
		Windows: function () {
			return navigator.userAgent.match(/IEMobile/i);
		},
		any: function () {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	};

	var fullHeight = function () {
		if (!isMobile.any()) {
			var $fullHeightElements = $('.js-fullheight');

			var updateHeightAndScrollbar = function () {
				var windowHeight = $(window).height();
				$fullHeightElements.css('height', windowHeight);

				// Check if the content height exceeds the window height
				$fullHeightElements.each(function () {
					var $this = $(this);
					if ($this[0].scrollHeight > windowHeight) {
						$this.css('overflow', 'auto'); // Enable scrolling
					} else {
						$this.css('overflow', 'hidden'); // Hide scrollbar
					}
				});
			};

			updateHeightAndScrollbar();

			$(window).resize(function () {
				updateHeightAndScrollbar();
			});
		}
	};

	var counter = function () {
		$('.js-counter').countTo({
			formatter: function (value, options) {
				return value.toFixed(options.decimals);
			},
		});
	};

	var counterWayPoint = function () {
		if ($('#colorlib-counter').length > 0) {
			$('#colorlib-counter').waypoint(function (direction) {
				if (direction === 'down' && !$(this.element).hasClass('animated')) {
					setTimeout(counter, 400);
					$(this.element).addClass('animated');
				}
			}, { offset: '90%' });
		}
	};

	// Modified Animations
	var contentWayPoint = function () {
		$('.animate-box').waypoint(function (direction) {
			if (direction === 'down' && !$(this.element).hasClass('animated')) {
				$('.animate-box').each(function () {
					var el = $(this);
					var effect = el.data('animate-effect');
					el.css('visibility', 'visible'); // Ensure visibility
					if (effect === 'fadeIn') {
						el.addClass('fadeIn animated');
					} else if (effect === 'fadeInLeft') {
						el.addClass('fadeInLeft animated');
					} else if (effect === 'fadeInRight') {
						el.addClass('fadeInRight animated');
					} else {
						el.addClass('fadeInUp animated');
					}
				});
			}
		}, { offset: '85%' });
	};

	var burgerMenu = function () {
		$('.js-colorlib-nav-toggle').on('click', function (event) {
			event.preventDefault();
			var $this = $(this);

			if ($('body').hasClass('offcanvas')) {
				$this.removeClass('active');
				$('body').removeClass('offcanvas');
			} else {
				$this.addClass('active');
				$('body').addClass('offcanvas');
			}
		});
	};

	// Click outside of offcanvas
	var mobileMenuOutsideClick = function () {
		$(document).click(function (e) {
			var container = $("#colorlib-aside, .js-colorlib-nav-toggle");
			if (!container.is(e.target) && container.has(e.target).length === 0) {
				if ($('body').hasClass('offcanvas')) {
					$('body').removeClass('offcanvas');
					$('.js-colorlib-nav-toggle').removeClass('active');
				}
			}
		});

		$(window).scroll(function () {
			if ($('body').hasClass('offcanvas')) {
				$('body').removeClass('offcanvas');
				$('.js-colorlib-nav-toggle').removeClass('active');
			}
		});
	};

	var clickMenu = function () {
		$('#navbar a:not([class="external"])').click(function (event) {
			// If the link is not external and does not have target="_blank", handle it as a navigation link
			if (!$(this).attr('target') || $(this).attr('target') !== '_blank') {
				var section = $(this).data('nav-section'),
					navbar = $('#navbar');

				if ($('[data-section="' + section + '"]').length) {
					$('html, body').animate({
						scrollTop: $('[data-section="' + section + '"]').offset().top - 55
					}, 500);
				}

				if (navbar.is(':visible')) {
					navbar.removeClass('in');
					navbar.attr('aria-expanded', 'true');
					$('.js-colorlib-nav-toggle').removeClass('active');
				}

				event.preventDefault(); // Prevent default only for handled navigation links
			}
		});
	};


	// Reflect scrolling in navigation
	var navActive = function (section) {
		var $el = $('#navbar > ul');
		$el.find('li').removeClass('active');
		$el.each(function () {
			$(this).find('a[data-nav-section="' + section + '"]').closest('li').addClass('active');
		});
	};

	var navigationSection = function () {
		var $section = $('section[data-section]');

		// Waypoint for scrolling down
		$section.waypoint(function (direction) {
			if (direction === 'down') {
				navActive($(this.element).data('section'));
			}
		}, {
			offset: '300px' // Adjust this value to trigger earlier or later
		});

		// Waypoint for scrolling up
		$section.waypoint(function (direction) {
			if (direction === 'up') {
				navActive($(this.element).data('section'));
			}
		}, {
			offset: function () {
				return -$(this.element).height() + 300; // Adjust this value for upward scrolling
			}
		});
	};


	var sliderMain = function () {
		$('#colorlib-hero .flexslider').flexslider({
			animation: "fade",
			slideshow: false, // Disable automatic slideshow
			directionNav: true, // Keep navigation buttons
			start: function () {
				setTimeout(function () {
					$('.slider-text').removeClass('animated fadeInUp');
					$('.flex-active-slide').find('.slider-text').addClass('animated fadeInUp');
				}, 500);
			},
			before: function () {
				setTimeout(function () {
					$('.slider-text').removeClass('animated fadeInUp');
					$('.flex-active-slide').find('.slider-text').addClass('animated fadeInUp');
				}, 500);
			}
		});
	};

	var stickyFunction = function () {
		var $stickyItem = $("#sticky_item");
		if ($stickyItem.length > 0) { // Check if element exists
			var h = $('.image-content').outerHeight();

			if ($(window).width() <= 992) {
				$stickyItem.trigger("sticky_kit:detach");
			} else {
				$('.sticky-parent').removeClass('stick-detach');
				$stickyItem.trigger("sticky_kit:detach");
				$stickyItem.trigger("sticky_kit:unstick");
			}

			$(window).resize(function () {
				var h = $('.image-content').outerHeight();
				$('.sticky-parent').css('height', h);

				if ($(window).width() <= 992) {
					$stickyItem.trigger("sticky_kit:detach");
				} else {
					$('.sticky-parent').removeClass('stick-detach');
					$stickyItem.trigger("sticky_kit:detach");
					$stickyItem.trigger("sticky_kit:unstick");

					$stickyItem.stick_in_parent();
				}
			});

			$('.sticky-parent').css('height', h);

			$stickyItem.stick_in_parent();
		} else {
			//
		}
	};


	var owlCrouselFeatureSlide = function () {
		$('.owl-carousel').owlCarousel({
			animateOut: 'fadeOut',
			animateIn: 'fadeIn',
			autoplay: true,
			loop: true,
			margin: 0,
			nav: true,
			dots: false,
			autoHeight: true,
			items: 1,
			navText: [
				"<i class='icon-arrow-left3 owl-direction'></i>",
				"<i class='icon-arrow-right3 owl-direction'></i>"
			]
		});
	};

	// Document on load.
	$(function () {
		fullHeight();
		counter();
		counterWayPoint();
		contentWayPoint();
		burgerMenu();
		clickMenu();
		navigationSection();
		mobileMenuOutsideClick();
		sliderMain();
		stickyFunction();
		owlCrouselFeatureSlide();
	});

}());


function scrollToSection() {
	const section = document.querySelector('[data-section="samples"]');
	if (section) {
		section.scrollIntoView({ behavior: 'smooth' });
	}
}

function scrollToAbout() {
	const section = document.querySelector('[data-section="about"]');
	if (section) {
		section.scrollIntoView({ behavior: 'smooth' });
	}
}

function scrollToSkills() {
	const section = document.querySelector('[data-section="skills"]');
	if (section) {
		section.scrollIntoView({ behavior: 'smooth' });
	}
}

function scrollToProjects() {
	const section = document.querySelector('[data-section="projects"]');
	if (section) {
		section.scrollIntoView({ behavior: 'smooth' });
	}
}

function scrollToExperience() {
	const section = document.querySelector('[data-section="experience"]');
	if (section) {
		section.scrollIntoView({ behavior: 'smooth' });
	}
}

function scrollToContact() {
	const section = document.querySelector('[data-section="contact"]');
	if (section) {
		section.scrollIntoView({ behavior: 'smooth' });
	}
}