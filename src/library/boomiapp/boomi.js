$(document).ready(function () {
  /*Start of Sheet*/

  //Only Actions occur once the screen has been fully loaded
  var boomiatomLoaded = setInterval(function () {
    if (document.body.contains(document.getElementById("mastfoot"))) {
      $("#gwt-uid-84").append(
        '<li id="showHeaderbtn" class="qm-c-servicenav__nav-item"><a class="gwt-Anchor qm-c-servicenav__nav-link qm-a--alternate"><span id="showHeaderspan" class="">Show Header</span></a></li>'
      );

      clearInterval(boomiatomLoaded); //clear the interval now that data has been loaded
    }

    //end of execution once
  }, 1000);
  //////////

  //END
});
