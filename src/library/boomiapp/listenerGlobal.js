
const add_dialog_listener = (dialog) => {

    if (!dialog.querySelector('.dialogTopCenterInner .Caption').innerText) return false;

    let rect = dialog.getBoundingClientRect();
    let children = [...dialog.getElementsByTagName('*')];

}

let bt_init = false;
const BoomiPlatform_Init = () => {

    // load shape style settings
    dynamicShapeIconStyleData = "";
    if(BoomiPlatform.shape_icon_styling == "modern"){
        dynamicShapeIconStyleData = JSON.parse(modernIconData);
    }
    if(BoomiPlatform.shape_icon_styling == "minimal-inverted"){
        dynamicShapeIconStyleData = JSON.parse(invertedIconStyleColorCodes);
    }
    if(BoomiPlatform.shape_icon_styling == "legacy"){
        dynamicShapeIconStyleData = JSON.parse(legacyIconData);
    }

    const dom_watcher = (() => {
        document.addEventListener('DOMNodeInserted', function (e) {
            try {
                
                // shape style information
                if(typeof dynamicShapeIconStyleData == "object" && e && typeof e.target === 'object' && e.target !== null && 'querySelector' in e.target){
                    setTimeout(() => {

                        // iterate through all shapes, check if they have new class (customIconStyle), if not, add the class and update icon url
                        //var shapesList = e.target;//.querySelector('.gwt-Shape:not(.customIconStyle), .shape_palette_widget:not(.customIconStyle)');
                        //[...shapesList].forEach(div => {
                        //});
                        var elem = e.target.querySelector('.gwt-Shape, .shape_palette_widget');
                        //var elem = e.target.querySelector('.gwt-Shape:not(.customIconStyle), .shape_palette_widget:not(.customIconStyle)');
                        if(elem){
                            var shapeName = elem.getElementsByTagName('img')[0].title;
                            var shapeImageIcon = dynamicShapeIconStyleData[shapeName];
                            // if we have custom icon for this title or custom color and replace
                            if(shapeImageIcon){
                                var img = e.target.getElementsByTagName('img')[0];
                                if(shapeImageIcon.charAt(0) != '#'){
                                    img.src = shapeImageIcon;
                                    img.style.setProperty("width", "32px", "important");
                                    img.style.setProperty("height", "32px", "important");
                                    img.style.setProperty("background-color", "transparent", "important");
                                        
                                    elem.style.border = "0px";
                                    elem.style.borderRadius = "0px";
                                    elem.style.setProperty("background-color", "transparent", "important");
                                }else{
                                    img.style.setProperty("width", "24px", "important");
                                    img.style.setProperty("height", "24px", "important");
                                    img.style.setProperty( "filter", "brightness(0) invert(1)", "important" );

                                    elem.style.setProperty( "background-color", shapeImageIcon, "important" );
                                    elem.style.setProperty( "border", "1px " + shapeImageIcon, "important" );
                                    elem.style.backgroundColor = shapeImageIcon;
                                }

                            }
                            // prevent looking at this element again
                            //elem.classList.add("customIconStyle");
                        }
                        
                    }, 100);
                }

                let noteForm = e.target.querySelector('.note-form');
                if (!noteForm) return false;

                notegroupbutton_html = `
                <button type="button" class="NoteGroupButton" onclick="create_note_group(this)">Group</button>
                `
                noteForm.querySelector('.button_row').insertAdjacentHTML('beforeend', notegroupbutton_html);

                if (/\n{0,2}---\n\#BoomiPlatform: \[\"(\d*px)\"\,\"(\d*px)\"\,\"([a-z]*)\"\]/g.test(noteForm.querySelector('textarea').value)) {
                    setTimeout(() => {
                        create_note_group(noteForm)
                    }, 100)
                }

            } catch (error) {}
        }, false);
    })()

    const global_listeners = setInterval(() => {

        const listenerClass = (selector, callback) => {
            let elements = document.querySelectorAll(`${selector}:not(.bph-load-done)`);
            if (elements.length) {
                [...elements].forEach(el => {
                    el.classList.add('bph-load-done');
                    if (Array.isArray(callback)) {
                        callback.forEach(cb => {
                            cb(el)
                        })
                    } else {
                        callback(el);
                    }
                })
            }
        }

        listenerClass('.gwt-ProcessPanel', [quick_component_select, process_to_image, check_beta, add_canvase_listener]);
        listenerClass('.gwt-EndPoint', add_endpoint_listener);
        listenerClass('.gwt-Shape', add_shape_listener);
        listenerClass('.gwt-DialogBox', add_dialog_listener);
        listenerClass('.boomi_standard_table', add_table_listener);
        listenerClass('.build_actionsButton', add_fullscreen_listener);
        listenerClass('.description_panel', add_description_listener);
        //listenerClass('.shape_side_panel', add_sidepanel_listener);
        listenerClass('.shape_side_panel', add_sidepanel_message_listener);
        listenerClass('.note-content', add_notecontent_listener);
        listenerClass('.auto_refresh_li', refreshInterval_listener);
        // listenerClass('.packaged_components_wizard',reminder_save);
        listenerClass('.popupContent',reminder_schedule);

    }, 1000)

}

window.addEventListener('message', (e) => {
    if (e.data.BoomiPlatformconfig) {
        window.BoomiPlatform = e.data;
        if (!bt_init) {
            bt_init = true;
            BoomiPlatform_Init();
        }
    }
}, false);


let getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = $(location).attr('href'),
        sURLVariables = sPageURL.split(';'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};