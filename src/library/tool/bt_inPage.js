let BoomiPlatform_showconnections = true;
let treeviewtimer = null;
let duplicateNames = [];
let root = null;
const process_tree_update = (xml) => {

    root = xml.getElementsByTagName('Folders')[0];
    let connections = root.querySelectorAll('Category[name=Connections]');

    if(!window.BoomiPlatform) return false;
    if(BoomiPlatform.component_name_notify) dupeNamesCheck();

    //THIS SECTION WAS USED FOR A GLOBAL ALERT IF THERE WERE MULTIPLE PARENT FOLDERS. IT TURNED OUT TO BE TOO ANNOYING.
    /* let parentFolders = [];
    connections.forEach(conn => {
        let folder = conn.closest('Folder');
        if(!parentFolders.includes(folder)) parentFolders.push(folder)
    })

    let msg_html = `<span class="BoomiPlatformConnections">${connections.length} Connections`;

    if(parentFolders.length > 1){
        //connection parent folder mismatch


        parentFolders = parentFolders.map(folder => `<li>${folder.attributes.name.value}</li>`).join('')

        let alert_html = `
        <div class="BoomiPlatformOverlay" style="position:fixed;z-index:9999;display:grid;place-items:center;min-height:100vh;min-width:100vw;background: rgba(0,0,0,0.25);">
            <div class="alert_label_content error_label_content" style="max-height: 600px; max-width: 600px; overflow: auto; padding: 10px; border-radius:4px; box-shadow:0 0 20px 0 rgba(0,0,0,0.25)">
                <span class="alert_icon" style="padding-top:0;vertical-align: middle;"><img style="width:24px; height:24px;" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB2aWV3Qm94PSIwIDAgMTYgMTYiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDE2IDE2OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+Cgk8ZGVmcz48c3R5bGU+LmQge2ZpbGw6I2ZmZmZmZn08L3N0eWxlPjwvZGVmcz4KPHBhdGggY2xhc3M9ImQiIGQ9Ik04LjksMS42bDYuNCwxMS44YzAuMiwwLjMsMC4yLDAuNywwLDFjLTAuMSwwLjItMC4yLDAuMy0wLjQsMC40Yy0wLjIsMC4xLTAuMywwLjEtMC41LDAuMUgxLjZjLTAuMiwwLTAuNC0wLjEtMC41LTAuMQoJYy0wLjItMC4xLTAuMy0wLjItMC40LTAuNGMtMC4yLTAuMy0wLjItMC43LDAtMUw3LjEsMS42YzAuMS0wLjIsMC4yLTAuMywwLjQtMC40UzcuOCwxLDgsMXMwLjQsMCwwLjUsMC4xQzguNywxLjMsOC44LDEuNCw4LjksMS42egoJIE05LDkuNGwwLjEtMy44YzAtMC4xLDAtMC4xLTAuMS0wLjJDOS4xLDUuNCw5LDUuMyw4LjksNS4zSDcuMWMtMC4xLDAtMC4xLDAtMC4yLDAuMWMtMC4xLDAtMC4xLDAuMS0wLjEsMC4ybDAuMSwzLjgKCWMwLDAuMSwwLDAuMSwwLjEsMC4xYzAuMSwwLDAuMSwwLjEsMC4yLDBoMS41YzAuMSwwLDAuMSwwLDAuMiwwQzksOS41LDksOS41LDksOS40eiBNOS4xLDEyLjV2LTEuNmMwLTAuMSwwLTAuMS0wLjEtMC4yCgljLTAuMS0wLjEtMC4xLTAuMS0wLjItMC4xSDcuMmMtMC4xLDAtMC4xLDAtMC4yLDAuMWMtMC4xLDAuMS0wLjEsMC4xLTAuMSwwLjJ2MS42YzAsMC4xLDAsMC4xLDAuMSwwLjJjMC4xLDAuMSwwLjEsMC4xLDAuMiwwLjFoMS42CgljMC4xLDAsMC4xLDAsMC4yLTAuMUM5LDEyLjcsOS4xLDEyLjYsOS4xLDEyLjV6Ii8+Cjwvc3ZnPgo=" alt="Warning"></span>
                <div class="alert_text">
                    <b>BoomiPlatform:</b> Found Connections in multiple folders! Best practice is to keep ALL Connections in the same parent folder.
                    <br>
                    <br>
                    Folders with 1 or more Connections:<br>
                    ${parentFolders}
                </div>
                <span class="alert_dismiss">
                    <a class="gwt-Anchor" data-locator="link-cancel" href="javascript:document.querySelector('.BoomiPlatformOverlay').remove();">
                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 16 16" style="width: 12px; height: 12px;"><title>Cancel</title><path class="svg-foreground" d="M14.284,12.546c0.348,0.348,0.521,0.764,0.521,1.246s-0.174,0.888-0.521,1.216c-0.348,0.328-0.763,0.493-1.245,0.493 c-0.483,0-0.898-0.155-1.245-0.463l-3.822-4.402l-3.822,4.402C3.801,15.345,3.386,15.5,2.904,15.5c-0.483,0-0.898-0.155-1.245-0.463 c-0.309-0.348-0.463-0.763-0.463-1.245s0.154-0.898,0.463-1.246l3.996-4.517L1.659,3.453C1.35,3.106,1.195,2.692,1.195,2.208 c0-0.482,0.154-0.898,0.463-1.245C2.006,0.655,2.421,0.5,2.904,0.5c0.482,0,0.898,0.155,1.245,0.463l3.822,4.401l3.822-4.401 C12.141,0.655,12.556,0.5,13.039,0.5c0.482,0,0.897,0.164,1.245,0.493s0.521,0.734,0.521,1.216c0,0.483-0.174,0.898-0.521,1.245 l-3.996,4.576L14.284,12.546z"></path></svg>
                    </a>
                </span>
            </div>
        </div>`

        document.getElementsByTagName('body')[0].insertAdjacentHTML('beforeend', alert_html)

        msg_html+= ` <span class="connectionsspanlink" onclick="BoomiPlatform_showconnections = !BoomiPlatform_showconnections">(${parentFolders.length} Parent Folders)</span>`;

    }

    msg_html+= `</span>`;
    [...document.querySelectorAll('.BoomiPlatformConnections')].forEach(el => el.remove());
    document.querySelector('#mastfoot').insertAdjacentHTML('afterbegin', msg_html);
    
    clearInterval(treeviewtimer);
    treeviewtimer = setInterval(()=>{
        
        let folderElements = parentFolders.map(folder => {
            return [...document.querySelectorAll('.filterable_component_tree .gwt-FastTreeItem .gwt-Label')].find(label => label.innerText == folder.attributes.name.value) || false;
        }).filter(folder => !!folder);
        
        [...document.querySelectorAll('.BoomiPlatform_showconnections')].forEach(el => el.classList.remove('BoomiPlatform_showconnections'));
        if(folderElements && folderElements.length > 1) {
            folderElements.forEach(folder => {
                if(BoomiPlatform_showconnections){
                    folder.classList.add('BoomiPlatform_showconnections');
                }else{
                    folder.classList.remove('BoomiPlatform_showconnections');
                }
            })
        }
    },500) */


}

const dupeNamesCheck = () => {
    if(!root) return false;
    let components = root.querySelectorAll('Component');
    let uniqueComponentNames = [], dupeCount = 0;
    duplicateNames = [];
    components.forEach(component => {
        component.getAttribute('name').toLowerCase()
        if(uniqueComponentNames.find(item => {
            let typeMatch = item.getAttribute('type') == component.getAttribute('type');
            let nameMatch = item.getAttribute('name') == component.getAttribute('name');
            
            if(BoomiPlatform.component_name_notify == 'type') return typeMatch && nameMatch;
            else return nameMatch

        })){
            dupeCount++;
            if(!duplicateNames.includes(component.getAttribute('name'))) duplicateNames.push(component.getAttribute('name'))
        }else{
            uniqueComponentNames.push(component)
        }
    })

    if(dupeCount && BoomiPlatform.component_name_notify != 'off'){
        let msg_html = `<span class="BoomiPlatformConnections">`;
        msg_html+= `<span class="connectionsspanlink" onclick="displayDupeNames()">${dupeCount} Duplicate Component Names</span>`;
        msg_html+= `</span>`;

        [...document.querySelectorAll('.BoomiPlatformConnections')].forEach(el => el.remove());
        document.querySelector('#mastfoot').insertAdjacentHTML('afterbegin', msg_html);
    }
}

