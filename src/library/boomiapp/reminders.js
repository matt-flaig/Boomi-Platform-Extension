/* //Reminder to Save when making packaging component
const reminder_save = (reminderSave) => {
  if (BoomiPlatform.reminder_savePackage != "off") {
    let remindtosaveHtml = `
    <p style="text-align: center; font-size: 20px"><b style="color: orange">REMINDER:</b> Dont forget to save your process if not already done - 
    creating packages does not save your latest changes!
    </p>
    `;
    let wizardpanel = document.getElementsByClassName("modal_contents");
    $(wizardpanel).append(remindtosaveHtml);
  }
}; */

//Reminder to create schedule after depployment
/* const reminder_schedule = (reminderSchedule) => {
  if (BoomiPlatform.reminder_schedule != "off") {
    let scheduleHtml = `
    <p><b style="color: orange">REMINDER:</b> Dont forget to set up a schedule in the runtime if its required for your deployed service</p>`;

    let popTitle = document.getElementsByClassName("form_title_label");

    try {
      if (popTitle[0].innerHTML == "Deployment Successful") {
        let deploymentpop = document.getElementsByClassName(
          "margin_popup_contents"
        );
        $(deploymentpop).append(scheduleHtml);
      }
    } catch (error) {
    
    }
  }
}; */





document.arrive("[data-locator='button-view-deployments']", function (deploymentScreen) {

  
  debugger

  chrome.storage.local.get(["reminder_schedule"], function(e) {

    let scheduleHtml = `
    <p><b style="color: orange">REMINDER:</b> Dont forget to set up a schedule in the runtime if its required for your deployed service</p>`;
    deploymentScreen.offsetParent.parentNode.children[0].insertAdjacentHTML('afterend', scheduleHtml);

  });



});
