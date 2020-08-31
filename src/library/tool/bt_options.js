const save_options = () => {

    const options = Object.assign({},...[...document.querySelectorAll('.option')].map(option => ({[option.name]:option.type=='checkbox'?option.checked:option.value})));
    chrome.storage.sync.set(options, () => {
        let status = document.getElementById('status');
        status.textContent = 'Options saved!';
        setTimeout(()=>{status.textContent = ''}, 750);
    });
}

const restore_options = () => {

    const options = Object.assign({},...[...document.querySelectorAll('.option')].map(option => ({[option.name]:null})));

    chrome.storage.sync.get(options, (items) => Object.entries(items).forEach(([key,value]) => {
        if(!value) return false;
        let elements = [...document.getElementsByName(key)];
        if(elements.length == 1){
            if(value === true || value === false) elements[0].checked = value === true;
            else elements[0].value = value;
        }
    }));
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);

if(window.screenX != 0 && window.screenY != 0){
    document.getElementById('header').style.display = 'block';
}