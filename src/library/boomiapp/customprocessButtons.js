function runsavetest(){
    var xsavetest = document.querySelectorAll('[data-locator="button-save"]')
    $(xsavetest).each(function () {
    
        if ($(this).is(':visible')) {
    
            $(this).click();
            var xstesttest = document.querySelectorAll('[data-locator="button-test"]')
            $(xstesttest).each(function () {
            
                if ($(this).is(':visible')) {
            
                    $(this).click();
                }
                retrun
            });
         
        }
    });


    

   
} 



document.arrive("[data-locator='button-create-packaged-component']", function (createPackageButton) {

    //let actionLable = document.getElementsByClassName("label-wrap");
 
   var addtestsaveButton = '<button type="button" id="btn-savetest" class="gwt-Button qm-button--primary-savetest" data-locator="button-test">Save & Test</button>'
   createPackageButton.nextSibling.insertAdjacentHTML('afterend', addtestsaveButton);


   document.getElementById("btn-savetest").addEventListener("click", runsavetest);



    
    });







