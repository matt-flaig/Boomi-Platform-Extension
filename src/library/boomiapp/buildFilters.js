document.arrive('.filter_popup', function (filteredScreen) {
    //debugger
    var processFilter
    var processPropFilter
    var CrossFilter

    chrome.storage.sync.get(['Filter_process'], function (e) {
        processFilter = e.Filter_process
    })
    chrome.storage.sync.get(['Filter_processProp'], function (e) {
        processPropFilter = e.Filter_processProp
    })
    chrome.storage.sync.get(['Filter_crossref'], function (e) {
        CrossFilter = e.Filter_crossref
    })

    chrome.storage.sync.get(['apply_process_filters'], function (e) {
        if (e.apply_process_filters === 'on') {
            document.getElementById('gwt-uid-389').checked = processFilter
            document.getElementById('gwt-uid-391').checked = processPropFilter
            document.getElementById('gwt-uid-381').checked = CrossFilter
        }
    })
})
