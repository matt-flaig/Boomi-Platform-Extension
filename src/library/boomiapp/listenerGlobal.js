const add_dialog_listener = (dialog) => {

    if(!dialog.querySelector('.dialogTopCenterInner .Caption').innerText) return false;

    let rect = dialog.getBoundingClientRect();
    let children = [...dialog.getElementsByTagName('*')];


}


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
            let elements = document.querySelectorAll(`${selector}:not(.bph-load-done)`);
            if(elements.length){
                [...elements].forEach(el => {
                    el.classList.add('bph-load-done');
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

        listenerClass('.gwt-ProcessPanel', [quick_component_select, process_to_image, check_beta]);
        listenerClass('.gwt-EndPoint', add_endpoint_listener);
        listenerClass('.gwt-Shape', add_shape_listener);
        listenerClass('.gwt-DialogBox', add_dialog_listener);
        listenerClass('.boomi_standard_table', add_table_listener);
        listenerClass('button.fullscreen_view_button', add_fullscreen_listener);
        listenerClass('.description_panel', add_description_listener);
        listenerClass('.shape_side_panel', add_sidepanel_listener);
        listenerClass('.note-content', add_notecontent_listener);

    },1000)



}

window.addEventListener('message', (e) => {
    if(e.data.BoomiPlatformconfig){
        window.BoomiPlatform = e.data;
        if(!bt_init){
            bt_init = true; BoomiPlatform_Init();
        }
    }
}, false);