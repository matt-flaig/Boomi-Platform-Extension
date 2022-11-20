const langs = {
    plain_text: { mode: "default", display: "Plain Text" },
    json: { mode: { name: "javascript", json: true }, display: "JSON" },
    xml: { mode: "xml", display: "XML" },
    html: { mode: { name: "xml", html: true }, display: "HTML" },
};

const add_sidepanel_message_listener = (sidepanel) => {
    let textRow = $(`.gwt-TextArea.validatable[data-locator="formrow-message"]`)[0]
    var bpeButtonId = `#bpe-message-editor-button-${textRow.id}`
    $(textRow).parent().append(`<button type="button" class="gwt-Button qm-button--primary-action" id="bpe-message-editor-button-${textRow.id}" textareaid="${textRow.id}"style="display: block">Edit Message</button>`)

    $(bpeButtonId).click(function (e) {
        let textAreaId = `#${e.target.getAttribute('textareaid')}`;
        let left = Math.abs(window.innerWidth / 2) - 600
        let top = Math.abs(window.innerHeight / 2) - 440

        let lang_html = ''
        for (const [k, v] of Object.entries(langs)) {
            lang_html += `<option value="${k}">${v.display}</option>`
        }

        let html = `<div class="popup_on_popup" id="popup_on_popup" style="position: absolute; left: 0px; top: 0px; visibility: visible; display: block; width: 100%; height: 100%;"></div>
        <div class="center_panel" id="popup_on_popup_content" role="dialog" aria-modal="true" style="left: ${left}px; top: ${top}px; visibility: visible; position: absolute; overflow: visible;">
             <div class="popupContent">
                 <div class="modal modal_top"> 
                     <div class="modal_contents">
                         <div class="flex_panel" style="width: 1200px; height: 800px;">
                             <div class="form_header inline_script_editor_header" style="flex:0 0 auto;">
                                 <div class="form_title no_required">
                                     <div class="form_title_top">
                                         <h2 class="form_title_label">Edit Message</h2>
                                     </div>
                                     <dl class="property_list no_display"></dl>
                                     <p class="form_summary no_display"></p>
                                 </div>
                             </div>
                             <div class="inline_script_editor_settings_row" style="flex:0 0 auto;">
                                 <div class="inline_script_editor_language_list">
                                     <div class="form_row">
                                         <div class="form_label">
                                             <label for="bpe-message-editor-language">Language
                                                 <span class="form_label_required">*</span>
                                             </label> 
                                             <span class="form_label_required_text">(required)</span>
                                         </div>
                                         <div class="validation_panel">
                                             <div class="container">
                                                 <select class="gwt-ListBox validatable" id="bpe-message-editor-language">
                                                     ${lang_html}
                                                 </select>
                                             </div>
                                         </div>
                                     </div>
                                 </div>
                             </div>
                             <div style="flex:1 1 0%;">
                                 <div style="height: 100%; position: absolute; width: 100%;">
                                     <div class="collapsible_base_panel" style="position: relative;">
                                         <div aria-hidden="true" style="position: absolute; z-index: -32767; top: -20ex; width: 10em; height: 10ex; visibility: hidden;">&nbsp;</div>
                                         <div style="position: absolute; inset: 0px;">
                                             <div id="bpe-message-editor" style="position: absolute; inset: 0px;">
                                                 <!-- MESSAGE EDITOR GOES HERE -->
                                             </div>
                                         </div>
                                     </div>
                                 </div>
                             </div>
                         </div>
                     </div>
                     <div class="button_set left">
                         <button type="button" class="gwt-Button qm-button--primary-action" id="bpe-message-editor-ok" parent-id="${this.id}" >OK</button>
                         <button type="button" class="gwt-Button" id="bpe-message-editor-cancel">Cancel</button>
                     </div>
                 </div>
             </div>
         </div>`
        $('body').append(html);


        var code = $(textAreaId)[0].value.replace(/^'*/, '').replace(/'*$/, '').replace(/'({\d+})'/, '$1')

        editor = CodeMirror($('#bpe-message-editor')[0], {
            value: code,
            mode: "default",
            lineNumbers: true
        });

        switch (code.charAt(0)) {
            case "{":
                editor.setOption('mode', langs['json'].mode)
                $('#bpe-message-editor-language')[0].value = 'json'
                break;
            case "[":
                editor.setOption('mode', langs['json'].mode)
                $('#bpe-message-editor-language')[0].value = 'json'
                break;
            case "<":
                if (code.includes('<html>')) {
                    editor.setOption('mode', langs['html'].mode)
                    $('#bpe-message-editor-language')[0].value = 'html'
                    break;
                }
                editor.setOption('mode', langs['xml'].mode)
                $('#bpe-message-editor-language')[0].value = 'xml'
                break;
        }

        var theme = $('html').hasClass('qm-u-theme-dark') ? 'twilight' : 'default';
        editor.setOption('theme', theme);


        // Ok
        $('#bpe-message-editor-ok').click(function () {
            let lang = $('#bpe-message-editor-language')[0].value;
            let code = editor.getValue();

            switch (lang) {
                case "json":
                    if (code?.trim()) code = code.trim().replace(/^'*/, '\'').replace(/'*$/, '\'').replace(/'*({\d+})'*/g, "'$1'");
                    break;
                case "xml":
                    if (code?.trim()) code = code.trim().replace(/'*({\d+})'*/g, "'$1'");
            }
            $(textAreaId)[0].value = code;
            $('#popup_on_popup_content, #popup_on_popup').remove();
        });

        // Cancel
        $('#bpe-message-editor-cancel').click(function () {
            $('#popup_on_popup_content, #popup_on_popup').remove();
        });

        // Change
        $('#bpe-message-editor-language').change(function (e) {
            editor.setOption('mode', langs[e.target.value].mode);
        });

    });
}