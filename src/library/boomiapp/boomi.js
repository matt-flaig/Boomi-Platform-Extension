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
  );
  updatenotificationCheck();
      }
  
  },250)


  
