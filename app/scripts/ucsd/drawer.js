/**
 * drawer
 */
 document.addEventListener("DOMContentLoaded", function () {
  const drawers = document.querySelectorAll('.drawer');

  function normalizeTextToHash(str) {
    return str
      .replace(/&amp;/g, 'and')
      .replace(/[^a-zA-Z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .toLowerCase()
      .substring(0, 50);
  }

  drawers.forEach(drawer => {
    // Wrap drawer
    const wrapper = document.createElement('div');
    wrapper.className = 'drawer-wrapper main-section-content';
    drawer.parentNode.insertBefore(wrapper, drawer);
    wrapper.appendChild(drawer);

    // Create toggle links
    const expandLink = document.createElement('div');
    expandLink.className = 'drawer-toggle';
    expandLink.innerHTML = '<a href="#" class="expand">Expand All</a>';
    const collapseLink = expandLink.cloneNode(true);

    wrapper.insertBefore(expandLink, drawer);
    wrapper.appendChild(collapseLink);

    // Set aria-expanded to false
    drawer.querySelectorAll('h2 > a').forEach(a => {
      a.setAttribute('aria-expanded', 'false');
    });

    // Initially hide only immediate siblings of each h2
    drawer.querySelectorAll('h2 + div, h2 + article').forEach(el => {
      el.style.display = 'none';
    });

    // Click on h2 toggles drawer
    drawer.querySelectorAll('h2').forEach(h2 => {
      h2.addEventListener('click', function (event) {
        const content = h2.nextElementSibling;
        const link = h2.querySelector('a');
        const expanded = h2.classList.toggle('expand');
        if (link) link.setAttribute('aria-expanded', expanded ? 'true' : 'false');
        if (content) content.style.display = expanded ? 'block' : 'none';

        if (expanded && link) {
          const hash = normalizeTextToHash(link.textContent);
          history.replaceState(null, '', '#' + hash);
        }

        event.preventDefault();
      });
    });

    // Expand/Collapse All
    wrapper.querySelectorAll('.drawer-toggle a').forEach(toggle => {
      toggle.addEventListener('click', function (e) {
        const isExpanding = toggle.classList.contains('expand');
        drawer.querySelectorAll('h2').forEach(h2 => {
          const link = h2.querySelector('a');
          const content = h2.nextElementSibling;
          h2.classList.toggle('expand', isExpanding);
          if (link) link.setAttribute('aria-expanded', isExpanding ? 'true' : 'false');
          if (content) content.style.display = isExpanding ? 'block' : 'none';
        });

        wrapper.querySelectorAll('.drawer-toggle a').forEach(link => {
          link.textContent = isExpanding ? 'Collapse All' : 'Expand All';
          link.classList.toggle('expand', !isExpanding);
        });

        if (history.pushState) {
          history.pushState('', '', location.pathname);
        } else {
          location.href = location.href.replace(/#.*$/, '#');
        }

        e.preventDefault();
      });
    });
  });

  // Open matching drawer based on hash
  const hash = location.hash.replace('#', '').toLowerCase();
  if (hash) {
    drawers.forEach(drawer => {
      drawer.querySelectorAll('h2').forEach(h2 => {
        const link = h2.querySelector('a');
        if (link && normalizeTextToHash(link.textContent) === hash) {
          const content = h2.nextElementSibling;
          h2.classList.add('expand');
          link.setAttribute('aria-expanded', 'true');
          if (content) content.style.display = 'block';

          setTimeout(() => {
            const offset = h2.getBoundingClientRect().top + window.scrollY - 70;
            window.scrollTo({ top: offset, behavior: 'smooth' });
          }, 50);
        }
      });
    });
  }

  // Enable anchor link clicks after load
  document.addEventListener('click', function (e) {
    const anchor = e.target.closest('a[href^="#"]');
    if (!anchor || anchor.closest('h2')) return;
    const targetId = anchor.getAttribute('href').replace('#', '');
    if (!targetId) return;

    const target = document.getElementById(targetId);
    if (target) {
      const content = target.closest('div');
      const h2 = content ? content.previousElementSibling : null;

      if (h2 && h2.tagName.toLowerCase() === 'h2') {
        h2.classList.add('expand');
        const link = h2.querySelector('a');
        if (link) link.setAttribute('aria-expanded', 'true');
        content.style.display = 'block';
      }
    }
  });
});