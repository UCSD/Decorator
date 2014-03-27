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


(function($) {
    $(document).ready(function() {

        /*
         * Note, there is currently a bug in flexslider when there are multiple
         * slider on a page. if one particular slider disables pause/play and
         * paging control, subsequent sliders with pause/play and paging enabled
         * will not display the controls properly.
         */
        $(".flexslider").each(function() {

            var slider = $(this);

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
            if (slider.has(".controls").size() > 0) {
                settings = $.extend(settings, {
                    controlNav: true,
                    controlsContainer: ".controls",
                    pausePlay: true
                });
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

            $(this).flexslider(settings);
        });
    });
})(jQuery);




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