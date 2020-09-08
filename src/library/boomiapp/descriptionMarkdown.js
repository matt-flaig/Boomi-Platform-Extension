const add_description_listener = (description) => {

    if(BoomiPlatform.description_markdown == 'off') return false;

    const converter = new showdown.Converter(),
    renderMD = () => {
        const text_value = description.querySelector('textarea').value;
        var html = null;
        if(!description.querySelector('.bph-md')) html = `<p class="bph-md">${converter.makeHtml(text_value)}</p>`;
        else html = text_value;
        description.querySelector('p').innerHTML = html;
    }

    let observer = new MutationObserver(event => {
        if(!description.querySelector('p').classList.contains('no_display') && !description.classList.contains('no_display')){
            renderMD();
            description.closest('.component_header').querySelector('.links .bph-markdown-toggle').classList.remove('no_display')
        }else{
            description.closest('.component_header').querySelector('.links .bph-markdown-toggle').classList.add('no_display')
        }
    })
      
    let observer_config = {
        attributes: true, 
        attributeFilter: ['class'],
        childList: false, 
        characterData: false
    }

    observer.observe(description.querySelector('p'), observer_config);
    observer.observe(description, observer_config);

    if(BoomiPlatform.description_markdown == 'on' || !BoomiPlatform.description_markdown){
        description.classList.add('render-markdown');
    }

    let toggle_html = `
    <a class="fonticon_anchor icon-eye bph-markdown-toggle" onclick="toggleMarkdown(this)">Toggle Markdown</a>
    `;
    description.closest('.component_header').querySelector('.links').insertAdjacentHTML('beforeend', toggle_html);

}

const toggleMarkdown = (target) => {
    target.closest('.component_header').querySelector('.description_panel').classList.toggle('render-markdown');
    target.closest('.component_header').querySelector('.description_panel > p').classList.toggle('render-markdown');
}