const add_notecontent_listener = (element) => {
    const converter = new showdown.Converter({literalMidWordUnderscores: true}),
        renderMD = () => {
            const text_value = element.innerText.replace(/\n{0,2}---\n\#BoomiPlatform: \[\"(\d*px)\"\,\"(\d*px)\"\,\"([a-z]*)\"\]/g, '\n\n*BoomiPlatform: ["$1","$2","$3"]*');
            element.innerHTML = `<p class="bph-md">${converter.makeHtml(text_value)}</p>`;

            let BTdef = [...element.querySelectorAll('em')].find(el => el.innerText.includes('BoomiPlatform:'));
            if (BTdef) BTdef.style.opacity = '0.5';
        }

    let observer = new MutationObserver(event => {
        if (!element.querySelector('.bph-md')) renderMD();
    })

    let observer_config = {
        childList: true,
        attributes: false,
        characterData: false
    }

    observer.observe(element, observer_config);
    renderMD();
}
