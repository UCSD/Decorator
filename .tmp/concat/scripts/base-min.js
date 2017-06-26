(function(document) {
  var desktop = 960;
  var mobileBreakpoint = 640;
  var navListIsOpened = undefined;

  var mainNav = function() {
    var navBtn = $('.btn-nav')[0];
    var navList = $('.navdrawer-container')[0];
    var layoutHeader = $('.layout-header')[0]; // for menu button transition
    var layoutMain = $('.layout-main')[0];
    var layoutFooter = $('.layout-footer')[0];
    var navIsOpenedClass = 'navbar-is-opened';
    var menuOpen = 'open';


    var toggleMainNav = function() {
      if (navListIsOpened == undefined || !navListIsOpened) {
        addClass(navList, navIsOpenedClass);

        addClass(layoutHeader, menuOpen);
        addClass(layoutMain, menuOpen);
        addClass(layoutFooter, menuOpen);
        navListIsOpened = true;

        // min-height is for Safari 9.0.3 where bottom nav item is cut off
        $('body').css('width', '100%').css('min-height', '100%');
        $('.navdrawer-container').css('z-index', '100').css('opacity', '1').css('overflow-y', 'scroll');
        $('.search-content').css('position', 'relative').css('width', '100%');

        $('.layout-navbar .navbar-list>li:first-child').css('border-left', 'solid 1px #C8CFD3');
        $('.navdrawer-container.navbar-is-opened .navbar-list>li>a').css('border', '0').css('font-weight', '700').css('background', '#ECECEC').css('padding', '10px 10px 10px 20px').css('border-bottom', '1px solid #ccc');
        $('.navdrawer-container ul.navbar-sublist').css('display', 'block').css('position', 'relative').css('border-left', '0').css('border-top', '0');
        $('.navdrawer-container .navbar-sublist a').css('border', '0').css('margin', '0').css('display', 'block').css('background', '#FFF').css('color', '#004b6e').css('padding', '9px 2.5em 8px');

        if (!isMobileView()) {
          $('.navdrawer-container').css('width', '42%');
        } else {
          $('.navdrawer-container').css('width', '83%');
          $('body').css('position', 'fixed');
        }

      } else {
        removeClass(navList, navIsOpenedClass);

        removeClass(layoutHeader, menuOpen);
        removeClass(layoutMain, menuOpen);
        removeClass(layoutFooter, menuOpen);
        navListIsOpened = false;

        $('body').css('position', '').css('width', '').css('min-height', '');
        $('.navdrawer-container').css('z-index', '').css('opacity', '0').css('overflow-y', '').css('width', '');
        $('.search-content').css('position', 'absolute').css('width', '');
      }
    };

    if (navBtn.addEventListener) { // ie8 conditional
      navBtn.addEventListener('click', function(e) {
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
    var subNavArray = $('.navbar-subnav'),
      subListArray = $('.navbar-sublist'),
      subNavList = 'subnav-is-opened',
      subNavHover = 'subnav-hover',
      subNavIsOpened = false;
    var preIndex;

    /* if there are subNav elements run */
    if (subNavArray) {
      subNavArray.each(function(index) {
        var subNav = subNavArray[index],
          subList = subListArray[index];

        /* relocated toggleSubNav function due to variable scoping issues */
        var toggleSubNav = function() {
          // check if subList opened, reset if antoher is already opened
          checkToggleSubNav();

          if (!subNavIsOpened) {
            addClass(subList, subNavList);
            subNavIsOpened = !subNavIsOpened;
            preIndex = index;
          } else {
            removeClass(subList, subNavList);
            subNavIsOpened = !subNavIsOpened;
          }
        };

        var checkToggleSubNav = function() {
          var checkSubNav = $('.subnav-is-opened')[0];

          if (checkSubNav) {
            removeClass(checkSubNav, subNavList);
            if (preIndex != index)
              subNavIsOpened = false;
          }
        };

        if (subNav.addEventListener) {


          if (subList != undefined) {
            subList.addEventListener('click', function(e) {
              e.stopPropagation();
            });
          }

          subNav.addEventListener('mouseover', function(e) {
            e.preventDefault();

            if (!isMobileView()) {
              addClass(subNav, subNavHover);
              subNavIsOpened = !subNavIsOpened;
            }
          });

          subNav.addEventListener('mouseout', function(e) {
            e.preventDefault();

            if (!isMobileView()) {
              removeClass(subNav, subNavHover);
              subNavIsOpened = !subNavIsOpened;
            }
          });
        } else { // ie 7/8 fix
          subNav.attachEvent("onclick", function() {
            toggleSubNav();
          });

          subNav.attachEvent("onmouseover", function() {
            if (!isMobileView()) {
              addClass(subNav, subNavHover);
              subNavIsOpened = true;
            }
          });
          subNav.attachEvent("onmouseout", function() {
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
    var searchBtn = $('.search-toggle')[0];
    var searchContent = $('.search-content')[0];
    var searchOpen = 'search-is-open';
    var isSearchOpen = false;

    var toggleSearch = function() {
      if (!isSearchOpen) {
        addClass(searchContent, searchOpen);
        addClass(searchBtn, searchOpen);
        isSearchOpen = true;
      } else {
        removeClass(searchContent, searchOpen);
        removeClass(searchBtn, searchOpen);
        isSearchOpen = false;
      }
    };

    if (searchBtn.addEventListener) {
      searchBtn.addEventListener('click', function(e) {
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
    return (browserWidth < (mobileBreakpoint + 1));
  };

  var addClass = function(element, className) {
    if (!element) {
      return;
    }
    element.className = element.className.replace(/\s+$/gi, '') + ' ' + className;
  };

  var removeClass = function(element, className) {
    if (!element) {
      return;
    }
    element.className = element.className.replace(className, '');
  };

  var isMenuWrapped = false;
  var menuWrappedWindowWidth = 0;

  var checkMenuHeight = function() {

    if (menuWrappedWindowWidth != 0 && $(window).width() > menuWrappedWindowWidth) {
      // page width has expanded to a point where menu is no longer wrapping
      isMenuWrapped = false;
      menuWrappedWindowWidth = 0;
      $('.layout-header button.btn-nav').css('display', 'none');
      $('.navdrawer-container').css('width', '100%').css('z-index', '100').css('opacity', '1').css('overflow-y', '');
      $('.navdrawer-container ul.navbar-sublist').css('display', '').css('position', '').css('border-left', '').css('border-top', '');
    }

    // check to see if the first menu item and last menu item are on the same row
    var t1 = $('nav .navbar-list>li:first').offset().top;
    var t2 = $('nav .navbar-list>li:last').offset().top;

    if (t1 != t2) {
      if (!isMenuWrapped) {
        // menu items are now wrapping
        isMenuWrapped = true;
        menuWrappedWindowWidth = $(window).width();

        $('.layout-header button.btn-nav').css('display', 'block');
        $('.navdrawer-container').css('position', 'absolute').css('z-index', '-1').css('opacity', '0').css('overflow-y', 'scroll');
        //$('.navdrawer-container').css('z-index', '-1').css('opacity', '0').css('overflow-y', 'scroll');
      }
    }
  }

  mainNav();
  mainSubNav();
  mainSearch();

  document.addEventListener('DOMContentLoaded', function(e) {
    if (isMobileView()) {
      $(".form-control").removeAttr("autofocus")
    } else {
      if ($(window).width() > desktop) {
        checkMenuHeight();
      }
    }
  });

  $(window).resize(function() {
    if ($(window).width() > desktop && navListIsOpened !== undefined) {
      // reset css to be compatible with media queries
      $('.layout-header button.btn-nav').css('display', 'none');
      $('.navdrawer-container').css('width', '100%').css('z-index', '100').css('opacity', '1').css('overflow-y', '').css('position', '');
      $('.navdrawer-container ul.navbar-sublist').css('display', '').css('position', '').css('border-left', '').css('border-top', '');
      $('.layout-navbar .navbar-list>li>a').css('color', '#004b6e').css('background-color', '#FDFDFD').css('border-bottom', 'solid 3px rgba(255,255,255,.4)').css('border-right', 'solid 1px #C8CFD3').css('border-left', 'solid 1px rgba(255,255,255,.6)').css('text-decoration', 'none').css('padding', '9px 15px').css('line-height', '1.3').css('font-weight', '').css('border-bottom-color', '');
      $('.navdrawer-container .navbar-sublist a').css('display', 'block').css('background', '#FFF').css('border-bottom', 'solid 1px #C8CFD3').css('border-right', 'solid 1px #C8CFD3').css('border-left', 'solid 1px rgba(255,255,255,.6)').css('color', '#004b6e').css('padding', '9px 15px 8px').css('text-decoration', 'none');

      $('.navbar-subnav').hover(function() {
        $(this).addClass('subnav-hover');
        $('.navdrawer-container .navbar-subnav:hover>a').css('border-bottom', 'solid 3px #9FB3BF');
      }, function() {
        $(this).removeClass('subnav-hover');
        $('.navdrawer-container .navbar-subnav>a').css('border-bottom', '');
      });

      $('.navbar-subnav .navbar-sublist li').hover(function() {
        $(this).css('background-color', '#EAEAEA');
      }, function() {
        $('.navbar-subnav .navbar-sublist li>a').css('background-color', '');
      });

    } else if (navListIsOpened !== undefined) {
      $('.layout-header button.btn-nav').css('display', 'block');
      //$('.navdrawer-container').css('position', 'fixed').css('z-index', '-1').css('overflow-y', 'scroll');
      $('.navdrawer-container').css('z-index', '-1').css('overflow-y', 'scroll');
    }

    if ($(window).width() > desktop) {
      checkMenuHeight();
    }
  });
})(document);

(function(document) {
    var title = $(".title-header"),
        titleShort = $(".title-header-short"),
        titleWidth = title[0].offsetWidth,
        logoWidth = 229,
        menuWidth = 62,
        titleOverflow,
        titleWrapper;

    var removeLongTitle = function () {
        title.toggle( false );
        titleShort.toggle( true );
    };

    var showLongTitle = function () {
        title.toggle( true );
        titleShort.toggle( false );
    };

    var checkOverflow = function( titleOverflow, titleWrapper ) {
        if ( titleOverflow > titleWrapper ) {
            removeLongTitle();
        } else {
            showLongTitle();
        }
    };

    var checkTitleOverflow = function () {
        // titleWrapper initialized here to dynamically
        titleWrapper = $(".layout-title .layout-container")[0].offsetWidth;

        // NO hamburger menu & logo on right
        if ( titleWrapper >= 960 ) {
            titleOverflow =  titleWidth + logoWidth + 1;
            checkOverflow( titleOverflow, titleWrapper);
        }
        // hamburger menu & logo on right
        else if( titleWrapper > 768 ) {
            titleOverflow = titleWidth + logoWidth + menuWidth + 1;
            checkOverflow( titleOverflow, titleWrapper);
        }
        // hamburger menu & logo on left
        else if( titleWrapper <= 768 ) {
            titleOverflow = titleWidth + menuWidth + 1;
            checkOverflow( titleOverflow, titleWrapper);
        }
    };

    // ToDo: function callback only registers twice
    $(window).resize( function () {
        checkTitleOverflow();
    });

    $(window).ready( function () {
        checkTitleOverflow();
    });
})(document);
/**
 * drawer
 */
$(document).ready(function() {
  $('.drawer').each(function() {
    var drawer = $(this);

    /* create wrapper class */
    drawer.wrap('<div class="drawer-wrapper main-section-content"/>');
    var drawerWrapper = drawer.parent();

    /* insert expand all links */
    var link = '<div class="drawer-toggle"><a href="#" class="expand">Expand All</a></div>';
    drawerWrapper.prepend(link);
    drawerWrapper.append(link);

    /* build drawer */
    drawer.children("div").toggle();
    drawer.children("article").toggle(); // support CMS use of .drawer > article

    drawer.children("h2").click(function() {
      $(this).toggleClass("expand");
      $(this).next().toggle();
      if ($(this).hasClass("expand")) {
        window.location.hash = $(this).find('a').text().replace(/\s/g, '-').substring(0, 31);
      }
      return false;
    });

    drawerWrapper.find(".drawer-toggle a").click(function() {
      /* open or close drawers */
      if ($(this).hasClass("expand")) {
        expandAll(drawerWrapper);
      } else {
        collapseAll(drawerWrapper);
      }

      /* reset all toggle links */
      resetLink(drawerWrapper);
      if (window.history && window.history.pushState) {
        window.history.pushState('', '', window.location.pathname)
      } else {
        window.location.href = window.location.href.replace(/#.*$/, '#');
      }
      return false;
    });

    /* open the drawer if the url points to this drawer */
    $(window).load(function() {
      drawer.children("h2").each(function() {
        if (window.location.hash == '#' + $(this).find('a').text().replace(/\s/g, '-').substring(0, 31)) {
          var newPosition = $(this).offset();
          $(this).toggleClass('expand').next().toggle();
          setTimeout(function() {
            window.scrollTo(0, newPosition.top);
          }, 50);
        }
      });
    });
  });

  /* expand all drawers */
  function expandAll(drawerWrapper) {
    drawerWrapper.children(".drawer").children("h2").addClass("expand");
    drawerWrapper.children(".drawer").children("div").show();
    drawerWrapper.children(".drawer").children("article").show(); // support CMS use of .drawer > article
		return false;
  }

  /* close all drawers */
  function collapseAll(drawerWrapper) {
    drawerWrapper.children(".drawer").children("h2").removeClass("expand");
    drawerWrapper.children(".drawer").children("div").hide();
    drawerWrapper.children(".drawer").children("article").hide(); // support CMS use of .drawer > article
		return false;
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
});

/* initialize copyright year */
function initCopyright() {
	var today = new Date();
	var footerCopyrightYear = '.footer-copyright-year';
	$(footerCopyrightYear).empty();
	$(footerCopyrightYear).append(today.getFullYear());
};
/* initialize footer links */
function initFooter(feedbackUrl) {
	feedbackUrl = feedbackUrl + location.pathname;
	var footerFeedback = '.footer-feedback';
	var feedback_url = "<a href=\"";
	feedback_url += feedbackUrl;
	feedback_url += "\" onclick=\"window.open('";
	feedback_url += feedbackUrl;
	feedback_url += "', 'DYGWYW', 'menubar=0,resizable=1,scrollbars=1,width=450,height=650');\" target=\"DYGWYW\">Feedback</a>";
	$(footerFeedback).empty();
	$(footerFeedback).append(feedback_url);
};
/* initialize login links */
function initLogout(logoutUrl) {
	var url = "https://a4.ucsd.edu/tritON/resources/bugscript.jsp?target=https%3A%2F%2Fwww.ucsd.edu&jsoncallback=?";
	$.getJSON(url, function(data) {
		var loginHeader = $('.layout-header');
		var loginStatus = 'isLoggedIn';

		if (data.eduUcsdActLoggedin) {
			var layoutLogin = '.layout-login .layout-container';
			var url = "<span class=\"login-content\">You are logged in | <a href=\"https://act.ucsd.edu/security/logout?url=";

			url += logoutUrl;
			url += "\">Log Out</a></span>";
			$(layoutLogin).empty();
			$(layoutLogin).append(url);

			loginHeader.addClass(loginStatus);
		} else {
			loginHeader.removeClass(loginStatus);
		}
	});
};
$('.social-list li').click(function(e) {
    window.location.href = $(this).find('a').attr('href');
});
(function($) {
	$(document).ready(function() {
		/*
		 * Note, there is currently a bug in flexslider when there are multiple
		 * slider on a page. if one particular slider disables pause/play and
		 * paging control, subsequent sliders with pause/play and paging enabled
		 * will not display the controls properly.
		 */
		$(".flexslider").each(function() {
			var slider = $(this), flexCaption = $('.flex-caption');

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
			if (slider.has(".flex-controls").length > 0) {
				settings = $.extend(settings, {
					controlNav: true,
					controlsContainer: ".flex-controls",
					pausePlay: true,
					slideshow: true
				});
			}

			if (Modernizr.touch) {
                            settings = $.extend(settings, {
                                animation: "slide"
                            });

                            flexCaption.css({
                                "display": "block",
                                "padding": "10px",
                                "left": "auto",
                                "width": "inherit",
                                "box-sizing": "border-box",
                                "-moz-box-sizing": "border-box",
                                "-webkit-box-sizing": "border-box",
                                "z-index": "9"
                            });

                            if (navigator.userAgent.match(/(iPad|iPhone|iPod)/g)) {
                            	settings = $.extend(settings, {
                            		useCSS: false,
                            		start: function(){
									    flexCaption.css({
									    	"padding": "2%"
									    });
									},

                            		before: function(){
									    flexCaption.css({
									    	"width": "100%"
									    });
									},

									after: function(){
									    flexCaption.css({
									    	"width": "inherit"
									    });
									}
                            	});
                            }
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

			if (slider.find('li').length == 1) { // Disable touch/controls/play if there's only one list item within the slider.
				settings = $.extend(settings, {
					touch: false,
					controlNav: false,
					pausePlay: false
				});
			}

			if(typeof blinkPausePlay == 'function') {
			    blinkPausePlay(slider, settings);
			}

			if(!(typeof blinkPausePlay == 'function')) {
			    $(this).flexslider(settings);
			}

			if (Modernizr.touch) {
				if (slider.has(".controls").length > 0) {
				    slider.children(".controls").appendTo(slider);
			    };
			};
		});
	});
})(jQuery);
// Easy Responsive Tabs Plugin
// Author: Samson.Onna <Email : samson3d@gmail.com>, Jonathan Chang

var isMobileView = function() {
    var browserWidth = window.innerWidth;
    var mobileBreakpoint = 640;

    return (browserWidth < (mobileBreakpoint+1));
};

(function ($) {
    $.fn.extend({
        easyResponsiveTabs: function (options) {
            //Set the default values, use comma to separate the settings, example:
            var defaults = {
                type: 'default', //default, vertical, accordion;
                width: 'auto',
                fit: true,
                closed: false,
                activate: function(){}
            }
            //Variables
            var options = $.extend(defaults, options);
            var opt = options,
                jtype = opt.type,
                jfit = opt.fit,
                jwidth = opt.width,
                vtabs = 'vertical',
                accord = 'accordion';


            //Update: ttessema@ucsd.edu
            /** Auto Select the first tab and tab container **/
            var init = function(){
                if($(".resp-tab-item").length > 0 && $(".resp-tab-content").length > 0)
                {
                    $(".resp-tab-item").first().addClass("resp-tab-active");
                    $(".resp-tab-content").first().addClass("resp-content-active");
                }
            };

            //Events
            $(this).bind('tabactivate', function(e, currentTab) {
                if(typeof options.activate === 'function') {
                    options.activate.call(currentTab, e)
                }
            });

            //Main function
            this.each(function () {
                var $respTabs = $(this);
                var $respTabsList = $respTabs.find('ul.resp-tabs-list');


                $respTabs.find('ul.resp-tabs-list li').addClass('resp-tab-item');
                $respTabs.css({
                    'display': 'block',
                    'width': jwidth
                });

                $respTabs.find('.resp-tabs-container > div').addClass('resp-tab-content');
                jtab_options();
                //Properties Function
                function jtab_options() {
                    if (jtype == vtabs) {
                        $respTabs.addClass('resp-vtabs');
                    }
                    if (jfit == true) {
                        $respTabs.css({ width: '72%', margin: '0px' });

                        if(isMobileView()) {
                            $respTabs.css({width: '100%'})
                        }
                    }
                    if (jtype == accord) {
                        $respTabs.addClass('resp-easy-accordion');
                        $respTabs.find('.resp-tabs-list').css('display', 'none');
                    }
                }

                //Assigning the 'aria-controls' to Tab items
                var count = 0,
                    $tabContent;
                $respTabs.find('.resp-tab-item').each(function () {
                    $tabItem = $(this);
                    $tabItem.attr('aria-controls', 'tab_item-' + (count));
                    $tabItem.attr('role', 'tab');

                    //First active tab, keep closed if option = 'closed' or option is 'accordion' and the element is in accordion mode
                    if(options.closed !== true && !(options.closed === 'accordion' && !$respTabsList.is(':visible')) && !(options.closed === 'tabs' && $respTabsList.is(':visible'))) {
                        $respTabs.find('.resp-tab-item').first().addClass('resp-tab-active');
                        $respTabs.find('.resp-accordion').first().addClass('resp-tab-active');
                        $respTabs.find('.resp-tab-content').first().addClass('resp-tab-content-active').attr('style', 'display:block');
                    }

                    //Assigning the 'aria-labelledby' attr to tab-content
                    var tabcount = 0;
                    $respTabs.find('.resp-tab-content').each(function () {
                        $tabContent = $(this);
                        $tabContent.attr('aria-labelledby', 'tab_item-' + (tabcount));
                        tabcount++;
                    });
                    count++;
                });

                //Tab Click action function
                $respTabs.find("[role=tab]").each(function () {
                    var $currentTab = $(this);
                    $currentTab.click(function () {

                        var $tabAria = $currentTab.attr('aria-controls');

                        if ($currentTab.hasClass('resp-accordion') && $currentTab.hasClass('resp-tab-active')) {
                            $respTabs.find('.resp-tab-content-active').slideUp(200, function () { $(this).addClass('resp-accordion-closed'); });
                            $currentTab.removeClass('resp-tab-active');
                            return false;
                        }
                        if (!$currentTab.hasClass('resp-tab-active') && $currentTab.hasClass('resp-accordion')) {
                            $respTabs.find('.resp-tab-active').removeClass('resp-tab-active');
                            $respTabs.find('.resp-tab-content-active').slideUp(200).removeClass('resp-tab-content-active resp-accordion-closed');
                            $respTabs.find("[aria-controls=" + $tabAria + "]").addClass('resp-tab-active');

                            $respTabs.find('.resp-tab-content[aria-labelledby = ' + $tabAria + ']').slideDown(200).addClass('resp-tab-content-active');
                        } else {
                            $respTabs.find('.resp-tab-active').removeClass('resp-tab-active');
                            $respTabs.find('.resp-tab-content-active').removeAttr('style').removeClass('resp-tab-content-active').removeClass('resp-accordion-closed');
                            $respTabs.find("[aria-controls=" + $tabAria + "]").addClass('resp-tab-active');
                            $respTabs.find('.resp-tab-content[aria-labelledby = ' + $tabAria + ']').addClass('resp-tab-content-active').attr('style', 'display:block');
                        }
                        //Trigger tab activation event
                        $currentTab.trigger('tabactivate', $currentTab);
                    });
                    //Window resize function
                    $(window).resize(function () {
                        $respTabs.find('.resp-accordion-closed').removeAttr('style');
                    });
                });
            });
        }
    });
})(jQuery);

var loadProfile = function() {
    $(document).ready(function () {
        $('#profileTab').easyResponsiveTabs({
            type: 'default', //Types: default, vertical, accordion
            width: 'auto', //auto or any width like 600px
            fit: true   // 100% fit in a container
        });

        function responsiveTab() {
            if(isMobileView()) {
                $('#profileTab').css({ width: '100%' });

            } else {
                $('#profileTab').css({ width: '72%' });
            }
        }

        $(window).bind('load orientationchange resize', responsiveTab);
    });
};