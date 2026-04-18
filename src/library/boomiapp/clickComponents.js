$(document).ready(function () {
  /*Start of Sheet*/
  //This is the core sheet that is to be used to call functions required for this extension; listeners, functions etc are on others

  //Show \ Hide Header button clicked, enable or disable the header dependent on flow
  $(document).on("click", "#showHeaderbtn", function () {
    var x = document.getElementsByClassName("qm-c-masthead");

    chrome.storage.local.get(["headerVisible"], function (e) {
      var headerVisible = e.headerVisible;
      if (typeof headerVisible == "undefined") {
        headerVisible = true;
      }
      if (!x[0]) return;
      if (headerVisible == true) {
        x[0].classList.add("headerHide");
        $("#showHeaderspan").text("Show Header");
        headerVisible = false;
      } else {
        x[0].classList.remove("headerHide");
        $("#showHeaderspan").text("Hide Header");
        headerVisible = true;
      }
      chrome.storage.local.set({ headerVisible: headerVisible }, function () {
        //console.log('Header visibility has been set to ' + headerVisible);
      });
    });
  });

  $(document).on("click", "#gwt-uid-84", function () {
    dashboardDays();
  });

  // this is a fix to work with both the legacy "gear" icon (hidden in February 2024 release)
  // and the three ellipse "more" option icon (introduced in Feb 2024 UI update)
  // wait for enter full screen menu to appear, then insert additional options
  document.arrive(
    '[data-locator="link-enter-full-screen"]',
    function (element) {
      var ul = $(element).closest("ul")[0];
      $(ul).append(
        '<li id="copyCompID"><a class="gwt-Anchor">Copy Current Component ID</a></li>',
      );
      $(ul).append(
        '<li id="copyCompURL"><a class="gwt-Anchor">Copy Current Component URL</a></li>',
      );
    },
  );

  $(document).on("click", "#copyCompID", function () {
    var currentId = getUrlParameter("componentIdOnFocus");
    $("#mastfoot").append(
      '<input type="text" value="' + currentId + '" id="currentidval">',
    );
    var currentidval = document.getElementById("currentidval");
    currentidval.select();
    currentidval.setSelectionRange(0, 99999);
    document.execCommand("copy");
    $("#currentidval").remove();

    showInformationAlertDialog(
      "Current ID " + currentId + " Copied to Clipboard.",
    );
    return false;
  });

  $(document).on("click", "#copyCompURL", function () {
    var currentId = getUrlParameter("componentIdOnFocus");
    var processReportingEl = document.querySelector('[data-locator="link-process-reporting"]');
    var accountId =
      getUrlParameter("accountId") ||
      (processReportingEl && processReportingEl.href.split("=").pop().split(";")[0]);
    $("#mastfoot").append(
      '<input type="text" value="https://platform.boomi.com/AtomSphere.html#build;accountId=' +
        accountId +
        ";components=" +
        currentId +
        '" id="currenturlval">',
    );
    var currentidval = document.getElementById("currenturlval");
    currentidval.select();
    currentidval.setSelectionRange(0, 99999);
    document.execCommand("copy");
    $("#currenturlval").remove();

    showInformationAlertDialog(
      "Current Component URL Copied to Clipboard. (" + currentId + ")",
    );
    return false;
  });

  $(document).on("click", "#closeUpdate", function () {
    $(".BoomiUpdateOverlay").remove();
  });

  $(document).on("click", "#reloadPage", function () {
    location.reload();
  });
});

// ── Process Reporting link from atom/runtime page context menu ────────────────

