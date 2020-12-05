const startPage = document.querySelector(".start-page");
const authorBox = document.querySelector('.author-box');
const quizPage = document.querySelector(".quiz-page");
const quizCtrl = document.querySelector(".quiz-ctrl");
const resultPage = document.querySelector(".result-page");

const mainTitle = document.querySelector('.main-title');
const subTitle = document.querySelector('.sub-title');
const quizDescription = document.querySelector('.quiz-description');
const startBtnWrap = document.querySelector('.start-btn-wrap');
const startBtn = document.querySelector('.start-btn');

const question = document.querySelector('.question');
const answer = document.querySelector('.answer');
const submitBtn = document.querySelector('#submit-btn');
const nextBtn = document.querySelector('#next-btn');

let currentSlide = 0;

function init() {
    startPage.style.display = "block";
    window.addEventListener('resize', resize);
}

function resize() {
    const container = document.querySelector('.container');
    let windowWidth = window.innerWidth;

    container.style.display = "block";
    authorBox.style.display = "flex";

    if (windowWidth < 768) { // mobile
        container.style.width = (600 * windowWidth) / 768 + "px";
        authorBox.style.width = (600 * windowWidth) / 768 + "px";
    } else if (windowWidth >= 768 && windowWidth < 1024) { // tablet
        container.style.width = (600 * windowWidth) / 768 + "px";
        authorBox.style.width = (600 * windowWidth) / 768 + "px";
    } else if (windowWidth >= 1024) { // pc
        container.style.width = (600 * 1024) / 768 + "px";
        authorBox.style.width = (600 * 1024) / 768 + "px";
    }
}

function clickStartBtn() {
    startPage.style.display = "none";
    authorBox.style.display = "none";
    quizPage.style.display = "block";
    quizCtrl.style.display = "block";

    buildQuiz();
    showSlide(currentSlide);
}

function buildQuiz() {
    let output = []; //퀴즈 문제와 선택지 저장된 배열

    quizData.forEach( //quizData배열값 불러오기
        (currentQuestion, questionNum) => {
            const answers = []; //퀴즈 선택지 배열

            for (item in currentQuestion.answers) { // item = key
                //퀴즈 선택지 DOM구조 생성
                answers.push(`<label>
                                    <input class="inputAnswer" type="radio" onclick="setCheckedBtn(this);" name="question${questionNum}" value="${item}">
                                    <div class="eachAnswer">            
                                        ${currentQuestion.answers[item]}
                                    </div>
                                </label>`);

            }

            //output배열에 퀴즈와 선택지 DOM 추가하기
            output.push(`<div class="slide">
                                <div class="question">${questionNum + 1}. ${currentQuestion.question}</div>
                                <div class="answer">${answers.join('<br>')}</div>
                            </div>`);
        }
    );
    quizPage.innerHTML += output.join(' '); //join메서드, 퀴즈 사이에 공백 넣기
}

function showSlide(n) {
    const slides = document.querySelectorAll('.slide');

    slides[currentSlide].classList.remove('on');
    slides[n].classList.add('on');
    currentSlide = n;

    if (currentSlide === slides.length - 1) {
        nextBtn.style.display = 'none';
        submitBtn.style.display = 'inline-block';
    } else {
        nextBtn.style.display = 'inline-block';
        submitBtn.style.display = 'none';
    }
}

function setCheckedBtn(ele) {
    ele.setAttribute("checked", "checked");
}

function controlBtn(slideNumber, btnType) {
    const progressStatus = document.querySelector(".progress-status");
    const questionNumber = document.getElementsByName("question" + slideNumber.toString());
    let checkCount = 0;
    
    for (let i = 0; i < questionNumber.length; i++) {
        if ((nextBtn.style.display === "inline-block" || submitBtn.style.display === "inline-block") && questionNumber[i].getAttribute("checked")) {
            checkCount += 1;
        }
    }
    
    if (checkCount === 0) {
        alert("답안지를 체크해주십시오.");
    } else {
        if (btnType === "next") {
            showSlide(currentSlide + 1);
            progressStatus.style.width = (10 * (currentSlide + 1)) + "%";
        } else if (btnType === "submit") {
            makeResultPage();
            authorBox.style.display = "flex";
        }
    }
}

