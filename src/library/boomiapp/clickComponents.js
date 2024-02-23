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
    var accountId =
      getUrlParameter("accountId") ||
      document
        .querySelector('[data-locator="link-process-reporting"]')
        .href.split("=")
        .pop()
        .split(";")[0];
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
});
