const container = document.querySelector('.container');
const name = document.querySelector('#name_field');
const email = document.querySelector('#email_field');
const pw = document.querySelector('#pw_field');
const confirmPw = document.querySelector('#confirmPw_field');
const noti = document.querySelector('.noti');
const button = document.querySelector('.button');

const regName = /^[가-힣]{2,4}|[a-zA-Z]{2,10}$/;
const regEmail = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
const regPw = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/;

function init() {
    window.addEventListener('resize', resize);
}

function resize() {
    container.style.display = 'block';

    let containerLeft = (window.innerWidth - container.clientWidth) / 2;
    let containerTop = (window.innerHeight - container.clientHeight) / 2;

    container.style.marginLeft = containerLeft + 'px';

    if (window.innerHeight > 600) {
        container.style.marginTop = containerTop + 'px';
    } else {
        container.style.marginTop = 50;
    }
}

function seePwThroughEyeIcon(icon) {
    const input_field = icon.nextElementSibling;

    if (icon.classList[1] == 'visible') {
        icon.src = 'img/visibility.png';
        icon.alt = 'visibility';
        input_field.type = 'password';
    } else {
        icon.src = 'img/invisible.png';
        icon.alt = 'invisible';
        input_field.type = 'text';
    }
    icon.classList.toggle('visible');
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

    if (input == confirmPw) {   // 비밀번호 확인할 때만 도는 조건문
        if (pw.value == confirmPw.value) {
            if (pw.value == "") {
                input.classList.add('alert');
                input.classList.remove('correct');
                noti.textContent = "비밀번호를 먼저 입력해주세요."
                noti.style.display = 'block';
            } else{
                input.classList.remove('alert');
                input.classList.add('correct');
                noti.style.display = 'none';
            }
        } else {
            input.classList.add('alert');
            input.classList.remove('correct');
            noti.textContent = "비밀번호를 다시 확인해주세요."
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