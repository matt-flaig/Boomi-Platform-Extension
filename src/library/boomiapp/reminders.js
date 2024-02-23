//Reminder to create schedule after depployment

document.arrive(
  "[data-locator='button-view-deployments']",
  function (deploymentScreen) {
    //debugger

    chrome.storage.sync.get(["reminder_schedule"], function (e) {
      if (e.reminder_schedule === "on") {
        let scheduleHtml = `
    <p><b style="color: orange">REMINDER:</b> Dont forget to set up a schedule in the runtime if its required for your deployed service</p>`;
        deploymentScreen.offsetParent.parentNode.firstChild.firstChild.children[1].insertAdjacentHTML(
          "afterend",
          scheduleHtml,
        );
      }
    });
  },
);
