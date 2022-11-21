const add_sql_sidepanel_list= (sqlsidepanel) => {

    let textRow = [...sqlsidepanel.querySelectorAll('.form_row.text_area_row')].find(el => el.querySelector('.form_label').innerText == 'SQL');
    if (textRow) {
        let textArea = textRow.querySelector('.gwt-TextArea');
        let container = textArea.parentNode;

        let toggle_sql_editor = `
        <label style="display:block;">
            <input type="checkbox" onchange="toggleSQLEditor(this)">
            Toggle SQL Editor
        </label>
        `;
        container.insertAdjacentHTML('beforeend', toggle_sql_editor);
    }
}

const renderSQLEditor = (target) => {
    let container = target.parentNode.parentNode;
    let textArea = container.querySelector('.gwt-TextArea');

    let editor_html = `
    <div class="bph-sql-editor" style="height:${textArea.offsetHeight}px;width:${textArea.offsetWidth}px;border: 1px solid #999;border-radius: 2px;position:relative;box-sizing: border-box;margin-bottom:4px;"></div>
    `;
    container.insertAdjacentHTML('afterbegin', editor_html);

    textArea.classList.add('no_display');
    setTimeout(() => {
        let editor = container.querySelector('.bph-sql-editor');

        let sqlCodeArea = new CodeFlask(editor, {
            language: 'js' //Note that loading prisim in and loading SQL actually breaks this so even though it is JS it displays as SQL Syntax!!!

        })


   

        let sqlcode = String.raw `${textArea.value}`
        sqlCodeArea.updateCode(sqlcode)

        sqlCodeArea.onUpdate(e => {

                textArea.value = e
     
            
        })
    }, 100)
}

const toggleSQLEditor = (target) => {
    if (target.checked) renderSQLEditor(target);
    else {
        target.parentNode.parentNode.querySelector('.bph-sql-editor').remove();
        target.parentNode.parentNode.querySelector('.gwt-TextArea').classList.remove('no_display');
    }
}