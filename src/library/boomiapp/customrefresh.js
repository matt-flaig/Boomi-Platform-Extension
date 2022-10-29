let do_refresh = false;

const refreshInterval_listener = (refreshInterval) => {
  if (BoomiPlatform.refresh_interval === undefined) {
    BoomiPlatform.refresh_interval = 15;
  }

  $(".reporting_right_side").prepend(
    $(
      '<li id="refresh_reporting"> <button  type="button" class="refresh_primary_action" alt="off">Refresh Every ' +
        BoomiPlatform.refresh_interval +
        "s</button> </li>"
    )
  );

  $("#refresh_reporting").click(function (event) {
    event.preventDefault();

    var e = $(this).find("button");
    if (e.attr("alt") == "off") {
      start_refresh();
      e.text("Refreshing Every " + BoomiPlatform.refresh_interval + "s");
      e.attr("alt", "on");
      e.blur();
      e.addClass("refresh_doing_action");
      e.removeClass("refresh_primary_action");
    } else {
      stop_refresh();
      e.text("Refresh Every " + BoomiPlatform.refresh_interval + "s");
      e.attr("alt", "off");
      e.blur();
      e.removeClass("refresh_doing_action");
      e.addClass("refresh_primary_action");
    }
  });

  function start_refresh() {
    do_refresh = true;
    refresh_reporting();
  }

  function stop_refresh() {
    do_refresh = false;
  }

  function refresh_reporting() {
    if (do_refresh) {
      $("button[data-locator=button-refresh]")[0].click();
      console.log("Refresh");
      setTimeout(function () {
        refresh_reporting();
      }, BoomiPlatform.refresh_interval * 1000);
    }
  }

  window.onhashchange = function reportfresh() {
    var processreportingCheck = $(location).attr("href");
    var child = document.getElementById("refresh_reporting");

    var vali = !processreportingCheck.includes("reporting") && child != null;
    if (vali == true) {
      var child = document.getElementById("refresh_reporting");

      child.parentNode.removeChild(child);
    }
  };
};
