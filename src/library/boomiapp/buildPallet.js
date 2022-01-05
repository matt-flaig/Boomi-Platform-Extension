// @author   Noah Skelton
// @description Reverts to older shape sizes on palette and changes the default expand / collapse width.


var psc = 0;
var DefaultPaletteWidth = 250;
 
function GM_addStyle(cssStr) 
{
  var targ = document.getElementsByTagName('head')[0] || D.body || D.documentElement;
  var st = document.createElement('style');
  st.textContent = cssStr;
  targ.appendChild(st);
}
 
GM_addStyle(`
    .base_shape_container div{padding: 3px !important;}
    .qm-l-auto-fill-grid {grid-gap: 3px !important;}
    .palette_shape_container_with_hover { border: none !important; }
`);
 
function DisplayPalette(toggle, el)
{
  //Replace Expand Animation
  el.children[0].children[1].style.display = toggle ? "none" : "";
  el.children[0].children[1].style.left = toggle ? "-100%" : "0%";
  el.children[0].children[1].children[0].style.display = toggle ? "none" : "";
  
  el.children[0].children[2].style.display = toggle ? "" : "none";
  el.children[0].children[2].style.left = toggle ? "0%" : "100%";
  el.children[0].children[2].children[0].style.display = toggle ? "" : "none";
  
  //Toggle Buttons
  el.attributes["ExpandButton"].disabled = toggle;
  el.attributes["CloseButton"].disabled = !toggle;
}
 
function ExpandPalette(toggle, el)
{
  var width = toggle ? el.attributes["PaletteWidth"] : 44;
  
  if(!toggle) el.attributes["PaletteWidth"] = el.clientWidth;
    el.attributes["ShapePaletteParent"].style.width= width + "px";
  el.attributes["CollapsibleDragger"].style.left= width + "px";
  el.attributes["BuildCanvas"].style.inset="0px 0px 0px " + (width + 12) + "px";
  el.style.width = width + "px";
}
 
function InitCollapsiblePanel(p)
{
  var el = p.children[1];
  var cdp = p.children[2];
  var cd = cdp.children[0];
  var ebt = cd.children[0];
  var cbt = cd.children[2];
  
  el.attributes["PaletteWidth"] = DefaultPaletteWidth;
  el.attributes["ShapePaletteParent"] = el.children[0];
  el.attributes["CollapsibleDragger"] = cdp;
  el.attributes["BuildCanvas"] = p.children[3];
  el.attributes["ExpandButton"] = ebt;
  el.attributes["CloseButton"] = cbt;
 
  ebt.onclick = function() { ExpandPalette(true, el); };
  cbt.onclick = function() { ExpandPalette(false, el); };
  cd.ondblclick = function() { ExpandPalette(cbt.disabled, el); };
 
  return el;
}
 
var resizeObserver = new ResizeObserver(entries => 
{
  entries.forEach(entry => 
    {
    if(entry.contentRect.width == 700)
    {
      console.log("Old Shape Palette Expand Detected");
 
      ExpandPalette(true, entry.target);
    }
    else
      //Change control display based on width (44 = closed)
      DisplayPalette(entry.contentRect.width > 44, entry.target);
      
  });
});
 
var docObserver = new MutationObserver((mutations) => 
{
    mutations.forEach((mutation) => 
    {    
    if(!mutation.addedNodes) return
    
    var ps = document.getElementsByClassName("collapsible_base_panel");
    
    if(ps && ps.length != psc)
    {
      psc = ps.length;
      
      for(var i = 1; i < ps.length; i++)
      {
        if(!ps[i].attributes["sizeobserved"])
        {
                    resizeObserver.observe(InitCollapsiblePanel(ps[i]));
 
                    ps[i].attributes["sizeobserved"] = true;
        }
      }
    }
    });
});
 
docObserver.observe(document, { childList: true, subtree: true, attributes: false, characterData: false/*, attributeFilter: ['class']*/});