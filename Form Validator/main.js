const container = document.querySelector('.container');
const inputField = document.querySelector('.input_field');
const name = document.querySelector('#name_field');
const email = document.querySelector('#email_field');
const pw = document.querySelector('#pw_field');
const confrimPw = document.querySelector('#confirmPw_field');
const noti = document.querySelector('.noti');


function init() {
    window.addEventListener('resize', resizeFunc);
}

function resizeFunc() {
    container.style.display = 'block';

    let containerLeft = (window.innerWidth - container.clientWidth) / 2;
    let containerTop = (window.innerHeight - container.clientWidth) / 2 - 50;

    container.style.marginLeft = containerLeft + 'px';
    container.style.marginTop = containerTop + 'px';
}

function submitForm() {
    checkUserName();
}

function checkUserName() {
    if (name.value === "") {
        inputField.classList.add('alert');
        inputField.classList.remove('correct');
        noti.style.display = 'block';

    } else {
        inputField.classList.remove('alert');
        inputField.classList.add('correct');
        noti.style.display = 'none';

    }
}

init();