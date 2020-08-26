$(document).ready(function () {
    /*Start of Sheet*/
    //This is the core sheet that is to be used to call functions required for this extension; listeners, functions etc are on others

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
});
