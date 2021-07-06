const add_buildShort_listener = (buildshort) => {

  runbuildShort()


}


$(document).on("click", ".gwt-TabLayoutPanelTab", function (tab) {

  runbuildShort()

});






function runbuildShort() {

  let currentbuildTabs = document.getElementsByClassName('gwt-TabLayoutPanelContent')

  let wait_for_build_load = setInterval(() => {

    for (var index = 0; index < currentbuildTabs.length; index++) {

      let savebtnCheck = currentbuildTabs[index].querySelector('[data-locator="button-save"]');
      let testbtnCheck = currentbuildTabs[index].querySelector('[data-locator="button-test"]');
      var displayedCheck = currentbuildTabs[index].style.display

      if (savebtnCheck != null && testbtnCheck != null && displayedCheck != 'none') {
        clearInterval(wait_for_build_load);
        
        shortcut.remove("Shift+Alt+R");
        shortcut.remove("Shift+Alt+S");

        shortcut.add("Shift+Alt+S", function () {
          savebtnCheck.click();
        });

        shortcut.add("Shift+Alt+R", function () {
          testbtnCheck.click();

      });

      break;

      }


    }
  }, 250)


}
