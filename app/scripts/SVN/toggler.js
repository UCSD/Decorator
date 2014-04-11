/**
 * toggler.
 * 
 * toggler - with expand all/collapse all. requires jquery.
 */

(function($) {

	/* toggler */
	$.fn.toggler = function() {
		// SETTINGS
		var settings = {
			startclosed : this.is(".start_closed"),
			hastopcontrol : this.is(".top_control"),
			hasbottomcontrol : this.is(".bottom_control"),
			topcontrol : '',
			bottomcontrol : '',
			controllers : '',
			terms : this.find('dt'),
			defs : this.find('dd')
		};

		// VARIABLES

		// FUNCTIONS
		var toggle_all = function() {
			if ($(settings.topcontrol).hasClass('sf_all_expanded')
					|| $(settings.bottomcontrol).hasClass('sf_all_expanded')) {
				collapse_all();
			} else {
				expand_all();
			}
		};

		var collapse_all = function() {
			$(settings.controllers).each(
					function(i) {
						$(this).removeClass('sf_all_expanded').addClass(
								'sf_all_collapsed');
					});
			settings.terms.each(function(i) {
				collapse_one(this);
			});
		};

		var expand_all = function() {
			$(settings.controllers).each(
					function(i) {
						$(this).removeClass('sf_all_collapsed').addClass(
								'sf_all_expanded');
					});
			settings.terms.each(function(i) {
				expand_one(this);
			});
		};

		var toggle_one = function(term) {
			if ($(term).hasClass('sf_one_expanded')) {
				collapse_one(term);
			} else {
				expand_one(term);
			}
		};
		var collapse_one = function(term) {
			$(term).next().hide();
			$(term).removeClass('sf_one_expanded').addClass('sf_one_collapsed');
			return false;
		};

		var expand_one = function(term) {
			$(term).next().show();
			$(term).removeClass('sf_one_collapsed').addClass('sf_one_expanded');
			return false;
		};

		// SETUP
		if (settings.hastopcontrol) {
			settings.topcontrol = $("<p class=\"sf_toggle_master\">Expand/Collapse All</p>");
			$(this).before(settings.topcontrol);
		}

		if (settings.hasbottomcontrol) {
			settings.bottomcontrol = $("<p class=\"sf_toggle_master\">Expand/Collapse All</p>");
			$(this).after(settings.bottomcontrol);
		}

		settings.controllers = [ settings.topcontrol ]
				.concat([ settings.bottomcontrol ]);

		settings.terms.each(function(i) {
			$(this).addClass('sf_one_expanded');
			$(this).click(function() {
				toggle_one(this);
			});
		});

		$(settings.controllers).each(function(i) {
			$(this).addClass('sf_all_expanded');
			$(this).click(function() {
				toggle_all();
			});
		});

		if (settings.startclosed) {
			collapse_all();
		}
	};

})(jQuery);