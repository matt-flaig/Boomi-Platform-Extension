let boomi_title = document.title;
let boomiatomLoaded = setInterval(()=>{

    if(boomi_title != document.title){

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
            var headerVisibilityState = e.headerVisible === "false" ? "Show" : "Hide";
            $('#'+headerAdd.id).append(
              '<li id="showHeaderbtn" class="qm-c-servicenav__nav-item"><a class="gwt-Anchor qm-c-servicenav__nav-link qm-a--alternate"><span id="showHeaderspan" class="">' + headerVisibilityState + ' Header</span></a></li>'
            );
          });
          // clear the setInterval timer to poll for injecting the Show Header Button
          clearInterval(boomiatomLoaded);
        }

      updatenotificationCheck();
    }

}, 250);
    
  function onNavigationChange(){
    var urlPath = getUrlpath();
    
    // Process Reporting Page
    if(document.getElementsByTagName("title")[0].innerHTML.includes("Process Reporting") || urlPath.includes('reporting')){
        const processExecutionDurationReporting = setInterval(function(){
            if(Array.from(document.querySelectorAll('label')).find(el => el.textContent.includes('Auto Refresh')).innerHTML != "Auto Refresh is On"){
                clearInterval("processExecutionDurationReporting");
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

  // run on inital load
  onNavigationChange()

  // run on window change states
  window.addEventListener('popstate', onNavigationChange);
  window.addEventListener('onhashchange', onNavigationChange);
