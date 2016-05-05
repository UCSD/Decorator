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
