let do_refresh = false;

const refreshInterval_listener = (refreshInterval) => {
  if (BoomiPlatform.refresh_interval === undefined) {
    BoomiPlatform.refresh_interval = 15;
  }

  // Initalize timer for Process Reporting Duration Counters
  const processExecutionDurationReporting = setInterval(function () {
    var autoRefreshElement = Array.from(
      document.querySelectorAll("label"),
    ).find((el) => el.textContent.includes("Auto Refresh"));
    // show the counter if either autoRefresh switch is on, or if custom refresh is enabled
    if (
      (!autoRefreshElement ||
        (autoRefreshElement &&
          autoRefreshElement.innerHTML != "Auto Refresh is On")) &&
      !do_refresh
    ) {
      return false;
    }
    // clear duration counting if we navigate to another page
    if (!window.location.href.includes("#reporting")) {
      clearInterval(processExecutionDurationReporting);
    }
    // get any row that's in-process
    document
      .querySelectorAll('img[title*="In Process"]')
      .forEach(function (element) {
        // get div containing entire row
        var inProgressRow = element.parentElement.parentElement.parentElement;

        var processExecutionTime =
          inProgressRow.getElementsByClassName("link_action")[0].innerHTML;

        const diffTime = Math.abs(new Date() - new Date(processExecutionTime));

        var processElapsedTime = inProgressRow.querySelectorAll("div")[11];
        processElapsedTime.innerHTML = fancyTimeFormat(diffTime / 1000);
        processElapsedTime.style.color = "red";
      });
  }, 1000);

  $(".reporting_right_side").prepend(
    $(
      '<li id="refresh_reporting"> <button  type="button" class="refresh_primary_action" alt="off">Refresh Every ' +
        BoomiPlatform.refresh_interval +
        "s</button> </li>",
    ),
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
    resetProcessReportingDurationCountersToZero();
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

  function resetProcessReportingDurationCountersToZero() {
    document
      .querySelectorAll('img[title*="In Process"]')
      .forEach(function (element) {
        var inProgressRow = element.parentElement.parentElement.parentElement;
        var processElapsedTime = inProgressRow.querySelectorAll("div")[11];
        processElapsedTime.innerHTML = "0:00";
        processElapsedTime.style.color = "";
      });
  }

  function fancyTimeFormat(duration) {
    // Hours, minutes and seconds
    var hrs = ~~(duration / 3600);
    var mins = ~~((duration % 3600) / 60);
    var secs = ~~duration % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    var ret = "";

    if (hrs > 0) {
      ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
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
