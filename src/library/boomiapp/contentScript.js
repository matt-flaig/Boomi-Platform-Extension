const loadScript = (url) => {
    let body = document.getElementsByTagName('body')[0];
    let script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', chrome.runtime.getURL(url));
    body.appendChild(script);
}
loadScript('./library/boomiapp/notes.js');
loadScript('./library/boomiapp/descriptionMarkdown.js');
loadScript('./library/boomiapp/groups.js');
loadScript('./library/boomiapp/shapes.js');
loadScript('./library/boomiapp/fullscreen.js');
loadScript('./library/boomiapp/imageCapture.js');
loadScript('./library/boomiapp/tableWrap.js');
loadScript('./library/boomiapp/iconSets.js');
loadScript('./library/boomiapp/listenerGlobal.js');
loadScript('./library/boomiapp/canvas.js');
loadScript('./library/boomiapp/reminders.js');
loadScript('./library/boomiapp/customrefresh.js');
loadScript('./library/boomiapp/menuOpen.js');
loadScript('./library/boomiapp/connectionOperations.js');
loadScript('./library/inject/rasterizeHTML.min.js');
loadScript('./library/inject/showdown.min.js');
loadScript('./library/inject/codeflask.min.js');
loadScript('./library/jquery/jquery-3.6.min.js');

