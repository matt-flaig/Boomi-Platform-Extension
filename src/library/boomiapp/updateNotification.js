function updatenotificationCheck() {

  let currentAppver = chrome.runtime.getManifest().version
  //console.log(currentAppver)
  if (typeof (Storage) !== "undefined") {
    localStorage.getItem("boomiplatenhanUpdateNot" + currentAppver);
    if (localStorage.getItem("boomiplatenhanUpdateNot" + currentAppver) === null || localStorage.getItem("boomiplatenhanUpdateNot" + currentAppver) === '') {
      localStorage.setItem("boomiplatenhanUpdateNot" + currentAppver, "done");
      updateNotificationfun()
    } else {
      //No action Required in that its actually already alerted
      //alert(localStorage.getItem("boomiplatenhanUpdateNot" + currentAppver))
    }
  } else {
    alert('No Access to Local Storage')
  }
}


function updateNotificationfun() {

  let updateHtml = `<div class="hover_bkgr_fricc BoomiUpdateOverlay">
        <span class="helper"></span>
        <div>
            <div class="popupCloseButton">&times;</div>
            <div style="text-align: left">
    <h4>Latest Updates now live for the Boomi Platform Enhancer</h4>
    <ul>
        <li>- <b style="color: blue">Change: </b> Extension Options Page Redesigned</li>
        <li>- <b style="color: green">Feature: </b> Short Cut to Run/Test Current Process - Ctrl+Alt+T</li>
        <li>- <b style="color: green">Feature: </b> Reminder - When Creating Package that changes do not get saved; Option in Settings.</li>
        <li>- <b style="color: green">Feature: </b> Reminder - When Package Deployed to Schedule if required; Option in Settings.</li>
        <li>- <b style="color: orange">Bugfix + Change: </b> Copy Component ID Button now moved into Action Button Dropdown, allows for 
        copy of any component ID instead of just process component ID</li>
    </ul>
</div>
</div>
</div>`

  let overlayUpdate = document.querySelector('.BoomiUpdateOverlay');
  if (overlayUpdate) overlayUpdate.remove();
  document.getElementsByTagName('body')[0].insertAdjacentHTML('beforeend', updateHtml)
  $('.hover_bkgr_fricc').show();

}