function showAnswerByColor(slideNumber) {
    const answerDisplay = quizPage.querySelectorAll('.answer')[slideNumber];
    
    const userSelector = `input[name=question${slideNumber}]:checked`;
    const userAnswerBox = answerDisplay.querySelector(userSelector).nextElementSibling;
    const userAnswer = answerDisplay.querySelector(userSelector).value;
    
    const correctAnswer = quizData[slideNumber].correct;
    const correctSelector = `input[value=${correctAnswer}]`;
    const correnctAnswerBox = answerDisplay.querySelector(correctSelector).nextElementSibling;
    
    if (userAnswer === correctAnswer) { //user가 선택한 값과 정답 검증
        userAnswerBox.style.backgroundColor  = "#bef3ff";
        userAnswerBox.innerText += " ✅";
    } else {
        userAnswerBox.style.backgroundColor  = "#ffd7d7";
        userAnswerBox.innerText += " ❌";
        correnctAnswerBox.style.backgroundColor = "#bef3ff";
        correnctAnswerBox.innerText += " ✅";
    }
}

function turnOverSlide(type) {
    showAnswerByColor(currentSlide);
    setTimeout(function() {
        const btnType = type; 
        controlBtn(currentSlide, btnType);
    }, 1000);
}

function makeResultPage() {
    quizPage.style.display = "none";
    quizCtrl.style.display = "none";
    submitBtn.style.display = 'none';
    resultPage.style.display = "block";
    
    calculateScore();
}

function calculateScore(){
    //'answer'이름의 클래스를 배열로 저장하기
    const answerDisplays = quizPage.querySelectorAll('.answer');
    const score = document.querySelector(".score");
    let numCorrect = 0;

    //답안 검증하기
    quizData.forEach(
        (currentQuestion, questionNum) => {
            const answerDisplay = answerDisplays[questionNum]; //answerDisplays배열을 index별로 불러오기
            const selector = `input[name=question${questionNum}]:checked`; //input태그의 속성값 지정하기
            const userAnswer = answerDisplay.querySelector(selector).value; //input check값 저장
            const correctAnswer = currentQuestion.correct;

            if (userAnswer === correctAnswer) { //user가 선택한 값과 정답 검증
                numCorrect += 1;
            }
        }
    );

    let scoreNum = Math.floor((numCorrect / quizData.length) * 100);

    //resultDisplay DOM에 결과값 삽입하기
    score.innerHTML += `<div class="scoreNum">${scoreNum}점</div>`;
    makeResultDescription(numCorrect);
}

function makeResultDescription(numCorrect) {
    const resultDescription = document.querySelector(".result-description");
    const resultImage = document.querySelector(".result-image");

    if (numCorrect <= 3) {
        resultDescription.innerHTML += `<p>이번 주말에 보라매공원 나들이를<br>
                                        한 번 가보는 건 어떨까요?</p>`;
        resultImage.innerHTML += `<img src="images/result-low.png" width="100%">`
    } else if (numCorrect > 3 && numCorrect <= 7) {
        resultDescription.innerHTML += `<p>보라매공원을 구석구석 탐방해봐요!</p>`
        resultImage.innerHTML += `<img src="images/result-middle.png" width="100%">`
    } else if (numCorrect > 7 && numCorrect <= 10) {
        resultDescription.innerHTML += `<p>당신은 보라매공원 토박이!</p>`
        resultImage.innerHTML += `<img src="images/result-high.png" width="100%">`
    }
}

init();

nextBtn.addEventListener('click', function() { turnOverSlide("next"); });
submitBtn.addEventListener('click', function() { turnOverSlide("submit"); });