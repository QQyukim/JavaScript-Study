const container = document.querySelector('.container');
const quizDisplay = document.querySelector('.quiz');
const submitBtn = document.querySelector('.submit');
const resultDisplay = document.querySelector('.result');
const quizData = [
    {
        question : "보라매공원의 '보라매'는 무엇을 상징할까요?",
        answers : {
            a : "한국매보호협회",
            b : "보랏빛 깃털을 가진 매",
            c : "관악구의 웅장한 기개",
            d : "공군사관학교"
        },
        correct : "d"
    },
    {
        question : "에어파크에 전시되어 있지 않은 비행기 종류는?",
        answers : {
            a : "수송기",
            b : "여객기",
            c : "전투기",
            d : "헬기"
        },
        correct : 'b'
    },
    {
        question : "음악분수를 감상할 수 없는 달은?",
        answers : {
            a : '5월',
            b : '8월',
            c : '10월',
            d : '사시사철 감상 가능',
        },
        correct : 'c'
    }
]

function init() {
    window.addEventListener('resize', resize);
    buildQuiz();
}

function resize() {
    container.style.display = 'block';

    let containerLeft = (window.innerWidth - container.clientWidth) / 2;
    let containerTop = (window.innerHeight - container.clientHeight) / 2;

    if (window.innerWidth > 750) {
        container.style.marginLeft = containerLeft + 'px';
    } else {
        container.style.marginLeft = 0;
    }

    if (window.innerHeight > 605) {
        container.style.marginTop = containerTop + 'px';
    } else {
        container.style.marginTop = 0;
    }

}

function buildQuiz() {
    const output = []; //퀴즈 문제와 선택지가 저장된 배열

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
                output.push(`<div class="question">${questionNum + 1}. ${currentQuestion.question}</div>
                            <div class="answer">${answers.join('<br>')}</div>`);
            }
        );
        quizDisplay.innerHTML = output.join(' '); //join메서드, 퀴즈 사이에 공백 넣기
        // quizDisplay.innerHTML = output; // ,(comma) 생성됨
}

function showResult() {
    //'answer'이름의 클래스를 배열로 저장하기
    const answerDisplays = quizDisplay.querySelectorAll('.answer');
    let numCorrect = 0; //퀴즈 정답률 기록
    
    //답안 검증하기
    quizData.forEach(
        (currentQuestion, questionNum) => {
            const answerDisplay = answerDisplays[questionNum]; //answerDisplays배열을 index별로 불러오기
            const selector = `input[name=question${questionNum}]:checked`; //input태그의 속성값 지정하기
            const userAnswer = (answerDisplay.querySelector(selector) || {}).value; //input check값 저장

            if(userAnswer === currentQuestion.correct){  //user가 선택한 값과 정답 검증
                    numCorrect += 1;
                    // answerDisplays[questionNum].style.color = 'lightgreen';
            }else{
                    // answerDisplays[questionNum].style.color = 'red';
            }
        }
    );
    //resultDisplay DOM에 결과값 삽입하기
    resultDisplay.innerHTML = `${numCorrect} out of ${quizData.length}`;
}

init();
submitBtn.addEventListener('click',showResult);