const displayDupeNames = () => {
    parentFolders = duplicateNames.map(name => `<li><a href="javascript:filterBy('${name}')">${name}</a></li>`).join('');

    let alert_html = `
    <div class="BoomiPlatformOverlay" style="position:fixed;z-index:9999;display:grid;place-items:center;min-height:100vh;min-width:100vw;background: rgba(0,0,0,0.25);">
        <div class="alert_label_content error_label_content" style="max-height: 600px; max-width: 600px; overflow: auto; padding: 10px; border-radius:4px; box-shadow:0 0 20px 0 rgba(0,0,0,0.25)">
            <span class="alert_icon" style="padding-top:0;vertical-align: middle;"><img style="width:24px; height:24px;" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB2aWV3Qm94PSIwIDAgMTYgMTYiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDE2IDE2OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+Cgk8ZGVmcz48c3R5bGU+LmQge2ZpbGw6I2ZmZmZmZn08L3N0eWxlPjwvZGVmcz4KPHBhdGggY2xhc3M9ImQiIGQ9Ik04LjksMS42bDYuNCwxMS44YzAuMiwwLjMsMC4yLDAuNywwLDFjLTAuMSwwLjItMC4yLDAuMy0wLjQsMC40Yy0wLjIsMC4xLTAuMywwLjEtMC41LDAuMUgxLjZjLTAuMiwwLTAuNC0wLjEtMC41LTAuMQoJYy0wLjItMC4xLTAuMy0wLjItMC40LTAuNGMtMC4yLTAuMy0wLjItMC43LDAtMUw3LjEsMS42YzAuMS0wLjIsMC4yLTAuMywwLjQtMC40UzcuOCwxLDgsMXMwLjQsMCwwLjUsMC4xQzguNywxLjMsOC44LDEuNCw4LjksMS42egoJIE05LDkuNGwwLjEtMy44YzAtMC4xLDAtMC4xLTAuMS0wLjJDOS4xLDUuNCw5LDUuMyw4LjksNS4zSDcuMWMtMC4xLDAtMC4xLDAtMC4yLDAuMWMtMC4xLDAtMC4xLDAuMS0wLjEsMC4ybDAuMSwzLjgKCWMwLDAuMSwwLDAuMSwwLjEsMC4xYzAuMSwwLDAuMSwwLjEsMC4yLDBoMS41YzAuMSwwLDAuMSwwLDAuMiwwQzksOS41LDksOS41LDksOS40eiBNOS4xLDEyLjV2LTEuNmMwLTAuMSwwLTAuMS0wLjEtMC4yCgljLTAuMS0wLjEtMC4xLTAuMS0wLjItMC4xSDcuMmMtMC4xLDAtMC4xLDAtMC4yLDAuMWMtMC4xLDAuMS0wLjEsMC4xLTAuMSwwLjJ2MS42YzAsMC4xLDAsMC4xLDAuMSwwLjJjMC4xLDAuMSwwLjEsMC4xLDAuMiwwLjFoMS42CgljMC4xLDAsMC4xLDAsMC4yLTAuMUM5LDEyLjcsOS4xLDEyLjYsOS4xLDEyLjV6Ii8+Cjwvc3ZnPgo=" alt="Warning"></span>
            <div class="alert_text">
                <b>BoomiPlatform:</b> Found Duplicate Component Names!
                <p>Having components with the same name can cause confusion.</p>
                <br>
                <br>
                Click a component name to filter:<br>
                ${parentFolders}
            </div>
            <span class="alert_dismiss">
                <a class="gwt-Anchor" data-locator="link-cancel" href="javascript:document.querySelector('.BoomiPlatformOverlay').remove();">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 16 16" style="width: 12px; height: 12px;"><title>Cancel</title><path class="svg-foreground" d="M14.284,12.546c0.348,0.348,0.521,0.764,0.521,1.246s-0.174,0.888-0.521,1.216c-0.348,0.328-0.763,0.493-1.245,0.493 c-0.483,0-0.898-0.155-1.245-0.463l-3.822-4.402l-3.822,4.402C3.801,15.345,3.386,15.5,2.904,15.5c-0.483,0-0.898-0.155-1.245-0.463 c-0.309-0.348-0.463-0.763-0.463-1.245s0.154-0.898,0.463-1.246l3.996-4.517L1.659,3.453C1.35,3.106,1.195,2.692,1.195,2.208 c0-0.482,0.154-0.898,0.463-1.245C2.006,0.655,2.421,0.5,2.904,0.5c0.482,0,0.898,0.155,1.245,0.463l3.822,4.401l3.822-4.401 C12.141,0.655,12.556,0.5,13.039,0.5c0.482,0,0.897,0.164,1.245,0.493s0.521,0.734,0.521,1.216c0,0.483-0.174,0.898-0.521,1.245 l-3.996,4.576L14.284,12.546z"></path></svg>
                </a>
            </span>
        </div>
    </div>`

    document.getElementsByTagName('body')[0].insertAdjacentHTML('beforeend', alert_html)
}

let filterNameInt = null;
const filterBy = (str) => {
    document.querySelector('.BoomiPlatformOverlay').remove();
    let searchbox = document.querySelector('input[placeholder="Search for component or folder"]');
    searchbox.value = str;


    let e = new KeyboardEvent("keyup", {
        bubbles : true,
        cancelable : true,
        keyCode : 13
    });

    searchbox.dispatchEvent(e);
    
    [...document.querySelectorAll('.BoomiPlatform_showconnections')].forEach(el => el.classList.remove('BoomiPlatform_showconnections'));
    clearInterval(filterNameInt);
    filterNameInt = setInterval(()=>{

        if(searchbox.value == str){
            let components_tohighlight = [...document.querySelectorAll('.filterable_component_tree .component_tree_image .gwt-Label')].filter(comp => comp.innerText == searchbox.value);
            components_tohighlight.forEach(comp => {
                comp.classList.add('BoomiPlatform_showconnections');
            })
        }else{
            [...document.querySelectorAll('.BoomiPlatform_showconnections')].forEach(el => el.classList.remove('BoomiPlatform_showconnections'));
            clearInterval(filterNameInt)
        }

    },250)
    
}

