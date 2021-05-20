const add_sidepanel_listener = (sidepanel) => {

    let textRow = [...sidepanel.querySelectorAll('.form_row.text_area_row')].find(el => el.querySelector('.form_label').innerText == 'Message');
    if (textRow) {
        let textArea = textRow.querySelector('.gwt-TextArea');
        let container = textArea.parentNode;

        let toggle_editor = `
        <label style="display:block;">
            <input type="checkbox" onchange="toggleEditor(this)">
            Toggle JSON Editor <br> (<b>Note:</b> Will add auto escape curly bracket notation)
        </label>
        `;
        container.insertAdjacentHTML('beforeend', toggle_editor);
    }
}

const renderEditor = (target) => {
    let container = target.parentNode.parentNode;
    let textArea = container.querySelector('.gwt-TextArea');

    let editor_html = `
    <div class="bph-json-editor" style="height:${textArea.offsetHeight}px;width:${textArea.offsetWidth}px;border: 1px solid #999;border-radius: 2px;position:relative;box-sizing: border-box;margin-bottom:4px;"></div>
    `;
    container.insertAdjacentHTML('afterbegin', editor_html);

    textArea.classList.add('no_display');
    setTimeout(() => {
        let editor = container.querySelector('.bph-json-editor');

        let codeArea = new CodeFlask(editor, {
            language: 'js',
            lineNumbers: false
        })

        let code = String.raw `${textArea.value.trim().replace(/^\'/,'').replace(/\'$/,'').replace(/\'(\{\d+\})\'/g,"$1")}`
        codeArea.updateCode(code)

        codeArea.onUpdate(e => {
            textArea.value = "'" + e.replace(/(\{\d+\})/g, "'$1'") + "'";
        })
    }, 100)
}

const toggleEditor = (target) => {
    if (target.checked) renderEditor(target);
    else {
        target.parentNode.parentNode.querySelector('.bph-json-editor').remove();
        target.parentNode.parentNode.querySelector('.gwt-TextArea').classList.remove('no_display');
    }
}