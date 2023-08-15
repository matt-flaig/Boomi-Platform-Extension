const add_notification_close = (boomirevision) => {

    setTimeout(() => {
    let notipanel = document.getElementsByClassName("buildMain");

for (var index = 0; index < notipanel.length; index++) {
    var notinav = notipanel[index].children[1].lastChild.innerHTML.includes("This view corresponds to revision")
    if (notinav) {
    notipanel[index].children[1].children[1].insertAdjacentHTML(
        'afterend',
        '<span id="close" onclick="this.parentNode.remove(); return false;">x</span>'
    );
    }
}
}, 1000); 

}





