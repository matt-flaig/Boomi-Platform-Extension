
const add_fullscreen_listener = (button) => {

    setTimeout(()=>{
        var click = new MouseEvent('click', {
            "clientX": 1,
            "clientY": 1
        });



        window.addEventListener('keydown', event => {
        

            //check if the focused element is editable
            var el=event.target, nodeName = el.nodeName.toLowerCase();
            if (el.nodeType == 1 && (nodeName == 'textarea' || el.isContentEditable || (nodeName == 'input' && /^(?:text|email|number|search|tel|url|password)$/i.test(el.type)))) return false;

            if(event.isComposing || event.keyCode === 229) return false;

    
                if(event.keyCode === (parseInt(BoomiPlatform.full_screen_shortcut) || 192)){
    
                    if(BoomiPlatform.full_screen_shortcut_alt && !event.altKey) return false;
                    if(BoomiPlatform.full_screen_shortcut_ctrl && !event.ctrlKey) return false;
                    if(BoomiPlatform.full_screen_shortcut_shift && !event.shiftKey) return false;
    
          
                    setTimeout(()=>{
                        button.dispatchEvent(click);
                        var tempPopup = document.getElementsByClassName('popupContent')[0]
                        var tempPopupbutton = tempPopup.childNodes[0].childNodes[0].id
                        document.getElementById(tempPopupbutton).querySelectorAll(".gwt-Anchor")[0].click();
                        
                    },1)


                }

          });

    },0)

}
