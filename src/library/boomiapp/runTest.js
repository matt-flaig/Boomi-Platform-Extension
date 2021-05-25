const add_runTest_listener = (runtest) => {

    runTestfunc();

}



$(document).on("click", ".gwt-TabLayoutPanelTab", function (tab) {

    runTestfunc();
  
  });

function runTestfunc(){


    let currenttestTabs = document.getElementsByClassName('gwt-TabLayoutPanelContent')

  let wait_for_Testbuild_load = setInterval(() => {

    for (var index = 0; index < currenttestTabs.length; index++) {
      let tabtestcheck = currenttestTabs[index].querySelector('[data-locator="button-test"]');
      var displayedCheck = currenttestTabs[index].style.display

      if (tabtestcheck != null && displayedCheck != 'none') {
        clearInterval(wait_for_Testbuild_load);
        shortcut.remove("Shift+R");

        shortcut.add("Shift+R", function () {
          //alert("Hi there!");
            alert('clicked')
          tabtestcheck.click();

        });

      }


    }
  }, 250)



}