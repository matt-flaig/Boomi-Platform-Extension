const copy_component_id = (componentid) => {


    let currentbuildcompTabs = document.getElementsByClassName('gwt-TabLayoutPanelContent')



    let wait_for_build_component_load = setInterval(() => {

        for (var index = 0; index < currentbuildcompTabs.length; index++) {

            let navcomponent = currentbuildcompTabs[index].querySelector('[data-locator="button-create-packaged-component"]');
            var displayedCheck = currentbuildcompTabs[index].style.display


            if (navcomponent != null && displayedCheck != 'none') {
                clearInterval(wait_for_build_component_load);


                let componentidLink = `<button type="button" class="gwt-Button bph-component-id" data-locator="button-create-packaged-component">Copy Component ID</button>`
                navcomponent.insertAdjacentHTML('beforebegin', componentidLink);

                navcomponent.previousElementSibling.addEventListener('click', event => {
                    
                    var currentid = getUrlParameter("componentIdOnFocus");
                    mastfoot
                    $('#mastfoot').append('<input type="text" value="' + currentid + '" id="currentidval">')
                    var currentidval = document.getElementById("currentidval");
                    currentidval.select();
                    currentidval.setSelectionRange(0, 99999)
                    document.execCommand("copy");
                    $('#currentidval').remove()
                
                    alert('Component ID: ' + currentid + " has been copied to your clipboard")

                })


                break;
            }



        }



    }, 250)

};

