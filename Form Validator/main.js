const container = document.querySelector('.container');
// const inputField = document.querySelector('.input_field');
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
    checkAnswers(name);
    checkAnswers(email);
    checkAnswers(pw);
    checkAnswers(confrimPw);
}

function checkAnswers(input) {
    const userInfo = input.parentNode;
    const noti = userInfo.querySelector('.noti');

    if (input.value === "") {
        input.classList.add('alert');
        input.classList.remove('correct');
        noti.style.display = 'block';

    } else {
        input.classList.remove('alert');
        input.classList.add('correct');
        noti.style.display = 'none';
    }
}

init();