let quick_component_listener = false;
const quick_component_select = (panel) => {

    panel.addEventListener('dblclick', function (e) {

        if (document.querySelector('.copy_paste_panel').classList.contains('no_display')) {
            if (e.target == panel.firstChild) {

                let org_event = e;

                [...document.querySelectorAll('.BoomiPlatformQuickComponent')].forEach(item => item.remove())

                let shapes_list = [...panel.closest('.component_editor_panel').querySelectorAll('.shape_palette_results .shape_palette_widget_container')].map(shape => `<option>${shape.querySelector('.gwt-Label').innerText}</option>`)

                let quickinput_html = `
                    <div class="BoomiPlatformQuickComponent" style="position:absolute;top:${e.clientY}px;left:${e.clientX}px;">
                        <form>
                            <input type="text" list="shapes_list" tabindex="-1" placeholder="Component name...">

                            <datalist id="shapes_list">
                                ${shapes_list}
                            </datalist>
                        </form>
                    </div>
                `

                document.querySelector('body').insertAdjacentHTML('beforeend', quickinput_html);

                setTimeout(() => {
                    document.querySelector('.BoomiPlatformQuickComponent input').focus()

                    document.querySelector('.BoomiPlatformQuickComponent input').addEventListener('change', function (e) {
                        document.querySelector('filter_search_input')
                    });

                    document.querySelector('.BoomiPlatformQuickComponent form').addEventListener('submit', function (e) {
                        e.preventDefault();

                        let first = [...panel.closest('.component_editor_panel').querySelectorAll('.shape_palette_results .shape_palette_widget_container')].find(shape => shape.querySelector('.gwt-Label').innerText.toLowerCase() == document.querySelector('.BoomiPlatformQuickComponent input').value.toLowerCase());

                        if (!first) return false;

                        var down = new MouseEvent('mousedown');

                        var up = new MouseEvent('mouseup', {
                            "clientX": org_event.clientX,
                            "clientY": org_event.clientY
                        });

                        first.dispatchEvent(down)
                        document.querySelector('body > div[tabindex="0"]').dispatchEvent(up);

                        setTimeout(() => {
                            [...document.querySelectorAll('.BoomiPlatformQuickComponent')].forEach(item => item.remove())
                        }, 0)
                    });
                }, 0)

            }
        }

    });

    panel.addEventListener('mouseup', function (e) {
        if (e.target != document.querySelector('.BoomiPlatformQuickComponent')) {
            [...document.querySelectorAll('.BoomiPlatformQuickComponent')].forEach(item => item.remove())
        }
    });

}

const add_endpoint_listener = (endpoint) => {

    if (BoomiPlatform.endpoint_flash == 'testing') {
        endpoint.classList.add('bph-endpoint-flash-testonly');
    } else if (BoomiPlatform.endpoint_flash != 'off') {
        endpoint.classList.add('bph-endpoint-flash');
    }

    let endpointmenu_html = `
    <div class="BoomiPlatformEndpointMenu" tabindex="0" style="z-index: 5;position: absolute;left: -130%;top: -230%; width: max-content;" aria-hidden="true">
        <div>
            <div class="hover-menu-hidden-hotspot">
                <div class="hover-menu">
                    <ul class="menu-options">
                        <li><div class="gwt-Label gwt-ClickableLabel bph-stop">Stop</div></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    `;

    endpoint.insertAdjacentHTML('beforeend', endpointmenu_html);

    endpoint.querySelector('.bph-stop').addEventListener('mousedown', function (e) {

        let first = [...endpoint.closest('.component_editor_panel').querySelectorAll('.shape_palette_results .shape_palette_widget_container')].find(shape => shape.querySelector('.gwt-Label').innerText.toLowerCase() == "stop");

        if (!first) return false;

        let rect = endpoint.getBoundingClientRect();

        var down = new MouseEvent('mousedown');
        var up = new MouseEvent('mouseup', {
            "clientX": rect.left + 15,
            "clientY": rect.top - 15
        });

        first.dispatchEvent(down)
        document.querySelector('body > div[tabindex="0"]').dispatchEvent(up);

        setTimeout(() => {
            endpoint.dispatchEvent(down)


            var up = new MouseEvent('mouseup', {
                "clientX": rect.left + 25,
                "clientY": rect.top + 5
            });
            document.querySelector('body > div[tabindex="0"]').dispatchEvent(up);


            setTimeout(() => {
                let sidepanel = [...document.querySelectorAll('.shape_side_panel .form_title_label')].find(el => el.innerText == "Stop Shape");
                sidepanel = sidepanel.closest('.shape_side_panel');

                document.querySelector('.glass_standard').style.display = 'none';
                sidepanel.closest('.anchor_side_panel').style.display = 'none';

                let okbutton = sidepanel.querySelector('button[data-locator="button-ok"]');
                okbutton.click();
            }, 0)

        }, 0)

    })

}

const add_shape_listener = (shape) => {
    if (BoomiPlatform.path_trace_highlight == 'off') return false;
    let rect = shape.getBoundingClientRect();
    if (rect.width != 34 && rect.height != 34) return false;

    let iconTitle = shape.querySelector('.gwt-Image:not([title])');
    let iconTitle2 = shape.querySelector('.gwt-Image[title="Note"]');
    if (iconTitle || iconTitle2) return false;

    let timer = null;

    setTimeout(() => {

        shape.addEventListener('mouseover', function (e) {

            timer = setTimeout(() => {
                [...document.querySelectorAll(`.gwt-connectors-line`)].forEach(line => {
                    line.classList.add('BoomiPlatform-linetrace')
                });

                var down = new MouseEvent('mousedown');

                var move = new MouseEvent('mousemove', {
                    "clientX": 5,
                    "clientY": 0
                });

                var up = new MouseEvent('mouseup', {
                    "clientX": 0,
                    "clientY": 0
                });

                shape.closest('.dragdrop-draggable').dispatchEvent(down);
                shape.closest('.dragdrop-draggable').dispatchEvent(move);
                document.querySelector('body > div[tabindex="0"]').dispatchEvent(up);

                setTimeout(() => {
                    [...document.querySelectorAll(`.gwt-connectors-line:not(.BoomiPlatform-linetrace)`)].forEach(line => {
                        line.parentNode.classList.add('BoomiPlatform-lineparent')

                        line.classList.add(BoomiPlatform.path_trace_highlight == 'solid' ? 'BoomiPlatform-linetrace-active-solid' : 'BoomiPlatform-linetrace-active-pulse')
                    })
                }, 0)
            }, 650)
        })

        shape.addEventListener('mouseout', function (e) {
            clearTimeout(timer);

            [...document.querySelectorAll(`.gwt-connectors-line`)].forEach(line => {
                line.classList.remove('BoomiPlatform-linetrace')
                line.parentNode.classList.remove('BoomiPlatform-lineparent')
                line.classList.remove('BoomiPlatform-linetrace-active')
                line.classList.remove('BoomiPlatform-linetrace-active-pulse')
            });
        })

        shape.addEventListener('mousedown', function (e) {
            clearTimeout(timer);

            [...document.querySelectorAll(`.gwt-connectors-line`)].forEach(line => {
                line.classList.remove('BoomiPlatform-linetrace')
                line.parentNode.classList.remove('BoomiPlatform-lineparent')
                line.classList.remove('BoomiPlatform-linetrace-active')
                line.classList.remove('BoomiPlatform-linetrace-active-pulse')
            });
        })

    }, 0)

}