  let boomi_title = document.title;
  let boomiatomLoaded = setInterval(()=>{
  
      if(boomi_title != document.title){

          var headerAdd = document.getElementsByClassName('qm-c-servicenav__navbar')[0];

          // add the header if we can find it, if not keep polling
          if(headerAdd){
            $('#'+headerAdd.id).append(
              '<li id="showHeaderbtn" class="qm-c-servicenav__nav-item"><a class="gwt-Anchor qm-c-servicenav__nav-link qm-a--alternate"><span id="showHeaderspan" class="">Show Header</span></a></li>'
            );
            // clear the setInterval timer to poll for injecting the Show Header Button
            clearInterval(boomiatomLoaded);
          }
          
  updatenotificationCheck();
      }
  
  },250)
    
  function onNavigationChange(){
    var urlPath = getUrlpath();

    // Show Homepage Header
    if(urlPath.includes("home")){
      headerVisible = true;
      let waitToShowHomepageHeader = setInterval(function(){
        var x = document.getElementsByClassName("qm-c-masthead");
        if(x){
          x[0].classList.add("headerShow");
          $("#showHeaderspan").text("Hide Header");
          headerVisible = true;
          clearInterval(waitToShowHomepageHeader);
        }
    }, 250);
    }else{
      clearInterval(waitToShowHomepageHeader);
    }
    
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
