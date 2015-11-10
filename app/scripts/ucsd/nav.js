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

        if(navBtn.addEventListener) { // ie8 conditional
            navBtn.addEventListener('click', function (e) {
                e.preventDefault();

                toggleMainNav();
            });
        } else {
            navBtn.attachEvent("onclick", function() {
                toggleMainNav();
            })
        }
    };

    var mainSubNav = function() {
        var subNavArray     = $('.navbar-subnav'),
            subListArray    = $('.navbar-sublist'),
            subNavList      = 'subnav-is-opened',
            subNavHover     = 'subnav-hover',
            subNavIsOpened  = false;
        var preIndex;

        /* if there are subNav elements run */
        if(subNavArray) {
            subNavArray.each( function(index) {
                var subNav  = subNavArray[index],
                    subList = subListArray[index];

                /* relocated toggleSubNav function due to variable scoping issues */
                var toggleSubNav = function() {
                    // check if subList opened, reset if antoher is already opened
                    checkToggleSubNav();

                    if(!subNavIsOpened) {
                        addClass(subList, subNavList);
                        subNavIsOpened = !subNavIsOpened;
                        preIndex       = index;
                    } else {
                        removeClass(subList, subNavList);
                        subNavIsOpened = !subNavIsOpened;
                    }
                };

                var checkToggleSubNav = function() {
                    var checkSubNav     = $('.subnav-is-opened')[0];

                    if(checkSubNav) {
                        removeClass(checkSubNav, subNavList);
                        if(preIndex != index)
                            subNavIsOpened = false;
                    }
                };

                if (subNav.addEventListener) {
                    subNav.addEventListener('click', function (e) {
                        if (isMobileView())
                            e.preventDefault();

                        e.stopPropagation();
                        toggleSubNav();
                    });

                    subList.addEventListener('click', function (e) {
                        e.stopPropagation();
                    });

                    subNav.addEventListener('mouseover', function (e) {
                        e.preventDefault();

                        if (!isMobileView()) {
                            addClass(subNav, subNavHover);
                            subNavIsOpened = !subNavIsOpened;
                        }
                    });

                    subNav.addEventListener('mouseout', function (e) {
                        e.preventDefault();

                        if (!isMobileView()) {
                            removeClass(subNav, subNavHover);
                            subNavIsOpened = !subNavIsOpened;
                        }
                    });
                } else { // ie 7/8 fix
                    subNav.attachEvent("onclick", function () {
                        toggleSubNav();
                    });

                    subNav.attachEvent("onmouseover", function () {
                        if (!isMobileView()) {
                            addClass(subNav, subNavHover);
                            subNavIsOpened = true;
                        }
                    });
                    subNav.attachEvent("onmouseout", function () {
                        if (!isMobileView()) {
                            removeClass(subNav, subNavHover);
                            subNavIsOpened = false;
                        }
                    });
                }
            });
        }
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

        if(searchBtn.addEventListener) {
            searchBtn.addEventListener('click', function (e) {
                e.preventDefault();
                toggleSearch();
            });
        } else {
            searchBtn.attachEvent("onclick", function() {
                toggleSearch();
            })
        }
    };

    var isMobileView = function() {
        var browserWidth = window.innerWidth;
        var mobileDesktopBorder = 768;

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

