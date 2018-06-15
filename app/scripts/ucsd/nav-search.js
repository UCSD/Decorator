$(document).ready(function() {

    var $body = $('body'),
        desktopBreak = 768,
        maxNavHeight = 38,
        $topNav = $('#tdr_nav'),
        $window = $(window),
        $search = $topNav.find('.tdr_search'),
        $searchBtn = $topNav.find('.btn-default'),
        $navList = $('.tdr_nav_list'),

    /* do we have a nav menu? */
        hasNav = false;


    if ($navList.find('> li').length > 0) {
        hasNav = true;
    }

    if (hasNav) {
        /* init nav menu */
        $navList.superfish({
            cssArrows: false
        });
    } else {
        /* hide menu icon */
        $("#tdr_title_menu_link").attr("style", "display: none");
        $("#tdr_title_content").addClass("noMenu");
    }

    /* search link */
    $("#tdr_search_toggle").click(function(event) {
        $search.toggleClass("show");
    });

    $("#tdr_search_toggle").click(function(event) {
        $searchBtn.toggleClass("btn-s");
    });

    $(".navbar-toggle").on("click", function() {
        $body.toggleClass("active");
        if ($('#tdr_search_content>form').length) {
            $('#tdr_search_content>form').appendTo($('.nav-offcanvas>.tdr_search'));
            $('#tdr_nav .tdr_nav_list').appendTo('#tdr_side_nav');
        } else {
            $('.nav-offcanvas>.tdr_search>form').appendTo($('#tdr_search_content'));
            $('#tdr_side_nav>.tdr_nav_list').prependTo('#tdr_nav_content');
        }
        /* init nav menu */
        $navList.superfish({
            cssArrows: false
        });
    });

    function navMover() {
        if ($window.width() >= desktopBreak) {

            if ($body.hasClass("active")) {

                $body.removeClass("active");

                if ($('#tdr_search_content>form').length) {
                    //
                } else {
                    $('.nav-offcanvas>.tdr_search>form').appendTo($('#tdr_search_content'));
                    $('#tdr_side_nav>.tdr_nav_list').prependTo('#tdr_nav_content');
                    /* init nav menu */
                    $navList.superfish({
                        cssArrows: false
                    });
                }

            }

            if ($topNav.height() > maxNavHeight ) {
                $body.addClass('collapse-nav');
            } else {
                $body.removeClass('collapse-nav');
            }
        }

        if ($window.width() < desktopBreak && $body.hasClass("collapse-nav")) {
            $body.removeClass("collapse-nav");
        }


    }


    FastClick.attach(document.body);

    // Detecting IE 7
    var oldIE = false;
    if(navigator.appVersion.indexOf("MSIE 7.")!=-1) {
        oldIE = true;
    }

    if (!oldIE) {
        $window.on('load orientationchange resize', navMover);
    }


});