$(document).ready(function () {
  //Call for first load i.e. may have gone directly to page or other
  dashboardDays();

  //Listen for URL change, get the current URL and validate if we have gone back to account dashboard to execute requirements
  window.onhashchange = function () {
    var dashboardCheck = getUrlpath();

    var vali = dashboardCheck.includes("dashboard");
    if (vali == true) {
      dashboardDays();
    }
  };

  //END
});
