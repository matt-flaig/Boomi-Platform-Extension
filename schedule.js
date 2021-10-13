const add_scheduleDeploy_listener = (scheduleDeploy) => {

    let scheduleHtml = `
    <p><br> <b>REMINDER:</b> Dont forget to set up a schedule in the runtime if its required for your deployed service
    </p>
    `

    let currentforms = document.getElementsByClassName('form_title_label')
 

    for (var index = 0; index < currentforms.length; index++) {

        if (currentforms[index].innerText == 'Deployment Successful'){
            
            var messageArea = document.getElementsByClassName('qm-c-alert__text')
            for (var index = 0; index < messageArea.length; index++) {
             
             if(messageArea[index].innerHTML != '') {  
            messageArea[index].insertAdjacentHTML('beforeend', scheduleHtml);
            break;  
        }  
        }
        break;   
        }

    }

 
  
  }




