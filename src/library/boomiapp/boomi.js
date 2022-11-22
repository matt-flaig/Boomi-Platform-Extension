let boomi_title = document.title;
let boomiPageLoaded = setInterval(()=>{

    if(boomi_title != document.title){
      clearInterval(boomiPageLoaded);

      var subHeaderContainerNav = document.getElementsByClassName('qm-c-servicenav')[0];
      var headerAdd = document.getElementsByClassName('qm-c-servicenav__navbar')[0];

        // this covers about 90% of the use cases where the header should / shouldn't be hidden.
        
        /* Only hide the header if
            1) The "Show Header" button can be injected
            2) The nav-bar in which the show header button option is visible
            3) The localstorage/chromestorage "headerVisibile" value is set to false

            This doesn't cover two cases:
            1) The user navigated (with header hidden) to another page (such as settings) without the page reloading.
            2) The user changed to another Boomi platform account, which reloads the DOM but this code is never re-executed because the page didn't reload
        */

        if(headerAdd && subHeaderContainerNav.style.display != "none" && !subHeaderContainerNav.classList.contains("no_display")){
          chrome.storage.local.get(["headerVisible"], function(e) {
            if(e.headerVisible == false){
              document.getElementsByClassName("qm-c-masthead")[0].classList.add("headerHide");
            }
            var headerVisibilityState = (!e.headerVisible && typeof e.headerVisible !== "undefined") ? "Show" : "Hide";
            $('#'+headerAdd.id).append(
              '<li id="showHeaderbtn" class="qm-c-servicenav__nav-item"><a class="gwt-Anchor qm-c-servicenav__nav-link qm-a--alternate"><span id="showHeaderspan" class="">' + headerVisibilityState + ' Header</span></a></li>'
            );
          });
        }
      onNavigationChange();
      updatenotificationCheck();
    }

}, 250);

function onNavigationChange(){
  var urlPath = getUrlpath();

  // unique page titles and favicons
  chrome.storage.sync.get(["unique_titles_and_favicons"], function(e) {
    if(e.unique_titles_and_favicons == "on"){
      removeAccountPrefixFromDocumentTitle();
      changeFaviconBasedOnPage();
    }
  });
 
  // Process Reporting Page
  if(document.getElementsByTagName("title")[0].innerHTML.includes("Process Reporting") || urlPath.includes('reporting')){
      const processExecutionDurationReporting = setInterval(function(){
        var autoRefreshElement = Array.from(document.querySelectorAll('label')).find(el => el.textContent.includes('Auto Refresh'));
          if(!autoRefreshElement || (autoRefreshElement && autoRefreshElement.innerHTML != "Auto Refresh is On")){
              clearInterval(processExecutionDurationReporting);
              return false;
          }
          // get any row that's in-process
          document.querySelectorAll('img[title*="In Process"]').forEach(function(element){
      
              // get div containing entire row
              var inProgressRow = element.parentElement.parentElement.parentElement;
      
              var processExecutionTime = inProgressRow.getElementsByClassName('link_action')[0].innerHTML;
              
              const diffTime = Math.abs(new Date() - new Date(processExecutionTime));
              
              var processElapsedTime = inProgressRow.querySelectorAll('div')[11];
              processElapsedTime.innerHTML = fancyTimeFormat(diffTime/1000);
              processElapsedTime.style.color = "red";
          })
      }, 1000);
  }else{
    if(typeof processExecutionDurationReporting !== 'undefined'){
      clearInterval(processExecutionDurationReporting);
    }
  }
}

// enhance the favicon to a high res image
changeFaviconImage('https://boomi.com/wp-content/uploads/Boomi_Logo_Icon_Navy.png');

// run on window change states
window.addEventListener('popstate', onNavigationChange);
window.addEventListener('onhashchange', onNavigationChange);
document.addEventListener("visibilitychange", (event) => {
  if (document.visibilityState != "visible") {
    onNavigationChange();
  }
});

function removeAccountPrefixFromDocumentTitle(){
  // Change Page Title to Drop Account Prefix
  setTimeout(function(){
    var title = document.title.replace(document.getElementsByClassName("qm-c-inlinemenu__settings-menu-item-name")[1].innerHTML, '').replace(/^(\s-\s)/, '');;
    // replace trailing " - Boomi AtomSphere" (optional)
    //title = title.split(' -')[0];
    document.title = title;
  }, 250);
}