let org_title = document.title;
let wait_for_load = setInterval(() => {

    if (org_title != document.title) {
        clearInterval(wait_for_load);

        updateBoomiPlatformConfig()

        //-------------

        var platformStatus = document.evaluate("//a[text()='Platform Status & Announcements']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        fetch('https://status.boomi.com/api/v2/status.json')
        .then(res => res.json())
        .then((out) => {
            if(out.status.description === 'All Systems Operational' && platformStatus){
                platformStatus.innerHTML = `<a href="https://status.boomi.com/" target="_blank"><p><b>Platform Status: </b><b style="color: green;"> All Operational</b></p></a>`;
            } else {
                platformStatus.innerHTML = `<a href="https://status.boomi.com/" target="_blank"><p><b>Platform Status: </b><b class="boomiDown" style="color: red;"> ${out.status.description}</b></p></a>`;
            }

            //-------------
            document.getElementById('footer_links').insertAdjacentHTML('afterbegin', `
            <li><a class="alternate_link" target="_blank" href="https://gitlab.com/mjs-integration/boomi/chromium-addons/boomi-platform-extension/-/wikis/home">Boomi Platform Enhancer v${chrome.runtime.getManifest().version} loaded</a></li>
            `);
        }).catch(err => console.error(err));
    }

}, 250);


//options updated via extension options
const updateBoomiPlatformConfig = () => {
    chrome.storage.sync.get(null, (config) => {
        window.postMessage(Object.assign({
            BoomiPlatformconfig: true
        }, config))
    });
}

chrome.storage.onChanged.addListener((e) => {

    // don't alert about preference changes if it was saving the header visibility state
    if(e.headerVisible || e.headerVisible === "false"){
        return;
    }

    let alert_html = `
    <div style="left: 618px; top: 139px; visibility: visible; position: absolute; overflow: visible;" class="center_panel BoomiUpdateOverlay"
    id="popup_on_popup_content" role="dialog" aria-modal="true">
    <div class="popupContent">
        <div class="modal modal_top">
            <div class="modal_contents">
                <div class="margin_popup_contents notification_min_width" style="width: 440px;">
                    <div class="form_header" style="display: none;" aria-hidden="true">
                        <div class="form_title no_required">
                            <div class="form_title_top"><svg
                                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15"
                                        class="svg-infoicon size16x16" style="width: 16px; height: 16px;">
                                        <title>Extension Update Information</title>
                                        <path class="svg-background-invert"
                                            d="M7.92.5a7.24,7.24,0,0,1,5.31,2.12A7.22,7.22,0,0,1,15.5,7.88a7.23,7.23,0,0,1-2.12,5.34A7.23,7.23,0,0,1,8.11,15.5a7.21,7.21,0,0,1-5.33-2.12A7.24,7.24,0,0,1,.5,8.11,7.2,7.2,0,0,1,2.64,2.77,7.23,7.23,0,0,1,7.92.5Z"
                                            transform="translate(-0.5 -0.5)"></path>
                                        <path class="svg-foreground"
                                            d="M8,1.07a6.81,6.81,0,0,1,6.88,6.84A6.81,6.81,0,0,1,8,14.84H8A6.81,6.81,0,0,1,1.07,8,6.89,6.89,0,0,1,8,1.07H8M8.09.5h0A7.56,7.56,0,0,0,.5,8.09,7.38,7.38,0,0,0,8,15.5h.09A7.38,7.38,0,0,0,15.5,8,7.38,7.38,0,0,0,8.09.5Z"
                                            transform="translate(-0.5 -0.5)"></path>
                                        <path class="svg-foreground-invert"
                                            d="M6.9,12.55a2.84,2.84,0,0,0,1.3-.4A6.57,6.57,0,0,0,9.9,11l-.3-.4a2.38,2.38,0,0,1-1.1.6c-.1,0-.2-.2-.1-.6l.7-2.6c.3-1,.2-1.5-.4-1.5a3.36,3.36,0,0,0-1.4.5,5.67,5.67,0,0,0-1.8,1.2l.3.4A1.66,1.66,0,0,1,7,8c.1,0,.1.2,0,.5l-.6,2.4C6,12,6.2,12.55,6.9,12.55Z"
                                            transform="translate(-0.5 -0.5)"></path>
                                        <path class="svg-foreground-invert"
                                            d="M8.8,3a1.28,1.28,0,0,0-1,.4,1.23,1.23,0,0,0-.4.8,1.45,1.45,0,0,0,.2.7,1.14,1.14,0,0,0,.8.3,1.28,1.28,0,0,0,1-.4,1.27,1.27,0,0,0,.4-.9A.7.7,0,0,0,9.1,3Z"
                                            transform="translate(-0.5 -0.5)"></path>
                                    </svg></a>
                            </div>
                        </div>
                    </div>
                    <div class="qm-c-alert qm-c-alert--info" style="max-height: 600px; overflow: auto;"><span
                            class="qm-c-alert__icon"><img
                                src="data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PGRlZnM+PC9kZWZzPjx0aXRsZT5BbGVydC1JY29uczwvdGl0bGU+PHBhdGggZmlsbD0iIzMzMzMzMyIgZD0iTTEwLjgxLDE5LjA5YTQuMjMsNC4yMywwLDAsMCwxLjkzLS41OSw5Ljg5LDkuODksMCwwLDAsMi41My0xLjcxbC0uNDUtLjU5YTMuNjMsMy42MywwLDAsMS0xLjYzLjg5Yy0uMTUsMC0uMy0uMy0uMTUtLjg5bDEtMy44NmMuNDQtMS40OS4zLTIuMjMtLjYtMi4yM2E1LDUsMCwwLDAtMi4wNy43NCw4LjQ4LDguNDgsMCwwLDAtMi42OCwxLjc4bC40NS42QTIuNDMsMi40MywwLDAsMSwxMSwxMi4zNGMuMTUsMCwuMTUuMjksMCwuNzRsLS44OSwzLjU2QzkuNDgsMTguMjcsOS43NywxOS4wOSwxMC44MSwxOS4wOVoiLz48cGF0aCBmaWxsPSIjMzMzMzMzIiBkPSJNMTMuNjMsNC45MWExLjg5LDEuODksMCwwLDAtMS40OC42LDEuODUsMS44NSwwLDAsMC0uNiwxLjE4LDIuMiwyLjIsMCwwLDAsLjMsMUExLjY5LDEuNjksMCwwLDAsMTMsOC4xOGExLjg4LDEuODgsMCwwLDAsMS40OC0uNiwxLjg2LDEuODYsMCwwLDAsLjYtMS4zMywxLDEsMCwwLDAtMS0xLjM0WiIvPjxwYXRoIGZpbGw9IiMzMzMzMzMiIGQ9Ik0xMiwxLjA5QTEwLjkxLDEwLjkxLDAsMSwxLDEuMDksMTIsMTAuOTIsMTAuOTIsMCwwLDEsMTIsMS4wOU0xMiwwQTEyLDEyLDAsMSwwLDI0LDEyLDEyLDEyLDAsMCwwLDEyLDBaIi8+PC9zdmc+"
                                alt="Information"></span>
                        <div class="qm-c-alert__text">
                            <div class="updated_typography c-whats-new">
                                <h1>Settings Changed.</h1>
                                <p>The Boomi Platform Enhancer Extension options have been adjusted, for these to take affect please reload the page to apply.</p>
                            </div>
                        </div> 
                    </div>
                </div>
            </div>
            <div class="button_set">
                <div class="button_spinner_panel no_display"> <i
                        class="font_icon icon-spinner before-animate-spin spinner"></i> </div><button id="closeUpdate" type="button" class="gwt-Button"
                    >Close</button>
            </div>
        </div>
    </div>
    </div>`;

    let overlay = document.querySelector('.BoomiPlatformOverlay');
    if (overlay) overlay.remove();
    document.getElementsByTagName('body')[0].insertAdjacentHTML('beforeend', alert_html)

    updateBoomiPlatformConfig()
});
