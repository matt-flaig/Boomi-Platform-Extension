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







document.arrive("[data-locator='button-schedules']", function (schedulebutton) {

    //Add Collapse All Button
    schedulebutton.parentNode.insertAdjacentHTML('beforeend', '<button type="button" id="coladepButton" class="gwt-Button">Collapse All Folders</button>')

    chrome.storage.sync.get(["schedule_icon"], function (e) {
        if (e.schedule_icon === "on") {

            //Look for images that match process running or pause in schedules and adjust icon to previos version
            setInterval(function () {
                var images = document.getElementsByTagName("img");
                for (var index = 0; index < images.length; index++) {

                    if (images[index].src.includes('process-running')) {
                        onSrcChange(images[index]);
                    } else if (images[index].src.includes('process-pause')) {
                        onSrcChangePause(images[index]);
                    }
                }

            }, 1000); // 1000ms 


        }
    });


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






function onSrcChange(imgChange) {

    imgChange.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4IiB2aWV3Qm94PSIwIDAgMTYgMTYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgc3R5bGU9ImJhY2tncm91bmQ6ICNGRkZGRkY7Ij4KICAgIDx0aXRsZT5wcm9jZXNzIHJ1bm5pbmc8L3RpdGxlPgogICAgPGcgaWQ9InByb2Nlc3MtcnVubmluZyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPHJlY3QgZmlsbD0iI0ZGRkZGRiIgeD0iMCIgeT0iMCIgd2lkdGg9IjE2IiBoZWlnaHQ9IjE2Ij48L3JlY3Q+CiAgICAgICAgPGcgaWQ9InByb2Nlc3MiIG9wYWNpdHk9IjAuNTk2MTIxNjUyIiBmaWxsPSIjNzU3NTc1IiBmaWxsLXJ1bGU9Im5vbnplcm8iPgogICAgICAgICAgICA8cGF0aCBkPSJNOC40MjM1ODUzNSwxMi43NzQyOTI3IEw3LDEyLjA2MjUgTDcsMTAuOTM3NSBMOC40MjM1ODUzNSwxMC4yMjU3MDczIEw3LjkyMDI3MTkyLDguNzE1NzY3MDUgTDguNzE1NzY3MDUsNy45MjAyNzE5MiBMMTAuMjI1NzA3Myw4LjQyMzU4NTM1IEwxMC45Mzc1LDcgTDEyLjA2MjUsNyBMMTIuNzc0MjkyNyw4LjQyMzU4NTM1IEwxNC4yODQyMzMsNy45MjAyNzE5MiBMMTUuMDc5NzI4MSw4LjcxNTc2NzA1IEwxNC41NzY0MTQ3LDEwLjIyNTcwNzMgTDE2LDEwLjkzNzUgTDE2LDEyLjA2MjUgTDE0LjU3NjQxNDcsMTIuNzc0MjkyNyBMMTUuMDc5NzI4MSwxNC4yODQyMzMgTDE0LjI4NDIzMywxNS4wNzk3MjgxIEwxMi43NzQyOTI3LDE0LjU3NjQxNDcgTDEyLjA2MjUsMTYgTDEwLjkzNzUsMTYgTDEwLjIyNTcwNzMsMTQuNTc2NDE0NyBMOC43MTU3NjcwNSwxNS4wNzk3MjgxIEw3LjkyMDI3MTkyLDE0LjI4NDIzMyBMOC40MjM1ODUzNSwxMi43NzQyOTI3IFogTTEuNDIzNTg1MzUsNS43NzQyOTI2NyBMMCw1LjA2MjUgTDAsMy45Mzc1IEwxLjQyMzU4NTM1LDMuMjI1NzA3MzMgTDAuOTIwMjcxOTIsMS43MTU3NjcwNSBMMS43MTU3NjcwNSwwLjkyMDI3MTkyIEwzLjIyNTcwNzMzLDEuNDIzNTg1MzUgTDMuOTM3NSwwIEw1LjA2MjUsMCBMNS43NzQyOTI2NywxLjQyMzU4NTM1IEw3LjI4NDIzMjk1LDAuOTIwMjcxOTIgTDguMDc5NzI4MDgsMS43MTU3NjcwNSBMNy41NzY0MTQ2NSwzLjIyNTcwNzMzIEw5LDMuOTM3NSBMOSw1LjA2MjUgTDcuNTc2NDE0NjUsNS43NzQyOTI2NyBMOC4wNzk3MjgwOCw3LjI4NDIzMjk1IEw3LjI4NDIzMjk1LDguMDc5NzI4MDggTDUuNzc0MjkyNjcsNy41NzY0MTQ2NSBMNS4wNjI1LDkgTDMuOTM3NSw5IEwzLjIyNTcwNzMzLDcuNTc2NDE0NjUgTDEuNzE1NzY3MDUsOC4wNzk3MjgwOCBMMC45MjAyNzE5Miw3LjI4NDIzMjk1IEwxLjQyMzU4NTM1LDUuNzc0MjkyNjcgWiBNNC41LDYuMTg3NSBDNS40MzE5ODA1Miw2LjE4NzUgNi4xODc1LDUuNDMxOTgwNTIgNi4xODc1LDQuNSBDNi4xODc1LDMuNTY4MDE5NDggNS40MzE5ODA1MiwyLjgxMjUgNC41LDIuODEyNSBDMy41NjgwMTk0OCwyLjgxMjUgMi44MTI1LDMuNTY4MDE5NDggMi44MTI1LDQuNSBDMi44MTI1LDUuNDMxOTgwNTIgMy41NjgwMTk0OCw2LjE4NzUgNC41LDYuMTg3NSBaIE0xMS41LDEzLjE4NzUgQzEyLjQzMTk4MDUsMTMuMTg3NSAxMy4xODc1LDEyLjQzMTk4MDUgMTMuMTg3NSwxMS41IEMxMy4xODc1LDEwLjU2ODAxOTUgMTIuNDMxOTgwNSw5LjgxMjUgMTEuNSw5LjgxMjUgQzEwLjU2ODAxOTUsOS44MTI1IDkuODEyNSwxMC41NjgwMTk1IDkuODEyNSwxMS41IEM5LjgxMjUsMTIuNDMxOTgwNSAxMC41NjgwMTk1LDEzLjE4NzUgMTEuNSwxMy4xODc1IFoiIGlkPSJDb21iaW5lZC1TaGFwZSI+PC9wYXRoPgogICAgICAgIDwvZz4KICAgICAgICA8ZyBpZD0icnVubmluZyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNS4wMDAwMDAsIDMuMDAwMDAwKSIgZmlsbD0iIzZFQTIwNCIgc3Ryb2tlPSIjRkZGRkZGIj4KICAgICAgICAgICAgPHBhdGggZD0iTTIuMjA3MTA2NzgsLTAuNSBMLTAuNSwtMC41IEwtMC41LDEwLjUgTDIuMjA3MTA2NzgsMTAuNSBMNy43MDcxMDY3OCw1IEwyLjIwNzEwNjc4LC0wLjUgWiIgaWQ9IlJlY3RhbmdsZSI+PC9wYXRoPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+'

}



function onSrcChangePause(imgChange) {

    imgChange.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4IiB2aWV3Qm94PSIwIDAgMTYgMTYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgc3R5bGU9ImJhY2tncm91bmQ6ICNGRkZGRkY7Ij4KICAgIDx0aXRsZT5wcm9jZXNzIHBhdXNlPC90aXRsZT4KICAgIDxnIGlkPSJwcm9jZXNzLXBhdXNlIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8cmVjdCBmaWxsPSIjRkZGRkZGIiB4PSIwIiB5PSIwIiB3aWR0aD0iMTYiIGhlaWdodD0iMTYiPjwvcmVjdD4KICAgICAgICA8ZyBpZD0icHJvY2VzcyIgb3BhY2l0eT0iMC42IiBmaWxsPSIjNzU3NTc1IiBmaWxsLXJ1bGU9Im5vbnplcm8iPgogICAgICAgICAgICA8cGF0aCBkPSJNOC40MjM1ODUzNSwxMi43NzQyOTI3IEw3LDEyLjA2MjUgTDcsMTAuOTM3NSBMOC40MjM1ODUzNSwxMC4yMjU3MDczIEw3LjkyMDI3MTkyLDguNzE1NzY3MDUgTDguNzE1NzY3MDUsNy45MjAyNzE5MiBMMTAuMjI1NzA3Myw4LjQyMzU4NTM1IEwxMC45Mzc1LDcgTDEyLjA2MjUsNyBMMTIuNzc0MjkyNyw4LjQyMzU4NTM1IEwxNC4yODQyMzMsNy45MjAyNzE5MiBMMTUuMDc5NzI4MSw4LjcxNTc2NzA1IEwxNC41NzY0MTQ3LDEwLjIyNTcwNzMgTDE2LDEwLjkzNzUgTDE2LDEyLjA2MjUgTDE0LjU3NjQxNDcsMTIuNzc0MjkyNyBMMTUuMDc5NzI4MSwxNC4yODQyMzMgTDE0LjI4NDIzMywxNS4wNzk3MjgxIEwxMi43NzQyOTI3LDE0LjU3NjQxNDcgTDEyLjA2MjUsMTYgTDEwLjkzNzUsMTYgTDEwLjIyNTcwNzMsMTQuNTc2NDE0NyBMOC43MTU3NjcwNSwxNS4wNzk3MjgxIEw3LjkyMDI3MTkyLDE0LjI4NDIzMyBMOC40MjM1ODUzNSwxMi43NzQyOTI3IFogTTEuNDIzNTg1MzUsNS43NzQyOTI2NyBMMCw1LjA2MjUgTDAsMy45Mzc1IEwxLjQyMzU4NTM1LDMuMjI1NzA3MzMgTDAuOTIwMjcxOTIsMS43MTU3NjcwNSBMMS43MTU3NjcwNSwwLjkyMDI3MTkyIEwzLjIyNTcwNzMzLDEuNDIzNTg1MzUgTDMuOTM3NSwwIEw1LjA2MjUsMCBMNS43NzQyOTI2NywxLjQyMzU4NTM1IEw3LjI4NDIzMjk1LDAuOTIwMjcxOTIgTDguMDc5NzI4MDgsMS43MTU3NjcwNSBMNy41NzY0MTQ2NSwzLjIyNTcwNzMzIEw5LDMuOTM3NSBMOSw1LjA2MjUgTDcuNTc2NDE0NjUsNS43NzQyOTI2NyBMOC4wNzk3MjgwOCw3LjI4NDIzMjk1IEw3LjI4NDIzMjk1LDguMDc5NzI4MDggTDUuNzc0MjkyNjcsNy41NzY0MTQ2NSBMNS4wNjI1LDkgTDMuOTM3NSw5IEwzLjIyNTcwNzMzLDcuNTc2NDE0NjUgTDEuNzE1NzY3MDUsOC4wNzk3MjgwOCBMMC45MjAyNzE5Miw3LjI4NDIzMjk1IEwxLjQyMzU4NTM1LDUuNzc0MjkyNjcgWiBNNC41LDYuMTg3NSBDNS40MzE5ODA1Miw2LjE4NzUgNi4xODc1LDUuNDMxOTgwNTIgNi4xODc1LDQuNSBDNi4xODc1LDMuNTY4MDE5NDggNS40MzE5ODA1MiwyLjgxMjUgNC41LDIuODEyNSBDMy41NjgwMTk0OCwyLjgxMjUgMi44MTI1LDMuNTY4MDE5NDggMi44MTI1LDQuNSBDMi44MTI1LDUuNDMxOTgwNTIgMy41NjgwMTk0OCw2LjE4NzUgNC41LDYuMTg3NSBaIE0xMS41LDEzLjE4NzUgQzEyLjQzMTk4MDUsMTMuMTg3NSAxMy4xODc1LDEyLjQzMTk4MDUgMTMuMTg3NSwxMS41IEMxMy4xODc1LDEwLjU2ODAxOTUgMTIuNDMxOTgwNSw5LjgxMjUgMTEuNSw5LjgxMjUgQzEwLjU2ODAxOTUsOS44MTI1IDkuODEyNSwxMC41NjgwMTk1IDkuODEyNSwxMS41IEM5LjgxMjUsMTIuNDMxOTgwNSAxMC41NjgwMTk1LDEzLjE4NzUgMTEuNSwxMy4xODc1IFoiIGlkPSJDb21iaW5lZC1TaGFwZSI+PC9wYXRoPgogICAgICAgIDwvZz4KICAgICAgICA8ZyBpZD0icGF1c2UiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDUuMDAwMDAwLCAzLjAwMDAwMCkiIGZpbGw9IiNCNzI5NUEiIHN0cm9rZT0iI0ZGRkZGRiI+CiAgICAgICAgICAgIDxyZWN0IGlkPSJSZWN0YW5nbGUiIHg9Ii0wLjUiIHk9Ii0wLjUiIHdpZHRoPSIzIiBoZWlnaHQ9IjExIj48L3JlY3Q+CiAgICAgICAgICAgIDxyZWN0IGlkPSJSZWN0YW5nbGUiIHg9IjQuNSIgeT0iLTAuNSIgd2lkdGg9IjMiIGhlaWdodD0iMTEiPjwvcmVjdD4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg=='

}