function changeFaviconBasedOnPage(){
  var subdomain = window.location.host.split('.')[0];
  var pageName = getPageNameWithoutExtension();
  var gwtPage = getGWTPageName();
  var svgIcon = '';
  
  switch (subdomain){
    case 'platform':
      switch(pageName){
        case 'AtomSphere':
          switch (gwtPage){
            case 'atom':
              svgIcon = "%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 194.24 194.23'%3E%3Cg id='Layer_2' data-name='Layer 2'%3E%3Cg id='Layer_1-2' data-name='Layer 1'%3E%3Cg id='AtomSphere_Platform_Coral' data-name='AtomSphere Platform Coral'%3E%3Cg class='cls-2'%3E%3Cg class='cls-3' fill='%23023d58'%3E%3Cpath class='cls-4' d='M132.31,97.12A35.19,35.19,0,1,1,97.12,61.93a35.2,35.2,0,0,1,35.19,35.19' transform='translate(0 0)'/%3E%3Cpath class='cls-4' d='M97.12,194.23a97.12,97.12,0,1,1,97.11-97.11,97.22,97.22,0,0,1-97.11,97.11m0-187.83a90.72,90.72,0,1,0,90.72,90.72A90.82,90.82,0,0,0,97.12,6.4' transform='translate(0 0)'/%3E%3Cpath class='cls-4' d='M174.78,42.08a16,16,0,1,1,0-22.62,16,16,0,0,1,0,22.62' transform='translate(0 0)'/%3E%3Cpath class='cls-4' d='M42.08,19.46a16,16,0,1,1-22.63,0,16,16,0,0,1,22.63,0' transform='translate(0 0)'/%3E%3Cpath class='cls-4' d='M19.46,152.15a16,16,0,1,1,0,22.63,16,16,0,0,1,0-22.63' transform='translate(0 0)'/%3E%3Cpath class='cls-4' d='M152.15,174.78a16,16,0,1,1,22.63,0,16,16,0,0,1-22.63,0' transform='translate(0 0)'/%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/svg%3E";
              break;
            default:
              svgIcon = "%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 204.28 204.28'%3E%3Cdefs%3E%3Cstyle%3E.cls-1 %7B fill: %23033d58; %7D%3C/style%3E%3C/defs%3E%3Cg id='Layer_2' data-name='Layer 2'%3E%3Cg id='Layer_1-2' data-name='Layer 1'%3E%3Cpath class='cls-1' d='M102.14,0A102.14,102.14,0,1,0,204.28,102.14,102.14,102.14,0,0,0,102.14,0Zm0,181.58v-22.7a56.74,56.74,0,0,1,0-113.48V22.7a79.44,79.44,0,0,1,0,158.88Z'%3E%3C/path%3E%3Cpath class='cls-1' d='M157.91,102.14a55.77,55.77,0,0,0-55.77-55.77V157.91A55.77,55.77,0,0,0,157.91,102.14Z'%3E%3C/path%3E%3C/g%3E%3C/g%3E%3C/svg%3E%0A";
              break;
          }
          break;
        case 'MdmSphere':
          svgIcon = "%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 202.05 202.05'%3E%3Cdefs%3E%3CclipPath id='clip-path' transform='translate(0 0)'%3E%3Crect class='cls-1' width='202.05' height='202.05'%3E%3C/rect%3E%3C/clipPath%3E%3C/defs%3E%3Cg id='Layer_2' data-name='Layer 2'%3E%3Cg id='Layer_1-2' data-name='Layer 1'%3E%3Cg id='Master_Data_Hub_Navy' data-name='Master Data Hub Navy'%3E%3Cg class='cls-2'%3E%3Cg class='cls-2'%3E%3Cpath class='cls-3' d='M82.36,68.62,63.61,101,82.28,133.4l37.41,0,18.74-32.37L119.77,68.65ZM101,0a101,101,0,1,0,101,101A101,101,0,0,0,101,0m56.86,112.25,0,.06-18.7,32.31,10.42,18a78.18,78.18,0,0,1-19.43,11.26l-10.41-18.05h-.07l-37.33,0L71.89,173.93a77.94,77.94,0,0,1-19.42-11.26l10.4-18,0-.07L44.2,112.25H23.35a77.1,77.1,0,0,1-.9-11.23,77,77,0,0,1,.9-11.22h20.8l0-.06L62.9,57.43,52.47,39.37A78.56,78.56,0,0,1,71.89,28.11L82.31,46.17h.07l37.34,0,10.43-18.09a78.81,78.81,0,0,1,19.43,11.26l-10.4,18,0,.07L157.86,89.8H178.7a78.38,78.38,0,0,1,.9,11.22,78.52,78.52,0,0,1-.9,11.23Z' transform='translate(0 0)' fill='%23023d58'%3E%3C/path%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/svg%3E%0A";
        break;
        case 'ApiSphere':
          svgIcon = "%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 189.77 189.77'%3E%3Cdefs%3E%3CclipPath id='clip-path' transform='translate(0 0)'%3E%3Crect class='cls-1' width='189.77' height='189.77'%3E%3C/rect%3E%3C/clipPath%3E%3C/defs%3E%3Cg id='Layer_2' data-name='Layer 2'%3E%3Cg id='Layer_1-2' data-name='Layer 1'%3E%3Cg id='API_Management_Navy' data-name='API Management Navy'%3E%3Cg class='cls-2'%3E%3Cg class='cls-2'%3E%3Cpath class='cls-3' d='M94.89,0a94.88,94.88,0,1,0,94.88,94.88A94.88,94.88,0,0,0,94.89,0M84.35,65.84,64.48,77.29l0,35.12,19.91,11.53v24.35l-.06,0-40.95-23.7.07-59.48L84.35,41.51Zm62,58.85-40.93,23.57V123.93l19.85-11.44,0-35.14L105.43,65.83V41.46l0,0,40.94,23.69Z' transform='translate(0 0)' fill='%23023d58'%3E%3C/path%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/svg%3E%0A";
          break;
      }
    break;
    case 'flow':
      svgIcon = "%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 202.05 202.05'%3E%3Cdefs%3E%3CclipPath id='clip-path' transform='translate(-0.01 0)'%3E%3Crect class='cls-1' width='202.05' height='202.05'%3E%3C/rect%3E%3C/clipPath%3E%3C/defs%3E%3Cg id='Layer_2' data-name='Layer 2'%3E%3Cg id='Layer_1-2' data-name='Layer 1'%3E%3Cg id='Flow_Navy' data-name='Flow Navy'%3E%3Cg class='cls-2'%3E%3Cg class='cls-2'%3E%3Cpath class='cls-3' d='M101,0a101,101,0,1,0,101,101A101,101,0,0,0,101,0M179.6,101a78.15,78.15,0,0,1-.9,11.22H137.48l-44.9,44.9H46.14a78.78,78.78,0,0,1-16-22.45H83.27l44.9-44.9H178.7a78.64,78.64,0,0,1,.9,11.23M100.23,22.49,55.38,67.35H30.13a78.64,78.64,0,0,1,70.1-44.86M23.34,89.79H64.67l44.9-44.89h46.35a79.22,79.22,0,0,1,16,22.45h-53L74,112.24H23.34a72,72,0,0,1,0-22.45m78.58,89.76,44.85-44.86H171.9a78.56,78.56,0,0,1-70,44.86' transform='translate(-0.01 0)' fill='%23023d58'%3E%3C/path%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/svg%3E%0A";
      break;
  }

  if(svgIcon){
    changeFaviconToSVG(svgIcon);
  }
  //just for fun!
  //changeFaviconToEmoji('🥔')
}

function changeFaviconToEmoji(emoji){
  changeFaviconToSVG(`<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>${emoji}</text></svg>`)
}

function changeFaviconToSVG(svgIcon){
  iconHrefData = 'data:image/svg+xml, ' + svgIcon;
  changeFaviconImage(iconHrefData);
}

function changeFaviconImage(link){
  // creates or updates the favicon based on what page you're on
  var faviconIcon = document.getElementsByTagName('head')[0].querySelector("link[rel~='icon']") || document.getElementsByTagName('head')[0].querySelector("link[rel='shortcut icon']");

  if (!faviconIcon) {
    faviconIcon = document.createElement('link');
    faviconIcon.rel = 'icon';
    document.getElementsByTagName('head')[0].appendChild(faviconIcon);
  }
  if(faviconIcon){
    faviconIcon.href = link;
  }
}
