const add_connector_list = (conOperation) => {


    
    let connectorList = conOperation.children
    
    for (var i = 0; i < connectorList.length; i++) {
        var currentconnectorList = connectorList[i];
        var currentconnectorParent = currentconnectorList.parentNode.parentNode.parentNode.parentNode
        currentconnectorParent.classList.add('boomiConnect')
     
      }





      let tableElement = document.getElementsByClassName("smallLabels");

      for (var i = 0; i < tableElement.length; i++) {
        var currenttableElement = tableElement[i].children;

        for (var b = 0; b < currenttableElement.length; b++) {
          var itemcurrenttableElement = currenttableElement[b];
          itemcurrenttableElement.childNodes[0].classList.add("connectorText");

          if (itemcurrenttableElement.childNodes[0].innerHTML == "Name") {
            itemcurrenttableElement.childNodes[1].childNodes[0].childNodes[0].classList.add("connectorVal");
          }

          if (itemcurrenttableElement.childNodes[0].innerHTML == "Value") {
            itemcurrenttableElement.childNodes[1].classList.add("connectorVal");
          }
        }
      }

     //for later
      //let tableElement1 = document.getElementsByClassName("largeLabels");
      //let headerElement = tableElement1[2]
    


}


