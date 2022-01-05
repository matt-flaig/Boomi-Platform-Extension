$(document).ready(function () {

    shortcut.add("Alt+Ctrl+S", function () {

        var x = document.querySelectorAll('[data-locator="button-save"]')
        $(x).each(function () {

            var kk = $(this).is(':visible')

            if ($(this).is(':visible')) {

                $(this).click();
            }
        });
    });


    shortcut.add("Alt+Ctrl+T", function () {

        var x = document.querySelectorAll('[data-locator="button-test"]')
        $(x).each(function () {

            var kk = $(this).is(':visible')

            if ($(this).is(':visible')) {

                $(this).click();
            }
        });
    });


    //////////
});