function _bph_slugify(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

var _bph_pending_process_name = null;

document.addEventListener('click', function (e) {
  var chevron = e.target.closest('.treeItemContent a[data-locator="link"]');
  if (!chevron) return;
  var label = chevron.closest('.treeItemContent').querySelector('.gwt-Label[title]');
  _bph_pending_process_name = label ? label.getAttribute('title') : null;

  setTimeout(function () {
    var executeLink = document.querySelector('[data-locator="link-execute-process"]');
    if (!executeLink) return;

    var ul = executeLink.closest('ul.menu_item_group');
    if (!ul || ul.querySelector('.bph-reporting-item')) return;

    var processName = _bph_pending_process_name;
    if (!processName) return;

    var accountId = getUrlParameter('accountId');
    if (!accountId) return;

    var li = document.createElement('li');
    var a = document.createElement('a');
    a.className = 'gwt-Anchor list_anchor_text bph-reporting-item';
    a.textContent = 'View in Process Reporting';
    a.href = 'javascript:;';

    a.addEventListener('click', function (e) {
      e.preventDefault();
      localStorage.setItem('bph_reporting_process', processName);
      window.open(
        'https://platform.boomi.com/AtomSphere.html#reporting;accountId=' + accountId,
        '_blank'
      );
    });

    li.appendChild(a);
    ul.appendChild(li);
  }, 150);
}, true);

// ── Reporting page: auto-apply process name filter from localStorage ──────────

var _bph_reporting_filter_applied = false;

document.arrive('[data-locator="button-add-filter"]', { existing: true }, function (addFilterBtn) {
  if (_bph_reporting_filter_applied) return;
  var processName = localStorage.getItem('bph_reporting_process');
  if (!processName) return;
  var hash = window.location.hash;
  if (hash.indexOf('#reporting;') === -1) return;

  _bph_reporting_filter_applied = true;
  localStorage.removeItem('bph_reporting_process');

  setTimeout(function () {
    addFilterBtn.click();

    setTimeout(function () {
      var processLink = document.querySelector('[data-locator="link-process"]');
      if (!processLink) return;
      processLink.click();

      setTimeout(function () {
        var filterInput = document.querySelector('.filter_input.uneditable_text');
        if (!filterInput) return;
        filterInput.value = processName;
        filterInput.dispatchEvent(new Event('input', { bubbles: true }));
        filterInput.dispatchEvent(new KeyboardEvent('keyup', { bubbles: true, key: 'Enter', keyCode: 13 }));

        setTimeout(function () {
          var slug = _bph_slugify(processName);
          var item = document.querySelector('[data-locator="item-' + slug + '"]');
          if (item) {
            var checkbox = item.querySelector('input[type="checkbox"]');
            if (checkbox && !checkbox.checked) checkbox.click();
          }

          setTimeout(function () {
            var applyBtn = document.querySelector('[data-locator="button-apply"]');
            if (applyBtn) applyBtn.click();
          }, 300);
        }, 500);
      }, 300);
    }, 300);
  }, 1500);
});

// ── Process monitor link on component detail panel ────────────────────────────

function _bph_monitorLinkHref() {
  var currentId = getUrlParameter("componentIdOnFocus");
  if (!currentId) return null;
  var processReportingEl = document.querySelector('[data-locator="link-process-reporting"]');
  var accountId =
    getUrlParameter("accountId") ||
    (processReportingEl && processReportingEl.href.split("=").pop().split(";")[0]);
  if (!accountId) return null;
  return 'https://platform.boomi.com/AtomSphere.html#reporting;accountId=' + accountId + ';processes=' + currentId;
}

document.arrive('[data-locator="link-description"]', { existing: true }, function (descLink) {
  var linksDiv = descLink.closest('.links');
  if (!linksDiv || linksDiv.querySelector('.bph-monitor-link')) return;

  var link = document.createElement('a');
  link.className = 'gwt-Anchor svg-anchor bph-monitor-link';
  link.href = _bph_monitorLinkHref() || '#';
  link.title = 'View in Process Reporting';
  link.target = '_blank';
  link.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" style="width: 24px; height: 24px;"><title>View in Process Reporting</title><path d="M22 12H18L15 21L9 3L6 12H2" stroke="#8C8C8C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  link.addEventListener('mouseenter', function () {
    var href = _bph_monitorLinkHref();
    if (href) link.href = href;
  });

  descLink.insertAdjacentElement('afterend', link);
});
