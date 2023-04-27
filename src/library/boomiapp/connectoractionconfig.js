document.arrive(".connectorActionConfig", function () {


  let actionLable = document.getElementsByClassName("label-wrap");

  let httpRemind = actionLable[0].innerHTML.includes("HTTP Client connector");

  if (httpRemind) {
    actionLable[0].innerHTML =
      actionLable[0].innerHTML +
      '<br> <b style="color: orange" class="boomiHTTPReminder">Reminder:</b> in-coming message shapes will not work into the HTTP connector if you have set connector parameters';
  } else {
    letsCheck()
  }

});

function letsCheck(){
let check_http_selection = setInterval(() => {
    let actionLable = document.getElementsByClassName("label-wrap");

    let httpRemind = actionLable[0].innerHTML.includes("HTTP Client connector");

    if (httpRemind) {
      actionLable[0].innerHTML =
        actionLable[0].innerHTML +
        '<br> <b style="color: orange" class="boomiHTTPReminder">Reminder:</b> in-coming message shapes will not work into the HTTP connector if you have set connector parameters';

      clearInterval(check_http_selection);
    }
  }, 1000);
}