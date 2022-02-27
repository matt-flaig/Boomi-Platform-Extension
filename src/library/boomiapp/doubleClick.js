$(document).ready(function () {


    // accessing the elements with same classname
/*const elements = document.querySelectorAll('.gwt-Label dragdrop-handle');

// adding the event listener by looping
elements.forEach(element => {
    element.addEventListner('click', (e)=>{     console.log('someone hit me');   });});

alert('added')*/
    //////////

 $(document).on("dblclick", ".treeItemContent", function () {


        var info = $(this)
  
       var info2 = $(this)[0].parentNode.parentNode.children[0]
       var info3 = $(this)[0].parentNode.parentNode.children[1]
        
       var toClose = info2.classList.value.includes("closed");

       BrA(info2,'closed')
       yrA(info2,'closed')
       Gc(info2,'closed',false)
       //Ewc(a)
   //closed selected     

});





//////
});

      //  $(_x('/html/body/div[4]/div[2]/div/div[2]/div/div[2]/div/div[3]/div/div[2]/div/div[2]/div/div[3]/div/div/div/div/div[2]/div[2]/div[1]/div[1]')).click()
function _x(STR_XPATH) {
    var xresult = document.evaluate(STR_XPATH, document, null, XPathResult.ANY_TYPE, null);
    var xnodes = [];
    var xres;
    while (xres = xresult.iterateNext()) {
        xnodes.push(xres);
    }

    return xnodes;
}


function BrA(b,a){b.className=a||''}
function yrA(a,b){var c,d,e,f,g;b=OrA(b);g=erA(a);e=MrA(g,b);if(e!=-1){c=YkG(_kG(g,0,e));d=YkG(VkG(g,e+b.length));c.length==0?(f=d):d.length==0?(f=c):(f=c+' '+d);BrA(a,f);return true}return false}
function Gc(a,b,c){if(!a){throw new uHj(w5H)}b=YkG(b);if(b.length==0){throw new bjG(x5H)}c?YqA(a,b):yrA(a,b)}
function Ewc(a){if(a.p<=1){return}if(a.p==3){Gc(OKA(a.n),lbI,false);Gc(OKA(a.n),'open',true);Lc(a.j,true)}else{Gc(OKA(a.n),'open',false);Gc(OKA(a.n),lbI,true);Lc(a.j,false)}}