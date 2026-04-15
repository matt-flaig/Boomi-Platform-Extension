document.arrive(".qm-c-servicenav", function (nav) {
  $(nav)
    .find(".qm-c-inlinemenu__menu-link")
    .each(function () {
      var anchor = $(this);
      var parent = anchor.parent();

      var desc = this.innerHTML;
      var href = anchor.attr("href");

      parent.addClass("qm-c-inlinemenu__descriptive-composite-menu-item");
      anchor
        .removeClass("qm-c-inlinemenu__menu-link")
        .addClass("qm-c-inlinemenu__descriptive-composite-menu-link");
      this.innerHTML = `<p class="qm-c-inlinemenu__descriptive-composite-menu-detail">${desc}</p>`;
      anchor.css("width", "14em");

      parent.append(`<a class="gwt-Anchor svg-anchor qm-c-inlinemenu__descriptive-composite-menu-icon" href="${href}" target="_blank">
                    <svg xmlns=http://www.w3.org/2000/svg viewBox="0 0 32 32" width="32" height="32" style="width: 16px; height: 16px;">
                      <title>Open in new tab.</title>
                      <path class="svg-foreground" d="M18.7273 3.99994C18.7274 3.39745 19.2159 2.9091 19.8183 2.90918L27.9991 2.91027C28.6015 2.91035 29.0898 3.39866 29.0898 4.00103L29.0909 12.1818C29.091 12.7843 28.6027 13.2727 28.0002 13.2728C27.3977 13.2729 26.9092 12.7845 26.9091 12.1821L26.9082 5.09194L19.8181 5.091C19.2156 5.09092 18.7272 4.60244 18.7273 3.99994Z"></path>
                      <path class="svg-foreground" d="M28.7676 3.23261C29.1937 3.65863 29.1937 4.34936 28.7676 4.77538L18.9495 14.5936C18.5234 15.0196 17.8327 15.0196 17.4067 14.5936C16.9807 14.1675 16.9807 13.4768 17.4067 13.0508L27.2249 3.23261C27.6509 2.80658 28.3416 2.80658 28.7676 3.23261Z"></path>
                      <path class="svg-foreground" d="M3.54822 7.91175C3.95739 7.50258 4.51234 7.27271 5.091 7.27271H13.8183C14.4208 7.27271 14.9092 7.76112 14.9092 8.36361C14.9092 8.96611 14.4208 9.45452 13.8183 9.45452L5.091 9.45452L5.091 26.9091H22.5455V18.1818C22.5455 17.5793 23.034 17.0909 23.6365 17.0909C24.2389 17.0909 24.7274 17.5793 24.7274 18.1818V26.9091C24.7274 27.4877 24.4975 28.0427 24.0883 28.4518C23.6791 28.861 23.1242 29.0909 22.5455 29.0909H5.091C4.51235 29.0909 3.95739 28.861 3.54822 28.4518C3.13905 28.0427 2.90918 27.4877 2.90918 26.9091V9.45452C2.90918 8.87587 3.13905 8.32091 3.54822 7.91175Z"></path>
                    </svg>
                  </a>`);
    });

  document.unbindArrive(".qm-c-servicenav");
});

