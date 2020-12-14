const greetingForm = document.querySelector(".js-form-greeting"),    // getElementByClass
    input = greetingForm.querySelector("input"),    // getElementByTagName
    greeting = document.querySelector(".js-greetings");

// USER_LS : user name의 'key'
const USER_LS = "currentUser";

// user name을 local stroage에 저장 (기억)
function saveName(text) {
    localStorage.setItem(USER_LS, text);
}

// 뭔가를 form에 submit하면 처리하는 함수
// event의 preventDefault를 막고 싶음 (새로고침 막기)
function handleSubmit(event) {
    event.preventDefault();
    // event가 발생하면 document까지 event가 올라감 (event bubbling)
    // 기본 동작: Enter을 누르면 프로그램 되어진대로 입력값이 다른 곳으로 가고 페이지가 새로고침됨
    // event.preventDefault(): 위와 같은 이벤트의 기본 동작을 막고 싶음
    // event.preventDefault(); 를 사용하면 Enter 키 눌러도 입력값이 input 안에 들어있음
    
    const currentValue = input.value;
    paintGreeting(currentValue);
    saveName(currentValue);
}

function askForName() {
    greetingForm.addEventListener("submit", handleSubmit);
}

function paintGreeting(text) {
    // form을 지우고 greeting을 보여주어 user가 보낸 text를 넣는 함수
    greetingForm.classList.add("off");    // js-form-greeting form(none)
    greeting.classList.remove("off");    // js-greetings greetings(none) showing(block)
    greeting.innerText = `Hello ${text}`;
}

function loadName() {   // not saving function, 저장 내용을 불러오는 함수!
    const currentUser = localStorage.getItem(USER_LS);
    if(currentUser === null) {  // local stroage에 user가 없을 때
        askForName();
    } else {    // local stroage에 user가 있을 때 -> 이름 색칠
        paintGreeting(currentUser);
    }
}

function init() {
    loadName();
}

init();