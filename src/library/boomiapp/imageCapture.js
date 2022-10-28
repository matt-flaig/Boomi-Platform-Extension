var beta_ui_enabled = false;
const check_beta = (process) => {

    let stopshapeicon = document.querySelectorAll('img[src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNjBweCIgaGVpZ2h0PSI2MHB4IiB2aWV3Qm94PSIwIDAgNjAgNjAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+U3RvcCBTaGFwZTwvdGl0bGU+CiAgICA8ZGVmcz48L2RlZnM+CiAgICA8ZyBpZD0iU3RvcCIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9Imljb24tZ3JvdXAiPgogICAgICAgICAgICA8cGF0aCBkPSJNMTQuNjQ0NTIxLDIuOTI4OTA5OTMgTDIuOTI4OTU0NDUsMTQuNjQ0NDAyNyBDMS4wNTM1NzcwNSwxNi41MTk3NjgzIDUuMDA0MjcyNjZlLTE1LDE5LjA2MzMxNyA1LjMyOTA3MDUyZS0xNSwyMS43MTU0OTI4IEwtNS4zMjkwNzA1MmUtMTUsMzguMjg0MTkyNSBDLTUuMDA0Mjc3MjJlLTE1LDQwLjkzNjMzMSAxLjA1MzU0NzU0LDQzLjQ3OTg0NzEgMi45Mjg4Nzg0Niw0NS4zNTUyMDY2IEwxNC42NDQ1MDc5LDU3LjA3MTAxNDEgQzE2LjUxOTg3NjEsNTguOTQ2NDEwNyAxOS4wNjM0MzgyLDYwIDIxLjcxNTYyOTUsNjAgTDM4LjI4NDM3MDUsNjAgQzQwLjkzNjU2MTgsNjAgNDMuNDgwMTIzOSw1OC45NDY0MTA3IDQ1LjM1NTQ5MjEsNTcuMDcxMDE0MSBMNTcuMDcxMTIxNSw0NS4zNTUyMDY2IEM1OC45NDY0NTI1LDQzLjQ3OTg0NzEgNjAsNDAuOTM2MzMxIDYwLDM4LjI4NDE5MjUgTDYwLDIxLjcxNTQ5MjggQzYwLDE5LjA2MzMxNyA1OC45NDY0MjMsMTYuNTE5NzY4MyA1Ny4wNzEwNDU2LDE0LjY0NDQwMjcgTDQ1LjM1NTQ3OSwyLjkyODkwOTkzIEM0My40ODAxMTcxLDEuMDUzNTU5NzYgNDAuOTM2NTg3NSwxLjI1MjY1MzQyZS0xNCAzOC4yODQ0MzM1LDEuMDY1ODE0MWUtMTQgTDIxLjcxNTU2NjUsMS43NzYzNTY4NGUtMTUgQzE5LjA2MzQxMjUsMi4yNjM1NDk2MmUtMTUgMTYuNTE5ODgyOSwxLjA1MzU1OTc2IDE0LjY0NDUyMSwyLjkyODkwOTkzIFoiIGlkPSJGaWxsLTEiIGZpbGw9IiNDRTExMjYiPjwvcGF0aD4KICAgICAgICAgICAgPHBhdGggZD0iTTE5LjA0Nzk3MTIsMzEuODg2Mzc4NyBDMTkuMDQ3OTcxMiwzMi44NTExNjc2IDE4LjY5NjY4NTUsMzMuNjExMjkyOSAxNy45OTQxMDM1LDM0LjE2Njc3NzQgQzE3LjI5MTUyMTYsMzQuNzIyMjYxOSAxNi4zMTQwODQ1LDM1IDE1LjA2MTc2MjksMzUgQzEzLjkwODA0OTQsMzUgMTIuODg3NDcyLDM0Ljc4NTYwNTcgMTIsMzQuMzU2ODEwNiBMMTIsMzIuMjUxODI3MiBDMTIuNzI5Njk5MiwzMi41NzM0MjM1IDEzLjM0NzIyMjUsMzIuNzk5OTk5MyAxMy44NTI1ODg0LDMyLjkzMTU2MTUgQzE0LjM1Nzk1NDQsMzMuMDYzMTIzNiAxNC44MjAxNzI1LDMzLjEyODkwMzcgMTUuMjM5MjU2NCwzMy4xMjg5MDM3IEMxNS43NDIxNTcyLDMzLjEyODkwMzcgMTYuMTI3OTU1MiwzMy4wMzM4ODggMTYuMzk2NjYyLDMyLjg0Mzg1MzggQzE2LjY2NTM2ODgsMzIuNjUzODE5NiAxNi43OTk3MjAyLDMyLjM3MTIwOSAxNi43OTk3MjAyLDMxLjk5NjAxMzMgQzE2Ljc5OTcyMDIsMzEuNzg2NDg4NCAxNi43NDA1NTYzLDMxLjYwMDExMTYgMTYuNjIyMjI2NywzMS40MzY4NzcxIEMxNi41MDM4OTcxLDMxLjI3MzY0MjYgMTYuMzMwMTAzMSwzMS4xMTY1MDEzIDE2LjEwMDgzOTUsMzAuOTY1NDQ4NSBDMTUuODcxNTc1OSwzMC44MTQzOTU3IDE1LjQwNDQyNzUsMzAuNTczMjAyMSAxNC42OTkzODA0LDMwLjI0MTg2MDUgQzE0LjAzODcwNjgsMjkuOTM0ODgyMiAxMy41NDMyMDkxLDI5LjY0MDA5IDEzLjIxMjg3MjMsMjkuMzU3NDc1MSBDMTIuODgyNTM1NSwyOS4wNzQ4NjAyIDEyLjYxODc2MzEsMjguNzQ1OTU5OCAxMi40MjE1NDcxLDI4LjM3MDc2NDEgQzEyLjIyNDMzMTEsMjcuOTk1NTY4NCAxMi4xMjU3MjQ2LDI3LjU1NzAzNDYgMTIuMTI1NzI0NiwyNy4wNTUxNDk1IEMxMi4xMjU3MjQ2LDI2LjEwOTg1MTMgMTIuNDQ5ODkzNSwyNS4zNjY3ODAxIDEzLjA5ODI0MTEsMjQuODI1OTEzNiBDMTMuNzQ2NTg4NiwyNC4yODUwNDcxIDE0LjY0MjY3NTMsMjQuMDE0NjE3OSAxNS43ODY1MjgxLDI0LjAxNDYxNzkgQzE2LjM0ODU5MzcsMjQuMDE0NjE3OSAxNi44ODQ3NjY2LDI0LjA4MDM5OCAxNy4zOTUwNjMsMjQuMjExOTYwMSBDMTcuOTA1MzU5MywyNC4zNDM1MjIzIDE4LjQzOTA2NzEsMjQuNTI4NjgxIDE4Ljk5NjIwMjMsMjQuNzY3NDQxOSBMMTguMjU2NjQ2LDI2LjUyODkwMzcgQzE3LjY3OTc4OTIsMjYuMjk1MDE1NCAxNy4yMDI3ODAyLDI2LjEzMTc4MzQgMTYuODI1NjA0NiwyNi4wMzkyMDI3IEMxNi40NDg0MjkxLDI1Ljk0NjYyMTkgMTYuMDc3NDIyLDI1LjkwMDMzMjIgMTUuNzEyNTcyNSwyNS45MDAzMzIyIEMxNS4yNzg2OTczLDI1LjkwMDMzMjIgMTQuOTQ1OTAwMywyNi4wMDAyMjA1IDE0LjcxNDE3MTUsMjYuMiBDMTQuNDgyNDQyNywyNi4zOTk3Nzk1IDE0LjM2NjU4MDEsMjYuNjYwNDYzNSAxNC4zNjY1ODAxLDI2Ljk4MjA1OTggQzE0LjM2NjU4MDEsMjcuMTgxODM5MyAxNC40MTM0MTgxLDI3LjM1NjAzNDcgMTQuNTA3MDk1NywyNy41MDQ2NTEyIEMxNC42MDA3NzMzLDI3LjY1MzI2NzYgMTQuNzQ5OTE1NywyNy43OTcwMDkzIDE0Ljk1NDUyNzMsMjcuOTM1ODgwNCBDMTUuMTU5MTM4OSwyOC4wNzQ3NTE1IDE1LjY0MzU0MzQsMjguMzI0NDcyMiAxNi40MDc3NTUzLDI4LjY4NTA0OTggQzE3LjQxODQ4NzMsMjkuMTYyNTcxNiAxOC4xMTExOTgxLDI5LjY0MTMwNDQgMTguNDg1OTA4NSwzMC4xMjEyNjI1IEMxOC44NjA2MTg4LDMwLjYwMTIyMDYgMTkuMDQ3OTcxMiwzMS4xODk1ODY4IDE5LjA0Nzk3MTIsMzEuODg2Mzc4NyBaIE0yNS4xNzg4OTI3LDM0Ljg1MzgyMDYgTDIyLjg4NjI2ODIsMzQuODUzODIwNiBMMjIuODg2MjY4MiwyNi4wNTM4MjA2IEwxOS45NTAyMjk5LDI2LjA1MzgyMDYgTDE5Ljk1MDIyOTksMjQuMTY4MTA2MyBMMjguMTE0OTMxLDI0LjE2ODEwNjMgTDI4LjExNDkzMSwyNi4wNTM4MjA2IEwyNS4xNzg4OTI3LDI2LjA1MzgyMDYgTDI1LjE3ODg5MjcsMzQuODUzODIwNiBaIE0zOS4yODk2MjYyLDI5LjQ5NjM0NTUgQzM5LjI4OTYyNjIsMzEuMjY1MTI1MSAzOC44NDU4OTY5LDMyLjYyNDU4IDM3Ljk1ODQyNDksMzMuNTc0NzUwOCBDMzcuMDcwOTUzLDM0LjUyNDkyMTcgMzUuNzk4OTI4OSwzNSAzNC4xNDIzMTQ2LDM1IEMzMi40ODU3MDAzLDM1IDMxLjIxMzY3NjIsMzQuNTI0OTIxNyAzMC4zMjYyMDQzLDMzLjU3NDc1MDggQzI5LjQzODczMjMsMzIuNjI0NTggMjguOTk1MDAzLDMxLjI2MDI1MjUgMjguOTk1MDAzLDI5LjQ4MTcyNzYgQzI4Ljk5NTAwMywyNy43MDMyMDI2IDI5LjQzOTk2NDksMjYuMzQ0OTY1OSAzMC4zMjk5MDIxLDI1LjQwNjk3NjcgQzMxLjIxOTgzOTIsMjQuNDY4OTg3NiAzMi40OTU1NjEsMjQgMzQuMTU3MTA1NywyNCBDMzUuODE4NjUwNSwyNCAzNy4wODk0NDE5LDI0LjQ3MjY0MiAzNy45Njk1MTgzLDI1LjQxNzk0MDIgQzM4Ljg0OTU5NDYsMjYuMzYzMjM4NCAzOS4yODk2MjYyLDI3LjcyMjY5MzIgMzkuMjg5NjI2MiwyOS40OTYzNDU1IFogTTMxLjM5ODU2MDksMjkuNDk2MzQ1NSBDMzEuMzk4NTYwOSwzMC42OTAxNDk5IDMxLjYyNzgyMSwzMS41ODkxNDQzIDMyLjA4NjM0ODIsMzIuMTkzMzU1NSBDMzIuNTQ0ODc1NCwzMi43OTc1NjY3IDMzLjIzMDE5MDcsMzMuMDk5NjY3OCAzNC4xNDIzMTQ2LDMzLjA5OTY2NzggQzM1Ljk3MTQ5MjksMzMuMDk5NjY3OCAzNi44ODYwNjg0LDMxLjg5ODU3MjQgMzYuODg2MDY4NCwyOS40OTYzNDU1IEMzNi44ODYwNjg0LDI3LjA4OTI0NiAzNS45NzY0MjMyLDI1Ljg4NTcxNDMgMzQuMTU3MTA1NywyNS44ODU3MTQzIEMzMy4yNDQ5ODE4LDI1Ljg4NTcxNDMgMzIuNTU3MjAxMywyNi4xODkwMzM1IDMyLjA5Mzc0MzgsMjYuNzk1NjgxMSBDMzEuNjMwMjg2MiwyNy40MDIzMjg2IDMxLjM5ODU2MDksMjguMzAyNTQxMSAzMS4zOTg1NjA5LDI5LjQ5NjM0NTUgWiBNNDMuODIzMTA2MSwyOS4xOTY2Nzc3IEw0NC41Nzc0NTM1LDI5LjE5NjY3NzcgQzQ1LjI4MjUwMDcsMjkuMTk2Njc3NyA0NS44MTAwNDU2LDI5LjA1OTAyNjggNDYuMTYwMTAzOSwyOC43ODM3MjA5IEM0Ni41MTAxNjIzLDI4LjUwODQxNSA0Ni42ODUxODg5LDI4LjEwNzY0MzggNDYuNjg1MTg4OSwyNy41ODEzOTUzIEM0Ni42ODUxODg5LDI3LjA1MDI3NDIgNDYuNTM4NTExNywyNi42NTgwMzAxIDQ2LjI0NTE1MjksMjYuNDA0NjUxMiBDNDUuOTUxNzk0MSwyNi4xNTEyNzIzIDQ1LjQ5MjA0MTIsMjYuMDI0NTg0NyA0NC44NjU4ODA1LDI2LjAyNDU4NDcgTDQzLjgyMzEwNjEsMjYuMDI0NTg0NyBMNDMuODIzMTA2MSwyOS4xOTY2Nzc3IFogTTQ5LDI3LjUwMDk5NjcgQzQ5LDI4LjY1MDk0NzEgNDguNjM2Mzg4NSwyOS41MzA0NTEgNDcuOTA5MTU0NSwzMC4xMzk1MzQ5IEM0Ny4xODE5MjA1LDMwLjc0ODYxODggNDYuMTQ3Nzg0NywzMS4wNTMxNTYxIDQ0LjgwNjcxNiwzMS4wNTMxNTYxIEw0My44MjMxMDYxLDMxLjA1MzE1NjEgTDQzLjgyMzEwNjEsMzQuODUzODIwNiBMNDEuNTMwNDgxNywzNC44NTM4MjA2IEw0MS41MzA0ODE3LDI0LjE2ODEwNjMgTDQ0Ljk4NDIwOTUsMjQuMTY4MTA2MyBDNDYuMjk1Njk1OCwyNC4xNjgxMDYzIDQ3LjI5Mjg1NDIsMjQuNDQ3MDYyNSA0Ny45NzU3MTQ2LDI1LjAwNDk4MzQgQzQ4LjY1ODU3NDksMjUuNTYyOTA0MiA0OSwyNi4zOTQ5MDAzIDQ5LDI3LjUwMDk5NjcgWiIgaWQ9IlNUT1AiIGZpbGw9IiNGRkZGRkYiPjwvcGF0aD4KICAgICAgICAgICAgPHBhdGggZD0iTTE2LjcxNTYxMjcsNy45Mjg5MDk5MyBMNy45Mjg5NTQ0NSwxNi43MTU1MTI5IEM2LjA1MzU3NzA1LDE4LjU5MDg3ODUgNSwyMS4xMzQ0MjcyIDUsMjMuNzg2NjAzIEw1LDM2LjIxMzE0NTIgQzUsMzguODY1MjgzOCA2LjA1MzU0NzU0LDQxLjQwODc5OTkgNy45Mjg4Nzg0Niw0My4yODQxNTkzIEwxNi43MTU1OTk3LDUyLjA3MTAxNDEgQzE4LjU5MDk2NzksNTMuOTQ2NDEwNyAyMS4xMzQ1Myw1NSAyMy43ODY3MjEyLDU1IEwzNi4yMTMyNzg4LDU1IEMzOC44NjU0Nyw1NSA0MS40MDkwMzIxLDUzLjk0NjQxMDcgNDMuMjg0NDAwMyw1Mi4wNzEwMTQxIEw1Mi4wNzExMjE1LDQzLjI4NDE1OTMgQzUzLjk0NjQ1MjUsNDEuNDA4Nzk5OSA1NSwzOC44NjUyODM4IDU1LDM2LjIxMzE0NTIgTDU1LDIzLjc4NjYwMyBDNTUsMjEuMTM0NDI3MiA1My45NDY0MjMsMTguNTkwODc4NSA1Mi4wNzEwNDU2LDE2LjcxNTUxMjkgTDQzLjI4NDM4NzMsNy45Mjg5MDk5MyBDNDEuNDA5MDI1Myw2LjA1MzU1OTc2IDM4Ljg2NTQ5NTcsNSAzNi4yMTMzNDE3LDUgTDIzLjc4NjY1ODMsNSBDMjEuMTM0NTA0Myw1IDE4LjU5MDk3NDcsNi4wNTM1NTk3NiAxNi43MTU2MTI3LDcuOTI4OTA5OTMgWiIgaWQ9IkZpbGwtMSIgc3Ryb2tlPSIjRkZGRkZGIiBzdHJva2Utd2lkdGg9IjIiPjwvcGF0aD4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPgo="]');
    if (stopshapeicon.length) {
        beta_ui_enabled = true;
        document.getElementsByTagName('body')[0].classList.add('beta-ui-enabled');
    }
}

