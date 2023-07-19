document.arrive(".filter_panel_dialog_popup_panel", function (filterpanel) {
    if(filterpanel.querySelector(".filterable_tree_loading_container")){
        var buttonBar = document.getElementsByClassName('button-bar')
        buttonBar[0].insertAdjacentHTML('beforeend', '<button id="colaButton" type="button" class="gwt-Button qm-button--primary-action closeall_doing_action" data-locator="button-filter">Collapse All Folders</button>')
    }
});


$(document).on("click", "#colaButton", function () {
    [...document.getElementsByClassName("filter_panel_dialog_popup_panel")[0].querySelectorAll(".open")].reverse().forEach((element) => {
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







document.arrive("[data-locator='button-schedules']",function (schedulebutton) {

schedulebutton.parentNode.insertAdjacentHTML('beforeend', '<button type="button" id="coladepButton" class="gwt-Button">Collapse All Folders</button>')
});

$(document).on("click", "#coladepButton", function () {
[...document.getElementsByClassName("deployed_processes_panel")[0].querySelectorAll(".open")].reverse().forEach((element) => {closeNode(element)})
function closeNode(targetNode) {
    ["mouseover", "mousedown", "mouseup"].forEach(function(eventType) { 
        var clickEvent = document.createEvent('MouseEvents');
        clickEvent.initEvent(eventType, true, true);
        targetNode.dispatchEvent(clickEvent);
    });
}

});
