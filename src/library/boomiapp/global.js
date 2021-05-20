/*------Global------*/
//Variables
var headerVisible = false;
var sPageURL;


/*-------------Global Calling Functions--------------------*/

//Function to retrieve the current URL parameters and split them into each unique record
var getUrlpath = function getUrlpath() {

  sPageURL = $(location).attr('href')
  return sPageURL

};






//Function to adjust the Dashboard Grids from default to 7 days
function dashboardDays() {
  //Only Actions occur once the screen has been fully loaded
  var accountdashLoaded = setInterval(function () {
    var information = document.getElementsByClassName("gwt-viz-container")[2];

    if (information != undefined) {
      $(".time_range_selector").each(function () {
        var dashVal = $(this).text();

        if (dashVal == "7d") {
          $(this).click();
        }
      });

      clearInterval(accountdashLoaded); //clear the interval now that data has been loaded
    }

    //end of execution once
  }, 1000);
  //////////
}