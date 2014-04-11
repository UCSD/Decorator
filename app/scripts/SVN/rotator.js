/**
 * rotator Js.
 * 
 * image rotator - with play/pause. requires jquery and jquery cycle
 */

(function($) {

	/* image rotator */
	$.fn.rotator = function() {
		this
				.each(function() {
					var rotator = $(this);
					var id = rotator.attr("id");

					rotator.after('<div id="' + id
							+ '-nav" class="tdr_slideshow_nav"></div>');
					rotator
							.next()
							.after(
									'<div id="'
											+ id
											+ '-control" class="tdr_slideshow_control playing">Pause</div>');

					/* uses jquery cycle */
					rotator.cycle({
						fx : 'fade',
						pager : '#' + id + '-nav'
					});

					rotator.next().next().toggle(function() {
						rotator.cycle('pause');
						var control = $(this);
						control.removeClass('playing');
						control.addClass('paused');
						control.html('Resume');
					}, function() {
						rotator.cycle('resume', true);
						var control = $(this);
						control.removeClass('paused');
						control.addClass('playing');
						control.html('Pause');
					});
				});
	};

})(jQuery);