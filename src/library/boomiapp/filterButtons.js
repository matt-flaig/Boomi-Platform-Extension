document.arrive(".filter_panel_dialog_popup_panel", function (filterpanel) {
    var buttonBar = document.getElementsByClassName('button-bar')
    buttonBar[0].insertAdjacentHTML('beforeend', '<button id="colaButton" type="button" class="gwt-Button qm-button--primary-action closeall_doing_action" data-locator="button-filter">Collapse All Folders</button>')
});


$(document).on("click", "#colaButton", function () {
    [...document.getElementsByClassName("open")].reverse().forEach((element) => {
        closeNode(element)
    })

    function closeNode(targetNode) {
        ["mouseover", "mousedown", "mouseup"].forEach(function (eventType) {
            var clickEvent = document.createEvent('MouseEvents');
            clickEvent.initEvent(eventType, true, true);
            targetNode.dispatchEvent(clickEvent);
        });
    }

});
