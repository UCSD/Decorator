/**
 * Widget Js. Contains drawer, image rotator, and toggler.
 * 
 * drawer - with expand all/collapse all. requires jquery image rotator - with
 * play/pause. requires jquery and jquery cycle toggler - with expand
 * all/collapse all. requires jquery
 */

(function($) {

	$.fn.drawer = function() {

		this
				.each(function() {
					drawer = $(this);

					/* add drawer class */
					drawer.addClass("drawer");

					/* create wrapper class */
					drawer.wrap('<div class="drawer-wrapper"/>');
					var drawerWrapper = drawer.parent();

					/* insert links */
					var link = '<div class="drawer-toggle"><a href="#" class="expand">Expand All</a></div>';
					drawerWrapper.prepend(link);
					drawerWrapper.append(link);

					/* build drawer */
					drawer.children("div").toggle();

					drawer.children("h2").click(function() {
						$(this).toggleClass("expand");
						$(this).next().toggle();
						return false;
					});

					drawerWrapper.find(".drawer-toggle a").click(function() {
						/* open or close drawers */
						if ($(this).hasClass("expand"))
							expandAll(drawerWrapper);
						else
							collapseAll(drawerWrapper);

						/* reset all toggle links */
						resetLink(drawerWrapper);

						return false;
					});
					
					/* open the drawer if the url points to this drawer */
					drawer.children("h2").each(function() {
						if(window.location.hash == '#'+$(this).text().replace(/\s/g,'-').substring(0,31) ){
							$(this).toggleClass('expand').next().toggle();
						};	
					});
					 
				});

		/* expand all drawers */
		function expandAll(drawerWrapper) {
			drawerWrapper.children(".drawer").children("h2").addClass("expand");
			drawerWrapper.children(".drawer").children("div").show();
		}

		/* close all drawers */
		function collapseAll(drawerWrapper) {
			drawerWrapper.children(".drawer").children("h2").removeClass(
					"expand");
			drawerWrapper.children(".drawer").children("div").hide();
		}

		/* reset drawer toggle link */
		function resetLink(drawerWrapper) {
			drawerWrapper.find(".drawer-toggle a").each(function() {
				element = $(this);
				if (element.hasClass("expand"))
					element.html("Collapse All");
				else
					element.html("Expand All");
				element.toggleClass("expand");
			});
		}
	};

})(jQuery);