let currentColor = 0;
let windowMouseMover = false;
let dragObj = null;
const create_note_group = (el) => {

    let noteForm = el.closest('.note-form');
    
    try {
        if(!noteForm){
            var node = el.closest('.note-preview').parentElement.parentElement;
            noteForm = [...el.closest('.gwt-ProcessPanel').querySelectorAll(':not([data-notegroup]')].reverse().find(child => {
                try {
                    if(parseInt(child.style.top) == parseInt(node.style.top) && parseInt(child.style.left) == parseInt(node.style.left) && child.querySelector('.note-form')) return true;
                } catch (error) {}
            }).querySelector('.note-form');
            node = noteForm.parentElement;
        }else{
            var node = noteForm.parentElement;
        }
    } catch (error) {
        return false
    }
    

    let nodeParent = noteForm.closest('.gwt-ProcessPanel');

    let colors = {
        'blue'  : '0  , 100 , 255',
        'red'   : '255, 0   , 50',
        'green' : '0  , 255 , 100',
        'purple': '100, 50  , 200',
        'orange': '230, 130 , 30'
    }

    if(!node.hasAttribute('data-notegroup')){
        noteForm.querySelector('.NoteGroupButton').innerText = "Resize";
        
        setTimeout(()=>{

            let matched_node = [...nodeParent.querySelectorAll(':not([data-notegroup]')].reverse().find(child => {
                try {
                    if(parseInt(child.style.top) == parseInt(node.style.top) && parseInt(child.style.left) == parseInt(node.style.left) && child.querySelector('.note-content')) return true;
                } catch (error) {}
            })
    
            let matched_icon = [...nodeParent.querySelectorAll(':not([data-notegroup]')].reverse().find(child => {
                try {
                    if(parseInt(child.style.top) == parseInt(node.style.top)-23 && parseInt(child.style.left) == parseInt(node.style.left) && child.querySelector('.gwt-Image')) return true;
                } catch (error) {}
            })

            if(!matched_node || !matched_icon) return false;

        
            let group_id = [...Array(8)].map(i=>(~~(Math.random()*10))).join('');

            let color_use = Object.keys(colors)[currentColor];

            let notegroup_html = `
            <div class="BoomiPlatformNoteGroup" data-notegroup="${group_id}" style="position:absolute;z-index:0;top:${matched_icon.style.top};left:${matched_icon.style.left};width:60px;height:40px;background:rgba(${colors[color_use]},0.1);border:1px solid rgba(${colors[color_use]},0.5);border-radius:2px;">
                <div class="NoteResize" style="display:none;position:absolute;bottom:0;right:0;width:10px;height:10px;cursor:nwse-resize;background: linear-gradient(-45deg,rgba(0,0,0,0.5) 10%, transparent 10%,transparent 20%, rgba(0,0,0,0.5) 20%,rgba(0,0,0,0.5) 30%, transparent 30%,transparent 40%, rgba(0,0,0,0.5) 40%,rgba(0,0,0,0.5) 50%, transparent 50%);"></div>
            </div>
            `

            let selectgroup_html = `
            <div tabindex="0" class="gwt-IconButton floatLeft buttonSpacer" role="button" title="Select Group" onclick="select_group(this)">
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAgMAAABinRfyAAAADFBMVEVHcEwAU5xCQkIAU5zB5tVZAAAAAnRSTlMA8MsuPyQAAAAySURBVAjXY2CAA61Vq1YwKDAwcGAQPEBCq59rBQMD/wGgQv4PIOIPiPgPIkCaWaCGAABP2Qhg63w3vwAAAABJRU5ErkJggg==" width="16" height="16" class="gwt-Image">
            </div>
            `

            matched_node.insertAdjacentHTML('afterend', notegroup_html);
            matched_node.setAttribute('data-notegroup', group_id);
            matched_node.querySelector('.note-content').style.whiteSpace = 'pre';
            matched_node.classList.add('note-hover');
            matched_node.querySelector('.note-preview-buttons').insertAdjacentHTML('beforeend', selectgroup_html);
            
            node.setAttribute('data-notegroup', group_id);
            node.classList.add('note-editor');

            matched_icon.style.zIndex = '999';
            matched_icon.setAttribute('data-notegroup', group_id);
            matched_icon.classList.add('note-icon');

            
            let note_group = document.querySelector(`.BoomiPlatformNoteGroup[data-notegroup="${group_id}"]`);
            
            function rerender_note(){
                let match = /\n{0,2}---\n\#BoomiPlatform: \[\"(\d*px)\"\,\"(\d*px)\"\,\"([a-z]*)\"\]/g.exec(noteForm.querySelector('textarea').value)
                
                note_group.style.background = `rgba(${colors[match[3]]},0.1)`;
                note_group.style.border = `1px solid rgba(${colors[match[3]]},0.5)`;
                note_group.style.width = match[1];
                note_group.style.height = match[2];
            }
            
            if(!/\n{0,2}---\n\#BoomiPlatform: \[\"(\d*px)\"\,\"(\d*px)\"\,\"([a-z]*)\"\]/g.test(noteForm.querySelector('textarea').value)){
                noteForm.querySelector('textarea').value += `\n\n---\n#BoomiPlatform: ["60px","40px","${color_use}"]`
            }else{
                rerender_note()
            }

            matched_icon.addEventListener('mouseup',function(){
                note_group.style.top = matched_icon.style.top;
                note_group.style.left = matched_icon.style.left;
            }, false);

            note_group.querySelector('.NoteResize').addEventListener('mousedown',function(e){
                dragObj = {
                    el: note_group,
                    x: e.pageX,
                    y: e.pageY,
                    w: parseInt(note_group.style.width),
                    h: parseInt(note_group.style.height)
                };
            }, false);

            let check_if_note_exists = setInterval(()=>{
                if(!nodeParent.querySelector(`.note-icon[data-notegroup="${group_id}"]`)){
                    clearInterval(check_if_note_exists)
                    nodeParent.querySelector(`.BoomiPlatformNoteGroup[data-notegroup="${group_id}"]`).remove()
                }
            },1000)

            if(!windowMouseMover){
                windowMouseMover = true;

                window.addEventListener('mouseup',function(){
                    if(dragObj){

                        let form_to_use = dragObj.el.closest('.gwt-ProcessPanel').querySelector(`.note-editor[data-notegroup="${dragObj.el.getAttribute('data-notegroup')}"]`)
                        let match = /\n{0,2}---\n\#BoomiPlatform: \[.*(\"[a-z]*\")\]/g.exec(form_to_use.querySelector('textarea').value)
                        form_to_use.querySelector('textarea').value = form_to_use.querySelector('textarea').value.replace(/\n{0,2}---\n\#BoomiPlatform: \[.*\]/g,`\n\n---\n#BoomiPlatform: ["${dragObj.el.style.width}","${dragObj.el.style.height}",${match[1]}]`)

                        dragObj.el.querySelector('.NoteResize').style.display = 'none';
                        form_to_use.style.display = 'block';

                        dragObj = null;
                    }
                }, false);

                window.addEventListener('mousemove',function(e){
                    let x = e.pageX, y = e.pageY;
                
                    if(dragObj == null) return;


                    try {
                        document.querySelector('.multiSelectPanel').style.cssText = 'display:none;top:0;left:0:width:0;height:0;';
                    } catch (error) {}

                    dragObj.el.style.width = Math.max(60,dragObj.w + ((dragObj.x - x)*-1)) + 'px';
                    dragObj.el.style.height = Math.max(40,dragObj.h + ((dragObj.y - y)*-1)) + 'px';

                });
            }
    
            currentColor++
            if(currentColor >= Object.values(colors).length) currentColor = 0;

            noteForm.querySelector('button[data-locator="button-save"]').addEventListener('mouseup', rerender_note, false);
    
        },10)

    }else{

        setTimeout(()=>{

            let note_group = document.querySelector(`.BoomiPlatformNoteGroup[data-notegroup="${node.getAttribute('data-notegroup')}"]`);
            note_group.querySelector('.NoteResize').style.display = 'block';
            node.style.display = 'none';

        },10)

    }


}

const render_note_groups = () => {

    let notes_to_render = [...document.querySelectorAll('.note-content')].filter(note => note.innerText.includes('#BoomiPlatform:') && !note.closest('.gwt-ProcessPanel').classList.contains('BT-notes-rendered'));
    if(!notes_to_render.length) return setTimeout(render_note_groups, 250) //wait for nodes to render

    setTimeout(()=>{
        notes_to_render.forEach(note => {create_note_group(note)})
        notes_to_render[0].closest('.gwt-ProcessPanel').classList.add('BT-notes-rendered')
    },10)

}

const select_group = (group) => {

    let node = group.closest('[data-notegroup]');
    let notegroup = group.closest(`.gwt-ProcessPanel`).querySelector(`.BoomiPlatformNoteGroup[data-notegroup="${node.getAttribute('data-notegroup')}"]`);

    var rect = notegroup.getBoundingClientRect();

    var down = new MouseEvent('mousedown', {
        "clientX": rect.x,
        "clientY": rect.y
    });

    var move = new MouseEvent('mousemove', {
        "clientX": rect.x+rect.width,
        "clientY": rect.y+rect.height
    });

    var up = new MouseEvent('mouseup', {
        "clientX": rect.x+rect.width,
        "clientY": rect.y+rect.height
    });

    notegroup.closest('.gwt-ProcessPanel').dispatchEvent(down)
    notegroup.closest('.gwt-ProcessPanel').dispatchEvent(move)
    notegroup.closest('.gwt-ProcessPanel').dispatchEvent(up)

}

let quick_component_listener = false;
const quick_component_select = (panel) => {

    panel.addEventListener('dblclick', function(e){

        if(document.querySelector('.copy_paste_panel').classList.contains('no_display')){
            if(e.target == panel.firstChild){

                let org_event = e;

                [...document.querySelectorAll('.BoomiPlatformQuickComponent')].forEach(item=>item.remove())

                let shapes_list = [...panel.closest('.component_editor_panel').querySelectorAll('.shape_palette_results .shape_palette_widget_container')].map(shape => `<option>${shape.querySelector('.gwt-Label').innerText}</option>`)

                let quickinput_html = `
                    <div class="BoomiPlatformQuickComponent" style="position:absolute;top:${e.clientY}px;left:${e.clientX}px;">
                        <form>
                            <input type="text" list="shapes_list" tabindex="-1" placeholder="Component name...">

                            <datalist id="shapes_list">
                                ${shapes_list}
                            </datalist>
                        </form>
                    </div>
                `

                document.querySelector('body').insertAdjacentHTML('beforeend', quickinput_html);
                
                setTimeout(()=>{
                    document.querySelector('.BoomiPlatformQuickComponent input').focus()

                    document.querySelector('.BoomiPlatformQuickComponent input').addEventListener('change', function(e){
                        document.querySelector('filter_search_input')
                    });

                    document.querySelector('.BoomiPlatformQuickComponent form').addEventListener('submit', function(e){
                        e.preventDefault();
                        
                        let first = [...panel.closest('.component_editor_panel').querySelectorAll('.shape_palette_results .shape_palette_widget_container')].find(shape => shape.querySelector('.gwt-Label').innerText.toLowerCase() == document.querySelector('.BoomiPlatformQuickComponent input').value.toLowerCase());

                        if(!first) return false;

                        var down = new MouseEvent('mousedown');

                        var up = new MouseEvent('mouseup',{
                            "clientX": org_event.clientX,
                            "clientY": org_event.clientY
                        });

                        first.dispatchEvent(down)
                        document.querySelector('body > div[tabindex="0"]').dispatchEvent(up);

                        setTimeout(()=>{
                            [...document.querySelectorAll('.BoomiPlatformQuickComponent')].forEach(item=>item.remove())
                        },0)
                    });
                },0)

            }
        }

    });

    panel.addEventListener('mouseup', function(e){
        if(e.target != document.querySelector('.BoomiPlatformQuickComponent')){
            [...document.querySelectorAll('.BoomiPlatformQuickComponent')].forEach(item=>item.remove())
        }
    });

}

const add_endpoint_listener = (endpoint) => {

    if(BoomiPlatform.endpoint_flash == 'testing'){
        endpoint.classList.add('bt-endpoint-flash-testonly');
    }else if(BoomiPlatform.endpoint_flash != 'off'){
        endpoint.classList.add('bt-endpoint-flash');
    }

    let endpointmenu_html = `
    <div class="BoomiPlatformEndpointMenu" tabindex="0" style="z-index: 5;position: absolute;left: -130%;top: -230%; width: max-content;" aria-hidden="true">
        <div>
            <div class="hover-menu-hidden-hotspot">
                <div class="hover-menu">
                    <ul class="menu-options">
                        <li><div class="gwt-Label gwt-ClickableLabel bt-stop">Stop</div></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    `;

    endpoint.insertAdjacentHTML('beforeend', endpointmenu_html);

    endpoint.querySelector('.bt-stop').addEventListener('mousedown', function(e){

        let first = [...endpoint.closest('.component_editor_panel').querySelectorAll('.shape_palette_results .shape_palette_widget_container')].find(shape => shape.querySelector('.gwt-Label').innerText.toLowerCase() == "stop");

        if(!first) return false;

        let rect = endpoint.getBoundingClientRect();

        var down = new MouseEvent('mousedown');
        var up = new MouseEvent('mouseup',{
            "clientX": rect.left+15,
            "clientY": rect.top-15
        });

        first.dispatchEvent(down)
        document.querySelector('body > div[tabindex="0"]').dispatchEvent(up);

        setTimeout(()=>{
            endpoint.dispatchEvent(down)


            var up = new MouseEvent('mouseup',{
                "clientX": rect.left+25,
                "clientY": rect.top+5
            });
            document.querySelector('body > div[tabindex="0"]').dispatchEvent(up);


            setTimeout(()=>{
                let sidepanel = [...document.querySelectorAll('.shape_side_panel .form_title_label')].find(el => el.innerText == "Stop Shape");
                sidepanel = sidepanel.closest('.shape_side_panel');
            
                document.querySelector('.glass_standard').style.display = 'none';
                sidepanel.closest('.anchor_side_panel').style.display = 'none';

                let okbutton = sidepanel.querySelector('button[data-locator="button-ok"]');
                okbutton.click();
            },0)

        },0)

    })

}

const add_shape_listener = (shape) => {
    if(BoomiPlatform.path_trace_highlight == 'off') return false;
    let rect = shape.getBoundingClientRect();
    if(rect.width != 34 && rect.height != 34) return false;

    let iconTitle = shape.querySelector('.gwt-Image:not([title])');
    let iconTitle2 = shape.querySelector('.gwt-Image[title="Note"]');
    if(iconTitle || iconTitle2) return false;

    let timer = null;

    setTimeout(()=>{

        shape.addEventListener('mouseover', function(e){

            timer = setTimeout(()=>{
                [...document.querySelectorAll(`.gwt-connectors-line`)].forEach(line => {
                    line.classList.add('BoomiPlatform-linetrace')
                });

                var down = new MouseEvent('mousedown');

                var move = new MouseEvent('mousemove', {
                    "clientX": 5,
                    "clientY": 0
                });

                var up = new MouseEvent('mouseup', {
                    "clientX": 0,
                    "clientY": 0
                });
        
                shape.closest('.dragdrop-draggable').dispatchEvent(down);
                shape.closest('.dragdrop-draggable').dispatchEvent(move);
                document.querySelector('body > div[tabindex="0"]').dispatchEvent(up);

                setTimeout(()=>{
                    [...document.querySelectorAll(`.gwt-connectors-line:not(.BoomiPlatform-linetrace)`)].forEach(line => {
                        line.parentNode.classList.add('BoomiPlatform-lineparent')

                        line.classList.add(BoomiPlatform.path_trace_highlight == 'solid' ? 'BoomiPlatform-linetrace-active-solid':'BoomiPlatform-linetrace-active-pulse' )
                    })
                },0)
            },650)
        })

        shape.addEventListener('mouseout', function(e){
            clearTimeout(timer);

            [...document.querySelectorAll(`.gwt-connectors-line`)].forEach(line => {
                line.classList.remove('BoomiPlatform-linetrace')
                line.parentNode.classList.remove('BoomiPlatform-lineparent')
                line.classList.remove('BoomiPlatform-linetrace-active')
                line.classList.remove('BoomiPlatform-linetrace-active-pulse')
            });
        })

        shape.addEventListener('mousedown', function(e){
            clearTimeout(timer);

            [...document.querySelectorAll(`.gwt-connectors-line`)].forEach(line => {
                line.classList.remove('BoomiPlatform-linetrace')
                line.parentNode.classList.remove('BoomiPlatform-lineparent')
                line.classList.remove('BoomiPlatform-linetrace-active')
                line.classList.remove('BoomiPlatform-linetrace-active-pulse')
            });
        })

    },0)

}

let fullscreen_once = false;
let fullscreen_cycle = false;
let fullscreen_status = false;
const add_fullscreen_listener = (button) => {

    setTimeout(()=>{
        var click = new MouseEvent('click', {
            "clientX": 1,
            "clientY": 1
        });

        button.addEventListener('mouseup', () => {
            fullscreen_cycle = false;
            if(!fullscreen_once){
                setTimeout(()=>{
                    fullscreen_once = true;
                    button.dispatchEvent(click);
                },1)
            }
            setTimeout(()=>{
                fullscreen_status = button.getAttribute('title').includes('Exit');
            },2)
        })

        window.addEventListener('keydown', event => {
            fullscreen_status = button.getAttribute('title').includes('Exit');

            //check if the focused element is editable
            var el=event.target, nodeName = el.nodeName.toLowerCase();
            if (el.nodeType == 1 && (nodeName == 'textarea' || el.isContentEditable || (nodeName == 'input' && /^(?:text|email|number|search|tel|url|password)$/i.test(el.type)))) return false;

            if(event.isComposing || event.keyCode === 229) return false;

            if(fullscreen_status == false || fullscreen_cycle == true){
                if(event.keyCode === (parseInt(BoomiPlatform.full_screen_shortcut) || 192)){
    
                    if(BoomiPlatform.full_screen_shortcut_alt && !event.altKey) return false;
                    if(BoomiPlatform.full_screen_shortcut_ctrl && !event.ctrlKey) return false;
                    if(BoomiPlatform.full_screen_shortcut_shift && !event.shiftKey) return false;
    
                    fullscreen_cycle = false;
                    setTimeout(()=>{
                        button.dispatchEvent(click);
                    },1)
                    if(!fullscreen_once){
                        setTimeout(()=>{
                            fullscreen_once = true;
                            button.dispatchEvent(click);
                        },10)
                    }
                }
            }

            if(fullscreen_status == true && fullscreen_cycle == false){
                [...document.querySelectorAll('.collapsible_dragger')].forEach((dragger,index) => {
                    setTimeout(()=>{
                        fullscreen_cycle = true;
                        let rect = dragger.getBoundingClientRect();
                        var down = new MouseEvent('mousedown', {
                            "clientX":rect.left,
                            "clientY":rect.top,
                        });

                        var move = new MouseEvent('mousemove', {
                            "clientX": 1,
                            "clientY": 1
                        });

                        var up = new MouseEvent('mouseup', {
                            "clientX": 1,
                            "clientY": 1
                        });

                        dragger.dispatchEvent(down);
                        dragger.dispatchEvent(move);
                        setTimeout(()=>{
                            dragger.dispatchEvent(up);
                        },15*index)
                    },10*index)
                })
            }
          });

    },0)

}

const add_dialog_listener = (dialog) => {

    if(!dialog.querySelector('.dialogTopCenterInner .Caption').innerText) return false;

    let rect = dialog.getBoundingClientRect();
    let children = [...dialog.getElementsByTagName('*')];


    //EXPERIMENTAL
    /* children.forEach(child => {
        if(child.style.width && child.style.height){
            console.log(parseInt(child.style.width), rect.width+20);
            if(parseInt(child.style.width) <= rect.width+20 && parseInt(child.style.width) >= rect.width-20){
                console.log(child);
            }

            if(parseInt(child.style.height) <= rect.height+20 && parseInt(child.style.height) >= rect.height-20){
                console.log(child);
            }
        }
    }) */

}

var beta_ui_enabled = false;
const check_beta = (process) => {
    
    // the best way i can come up with to determine if the beta ui is enabled...checking the entire img uri for a shape...im using stop but any of them would work
    let stopshapeicon = document.querySelectorAll('img[src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNjBweCIgaGVpZ2h0PSI2MHB4IiB2aWV3Qm94PSIwIDAgNjAgNjAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+U3RvcCBTaGFwZTwvdGl0bGU+CiAgICA8ZGVmcz48L2RlZnM+CiAgICA8ZyBpZD0iU3RvcCIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9Imljb24tZ3JvdXAiPgogICAgICAgICAgICA8cGF0aCBkPSJNMTQuNjQ0NTIxLDIuOTI4OTA5OTMgTDIuOTI4OTU0NDUsMTQuNjQ0NDAyNyBDMS4wNTM1NzcwNSwxNi41MTk3NjgzIDUuMDA0MjcyNjZlLTE1LDE5LjA2MzMxNyA1LjMyOTA3MDUyZS0xNSwyMS43MTU0OTI4IEwtNS4zMjkwNzA1MmUtMTUsMzguMjg0MTkyNSBDLTUuMDA0Mjc3MjJlLTE1LDQwLjkzNjMzMSAxLjA1MzU0NzU0LDQzLjQ3OTg0NzEgMi45Mjg4Nzg0Niw0NS4zNTUyMDY2IEwxNC42NDQ1MDc5LDU3LjA3MTAxNDEgQzE2LjUxOTg3NjEsNTguOTQ2NDEwNyAxOS4wNjM0MzgyLDYwIDIxLjcxNTYyOTUsNjAgTDM4LjI4NDM3MDUsNjAgQzQwLjkzNjU2MTgsNjAgNDMuNDgwMTIzOSw1OC45NDY0MTA3IDQ1LjM1NTQ5MjEsNTcuMDcxMDE0MSBMNTcuMDcxMTIxNSw0NS4zNTUyMDY2IEM1OC45NDY0NTI1LDQzLjQ3OTg0NzEgNjAsNDAuOTM2MzMxIDYwLDM4LjI4NDE5MjUgTDYwLDIxLjcxNTQ5MjggQzYwLDE5LjA2MzMxNyA1OC45NDY0MjMsMTYuNTE5NzY4MyA1Ny4wNzEwNDU2LDE0LjY0NDQwMjcgTDQ1LjM1NTQ3OSwyLjkyODkwOTkzIEM0My40ODAxMTcxLDEuMDUzNTU5NzYgNDAuOTM2NTg3NSwxLjI1MjY1MzQyZS0xNCAzOC4yODQ0MzM1LDEuMDY1ODE0MWUtMTQgTDIxLjcxNTU2NjUsMS43NzYzNTY4NGUtMTUgQzE5LjA2MzQxMjUsMi4yNjM1NDk2MmUtMTUgMTYuNTE5ODgyOSwxLjA1MzU1OTc2IDE0LjY0NDUyMSwyLjkyODkwOTkzIFoiIGlkPSJGaWxsLTEiIGZpbGw9IiNDRTExMjYiPjwvcGF0aD4KICAgICAgICAgICAgPHBhdGggZD0iTTE5LjA0Nzk3MTIsMzEuODg2Mzc4NyBDMTkuMDQ3OTcxMiwzMi44NTExNjc2IDE4LjY5NjY4NTUsMzMuNjExMjkyOSAxNy45OTQxMDM1LDM0LjE2Njc3NzQgQzE3LjI5MTUyMTYsMzQuNzIyMjYxOSAxNi4zMTQwODQ1LDM1IDE1LjA2MTc2MjksMzUgQzEzLjkwODA0OTQsMzUgMTIuODg3NDcyLDM0Ljc4NTYwNTcgMTIsMzQuMzU2ODEwNiBMMTIsMzIuMjUxODI3MiBDMTIuNzI5Njk5MiwzMi41NzM0MjM1IDEzLjM0NzIyMjUsMzIuNzk5OTk5MyAxMy44NTI1ODg0LDMyLjkzMTU2MTUgQzE0LjM1Nzk1NDQsMzMuMDYzMTIzNiAxNC44MjAxNzI1LDMzLjEyODkwMzcgMTUuMjM5MjU2NCwzMy4xMjg5MDM3IEMxNS43NDIxNTcyLDMzLjEyODkwMzcgMTYuMTI3OTU1MiwzMy4wMzM4ODggMTYuMzk2NjYyLDMyLjg0Mzg1MzggQzE2LjY2NTM2ODgsMzIuNjUzODE5NiAxNi43OTk3MjAyLDMyLjM3MTIwOSAxNi43OTk3MjAyLDMxLjk5NjAxMzMgQzE2Ljc5OTcyMDIsMzEuNzg2NDg4NCAxNi43NDA1NTYzLDMxLjYwMDExMTYgMTYuNjIyMjI2NywzMS40MzY4NzcxIEMxNi41MDM4OTcxLDMxLjI3MzY0MjYgMTYuMzMwMTAzMSwzMS4xMTY1MDEzIDE2LjEwMDgzOTUsMzAuOTY1NDQ4NSBDMTUuODcxNTc1OSwzMC44MTQzOTU3IDE1LjQwNDQyNzUsMzAuNTczMjAyMSAxNC42OTkzODA0LDMwLjI0MTg2MDUgQzE0LjAzODcwNjgsMjkuOTM0ODgyMiAxMy41NDMyMDkxLDI5LjY0MDA5IDEzLjIxMjg3MjMsMjkuMzU3NDc1MSBDMTIuODgyNTM1NSwyOS4wNzQ4NjAyIDEyLjYxODc2MzEsMjguNzQ1OTU5OCAxMi40MjE1NDcxLDI4LjM3MDc2NDEgQzEyLjIyNDMzMTEsMjcuOTk1NTY4NCAxMi4xMjU3MjQ2LDI3LjU1NzAzNDYgMTIuMTI1NzI0NiwyNy4wNTUxNDk1IEMxMi4xMjU3MjQ2LDI2LjEwOTg1MTMgMTIuNDQ5ODkzNSwyNS4zNjY3ODAxIDEzLjA5ODI0MTEsMjQuODI1OTEzNiBDMTMuNzQ2NTg4NiwyNC4yODUwNDcxIDE0LjY0MjY3NTMsMjQuMDE0NjE3OSAxNS43ODY1MjgxLDI0LjAxNDYxNzkgQzE2LjM0ODU5MzcsMjQuMDE0NjE3OSAxNi44ODQ3NjY2LDI0LjA4MDM5OCAxNy4zOTUwNjMsMjQuMjExOTYwMSBDMTcuOTA1MzU5MywyNC4zNDM1MjIzIDE4LjQzOTA2NzEsMjQuNTI4NjgxIDE4Ljk5NjIwMjMsMjQuNzY3NDQxOSBMMTguMjU2NjQ2LDI2LjUyODkwMzcgQzE3LjY3OTc4OTIsMjYuMjk1MDE1NCAxNy4yMDI3ODAyLDI2LjEzMTc4MzQgMTYuODI1NjA0NiwyNi4wMzkyMDI3IEMxNi40NDg0MjkxLDI1Ljk0NjYyMTkgMTYuMDc3NDIyLDI1LjkwMDMzMjIgMTUuNzEyNTcyNSwyNS45MDAzMzIyIEMxNS4yNzg2OTczLDI1LjkwMDMzMjIgMTQuOTQ1OTAwMywyNi4wMDAyMjA1IDE0LjcxNDE3MTUsMjYuMiBDMTQuNDgyNDQyNywyNi4zOTk3Nzk1IDE0LjM2NjU4MDEsMjYuNjYwNDYzNSAxNC4zNjY1ODAxLDI2Ljk4MjA1OTggQzE0LjM2NjU4MDEsMjcuMTgxODM5MyAxNC40MTM0MTgxLDI3LjM1NjAzNDcgMTQuNTA3MDk1NywyNy41MDQ2NTEyIEMxNC42MDA3NzMzLDI3LjY1MzI2NzYgMTQuNzQ5OTE1NywyNy43OTcwMDkzIDE0Ljk1NDUyNzMsMjcuOTM1ODgwNCBDMTUuMTU5MTM4OSwyOC4wNzQ3NTE1IDE1LjY0MzU0MzQsMjguMzI0NDcyMiAxNi40MDc3NTUzLDI4LjY4NTA0OTggQzE3LjQxODQ4NzMsMjkuMTYyNTcxNiAxOC4xMTExOTgxLDI5LjY0MTMwNDQgMTguNDg1OTA4NSwzMC4xMjEyNjI1IEMxOC44NjA2MTg4LDMwLjYwMTIyMDYgMTkuMDQ3OTcxMiwzMS4xODk1ODY4IDE5LjA0Nzk3MTIsMzEuODg2Mzc4NyBaIE0yNS4xNzg4OTI3LDM0Ljg1MzgyMDYgTDIyLjg4NjI2ODIsMzQuODUzODIwNiBMMjIuODg2MjY4MiwyNi4wNTM4MjA2IEwxOS45NTAyMjk5LDI2LjA1MzgyMDYgTDE5Ljk1MDIyOTksMjQuMTY4MTA2MyBMMjguMTE0OTMxLDI0LjE2ODEwNjMgTDI4LjExNDkzMSwyNi4wNTM4MjA2IEwyNS4xNzg4OTI3LDI2LjA1MzgyMDYgTDI1LjE3ODg5MjcsMzQuODUzODIwNiBaIE0zOS4yODk2MjYyLDI5LjQ5NjM0NTUgQzM5LjI4OTYyNjIsMzEuMjY1MTI1MSAzOC44NDU4OTY5LDMyLjYyNDU4IDM3Ljk1ODQyNDksMzMuNTc0NzUwOCBDMzcuMDcwOTUzLDM0LjUyNDkyMTcgMzUuNzk4OTI4OSwzNSAzNC4xNDIzMTQ2LDM1IEMzMi40ODU3MDAzLDM1IDMxLjIxMzY3NjIsMzQuNTI0OTIxNyAzMC4zMjYyMDQzLDMzLjU3NDc1MDggQzI5LjQzODczMjMsMzIuNjI0NTggMjguOTk1MDAzLDMxLjI2MDI1MjUgMjguOTk1MDAzLDI5LjQ4MTcyNzYgQzI4Ljk5NTAwMywyNy43MDMyMDI2IDI5LjQzOTk2NDksMjYuMzQ0OTY1OSAzMC4zMjk5MDIxLDI1LjQwNjk3NjcgQzMxLjIxOTgzOTIsMjQuNDY4OTg3NiAzMi40OTU1NjEsMjQgMzQuMTU3MTA1NywyNCBDMzUuODE4NjUwNSwyNCAzNy4wODk0NDE5LDI0LjQ3MjY0MiAzNy45Njk1MTgzLDI1LjQxNzk0MDIgQzM4Ljg0OTU5NDYsMjYuMzYzMjM4NCAzOS4yODk2MjYyLDI3LjcyMjY5MzIgMzkuMjg5NjI2MiwyOS40OTYzNDU1IFogTTMxLjM5ODU2MDksMjkuNDk2MzQ1NSBDMzEuMzk4NTYwOSwzMC42OTAxNDk5IDMxLjYyNzgyMSwzMS41ODkxNDQzIDMyLjA4NjM0ODIsMzIuMTkzMzU1NSBDMzIuNTQ0ODc1NCwzMi43OTc1NjY3IDMzLjIzMDE5MDcsMzMuMDk5NjY3OCAzNC4xNDIzMTQ2LDMzLjA5OTY2NzggQzM1Ljk3MTQ5MjksMzMuMDk5NjY3OCAzNi44ODYwNjg0LDMxLjg5ODU3MjQgMzYuODg2MDY4NCwyOS40OTYzNDU1IEMzNi44ODYwNjg0LDI3LjA4OTI0NiAzNS45NzY0MjMyLDI1Ljg4NTcxNDMgMzQuMTU3MTA1NywyNS44ODU3MTQzIEMzMy4yNDQ5ODE4LDI1Ljg4NTcxNDMgMzIuNTU3MjAxMywyNi4xODkwMzM1IDMyLjA5Mzc0MzgsMjYuNzk1NjgxMSBDMzEuNjMwMjg2MiwyNy40MDIzMjg2IDMxLjM5ODU2MDksMjguMzAyNTQxMSAzMS4zOTg1NjA5LDI5LjQ5NjM0NTUgWiBNNDMuODIzMTA2MSwyOS4xOTY2Nzc3IEw0NC41Nzc0NTM1LDI5LjE5NjY3NzcgQzQ1LjI4MjUwMDcsMjkuMTk2Njc3NyA0NS44MTAwNDU2LDI5LjA1OTAyNjggNDYuMTYwMTAzOSwyOC43ODM3MjA5IEM0Ni41MTAxNjIzLDI4LjUwODQxNSA0Ni42ODUxODg5LDI4LjEwNzY0MzggNDYuNjg1MTg4OSwyNy41ODEzOTUzIEM0Ni42ODUxODg5LDI3LjA1MDI3NDIgNDYuNTM4NTExNywyNi42NTgwMzAxIDQ2LjI0NTE1MjksMjYuNDA0NjUxMiBDNDUuOTUxNzk0MSwyNi4xNTEyNzIzIDQ1LjQ5MjA0MTIsMjYuMDI0NTg0NyA0NC44NjU4ODA1LDI2LjAyNDU4NDcgTDQzLjgyMzEwNjEsMjYuMDI0NTg0NyBMNDMuODIzMTA2MSwyOS4xOTY2Nzc3IFogTTQ5LDI3LjUwMDk5NjcgQzQ5LDI4LjY1MDk0NzEgNDguNjM2Mzg4NSwyOS41MzA0NTEgNDcuOTA5MTU0NSwzMC4xMzk1MzQ5IEM0Ny4xODE5MjA1LDMwLjc0ODYxODggNDYuMTQ3Nzg0NywzMS4wNTMxNTYxIDQ0LjgwNjcxNiwzMS4wNTMxNTYxIEw0My44MjMxMDYxLDMxLjA1MzE1NjEgTDQzLjgyMzEwNjEsMzQuODUzODIwNiBMNDEuNTMwNDgxNywzNC44NTM4MjA2IEw0MS41MzA0ODE3LDI0LjE2ODEwNjMgTDQ0Ljk4NDIwOTUsMjQuMTY4MTA2MyBDNDYuMjk1Njk1OCwyNC4xNjgxMDYzIDQ3LjI5Mjg1NDIsMjQuNDQ3MDYyNSA0Ny45NzU3MTQ2LDI1LjAwNDk4MzQgQzQ4LjY1ODU3NDksMjUuNTYyOTA0MiA0OSwyNi4zOTQ5MDAzIDQ5LDI3LjUwMDk5NjcgWiIgaWQ9IlNUT1AiIGZpbGw9IiNGRkZGRkYiPjwvcGF0aD4KICAgICAgICAgICAgPHBhdGggZD0iTTE2LjcxNTYxMjcsNy45Mjg5MDk5MyBMNy45Mjg5NTQ0NSwxNi43MTU1MTI5IEM2LjA1MzU3NzA1LDE4LjU5MDg3ODUgNSwyMS4xMzQ0MjcyIDUsMjMuNzg2NjAzIEw1LDM2LjIxMzE0NTIgQzUsMzguODY1MjgzOCA2LjA1MzU0NzU0LDQxLjQwODc5OTkgNy45Mjg4Nzg0Niw0My4yODQxNTkzIEwxNi43MTU1OTk3LDUyLjA3MTAxNDEgQzE4LjU5MDk2NzksNTMuOTQ2NDEwNyAyMS4xMzQ1Myw1NSAyMy43ODY3MjEyLDU1IEwzNi4yMTMyNzg4LDU1IEMzOC44NjU0Nyw1NSA0MS40MDkwMzIxLDUzLjk0NjQxMDcgNDMuMjg0NDAwMyw1Mi4wNzEwMTQxIEw1Mi4wNzExMjE1LDQzLjI4NDE1OTMgQzUzLjk0NjQ1MjUsNDEuNDA4Nzk5OSA1NSwzOC44NjUyODM4IDU1LDM2LjIxMzE0NTIgTDU1LDIzLjc4NjYwMyBDNTUsMjEuMTM0NDI3MiA1My45NDY0MjMsMTguNTkwODc4NSA1Mi4wNzEwNDU2LDE2LjcxNTUxMjkgTDQzLjI4NDM4NzMsNy45Mjg5MDk5MyBDNDEuNDA5MDI1Myw2LjA1MzU1OTc2IDM4Ljg2NTQ5NTcsNSAzNi4yMTMzNDE3LDUgTDIzLjc4NjY1ODMsNSBDMjEuMTM0NTA0Myw1IDE4LjU5MDk3NDcsNi4wNTM1NTk3NiAxNi43MTU2MTI3LDcuOTI4OTA5OTMgWiIgaWQ9IkZpbGwtMSIgc3Ryb2tlPSIjRkZGRkZGIiBzdHJva2Utd2lkdGg9IjIiPjwvcGF0aD4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPgo="]');
    if(stopshapeicon.length){
        beta_ui_enabled = true;
        document.getElementsByTagName('body')[0].classList.add('beta-ui-enabled');
    }
}

const process_to_image = (process) => {

    let nav = process.closest('.component_editor_panel').querySelector('.component_nav');
    let newLink = `<li> <a class="gwt-Anchor bt-capture-process">Capture Process</a> </li>`
    nav.insertAdjacentHTML('beforeend', newLink);


    nav.querySelector('.bt-capture-process').addEventListener('click', event => {

        let alert_html = `
        <div class="BoomiPlatformOverlay" style=position:fixed;z-index:9999;display:grid;place-items:center;min-height:100vh;min-width:100vw;background: rgba(0,0,0,0.25);">
            <div class="alert_label_content information_label_content" style="max-height: 600px; max-width: 600px; overflow: auto; padding: 10px; border-radius:4px; box-shadow:0 0 20px 0 rgba(0,0,0,0.25)">
                <span class="alert_icon" style="padding-top:0;vertical-align: middle;"><img style="width:24px; height:24px;" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB2aWV3Qm94PSIwIDAgMTYgMTYiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDE2IDE2OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+Cgk8ZGVmcz48c3R5bGU+LmQge2ZpbGw6I2ZmZmZmZn08L3N0eWxlPjwvZGVmcz4KPHBhdGggY2xhc3M9ImQiIGQ9Ik04LjksMS42bDYuNCwxMS44YzAuMiwwLjMsMC4yLDAuNywwLDFjLTAuMSwwLjItMC4yLDAuMy0wLjQsMC40Yy0wLjIsMC4xLTAuMywwLjEtMC41LDAuMUgxLjZjLTAuMiwwLTAuNC0wLjEtMC41LTAuMQoJYy0wLjItMC4xLTAuMy0wLjItMC40LTAuNGMtMC4yLTAuMy0wLjItMC43LDAtMUw3LjEsMS42YzAuMS0wLjIsMC4yLTAuMywwLjQtMC40UzcuOCwxLDgsMXMwLjQsMCwwLjUsMC4xQzguNywxLjMsOC44LDEuNCw4LjksMS42egoJIE05LDkuNGwwLjEtMy44YzAtMC4xLDAtMC4xLTAuMS0wLjJDOS4xLDUuNCw5LDUuMyw4LjksNS4zSDcuMWMtMC4xLDAtMC4xLDAtMC4yLDAuMWMtMC4xLDAtMC4xLDAuMS0wLjEsMC4ybDAuMSwzLjgKCWMwLDAuMSwwLDAuMSwwLjEsMC4xYzAuMSwwLDAuMSwwLjEsMC4yLDBoMS41YzAuMSwwLDAuMSwwLDAuMiwwQzksOS41LDksOS41LDksOS40eiBNOS4xLDEyLjV2LTEuNmMwLTAuMSwwLTAuMS0wLjEtMC4yCgljLTAuMS0wLjEtMC4xLTAuMS0wLjItMC4xSDcuMmMtMC4xLDAtMC4xLDAtMC4yLDAuMWMtMC4xLDAuMS0wLjEsMC4xLTAuMSwwLjJ2MS42YzAsMC4xLDAsMC4xLDAuMSwwLjJjMC4xLDAuMSwwLjEsMC4xLDAuMiwwLjFoMS42CgljMC4xLDAsMC4xLDAsMC4yLTAuMUM5LDEyLjcsOS4xLDEyLjYsOS4xLDEyLjV6Ii8+Cjwvc3ZnPgo=" alt="Warning"></span>
                <div class="alert_text">
                    <b>BoomiPlatform:</b> Capture Process
                    <p>This tool will quickly take over your browser window while capturing the Process Canvas. It will return to normal after the canvas is rasterized.</p>
                    
                    ${beta_ui_enabled ? '' : "<p>We recommend enabling <b>Boomi's Beta UI</b> before scaling the process higher than 1x. Otherwise the output will be blurry.</p>"}

                    <br>
                    <button type="button" class="gwt-Button action_button" title="Run Capture Process">Run Capture Process</button>
                    <label>
                        <input type="checkbox" class="transparent" style="vertical-align: middle;" /> Transparent Background
                    </label>
                    <select class="uiscale">
                        <option value="1.0" selected>1x (normal size)</option>
                        <option value="1.5">1.5x</option>
                        <option value="2.0">2x</option>
                    </select>
                </div>
                <span class="alert_dismiss">
                    <a class="gwt-Anchor" data-locator="link-cancel" href="javascript:document.querySelector('.BoomiPlatformOverlay').remove();">
                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 16 16" style="width: 12px; height: 12px;"><title>Cancel</title><path class="svg-foreground" d="M14.284,12.546c0.348,0.348,0.521,0.764,0.521,1.246s-0.174,0.888-0.521,1.216c-0.348,0.328-0.763,0.493-1.245,0.493 c-0.483,0-0.898-0.155-1.245-0.463l-3.822-4.402l-3.822,4.402C3.801,15.345,3.386,15.5,2.904,15.5c-0.483,0-0.898-0.155-1.245-0.463 c-0.309-0.348-0.463-0.763-0.463-1.245s0.154-0.898,0.463-1.246l3.996-4.517L1.659,3.453C1.35,3.106,1.195,2.692,1.195,2.208 c0-0.482,0.154-0.898,0.463-1.245C2.006,0.655,2.421,0.5,2.904,0.5c0.482,0,0.898,0.155,1.245,0.463l3.822,4.401l3.822-4.401 C12.141,0.655,12.556,0.5,13.039,0.5c0.482,0,0.897,0.164,1.245,0.493s0.521,0.734,0.521,1.216c0,0.483-0.174,0.898-0.521,1.245 l-3.996,4.576L14.284,12.546z"></path></svg>
                    </a>
                </span>
            </div>
        </div>`;

        let overlay = document.querySelector('.BoomiPlatformOverlay');
        if(overlay) overlay.remove();
        document.getElementsByTagName('body')[0].insertAdjacentHTML('beforeend', alert_html)


        document.querySelector('.BoomiPlatformOverlay button.action_button').addEventListener('click', event => {

            let transparency = document.querySelector('.BoomiPlatformOverlay .transparent').checked;
            let uiscale = document.querySelector('.BoomiPlatformOverlay .uiscale').value || '1.0';

            document.querySelector('.BoomiPlatformOverlay').remove();
    
            let process_org = Object.assign({},process.style);
            let title = process.closest('.gwt-TabLayoutPanelContent').querySelector('.component_header .name_label').title;
            
            document.getElementsByTagName('body')[0].style.marginTop = '99999px';
            process.style.position = "fixed";
            process.style.overflow = "auto";
            process.style.zIndex = "99999";
            process.style.top = "0";
            process.style.left = "0";
            process.style.transformOrigin = "0 0";
            process.style.transform = `scale(${uiscale})`;
            if(transparency){
                process.style.backgroundColor = "";
                process.style.backgroundImage = "none";
            }else{
                process.style.backgroundColor = "white";
            }
    
            [...document.querySelectorAll('.BoomiPlatformEndpointMenu')].forEach(stopper => {
                stopper.style.visibility = 'hidden';
            });

            [...process.querySelectorAll('.disconnected')].forEach(point => {
                if(beta_ui_enabled){
                    point.style.backgroundImage = "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWlkWU1pZCBtZWV0IiB3aWR0aD0iMTYiIGhlaWdodD0iMTYiPjxkZWZzPjxwYXRoIGQ9Ik0xNSA4YTcuMDEgNy4wMSAwIDAgMS03IDcgNy4wMSA3LjAxIDAgMCAxLTctNyA3LjAxIDcuMDEgMCAwIDEgNy03IDcuMDEgNy4wMSAwIDAgMSA3IDd6IiBpZD0iQSIvPjxwYXRoIGQ9Ik0xMS40MyA5Yy4zNy0uMzQuNTYtLjY4LjU3LTFzLS4xNy0uNjctLjUzLTFsLTIuMi0yLjNjLS4zNS0uMzUtLjktLjM1LTEuMjYgMC0uMzUuMzQtLjM1LjkgMCAxLjI2TDkuMDcgNy4xSDQuOWEuODkuODkgMCAxIDAgMCAxLjc4aDQuMThsLTEuMTUgMS4xNGMtLjM1LjM1LS4zNS45LS4wMSAxLjI2LjM1LjM1LjkyLjM1IDEuMjYuMDFMMTEuNDMgOXoiIGlkPSJCIi8+PC9kZWZzPjx1c2UgeGxpbms6aHJlZj0iI0EiIGZpbGw9IiNmZjQyMjIiLz48dXNlIHhsaW5rOmhyZWY9IiNCIiBmaWxsPSIjZmZmIi8+PC9zdmc+')";
                }
            });

            [...process.querySelectorAll('.connected')].forEach(point => {
                if(beta_ui_enabled){
                    point.style.backgroundImage = "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWlkWU1pZCBtZWV0IiB3aWR0aD0iMTYiIGhlaWdodD0iMTYiPjxkZWZzPjxwYXRoIGQ9Ik0xNSA4YTcuMDEgNy4wMSAwIDAgMS03IDcgNy4wMSA3LjAxIDAgMCAxLTctNyA3LjAxIDcuMDEgMCAwIDEgNy03IDcuMDEgNy4wMSAwIDAgMSA3IDd6IiBpZD0iQSIvPjxwYXRoIGQ9Ik0xMS40MyA5Yy4zNy0uMzQuNTYtLjY4LjU3LTFzLS4xNy0uNjctLjUzLTFsLTIuMi0yLjNjLS4zNS0uMzUtLjktLjM1LTEuMjYgMC0uMzUuMzQtLjM1LjkgMCAxLjI2TDkuMDcgNy4xSDQuOWEuODkuODkgMCAxIDAgMCAxLjc4aDQuMThsLTEuMTUgMS4xNGMtLjM1LjM1LS4zNS45LS4wMSAxLjI2LjM1LjM1LjkyLjM1IDEuMjYuMDFMMTEuNDMgOXoiIGlkPSJCIi8+PC9kZWZzPjx1c2UgeGxpbms6aHJlZj0iI0EiIGZpbGw9IiM2YmMxMDYiLz48dXNlIHhsaW5rOmhyZWY9IiNCIiBmaWxsPSIjZmZmIi8+PC9zdmc+')";
                }
            });
    
            setTimeout(()=>{
                let rect = process.getBoundingClientRect();
                let body = document.getElementsByTagName('body')[0];
                let canvas = document.createElement('canvas');
                canvas.style.display = 'none';
                canvas.width = rect.width;
                canvas.height = rect.height;
                body.appendChild(canvas);
    
                rasterizeHTML.drawDocument(document, canvas).then(() => {

                    let output_html = `<a href="${canvas.toDataURL()}" download="${title}.png" id="output-process-image" target="_blank"></a>`;
    
                    body.insertAdjacentHTML('beforeend', output_html);
                    
                    setTimeout(()=>{
                        document.getElementsByTagName('body')[0].style.marginTop = '';
                        process.style.position = process_org.position;
                        process.style.overflow = process_org.overflow;
                        process.style.zIndex = process_org.zIndex;
                        process.style.top = process_org.top;
                        process.style.left = process_org.left;
                        process.style.transformOrigin = process_org.transformOrigin;
                        process.style.transform = process_org.transform;
                        process.style.backgroundColor = process_org.backgroundColor;
                        process.style.backgroundImage = process_org.backgroundImage;
    
                        [...document.querySelectorAll('.BoomiPlatformEndpointMenu')].forEach(stopper => {
                            stopper.style.visibility = 'visible';
                        })
    
                        document.getElementById('output-process-image').click();
                        document.getElementById('output-process-image').remove();
    
                        canvas.remove()
                    },100);
                })
            },200)
        });
    });

}

const add_table_listener = (table) => {
    let head = table.querySelector('thead');
    let wrapped = false;
    let wrapper = null;
    if(!head) return false;

    if(table.closest('.wrapped_text_column_style')){
        wrapped = true;
        wrapper = table.closest('.wrapped_text_column_style');
        wrapper.classList.add('bt-table-wrapped');
    }

    let over = false;
    head.addEventListener('mouseover', event => {
        over = true;
        if(!head.querySelector('.bt-thead-menu')){
            let menuHTML = `<div class="bt-thead-menu">

                <a class='toggle_word_wrap'>Toggle Line Wrap</a>

            </div>`;
            head.insertAdjacentHTML('beforeend', menuHTML);
            head.querySelector('.bt-thead-menu').style.display = 'block';

            head.querySelector('.bt-thead-menu .toggle_word_wrap').addEventListener('click', event => {

                if(wrapper) wrapper.classList.toggle('wrapped_text_column_style');
                table.classList.toggle('bt-no-wrap');
            });

        }else{
            head.querySelector('.bt-thead-menu').style.display = 'block'
        }
    });

    head.addEventListener('mouseout', event => {
        over = false;
        setTimeout(()=>{
            if(head.querySelector('.bt-thead-menu') && !over){
                head.querySelector('.bt-thead-menu').style.display = 'none';
            }
        },100)
    });

}

const add_description_listener = (description) => {

    if(BoomiPlatform.description_markdown == 'off') return false;

    const converter = new showdown.Converter(),
    renderMD = () => {
        const text_value = description.querySelector('textarea').value;
        var html = null;
        if(!description.querySelector('.bt-md')) html = `<p class="bt-md">${converter.makeHtml(text_value)}</p>`;
        else html = text_value;
        description.querySelector('p').innerHTML = html;
    }

    let observer = new MutationObserver(event => {
        if(!description.querySelector('p').classList.contains('no_display') && !description.classList.contains('no_display')){
            renderMD();
            description.closest('.component_header').querySelector('.links .bt-markdown-toggle').classList.remove('no_display')
        }else{
            description.closest('.component_header').querySelector('.links .bt-markdown-toggle').classList.add('no_display')
        }
    })
      
    let observer_config = {
        attributes: true, 
        attributeFilter: ['class'],
        childList: false, 
        characterData: false
    }

    observer.observe(description.querySelector('p'), observer_config);
    observer.observe(description, observer_config);

    if(BoomiPlatform.description_markdown == 'on' || !BoomiPlatform.description_markdown){
        description.classList.add('render-markdown');
    }

    let toggle_html = `
    <a class="fonticon_anchor icon-eye bt-markdown-toggle" onclick="toggleMarkdown(this)">Toggle Markdown</a>
    `;
    description.closest('.component_header').querySelector('.links').insertAdjacentHTML('beforeend', toggle_html);

}

const toggleMarkdown = (target) => {
    target.closest('.component_header').querySelector('.description_panel').classList.toggle('render-markdown');
    target.closest('.component_header').querySelector('.description_panel > p').classList.toggle('render-markdown');
}

const add_notecontent_listener = (element) => {
    const converter = new showdown.Converter(),
    renderMD = () => {
        const text_value = element.innerText.replace(/\n{0,2}---\n\#BoomiPlatform: \[\"(\d*px)\"\,\"(\d*px)\"\,\"([a-z]*)\"\]/g,'\n\n*BoomiPlatform: ["$1","$2","$3"]*');
        element.innerHTML = `<p class="bt-md">${converter.makeHtml(text_value)}</p>`;

        let BTdef = [...element.querySelectorAll('em')].find(el => el.innerText.includes('BoomiPlatform:'));
        if(BTdef) BTdef.style.opacity = '0.5';
    }

    let observer = new MutationObserver(event => {
        if(!element.querySelector('.bt-md')) renderMD();
    })
      
    let observer_config = {
        childList: true, 
        attributes: false,
        characterData: false
    }

    observer.observe(element, observer_config);
    renderMD();
}

const tab_indexes = (process) => {

    //Future feature to navigate through shapes process? using arrow keys?

    /* let process_shapes = [...process.querySelectorAll('.gwt-Shape')];

    const shapes_handler = () => {
        if(!process_shapes.length) return false;

        process_shapes.forEach(shape => {
            shape.classList.add('bt-shape-handler')
        })
    }

    shapes_handler()

    process.addEventListener('DOMNodeInserted', function (e) {
        try {
            let shape = e.target.querySelector('.gwt-Shape');
            if(shape) {
                process_shapes.push(shape);
                shapes_handler()
            }
        } catch (error) {}
    }, false); */

}

const add_sidepanel_listener = (sidepanel) => {

    let textRow = [...sidepanel.querySelectorAll('.form_row.text_area_row')].find(el => el.querySelector('.form_label').innerText == 'Message');
    if(textRow){
        let textArea = textRow.querySelector('.gwt-TextArea');
        let container = textArea.parentNode;
        
        let toggle_editor = `
        <label style="display:block;">
            <input type="checkbox" onchange="toggleEditor(this)">
            Toggle JSON Editor (auto escape curly bracket notation)
        </label>
        `;
        container.insertAdjacentHTML('beforeend', toggle_editor);
    }
}

const renderEditor = (target) => {
    let container = target.parentNode.parentNode;
    let textArea = container.querySelector('.gwt-TextArea');
    
    let editor_html = `
    <div class="bt-json-editor" style="height:${textArea.offsetHeight}px;width:${textArea.offsetWidth}px;border: 1px solid #999;border-radius: 2px;position:relative;box-sizing: border-box;margin-bottom:4px;"></div>
    `;
    container.insertAdjacentHTML('afterbegin', editor_html);
    
    textArea.classList.add('no_display');
    setTimeout(()=>{
        let editor = container.querySelector('.bt-json-editor');
        
        let codeArea = new CodeFlask(editor, {
            language: 'js',
            lineNumbers: false
        })
        
        let code = String.raw `${textArea.value.trim().replace(/^\'/,'').replace(/\'$/,'').replace(/\'(\{\d+\})\'/g,"$1")}`
        codeArea.updateCode(code)
        
        codeArea.onUpdate( e =>{
            textArea.value = "'"+e.replace(/(\{\d+\})/g,"'$1'")+"'";
        })
    },100)
}

const toggleEditor = (target) => {
    if(target.checked) renderEditor(target);
    else {
        target.parentNode.parentNode.querySelector('.bt-json-editor').remove();
        target.parentNode.parentNode.querySelector('.gwt-TextArea').classList.remove('no_display');
    }
}


const get_XML_responses = (()=>{
    let oldXHROpen = window.XMLHttpRequest.prototype.open;
    window.XMLHttpRequest.prototype.open = function () {
        this.addEventListener('load', function () {
            if (this.responseText.includes('//OK[') && this.responseText.includes('xml')) {
                try {
                    let parsedRes = eval(`(${this.responseText.replace('//OK','')})`);
                    if (!Array.isArray(parsedRes)) return false;
                    parsedRes = parsedRes.flat();
                    
                    let parser = new DOMParser();
                    parsedRes.forEach(element => {
                        if (!element.toString().includes('xml')) return false;
                        var dom = parser.parseFromString(`${element}`, 'text/xml');

                        if (dom.getElementsByTagName('Folders').length) process_tree_update(dom)
                        // else console.log(dom);
                    });
                } catch (error) {
                    console.log(error);
                }
            }
            if(this.responseText.includes('#BoomiPlatform:')){
                render_note_groups()
            }
        });

        return oldXHROpen.apply(this, arguments);
    }
})()

let bt_init = false;
const BoomiPlatform_Init = () => {

    const dom_watcher = (()=>{
        document.addEventListener('DOMNodeInserted', function (e) {
            try {
                let noteForm = e.target.querySelector('.note-form');
                if(!noteForm) return false;

                notegroupbutton_html = `
                <button type="button" class="NoteGroupButton" onclick="create_note_group(this)">Group</button>
                `
                noteForm.querySelector('.button_row').insertAdjacentHTML('beforeend', notegroupbutton_html);

                if(/\n{0,2}---\n\#BoomiPlatform: \[\"(\d*px)\"\,\"(\d*px)\"\,\"([a-z]*)\"\]/g.test(noteForm.querySelector('textarea').value)){
                    setTimeout(()=>{
                        create_note_group(noteForm)
                    },100)
                }

            } catch (error) {}
        }, false);
    })()

    const global_listners = setInterval(()=>{

        const listenerClass = (selector, callback) => {
            let elements = document.querySelectorAll(`${selector}:not(.bt-load-done)`);
            if(elements.length){
                [...elements].forEach(el => {
                    el.classList.add('bt-load-done');
                    if(Array.isArray(callback)){
                        callback.forEach(cb=>{
                            cb(el)
                        })
                    }else{
                        callback(el);
                    }
                })
            }
        }

        listenerClass('.gwt-ProcessPanel', [quick_component_select, process_to_image, tab_indexes, check_beta]);
        listenerClass('.gwt-EndPoint', add_endpoint_listener);
        listenerClass('.gwt-Shape', add_shape_listener);
        listenerClass('.gwt-DialogBox', add_dialog_listener);
        listenerClass('.boomi_standard_table', add_table_listener);
        listenerClass('button.fullscreen_view_button', add_fullscreen_listener);
        listenerClass('.description_panel', add_description_listener);
        listenerClass('.shape_side_panel', add_sidepanel_listener);
        listenerClass('.note-content', add_notecontent_listener);

    },1000)

    dupeNamesCheck();

}

window.addEventListener('message', (e) => {
    if(e.data.BoomiPlatformconfig){
        window.BoomiPlatform = e.data;
        if(!bt_init){
            bt_init = true; BoomiPlatform_Init();
        }
    }
}, false);