const process_to_image = (process) => {

    let nav = process.closest('.component_editor_panel').querySelector('.component_nav');
    let executeCheck = nav.innerText
    let executeLink = executeCheck.includes("Capture Process Flow");
    if (executeLink != true){
    let newLink = `<li> <a class="gwt-Anchor bph-capture-process">Capture Process Flow</a> </li>`
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
                                
                                <p>This will rasterized your canvas (Full) and capture the process flow to a single image based on your build canvas.</p>
                                ${
                                beta_ui_enabled
                                ? ""
                                : "<p>Recommend enabling <b>Boomi's Beta UI</b> if you wish to scale the process capture higher than 1x. Otherwise the output will be blurry.</p>"
                                }
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
                        class="gwt-Button qm-button--primary-action action_button" title="Run Capture Process">Capture Process Flow Now</button>
                        <button type="button" class="gwt-Button"  data-locator="link-cancel"; onclick="javascript:document.querySelector('.BoomiPlatformOverlay').remove();">Cancel Capture</button>
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

            //With the change is Portal Design we will remove this so if uses default icons, leaving if at a later date decide to override with something more user friendly
            /*[...process.querySelectorAll('.disconnected')].forEach(point => {
                if (beta_ui_enabled) {
                    point.style.backgroundImage = "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWlkWU1pZCBtZWV0IiB3aWR0aD0iMTYiIGhlaWdodD0iMTYiPjxkZWZzPjxwYXRoIGQ9Ik0xNSA4YTcuMDEgNy4wMSAwIDAgMS03IDcgNy4wMSA3LjAxIDAgMCAxLTctNyA3LjAxIDcuMDEgMCAwIDEgNy03IDcuMDEgNy4wMSAwIDAgMSA3IDd6IiBpZD0iQSIvPjxwYXRoIGQ9Ik0xMS40MyA5Yy4zNy0uMzQuNTYtLjY4LjU3LTFzLS4xNy0uNjctLjUzLTFsLTIuMi0yLjNjLS4zNS0uMzUtLjktLjM1LTEuMjYgMC0uMzUuMzQtLjM1LjkgMCAxLjI2TDkuMDcgNy4xSDQuOWEuODkuODkgMCAxIDAgMCAxLjc4aDQuMThsLTEuMTUgMS4xNGMtLjM1LjM1LS4zNS45LS4wMSAxLjI2LjM1LjM1LjkyLjM1IDEuMjYuMDFMMTEuNDMgOXoiIGlkPSJCIi8+PC9kZWZzPjx1c2UgeGxpbms6aHJlZj0iI0EiIGZpbGw9IiNmZjQyMjIiLz48dXNlIHhsaW5rOmhyZWY9IiNCIiBmaWxsPSIjZmZmIi8+PC9zdmc+')";
                }
            });

            [...process.querySelectorAll('.connected')].forEach(point => {
                if (beta_ui_enabled) {
                    point.style.backgroundImage = "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWlkWU1pZCBtZWV0IiB3aWR0aD0iMTYiIGhlaWdodD0iMTYiPjxkZWZzPjxwYXRoIGQ9Ik0xNSA4YTcuMDEgNy4wMSAwIDAgMS03IDcgNy4wMSA3LjAxIDAgMCAxLTctNyA3LjAxIDcuMDEgMCAwIDEgNy03IDcuMDEgNy4wMSAwIDAgMSA3IDd6IiBpZD0iQSIvPjxwYXRoIGQ9Ik0xMS40MyA5Yy4zNy0uMzQuNTYtLjY4LjU3LTFzLS4xNy0uNjctLjUzLTFsLTIuMi0yLjNjLS4zNS0uMzUtLjktLjM1LTEuMjYgMC0uMzUuMzQtLjM1LjkgMCAxLjI2TDkuMDcgNy4xSDQuOWEuODkuODkgMCAxIDAgMCAxLjc4aDQuMThsLTEuMTUgMS4xNGMtLjM1LjM1LS4zNS45LS4wMSAxLjI2LjM1LjM1LjkyLjM1IDEuMjYuMDFMMTEuNDMgOXoiIGlkPSJCIi8+PC9kZWZzPjx1c2UgeGxpbms6aHJlZj0iI0EiIGZpbGw9IiM2YmMxMDYiLz48dXNlIHhsaW5rOmhyZWY9IiNCIiBmaWxsPSIjZmZmIi8+PC9zdmc+')";
                }
            });*/

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
