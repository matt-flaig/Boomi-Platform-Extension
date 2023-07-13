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
    chrome.storage.sync.get(['Filter_api_service'], function (e) {
        APIServFilter = e.Filter_api_service
    })

    chrome.storage.sync.get(['apply_process_filters'], function (e) {
        if (e.apply_process_filters === 'on') {
 
            var matchingxref = document.evaluate("//label[contains(text(),'Cross Reference Table')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
            var matchingprocess = document.evaluate("//label[contains(text(),'Process')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
            var matchingproprop = document.evaluate("//label[contains(text(),'Process Property')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
            var matchingapiserv= document.evaluate("//label[contains(text(),'API Service')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;


            document.getElementById(matchingprocess.htmlFor).checked = processFilter
            document.getElementById(matchingproprop.htmlFor).checked = processPropFilter
            document.getElementById(matchingxref.htmlFor).checked = CrossFilter
            document.getElementById(matchingapiserv.htmlFor).checked = APIServFilter
        }
    })
})
