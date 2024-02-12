document.arrive(".filter_panel_dialog_popup_panel", function (filterpanel) {
    if(filterpanel.querySelector(".filterable_tree_loading_container")){
        var buttonBar = document.getElementsByClassName('button-bar')
        buttonBar[0].insertAdjacentHTML('beforeend', '<button id="colaButton" type="button" class="gwt-Button">Collapse All Folders</button>')
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

document.arrive("[data-locator='button-schedules']", function (schedulebutton) {

    //Add Collapse All Button
    schedulebutton.parentNode.insertAdjacentHTML('beforeend', '<button type="button" id="coladepButton" class="gwt-Button drop_button qm-button--primary-action closeall_doing_action" style="position: absolute">Collapse All Folders</button>')

});

// allow sidebar items to be clicked anywhere to open and components to be opened with a single click
// maybe this should probably be an option you can turn on or turn off at some point?
document.arrive(".rail.simplify .gwt-FastTree .treeItemContent", function(el){
    //document.querySelectorAll(".treeItemContent").forEach((el) => {
        if(!el.onclick){
            el.onclick = function(e) {
                
                // turn single-click to double-click
                if(this.parentElement.parentElement.classList.contains("children")){
                    doubleClickNode(e.target)
                    return;
                }
                clickNode(this.parentElement.parentElement.querySelector(".closed,.open"))
                
            }
        }
        function clickNode(targetNode) {
            ["mouseover", "mousedown", "mouseup"].forEach(function(eventType) { 
                var clickEvent = document.createEvent('MouseEvents');
                clickEvent.initEvent(eventType, true, true);
                targetNode.dispatchEvent(clickEvent);
            });
        }
        function doubleClickNode(targetNode) {
            var clickEvent = document.createEvent('MouseEvents');
            clickEvent.initEvent ('dblclick', true, true);
            targetNode.dispatchEvent(clickEvent);
        }
    //})
})

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
