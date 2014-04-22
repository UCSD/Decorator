/*****************
 *
 *  NAV MENU / SEARCH
 *
 */

(function($) {
    $(document).ready(function() {
        /* do we have a nav menu? */
        var hasNav = false
        if ($("#tdr_nav_list > li").length > 0)
            hasNav = true;

        if (hasNav) {
            /* init nav menu */
            $("#tdr_nav_list").superfish({
                autoArrows : false
            });
        } else {
            /* hide menu icon */
            $("#tdr_title_menu_link").attr("style", "display: none");
            $("#tdr_title_content").addClass("noMenu");
        }
    });

})(jQuery);

(function($) {
    $(document).ready(function() {
        /* menu link */
        $("#tdr_title_menu_link").click(function(event) {
            event.preventDefault();
            $("#tdr_nav_list").toggleClass("show");
            if ($("#tdr_nav_list").hasClass("show")) {
                // if search link is show, hide it
                if ($("#tdr_search").hasClass("show")) {
                    $("#tdr_search").removeClass("show");
                }
            }
        });

        /* search link */
        $("#tdr_title_search_link").click(function(event) {
            event.preventDefault();
            $("#tdr_search").toggleClass("show")
            if ($("#tdr_search").hasClass("show")) {
                // if menu link is show, hide it
                if ($("#tdr_nav_list").hasClass("show")) {
                    $("#tdr_nav_list").removeClass("show");
                }
            }
        });

        $(function() {
            $(".navbar-toggle").on("click", function() {
                // apply/remove the active class to the row-offcanvas element
                $("body").toggleClass("active");
            });
        });
    });
})(jQuery);

$(document).ready(function() {

    function navMover() {

            if ($(window).width() <= 767) {
                $("#tdr_nav").insertBefore("#tdr_fonts");
            }

            else {
                $("#tdr_nav").insertAfter("#tdr_title");
            }
    }

    $(window).on('ready orientationchange resize', navMover);
});

