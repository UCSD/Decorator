/**
 * drawer
 */
 $(document).ready(function() {
  $('.drawer').each(function() {
    var drawer = $(this);

    /*set aria-expand attribute to h2 links*/

    $('.drawer > h2 > a').attr('aria-expanded','false')

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
      $(this).find('a').attr('aria-expanded', $(this).find('a').attr('aria-expanded') == 'true' ? 'false' : 'true');
      //$(this).find('a').attr('aria-label', $(this).find('a').attr('aria-label') == 'Drawer Is Expanded' ? 'Drawer Is Collapsed' : 'Drawer Is Expanded');
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
    $(window).on('load',function() {
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
    drawerWrapper.children(".drawer").children("h2").children("a").attr("aria-expanded","true");
    drawerWrapper.children(".drawer").children("div").show();
    drawerWrapper.children(".drawer").children("article").show(); // support CMS use of .drawer > article
		return false;
  }

  /* close all drawers */
  function collapseAll(drawerWrapper) {
    drawerWrapper.children(".drawer").children("h2").removeClass("expand");
    drawerWrapper.children(".drawer").children("h2").children("a").attr("aria-expanded","false");
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

/* Expand Anchors Update */ 

document.addEventListener("DOMContentLoaded", initDrawer);

function initDrawer() {
    // Ensure all drawers start collapsed
    
    // Listen for clicks on anchor links within the page
    document.addEventListener("click", function (event) {
        const anchor = event.target.closest("a[href]");
        if (anchor && !isInsideH2(anchor)) {
            // Extract target ID from href (e.g., #emdash -> emdash)
            const targetId = anchor.getAttribute("href").replace("#", "");
            if (targetId) {
                // Find the element with the matching ID
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    // Expand only the specific drawer related to the target
                    expandSingleDrawer(targetElement);
                }
            }
        }
    });
}

function resetDrawerStyles() {
    // Ensure all <h2> elements start without the "expand" class
    document.querySelectorAll(".drawer h2.expand").forEach(h2 => {
        h2.classList.remove("expand");
    });

    // Ensure all <div> elements containing matched IDs start with display: none;
    document.querySelectorAll(".drawer h2 + div").forEach(div => {
        div.style.display = "none";
    });
}

function expandSingleDrawer(targetElement) {
    // Step 3: Find the parent <div> that contains the target ID
    const parentDiv = targetElement.closest("div");
    
    if (parentDiv) {
        // Step 4: Find the <h2> immediately before this <div> within the same .drawer
        let h2 = null;
        let sibling = parentDiv.previousElementSibling;

        while (sibling) {
            if (sibling.tagName.toLowerCase() === "h2") {
                h2 = sibling;
                break;
            }
            sibling = sibling.previousElementSibling;
        }

        if (h2) {
            // Step 5: Apply the changes
            h2.classList.add("expand"); // Add the "expand" class
            parentDiv.style.display = "block"; // Show the <div>
        }
    }
}

function isInsideH2(element) {
    // Check if the element is inside an <h2> (to prevent accidental expansion)
    return element.closest("h2") !== null;
}