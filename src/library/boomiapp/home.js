$(document).ready(function () {
    

    headerHome()



    //Listen for URL change, get the current URL and validate if we have gone back to account dashboard to execute requirements
    window.onhashchange = function () {
      var isitHome = getUrlpath();

      var homeVal = isitHome.includes("home");
      if (homeVal == true) {
        headerHome()
      }
    };


    function headerHome(){

        var x = document.getElementsByClassName("qm-c-masthead");
        x[0].classList.add("headerShow");

    }
   





  //END
});
