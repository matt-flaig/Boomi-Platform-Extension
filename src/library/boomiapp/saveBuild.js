const add_saveBuild_listener = (savecanvas) => {

  runsaveBuild()


}


$(document).on("click", ".gwt-TabLayoutPanelTab", function (tab) {

  runsaveBuild()

});






function runsaveBuild() {

  let currentTabs = document.getElementsByClassName('gwt-TabLayoutPanelContent')

  let wait_for_build_load = setInterval(() => {

    for (var index = 0; index < currentTabs.length; index++) {
      let tabcheck = currentTabs[index].querySelector('[data-locator="button-save"]');
      var displayedCheck = currentTabs[index].style.display

      if (tabcheck != null && displayedCheck != 'none') {
        clearInterval(wait_for_build_load);
        shortcut.remove("Ctrl+Alt+S");

        shortcut.add("Ctrl+Alt+S", function () {
          //alert("Hi there!");

          tabcheck.click();

        });

      }


    }
  }, 250)


}
