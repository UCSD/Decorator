/**
 * Created by jkchang on 4/1/2015.
 */
(function(document) {
    var mainNav = function() {
        var navBtn              = $('.btn-nav')[0];
        var navList             = $('.navdrawer-container')[0];
        var layoutHeader        = $('.layout-header')[0];         // for menu button transition
        var layoutMain          = $('.layout-main')[0];
        var layoutFooter        = $('.layout-footer')[0];
        var navIsOpenedClass    = 'navbar-is-opened';
        var menuOpen            = 'open';
        var navListIsOpened     = false;

        var toggleMainNav = function() {
            if (!navListIsOpened) {
                addClass(navList, navIsOpenedClass);

                addClass(layoutHeader, menuOpen);
                addClass(layoutMain, menuOpen);
                addClass(layoutFooter, menuOpen);
                navListIsOpened = true;
            } else {
                removeClass(navList, navIsOpenedClass);

                removeClass(layoutHeader, menuOpen);
                removeClass(layoutMain, menuOpen);
                removeClass(layoutFooter, menuOpen);
                navListIsOpened = false;
            }
        };

        navBtn.attachEvent("onclick", function() {
            toggleMainNav();
        });
    };

    var mainSubNav = function() {
        var subNav          = $('.navbar-subnav')[0];
        var subList         = $('.navbar-sublist')[0];
        var subNavList      = 'subnav-is-opened';
        var subNavHover     = 'subnav-hover';
        var subNavIsOpened  = false;

        var toggleSubNav = function() {
            if(!subNavIsOpened) {
                addClass(subList, subNavList);
                subNavIsOpened = !subNavIsOpened;
            } else {
                removeClass(subList, subNavList);
                subNavIsOpened = !subNavIsOpened;
            }
        };

        subNav.attachEvent("onclick", function() {
            toggleSubNav();
        });

        subNav.attachEvent("onmouseover", function() {
            if(!isMobileView()) {
                addClass(subNav, subNavHover);
                subNavIsOpened = true;
            }
        });
        subNav.attachEvent("onmouseout", function() {
            if(!isMobileView()) {
                removeClass(subNav, subNavHover);
                subNavIsOpened = false;
            }
        });
    };

    var mainSearch = function() {
        var searchBtn       = $('.search-toggle')[0];
        var searchContent   = $('.search-content')[0];
        var searchOpen      = 'search-is-open';
        var isSearchOpen    = false;

        var toggleSearch = function() {
            if(!isSearchOpen) {
                addClass(searchContent, searchOpen);
                addClass(searchBtn, searchOpen);
                isSearchOpen = true;
            } else {
                removeClass(searchContent, searchOpen);
                removeClass(searchBtn, searchOpen);
                isSearchOpen = false;
            }
        };

        searchBtn.attachEvent("onclick", function() {
            toggleSearch();
        });
    };

    var isMobileView = function() {
        var browserWidth = window.innerWidth;
        var mobileDesktopBorder = 960;

        return (browserWidth < (mobileDesktopBorder+1));
    };

    var addClass = function (element, className) {
        if (!element) { return; }
        element.className = element.className.replace(/\s+$/gi, '') + ' ' + className;
    };

    var removeClass = function(element, className) {
        if (!element) { return; }
        element.className = element.className.replace(className, '');
    };

    mainNav();
    mainSubNav();
    mainSearch();
})(document);