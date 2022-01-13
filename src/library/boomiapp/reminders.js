const reminder_save = (reminderSave) => {

    if (BoomiPlatform.reminder_savePackage != 'off') {

    let remindtosaveHtml = `
    <p style="color: red; text-align: center; font-size: 20px"><b>REMINDER:</b> Dont forget to save your process if not already done - creating packages does not save your latest changes!
    </p>
    `

    let wizardpanel = document.getElementsByClassName('modal_contents')
    $(wizardpanel).append(remindtosaveHtml);


}

}