// New UI detection (React/web-component based nav with shadow DOM)
var openTabSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" style="width: 16px; height: 16px;">
                      <title>Open in new tab.</title>
                      <path fill="currentColor" d="M18.7273 3.99994C18.7274 3.39745 19.2159 2.9091 19.8183 2.90918L27.9991 2.91027C28.6015 2.91035 29.0898 3.39866 29.0898 4.00103L29.0909 12.1818C29.091 12.7843 28.6027 13.2727 28.0002 13.2728C27.3977 13.2729 26.9092 12.7845 26.9091 12.1821L26.9082 5.09194L19.8181 5.091C19.2156 5.09092 18.7272 4.60244 18.7273 3.99994Z"></path>
                      <path fill="currentColor" d="M28.7676 3.23261C29.1937 3.65863 29.1937 4.34936 28.7676 4.77538L18.9495 14.5936C18.5234 15.0196 17.8327 15.0196 17.4067 14.5936C16.9807 14.1675 16.9807 13.4768 17.4067 13.0508L27.2249 3.23261C27.6509 2.80658 28.3416 2.80658 28.7676 3.23261Z"></path>
                      <path fill="currentColor" d="M3.54822 7.91175C3.95739 7.50258 4.51234 7.27271 5.091 7.27271H13.8183C14.4208 7.27271 14.9092 7.76112 14.9092 8.36361C14.9092 8.96611 14.4208 9.45452 13.8183 9.45452L5.091 9.45452L5.091 26.9091H22.5455V18.1818C22.5455 17.5793 23.034 17.0909 23.6365 17.0909C24.2389 17.0909 24.7274 17.5793 24.7274 18.1818V26.9091C24.7274 27.4877 24.4975 28.0427 24.0883 28.4518C23.6791 28.861 23.1242 29.0909 22.5455 29.0909H5.091C4.51235 29.0909 3.95739 28.861 3.54822 28.4518C3.13905 28.0427 2.90918 27.4877 2.90918 26.9091V9.45452C2.90918 8.87587 3.13905 8.32091 3.54822 7.91175Z"></path>
                    </svg>`;

function addOpenTabToExMenuItemGroup(group) {
  var shadowRoot = group.shadowRoot;
  if (!shadowRoot) return;

  var exMenuItem = shadowRoot.querySelector("ex-menu-item[href]");
  if (!exMenuItem) return;

  var href = exMenuItem.getAttribute("href");
  if (!href) return;

  var categoryDiv = shadowRoot.querySelector(".ex-menu-item--category");
  if (!categoryDiv) return;

  // Tighten spacing and apply active highlight — re-evaluated on every open
  // so the active state stays correct after navigation.
  var currentPage = window.location.hash.split(";")[0].replace("#", "");
  var itemPage = (href.split("#")[1] || "").split(";")[0];
  var isActive = currentPage && itemPage && currentPage === itemPage;

  // Inject spacing overrides into ex-menu-item-group's shadow root (once).
  // Must use a <style> element — !important is ignored in element.style.
  if (!shadowRoot.querySelector("#bph-group-style")) {
    var groupStyle = document.createElement("style");
    groupStyle.id = "bph-group-style";
    groupStyle.textContent = `
      .menu-item-group { padding: 0 !important; margin: 0 !important; gap: 0 !important; }
      .ex-menu-item--category { padding: 0 !important; margin: 0 !important; }
      ex-menu-item { margin: 0 !important; display: block !important; }
      :host { display: block !important; margin: 0 !important; padding: 0 !important; }
    `;
    shadowRoot.appendChild(groupStyle);
  }

  // Inject spacing + active-state overrides into ex-menu-item's shadow root (once).
  var itemShadow = exMenuItem.shadowRoot;
  if (itemShadow && !itemShadow.querySelector("#bph-item-style")) {
    var itemStyle = document.createElement("style");
    itemStyle.id = "bph-item-style";
    itemStyle.textContent = `
      a[part="anchor-menu-item"] {
        padding: 4px 12px !important;
        min-height: 0 !important;
        height: auto !important;
        width: 100% !important;
        box-sizing: border-box !important;
      }
      a[part="anchor-menu-item"].bph-active {
        border-left: 3px solid #4a9eff !important;
        background-color: rgba(74, 158, 255, 0.15) !important;
        padding-left: 9px !important;
      }
      .menu-item__body-wrapper { padding: 0 !important; margin: 0 !important; }
      .menu-item__content { padding: 0 !important; margin: 0 !important; }
      .menu-item__secondary-label { padding: 0 !important; margin: 0 !important; min-height: 0 !important; }
      label { margin: 0 !important; padding: 0 !important; }
    `;
    itemShadow.appendChild(itemStyle);
  }

  // Toggle active class on inner anchor — runs on every open to stay current.
  if (itemShadow) {
    var innerAnchor = itemShadow.querySelector('a[part="anchor-menu-item"]');
    if (innerAnchor) {
      innerAnchor.classList.toggle("bph-active", !!isActive);
    }
  }

  // SVG anchor injection — only once per item
  if (categoryDiv.querySelector(".svg-anchor")) return;

  categoryDiv.style.display = "flex";
  categoryDiv.style.alignItems = "flex-start";
  exMenuItem.style.flex = "1";

  var anchor = document.createElement("a");
  anchor.className = "gwt-Anchor svg-anchor qm-c-inlinemenu__descriptive-composite-menu-icon";
  anchor.href = href;
  anchor.target = "_blank";
  anchor.style.cssText = "padding: 4px 4px 0 8px; display: flex; align-items: flex-start; flex-shrink: 0; color: inherit; cursor: pointer; border-left: 2px solid #4a9eff;";
  anchor.innerHTML = openTabSvg;
  // Platform handlers in the shadow DOM call preventDefault on clicks, killing
  // native <a> navigation. Handle it ourselves instead.
  anchor.addEventListener("click", function (e) {
    e.stopPropagation();
    e.preventDefault();
    window.open(href, "_blank");
  });
  categoryDiv.appendChild(anchor);
}

// Arrive handles groups added dynamically; setTimeout(0) defers until after
// custom element shadow roots have initialized
document.arrive("ex-menu-item-group[data-testid]", { existing: true }, function (group) {
  setTimeout(function () { addOpenTabToExMenuItemGroup(group); }, 0);
});

// Click-based: items are revealed on click, shadow roots may not be ready
// at page load so we re-process on each nav item click
document.arrive("li.SubNavigation-module_header__nav-item__dQn5K", { existing: true }, function (navItem) {
  navItem.addEventListener("click", function () {
    setTimeout(function () {
      // Tighten light DOM submenu container padding
      var ul = navItem.querySelector("ul[role='menu']");
      if (ul) ul.style.padding = "4px 0";
      var groupContainer = navItem.querySelector('[class*="nav-group-menu-items"]');
      if (groupContainer) { groupContainer.style.padding = "0"; groupContainer.style.gap = "0"; }
      navItem.querySelectorAll("ex-menu-item-group[data-testid]").forEach(addOpenTabToExMenuItemGroup);
    }, 100);
  });
});
