(function($) {
	$(document).ready(function() {
		/*
		 * Note, there is currently a bug in flexslider when there are multiple
		 * slider on a page. if one particular slider disables pause/play and
		 * paging control, subsequent sliders with pause/play and paging enabled
		 * will not display the controls properly.
		 */
		$(".flexslider").each(function() {
			var slider = $(this), flexCaption = $('.flex-caption');

			/*
			 * default settings. enable auto slideshow. enable pause/play and
			 * paging control. disable direction control.
			 */
			var settings = {
				controlNav: false,
				directionNav: false,
				nextText: "&gt;",
				prevText: "&lt;"
			};

			/*
			 * update settings if pause/play and paging control is disabled.
			 */
			if (slider.has(".flex-controls").length > 0) {
				settings = $.extend(settings, {
					controlNav: true,
					controlsContainer: ".flex-controls",
					pausePlay: true,
					slideshow: true
				});
			}

			if (Modernizr.touch) {
                            settings = $.extend(settings, {
                                animation: "slide"
                            });

                            flexCaption.css({
                                "display": "block",
                                "padding": "10px",
                                "left": "auto",
                                "width": "inherit",
                                "box-sizing": "border-box",
                                "-moz-box-sizing": "border-box",
                                "-webkit-box-sizing": "border-box",
                                "z-index": "9"
                            });

                            if (navigator.userAgent.match(/(iPad|iPhone|iPod)/g)) {
                            	settings = $.extend(settings, {
                            		useCSS: false,
                            		start: function(){
									    flexCaption.css({
									    	"padding": "2%"
									    });
									},

                            		before: function(){
									    flexCaption.css({
									    	"width": "100%"
									    });
									},

									after: function(){
									    flexCaption.css({
									    	"width": "inherit"
									    });
									}
                            	});
                            }
			}
			/*
			 * update settings if alternative theme.
			 */
			if (slider.hasClass("alt")) {
				settings = $.extend(settings, {
					directionNav: true
				});
			}
			/*
			 * update settings if auto slideshow is disabled, enable direction
			 * control.
			 */
			if (slider.hasClass("noSlideShow")) {
				settings = $.extend(settings, {
					controlNav: false,
					slideshow : false,
					directionNav : true
				});
			}

			if (slider.find('li').length == 1) { // Disable touch/controls/play if there's only one list item within the slider.
				settings = $.extend(settings, {
					touch: false,
					controlNav: false,
					pausePlay: false
				});
			}

			if(typeof blinkPausePlay == 'function') {
			    blinkPausePlay(slider, settings);
			}

			if(!(typeof blinkPausePlay == 'function')) {
			    $(this).flexslider(settings);
			}

			if (Modernizr.touch) {
				if (slider.has(".controls").length > 0) {
				    slider.children(".controls").appendTo(slider);
			    };
			};
		});
	});
})(jQuery);