


  let boomi_title = document.title;
  let boomiatomLoaded = setInterval(()=>{
  
      if(boomi_title != document.title){
          clearInterval(boomiatomLoaded);
          var headerAdd = document.getElementsByClassName('qm-c-servicenav__navbar')[0].id
          $('#'+headerAdd).append(
            '<li id="showHeaderbtn" class="qm-c-servicenav__nav-item"><a class="gwt-Anchor qm-c-servicenav__nav-link qm-a--alternate"><span id="showHeaderspan" class="">Show Header</span></a></li>'
  );
      }
  
  },250)


  
