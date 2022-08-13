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



function getUrlParameter(sParam) {
  var sPageURL = $(location).attr('href'),
    sURLVariables = sPageURL.split(';'),
    sParameterName,
    i;

  for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split('=');

    if (sParameterName[0] === sParam) {
      return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
    }
  }
};


function showInformationAlertDialog(message){
  var informationAlertDialog = `<div class="gwt-PopupPanel oops_message_panel informationAlertDialog"
  style="visibility: visible; position: absolute; clip: rect(auto, auto, auto, auto); bottom: 40px; overflow: visible;">
  <div class="popupContent bph-load-done">
      <div class="qm-c-alert qm-c-alert--info"><span class="qm-c-alert__icon"><img
                  src="data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PGRlZnM+PC9kZWZzPjx0aXRsZT5BbGVydC1JY29uczwvdGl0bGU+PHBhdGggZmlsbD0iIzMzMzMzMyIgZD0iTTEwLjgxLDE5LjA5YTQuMjMsNC4yMywwLDAsMCwxLjkzLS41OSw5Ljg5LDkuODksMCwwLDAsMi41My0xLjcxbC0uNDUtLjU5YTMuNjMsMy42MywwLDAsMS0xLjYzLjg5Yy0uMTUsMC0uMy0uMy0uMTUtLjg5bDEtMy44NmMuNDQtMS40OS4zLTIuMjMtLjYtMi4yM2E1LDUsMCwwLDAtMi4wNy43NCw4LjQ4LDguNDgsMCwwLDAtMi42OCwxLjc4bC40NS42QTIuNDMsMi40MywwLDAsMSwxMSwxMi4zNGMuMTUsMCwuMTUuMjksMCwuNzRsLS44OSwzLjU2QzkuNDgsMTguMjcsOS43NywxOS4wOSwxMC44MSwxOS4wOVoiLz48cGF0aCBmaWxsPSIjMzMzMzMzIiBkPSJNMTMuNjMsNC45MWExLjg5LDEuODksMCwwLDAtMS40OC42LDEuODUsMS44NSwwLDAsMC0uNiwxLjE4LDIuMiwyLjIsMCwwLDAsLjMsMUExLjY5LDEuNjksMCwwLDAsMTMsOC4xOGExLjg4LDEuODgsMCwwLDAsMS40OC0uNiwxLjg2LDEuODYsMCwwLDAsLjYtMS4zMywxLDEsMCwwLDAtMS0xLjM0WiIvPjxwYXRoIGZpbGw9IiMzMzMzMzMiIGQ9Ik0xMiwxLjA5QTEwLjkxLDEwLjkxLDAsMSwxLDEuMDksMTIsMTAuOTIsMTAuOTIsMCwwLDEsMTIsMS4wOU0xMiwwQTEyLDEyLDAsMSwwLDI0LDEyLDEyLDEyLDAsMCwwLDEyLDBaIi8+PC9zdmc+"
                  alt="Information"></span>
                  <div class="qm-c-alert__text">` + message + `</div>
      </div>
  </div>
  </div>`

  $('#mastfoot').append(informationAlertDialog)
  $('.context_menu').remove()
  $('.context_menu_glass').remove()
  setTimeout(() => {
    $('.informationAlertDialog').remove()
  }, 3000);   
}