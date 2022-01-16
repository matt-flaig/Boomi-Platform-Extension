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
loadScript('./library/boomiapp/jsonView.js');
loadScript('./library/boomiapp/imageCapture.js');
loadScript('./library/boomiapp/tableWrap.js');
loadScript('./library/boomiapp/listenerGlobal.js');
loadScript('./library/boomiapp/canvas.js');
loadScript('./library/boomiapp/reminders.js');
loadScript('./library/inject/rasterizeHTML.min.js');
loadScript('./library/inject/showdown.min.js');
loadScript('./library/inject/codeflask.min.js');
loadScript('./library/jquery/jquery-3.6.min.js');

let org_title = document.title;
let wait_for_load = setInterval(() => {

    if (org_title != document.title) {
        clearInterval(wait_for_load);

        updateBoomiPlatformConfig()
        document.getElementById('footer_links').insertAdjacentHTML('afterbegin', `
            <li><a class="alternate_link" target="_blank" href="https://chrome.google.com/webstore/detail/boomi-platform-enhancer/behhfojpggobllhaifocfcampokbfhko/">Boomi Platform Enhancer v${chrome.runtime.getManifest().version} loaded</a></li>
        `);
    }

}, 250)


//options updated via extension options
const updateBoomiPlatformConfig = () => {
    chrome.storage.sync.get(null, (config) => {
        window.postMessage(Object.assign({
            BoomiPlatformconfig: true
        }, config))
    });
}

chrome.storage.onChanged.addListener(() => {

    let alert_html = `
    <div class="BoomiPlatformOverlay" style="position:fixed;z-index:9999;display:grid;place-items:center;min-height:100vh;min-width:100vw;background: rgba(0,0,0,0.25);">
    <div class="alert_label_content error_label_content" style="max-height: 600px; max-width: 600px; overflow: auto; padding: 10px; border-radius: 4px; box-shadow: 0 0 20px 0 rgba(0,0,0,0.25); background-color: #ffffff;">
        <div>
            <span class="alert_dismiss" style="float: right;"> <a class="gwt-Anchor" data-locator="link-cancel" href="javascript:document.querySelector('.BoomiPlatformOverlay').remove();"> <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewbox="0 0 16 16" style="width: 14px; height: 14px;">
                        <title>Close</title>
                        <path class="svg-foreground" d="M14.284,12.546c0.348,0.348,0.521,0.764,0.521,1.246s-0.174,0.888-0.521,1.216c-0.348,0.328-0.763,0.493-1.245,0.493 c-0.483,0-0.898-0.155-1.245-0.463l-3.822-4.402l-3.822,4.402C3.801,15.345,3.386,15.5,2.904,15.5c-0.483,0-0.898-0.155-1.245-0.463 c-0.309-0.348-0.463-0.763-0.463-1.245s0.154-0.898,0.463-1.246l3.996-4.517L1.659,3.453C1.35,3.106,1.195,2.692,1.195,2.208 c0-0.482,0.154-0.898,0.463-1.245C2.006,0.655,2.421,0.5,2.904,0.5c0.482,0,0.898,0.155,1.245,0.463l3.822,4.401l3.822-4.401 C12.141,0.655,12.556,0.5,13.039,0.5c0.482,0,0.897,0.164,1.245,0.493s0.521,0.734,0.521,1.216c0,0.483-0.174,0.898-0.521,1.245 l-3.996,4.576L14.284,12.546z"></path>
                    </svg> </a> </span>
        </div>
        <span class="alert_icon" style="padding-top:0;vertical-align: middle;"><img style="width: 24px; height: 24px; background-color: #ffab00;" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB2aWV3Qm94PSIwIDAgMTYgMTYiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDE2IDE2OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+Cgk8ZGVmcz48c3R5bGU+LmQge2ZpbGw6I2ZmZmZmZn08L3N0eWxlPjwvZGVmcz4KPHBhdGggY2xhc3M9ImQiIGQ9Ik04LjksMS42bDYuNCwxMS44YzAuMiwwLjMsMC4yLDAuNywwLDFjLTAuMSwwLjItMC4yLDAuMy0wLjQsMC40Yy0wLjIsMC4xLTAuMywwLjEtMC41LDAuMUgxLjZjLTAuMiwwLTAuNC0wLjEtMC41LTAuMQoJYy0wLjItMC4xLTAuMy0wLjItMC40LTAuNGMtMC4yLTAuMy0wLjItMC43LDAtMUw3LjEsMS42YzAuMS0wLjIsMC4yLTAuMywwLjQtMC40UzcuOCwxLDgsMXMwLjQsMCwwLjUsMC4xQzguNywxLjMsOC44LDEuNCw4LjksMS42egoJIE05LDkuNGwwLjEtMy44YzAtMC4xLDAtMC4xLTAuMS0wLjJDOS4xLDUuNCw5LDUuMyw4LjksNS4zSDcuMWMtMC4xLDAtMC4xLDAtMC4yLDAuMWMtMC4xLDAtMC4xLDAuMS0wLjEsMC4ybDAuMSwzLjgKCWMwLDAuMSwwLDAuMSwwLjEsMC4xYzAuMSwwLDAuMSwwLjEsMC4yLDBoMS41YzAuMSwwLDAuMSwwLDAuMiwwQzksOS41LDksOS41LDksOS40eiBNOS4xLDEyLjV2LTEuNmMwLTAuMSwwLTAuMS0wLjEtMC4yCgljLTAuMS0wLjEtMC4xLTAuMS0wLjItMC4xSDcuMmMtMC4xLDAtMC4xLDAtMC4yLDAuMWMtMC4xLDAuMS0wLjEsMC4xLTAuMSwwLjJ2MS42YzAsMC4xLDAsMC4xLDAuMSwwLjJjMC4xLDAuMSwwLjEsMC4xLDAuMiwwLjFoMS42CgljMC4xLDAsMC4xLDAsMC4yLTAuMUM5LDEyLjcsOS4xLDEyLjYsOS4xLDEyLjV6Ii8+Cjwvc3ZnPgo=" alt="Warning"></span>
        <div class="alert_text">
            <b>Boomi Platform Enhancer:</b> Settings have been adjusted.
            <p>Reload the page to apply the new adjustments.</p>
        </div>
    </div>
</div>`;

    let overlay = document.querySelector('.BoomiPlatformOverlay');
    if (overlay) overlay.remove();
    document.getElementsByTagName('body')[0].insertAdjacentHTML('beforeend', alert_html)

    updateBoomiPlatformConfig()
});