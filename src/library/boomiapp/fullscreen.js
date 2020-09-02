let fullscreen_once = false;
let fullscreen_cycle = false;
let fullscreen_status = false;
const add_fullscreen_listener = (button) => {

    setTimeout(()=>{
        var click = new MouseEvent('click', {
            "clientX": 1,
            "clientY": 1
        });

        button.addEventListener('mouseup', () => {
            fullscreen_cycle = false;
            if(!fullscreen_once){
                setTimeout(()=>{
                    fullscreen_once = true;
                    button.dispatchEvent(click);
                },1)
            }
            setTimeout(()=>{
                fullscreen_status = button.getAttribute('title').includes('Exit');
            },2)
        })

        window.addEventListener('keydown', event => {
            fullscreen_status = button.getAttribute('title').includes('Exit');

            //check if the focused element is editable
            var el=event.target, nodeName = el.nodeName.toLowerCase();
            if (el.nodeType == 1 && (nodeName == 'textarea' || el.isContentEditable || (nodeName == 'input' && /^(?:text|email|number|search|tel|url|password)$/i.test(el.type)))) return false;

            if(event.isComposing || event.keyCode === 229) return false;

            if(fullscreen_status == false || fullscreen_cycle == true){
                if(event.keyCode === (parseInt(BoomiPlatform.full_screen_shortcut) || 192)){
    
                    if(BoomiPlatform.full_screen_shortcut_alt && !event.altKey) return false;
                    if(BoomiPlatform.full_screen_shortcut_ctrl && !event.ctrlKey) return false;
                    if(BoomiPlatform.full_screen_shortcut_shift && !event.shiftKey) return false;
    
                    fullscreen_cycle = false;
                    setTimeout(()=>{
                        button.dispatchEvent(click);
                    },1)
                    if(!fullscreen_once){
                        setTimeout(()=>{
                            fullscreen_once = true;
                            button.dispatchEvent(click);
                        },10)
                    }
                }
            }

            if(fullscreen_status == true && fullscreen_cycle == false){
                [...document.querySelectorAll('.collapsible_dragger')].forEach((dragger,index) => {
                    setTimeout(()=>{
                        fullscreen_cycle = true;
                        let rect = dragger.getBoundingClientRect();
                        var down = new MouseEvent('mousedown', {
                            "clientX":rect.left,
                            "clientY":rect.top,
                        });

                        var move = new MouseEvent('mousemove', {
                            "clientX": 1,
                            "clientY": 1
                        });

                        var up = new MouseEvent('mouseup', {
                            "clientX": 1,
                            "clientY": 1
                        });

                        dragger.dispatchEvent(down);
                        dragger.dispatchEvent(move);
                        setTimeout(()=>{
                            dragger.dispatchEvent(up);
                        },15*index)
                    },10*index)
                })
            }
          });

    },0)

}
