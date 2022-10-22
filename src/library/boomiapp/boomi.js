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
          };
 
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
    
  }

  // run on inital load
  onNavigationChange()

  // run on window change states
  window.addEventListener('popstate', onNavigationChange);
  window.addEventListener('onhashchange', onNavigationChange);
