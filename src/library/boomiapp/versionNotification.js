const add_notification_close = (boomirevision) => {

    setTimeout(() => {
    let notipanel = document.getElementsByClassName("buildMain");

for (var index = 0; index < notipanel.length; index++) {
    var notinav = notipanel[index].children[1].lastChild.innerHTML.includes("This view corresponds to revision")
    if (notinav) {
    notipanel[index].children[1].children[1].insertAdjacentHTML(
        'afterend',
        '<span id="close" onclick="this.parentNode.parentNode.querySelector(\'.component_header\').style.background=\'#f5e4c2\';this.parentNode.remove();return false;" style="cursor:pointer;position: absolute; right: 0; top: 0; margin: 2px">x</span>'
    );
    }
}
}, 1000); 

}





