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

  let updateHtml = `<div class="modal fade pg-show-modal BoomiUpdateOverlay" data-bs-backdrop="static" id="myModal" tabindex="-1" role="dialog" aria-hidden="true" style="background-color: transparent"> 
  <div class="modal-dialog modal-dialog-centered modal-lg"> 
      <div class="modal-content"> 
          <div class="modal-header"> 
              <h4 class="modal-title">Latest Updates now live for the Boomi Platform Enhancer</h4> 
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>                         
          </div>                     
          <div class="modal-body"> 
          <ul>
          <li>- <b style="color: blue">Change: </b> Extension Options Page Redesigned</li>
          <li>- <b style="color: green">Feature: </b> Short Cut to Run/Test Current Process - Ctrl+Alt+T</li>
          <li>- <b style="color: green">Feature: </b> Reminder - When Creating Package that changes do not get saved; Option in Settings.</li>
          <li>- <b style="color: green">Feature: </b> Reminder - When Package Deployed to Schedule if required; Option in Settings.</li>
          <li>- <b style="color: orange">Bugfix + Change: </b> Copy Component ID Button now moved into Action Button Dropdown, allows for 
          copy of any component ID instead of just process component ID</li>
      </ul>
          </div>                     
          <div class="modal-footer"> 
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Thanks</button>            
          </div>                     
      </div>                 
  </div>             
</div>
`

let new1= `<div id="ex1" class="modal">
<ul>
<li>- <b style="color: blue">Change: </b> Extension Options Page Redesigned</li>
<li>- <b style="color: green">Feature: </b> Short Cut to Run/Test Current Process - Ctrl+Alt+T</li>
<li>- <b style="color: green">Feature: </b> Reminder - When Creating Package that changes do not get saved; Option in Settings.</li>
<li>- <b style="color: green">Feature: </b> Reminder - When Package Deployed to Schedule if required; Option in Settings.</li>
<li>- <b style="color: orange">Bugfix + Change: </b> Copy Component ID Button now moved into Action Button Dropdown, allows for 
copy of any component ID instead of just process component ID</li>
</ul>
<a href="#" rel="modal:close">Close</a>
</div>`

  let overlayUpdate = document.querySelector('.BoomiUpdateOverlay');
  if (overlayUpdate) overlayUpdate.remove();
  document.getElementsByTagName('body')[0].insertAdjacentHTML('beforeend', new1)

  $("#ex1").modal({
    escapeClose: false,
    clickClose: false,
    showClose: true,
    fadeDuration: 100
  });


}
