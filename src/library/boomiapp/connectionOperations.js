const add_connector_list = (conOperation) => {
  let connectorList = conOperation.children;
  if (connectorList && connectorList[1] && connectorList[1].children) {
    connectorList[1].children[0].classList.add("boomiConnect");

    let tableElement = connectorList[1].lastChild.childNodes; //document.getElementsByClassName("smallLabels");

    for (var i = 0; i < tableElement.length; i++) {
      var currenttableElement = tableElement[i].children;

      for (var b = 0; b < currenttableElement.length; b++) {
        var itemcurrenttableElement = currenttableElement[b];
        itemcurrenttableElement.classList.add("connectorText");

        if (itemcurrenttableElement.innerHTML == "Name") {
          itemcurrenttableElement.nextSibling.childNodes[0].childNodes[0].classList.add(
            "connectorVal",
          );
        }

        if (itemcurrenttableElement.innerHTML == "Value") {
          itemcurrenttableElement.nextElementSibling.classList.add(
            "connectorVal",
          );
        }
      }
    }

    //for later
    //let tableElement1 = document.getElementsByClassName("largeLabels");
    //let headerElement = tableElement1[2]
  }
};
