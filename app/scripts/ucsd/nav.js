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

                $('.navdrawer-container').css('z-index', '100').css('opacity', '1');
                $('.search-content').css('position', 'relative').css('width', '100%');

                $('.layout-navbar .navbar-list>li:first-child').css('border-left', 'solid 1px #C8CFD3');
                $('.navdrawer-container.navbar-is-opened .navbar-list>li>a').css('border', '0').css('font-weight', '700').css('background', '#ECECEC').css('padding', '10px 10px 10px 20px').css('border-bottom', '1px solid #ccc');
                $('.navdrawer-container ul.navbar-sublist').css('display', 'block').css('position', 'relative').css('border-left', '0').css('border-top', '0');
                $('.navdrawer-container .navbar-sublist a').css('border', '0').css('margin','0').css('display', 'block').css('background', '#FFF').css('color', '#004b6e').css('padding', '9px 2.5em 8px');

                if (!isMobileView()) {
                  $('.navdrawer-container').css('width', '42%');
                }

            } else {
                removeClass(navList, navIsOpenedClass);

                removeClass(layoutHeader, menuOpen);
                removeClass(layoutMain, menuOpen);
                removeClass(layoutFooter, menuOpen);
                navListIsOpened = false;

                $('.navdrawer-container').css('z-index', '').css('opacity', '0').css('width','');
                $('.search-content').css('position', 'absolute').css('width', '');
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

                    if (subList != undefined) {
                      subList.addEventListener('click', function (e) {
                          e.stopPropagation();
                      });
                    }

                    subNav.addEventListener('DOMContentLoaded', function (e) {
                        if (!isMobileView()) {
                            $(".form-control").removeAttr("autofocus")
                        }
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

    var isMenuWrapped = false;
    var menuWrappedWindowWidth = 0;

    var checkMenuHeight = function() {
        if (menuWrappedWindowWidth != 0 && $(window).width() > menuWrappedWindowWidth) {
          isMenuWrapped = false;
          menuWrappedWindowWidth = 0;
          $('.layout-header button.btn-nav').css('display', 'none');
          $('.navdrawer-container').css('width', '100%').css('z-index', '100').css('opacity', '1').css('overflow-y', '');
          $('.navdrawer-container ul.navbar-sublist').css('display', '').css('position', '').css('border-left', '').css('border-top', '');
        }

        var t1 = $('.navbar-list>li').first().offset().top;
        var t2 = $('.navbar-list>li').last().offset().top;

        if (t1 != t2) {
          if (!isMenuWrapped) {
            isMenuWrapped = true;
            menuWrappedWindowWidth = $(window).width();

            $('.layout-header button.btn-nav').css('display', 'block');
            $('.navdrawer-container').css('position', 'fixed').css('z-index', '-1').css('opacity', '0').css('overflow-y', 'scroll');
          }
        }
    }

    mainNav();
    mainSubNav();
    mainSearch();

    $(window).resize(function() {
        checkMenuHeight();
    });

    checkMenuHeight();
})(document);
