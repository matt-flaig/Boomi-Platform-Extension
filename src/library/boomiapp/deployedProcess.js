

document.arrive(".deployed_processes_panel",function (deployedScreen) {


var processPanel = document.getElementById('deployed_processes_view')
var btnblock = document.getElementsByClassName('buttons_block')
var detail = btnblock[0].innerHTML

btnblock[0].innerHTML = btnblock[0].innerHTML + '<button id="bph_closeexpandbtn" type="button" class="gwt-Button">Expand/Close All</button>'

});


function deployedTrees(){

    var trees = document.getElementsByClassName('div.treeItemContent')

    console.log('yes')
    //debugger
    $(trees).each(function () {
    
            $(this).click();
    
    });


}



$(document).on("click", "#bph_closeexpandbtn", function () {

    deployedTrees()

});


