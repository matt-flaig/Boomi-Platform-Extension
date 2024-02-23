const process_to_image = (process) => {

    let nav = process.closest('.component_editor_panel').querySelector('.step_pellete');
    let executeCheck = nav.innerText
    let executeLink = executeCheck.includes("Capture Process Flow");
    if (executeLink != true){
        let newLink = `<a class="gwt-Anchor svg-anchor others_floats bph-capture-process" data-locator="capture-process-flow"><svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" style="width: 40px; height: 40px;">
        <title>Capture Process Flow</title>
        <circle cx="20" cy="20" r="19.5" fill="white" stroke="#CCCCCC"></circle>
        <path d="M17 17H23" stroke="#8C8C8C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M17 20H23" stroke="#8C8C8C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M17 23H20" stroke="#8C8C8C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M22.6893 28.25H12.5C12.3011 28.25 12.1103 28.171 11.9697 28.0303C11.829 27.8897 11.75 27.6989 11.75 27.5V12.5C11.75 12.3011 11.829 12.1103 11.9697 11.9697C12.1103 11.829 12.3011 11.75 12.5 11.75H27.5C27.6989 11.75 27.8897 11.829 28.0303 11.9697C28.171 12.1103 28.25 12.3011 28.25 12.5V22.6893C28.25 22.7878 28.2306 22.8854 28.1929 22.9764C28.1552 23.0673 28.1 23.15 28.0303 23.2197L23.2197 28.0303C23.15 28.1 23.0673 28.1552 22.9764 28.1929C22.8854 28.2306 22.7878 28.25 22.6893 28.25V28.25Z" stroke="#8C8C8C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M28.1821 22.9992H23V28.1817" stroke="#8C8C8C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg></a>`
        nav.insertAdjacentHTML('beforeend', newLink);


        nav.querySelector('.bph-capture-process').addEventListener('click', event => {

            let alert_html = `<div class="BoomiPlatformOverlay center_panel" id="popup_on_popup_content" role="dialog" aria-modal="true"
            style="left: 663px; top: 379px; visibility: visible; position: absolute; overflow: visible;">
            <div class="popupContent bph-load-done">
                <div class="modal modal_top">
                    <div class="modal_contents">
                        <div class="margin_popup_contents" style="width: 550px;">
                            <div class="form_header" style="">
                                <div class="form_title no_required">
                                    <div class="form_title_top"> <img class="no_display form_header_image">
                                        <h2 class="form_title_label">Process Image Capture</h2>
                                    </div>
                                </div>
                            </div>
                            <div class="qm-c-alert qm-c-alert--none" style="max-height: 600px; overflow: auto;"><span
                                    class="qm-c-alert__icon"></span>
                                <div class="qm-c-alert__text">
                                    
                                    <p>This will capture an image of your full process canvas and export to a file.</p>
                                    <br>
                                    <div>
                                        <label>
                                            <input type="checkbox" class="transparent" style="vertical-align: middle;"/>Use Transparent Background
                                        </label>
                                        <select class="uiscale gwt-ListBox" style="padding-left: 10px; margin-left: 10px;">
                                            <option value="1.0" selected>1x (normal size)</option>
                                            <option value="1.5">1.5x</option>
                                            <option value="2.0">2x</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label>
                                            <input type="checkbox" class="expandNotes" style="vertical-align: middle;"/>Expand Notes
                                        </label>
                                    </div>
                                </div>                     </div>
                        </div>
                    </div>
                    <div class="button_set">
                        <div class="button_spinner_panel no_display"> <i
                                class="font_icon icon-spinner before-animate-spin spinner"></i> </div><button type="button"
                            class="gwt-Button qm-button--primary-action action_button" title="Run Capture Process">Capture Process Flow</button>
                            <button type="button" class="gwt-Button"  data-locator="link-cancel"; onclick="javascript:document.querySelector('.BoomiPlatformOverlay').remove();">Cancel</button>
                    </div>
                </div>
            </div>
        </div>`;

            let overlay = document.querySelector('.BoomiPlatformOverlay');
            if (overlay) overlay.remove();
            document.getElementsByTagName('body')[0].insertAdjacentHTML('beforeend', alert_html)


            document.querySelector('.BoomiPlatformOverlay button.action_button').addEventListener('click', event => {

                let transparency = document.querySelector('.BoomiPlatformOverlay .transparent').checked;
                let uiscale = document.querySelector('.BoomiPlatformOverlay .uiscale').value || '1.0';
                let expandNotes = document.querySelector('.BoomiPlatformOverlay .expandNotes').checked;

                document.querySelector('.BoomiPlatformOverlay').remove();

                let process_org = Object.assign({}, process.style);
                let title = process.closest('.gwt-TabLayoutPanelContent').querySelector('.component_header .name_label').title;

                document.getElementsByTagName('body')[0].style.marginTop = '99999px';
                process.style.position = "fixed";
                process.style.overflow = "auto";
                process.style.zIndex = "99999";
                process.style.top = "0";
                process.style.left = "0";
                process.style.transformOrigin = "0 0";
                process.style.transform = `scale(${uiscale})`;
                if (transparency) {
                    process.style.backgroundColor = "";
                    process.style.backgroundImage = "none";
                } else {
                    process.style.backgroundColor = "white";
                }

                if(expandNotes){
                    window.noteExpandInterval = setInterval( function() { 
                        if(document.getElementsByTagName('body')[0].style.marginTop == "99999px"){
                            // expand all note dialogs
                            [...document.querySelectorAll('.note-preview')].forEach(div => {
                                div.parentNode.parentNode.style.setProperty("display", "", "important");
                            });
                        }
                    }, 50);                
                }

                [...document.querySelectorAll('.BoomiPlatformEndpointMenu')].forEach(stopper => {
                    stopper.style.visibility = 'hidden';
                });

                setTimeout(() => {
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

                        setTimeout(() => {
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

                            if(window.noteExpandInterval){
                                // clear note expander timer
                                clearInterval(window.noteExpandInterval);
                                
                                //hide all note dialogs
                                [...document.querySelectorAll('.note-preview')].forEach(div => {
                                    div.parentNode.parentNode.style.setProperty("display", "none");
                                });
                            }

                            document.getElementById('output-process-image').click();
                            document.getElementById('output-process-image').remove();

                            canvas.remove()
                        }, 100);
                    })
                }, 200)
            });
        });
    }
}
