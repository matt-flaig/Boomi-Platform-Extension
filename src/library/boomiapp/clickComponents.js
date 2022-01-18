$(document).ready(function () {
    /*Start of Sheet*/
    //This is the core sheet that is to be used to call functions required for this extension; listeners, functions etc are on others

    //Show \ Hide Header button clicked, enable or disable the header dependent on flow
    $(document).on("click", "#showHeaderbtn", function () {
        var x = document.getElementsByClassName("qm-c-masthead");

        if (headerVisible == false) {
            x[0].classList.add("headerShow");
            $("#showHeaderspan").text("Hide Header");
            headerVisible = true;
        } else {
            x[0].classList.remove("headerShow");
            $("#showHeaderspan").text("Show Header");
            headerVisible = false;
        }
    });

    $(document).on("click", "#gwt-uid-84", function () {

        dashboardDays();

    });

    $(document).on("click", ".build_actionsButton", function () {

        var ul = document.getElementsByClassName('menu_item_group')[0]
        $(ul).append('<li id="copyCompId"><a>Copy Current Component ID</a></li>');

    });


    $(document).on("click", "#copyCompId", function () {

        var currentid = getUrlParameter("componentIdOnFocus");
        mastfoot
        $('#mastfoot').append('<input type="text" value="' + currentid + '" id="currentidval">')
        var currentidval = document.getElementById("currentidval");
        currentidval.select();
        currentidval.setSelectionRange(0, 99999)
        document.execCommand("copy");
        $('#currentidval').remove()

        //alert('Component ID: ' + currentid + " has been copied to your clipboard")
        componentCopyalert(currentid)
        return false

    });
    

    $(document).on("click", "#closeUpdate", function () {
        $('.BoomiUpdateOverlay').remove();
    });






//////////
});
