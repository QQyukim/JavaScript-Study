const wrap = document.querySelector('.wrap');
const container = document.querySelector('.container');
const startPage = document.querySelector(".start-page");
const quizPage = document.querySelector(".quiz-page");
const quizCtrl = document.querySelector(".quiz-ctrl");

const mainTitle = document.querySelector('.main-title');
const subTitle = document.querySelector('.sub-title');
const quizDescription = document.querySelector('.quiz-description');
const startBtnWrap = document.querySelector('.start-btn-wrap');
const startBtn = document.querySelector('.start-btn');

const question = document.querySelector('.question');
const answer = document.querySelector('.answer');
const submitBtn = document.querySelector('#submit');
const previousBtn = document.querySelector('#previous');
const nextBtn = document.querySelector('#next');

let currentSlide = 0;

function init() {
    startPage.style.display = "block";
    window.addEventListener('resize', resize);
}

function resize() {
    let windowWidth = window.innerWidth;
    container.style.display = "block";

    if (windowWidth < 768) {  // mobile
        container.style.width = (600 * windowWidth) / 768 + "px";
    } else if (windowWidth >= 768 && windowWidth < 1024) {  // tablet
        container.style.width = (600 * windowWidth) / 768 + "px";
    } else if (windowWidth >= 1024) { // pc
        container.style.width = (600 * 1024) / 768 + "px";
    }
}

function clickStartBtn() {
    startPage.style.display = "none";
    quizPage.style.display = "block";
    quizCtrl.style.display = "block";
    
    buildQuiz();
    showSlide(currentSlide);
}

function buildQuiz() {
    let output = [];   //퀴즈 문제와 선택지 저장된 배열

    quizData.forEach(  //quizData배열값 불러오기
        (currentQuestion, questionNum) => {
            const answers = []; //퀴즈 선택지 배열

            for(item in currentQuestion.answers){   // item = key
                //퀴즈 선택지 DOM구조 생성
                answers.push(`<label>
                                <input class="eachAnswer" type="radio" name="question${questionNum}" value="${item}">
                                ${currentQuestion.answers[item]}
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

    if (currentSlide === 0) {
        previousBtn.style.display = 'none';
    } else {
        previousBtn.style.display = 'inline-block';
    }

    if (currentSlide === slides.length - 1) {
        nextBtn.style.display = 'none';
        submitBtn.style.display = 'inline-block';
    } else {
        nextBtn.style.display = 'inline-block';
        submitBtn.style.display = 'none';
    }
}

function showNextSlide() {
    showSlide(currentSlide + 1);
}

function showPreviousSlide(){
    showSlide(currentSlide - 1);
}

// function showResult() {
//     //'answer'이름의 클래스를 배열로 저장하기
//     const answerDisplays = quizDisplay.querySelectorAll('.answer');
//     let numCorrect = 0; //퀴즈 정답률 기록

//     //답안 검증하기
//     quizData.forEach(
//         (currentQuestion, questionNum) => {
//             const answerDisplay = answerDisplays[questionNum]; //answerDisplays배열을 index별로 불러오기
//             const selector = `input[name=question${questionNum}]:checked`; //input태그의 속성값 지정하기
//             const userAnswer = (answerDisplay.querySelector(selector) || {}).value; //input check값 저장

//             if(userAnswer === currentQuestion.correct){  //user가 선택한 값과 정답 검증
//                 numCorrect += 1;
//             }
//         }
//     );

//     previousBtn.style.display = 'none';
//     submitBtn.style.display = 'none';
    
//     //resultDisplay DOM에 결과값 삽입하기
//     // resultDisplay.innerHTML = `${numCorrect} out of ${quizData.length}`;
// }

init();
previousBtn.addEventListener('click', showPreviousSlide);
nextBtn.addEventListener('click', showNextSlide);
// submitBtn.addEventListener('click',showResult);