const container = document.querySelector('.container');
// const inputField = document.querySelector('.input_field');
const name = document.querySelector('#name_field');
const email = document.querySelector('#email_field');
const pw = document.querySelector('#pw_field');
const confirmPw = document.querySelector('#confirmPw_field');
const noti = document.querySelector('.noti');
const button = document.querySelector('button');

const regName = /^[가-힣]{2,4}|[a-zA-Z]{2,10}$/;
const regEmail = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
const regPw = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/;

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
    checkAnswers(name, regName);
    checkAnswers(email, regEmail);
    checkAnswers(pw, regPw);
    checkAnswers(confirmPw);
}

function checkAnswers(input, reg) {
    const userInfo = input.parentNode;
    const noti = userInfo.querySelector('.noti');

    if (input == confirmPw) {
        if (pw.value == confirmPw.value) {
            input.classList.remove('alert');
            input.classList.add('correct');
            noti.style.display = 'none';
        } else {
            input.classList.add('alert');
            input.classList.remove('correct');
            noti.style.display = 'block';
        }
    } else {
        if (reg.test(input.value)) {
            input.classList.remove('alert');
            input.classList.add('correct');
            noti.style.display = 'none';            
        } else {
            input.classList.add('alert');
            input.classList.remove('correct');
            noti.style.display = 'block';
        }
    }
}

function pressEnter() {
    if (window.event.keyCode == 13) {
        submitForm();
    }
}

init();