/*! A fix for the iOS orientationchange zoom bug.
 Script by @scottjehl, rebound by @wilto.
 MIT License.
 */
(function (w) {

    // This fix addresses an iOS bug, so return early if the UA claims it's something else.
    if (!( /iPhone|iPad|iPod/.test(navigator.platform) && navigator.userAgent.indexOf("AppleWebKit") > -1 )) {
        return;
    }

    var doc = w.document;

    if (!doc.querySelector) {
        return;
    }

    var meta = doc.querySelector("meta[name=viewport]"),
        initialContent = meta && meta.getAttribute("content"),
        disabledZoom = initialContent + ",maximum-scale=1",
        enabledZoom = initialContent + ",maximum-scale=10",
        enabled = true,
        x, y, z, aig;

    if (!meta) {
        return;
    }

    function restoreZoom() {
        meta.setAttribute("content", enabledZoom);
        enabled = true;
    }

    function disableZoom() {
        meta.setAttribute("content", disabledZoom);
        enabled = false;
    }

    function checkTilt(e) {
        aig = e.accelerationIncludingGravity;
        x = Math.abs(aig.x);
        y = Math.abs(aig.y);
        z = Math.abs(aig.z);

        // If portrait orientation and in one of the danger zones
        if (!w.orientation && ( x > 7 || ( ( z > 6 && y < 8 || z < 8 && y > 6 ) && x > 5 ) )) {
            if (enabled) {
                disableZoom();
            }
        }
        else if (!enabled) {
            restoreZoom();
        }
    }

    w.addEventListener("orientationchange", restoreZoom, false);
    w.addEventListener("devicemotion", checkTilt, false);

})(this);

(function ($) {
    $(document).ready(function () {
        $("#tdr_env_link").click(function () {
            $("#tdr_env_detail").toggle("hide");
        });
    });
})(jQuery);

(function ($) {
    $(document).ready(function () {

        /* do we have a nav menu? */
        var hasNav = false
        if ($("#tdr_nav_list > li").length > 0)
            hasNav = true;

        if (hasNav) {
            /* init nav menu */
            $("#tdr_nav_list").superfish({
                autoArrows: false
            });
        } else {
            /* hide menu icon */
            $("#tdr_title_menu_link").attr("style", "display: none");
            $("#tdr_title_content").addClass("noMenu");
        }
    });
})(jQuery);

(function ($) {
    $(document).ready(function () {
        /* menu link */
        $("#tdr_title_menu_link").click(function (event) {
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
        $("#tdr_title_search_link").click(function (event) {
            event.preventDefault();
            $("#tdr_search").toggleClass("show")
            if ($("#tdr_search").hasClass("show")) {
                // if menu link is show, hide it
                if ($("#tdr_nav_list").hasClass("show")) {
                    $("#tdr_nav_list").removeClass("show");
                }
            }
        });
    });
})(jQuery);