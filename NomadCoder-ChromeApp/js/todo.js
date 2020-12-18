const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

// toDos: to-do-list의 'key' 이름
const TODOS_LS = "toDos";
let toDos = [];
// to-do-list 관리: array 형식 [{ text: 'abc', id: 1 }, { ... }]
//toDos가 const이면 값이 바뀌지 않음 -> let 처리

function deleteToDo(event) {
    // console.dir(event.target);  // parent node 찾기
    // console.log(event.target.parentNode);
    // 이후 delete child element mdn 구글 검색
    let elem = event.target;
    const li = elem.parentNode;

    while (!elem.getAttribute('data-name')) {
        elem = elem.parentNode;

        if (elem.nodeName === 'BODY') {
            elem = null;
            return;
        }
    }

    if (elem.matches('[data-name="delete"]')) {
        // ~ html 화면에서만 delete
        toDoList.removeChild(li);
        
        // ★ filter
        const cleanToDos = toDos.filter(function(toDo) {
            //toDo.id: 숫자, li.id: string
            return toDo.id !== parseInt(li.id);
        });
        // filterFn이 true일 때만 filter(통과)
        // filter: array의 모든 아이템을 통해 함수 실행
        // -> true인 아이템들만 가지고 새로운 array 만듦

        //toDos: 예전 것, cleanToDos: 새로 바뀐 것
        // cleanToDos : 삭제한 li 제외 요소들이 저장됨
        toDos = cleanToDos;
        // ↑ 먼저 값 바꿔주고, ↓ 저장
    }
    saveToDos();
}

function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
    // local storage에는 String 형태의 데이터만 저장 가능
    // -> JSON.stringify 사용 (object -> string)
    // js는 local stroage에 있는 모든 데이터를 string으로 저장하려고 함
}

function paintToDo(text) {
    const newId = toDos.length + 1;
    const innerToDoList = `
        <li id=${newId}>
            <button data-name="delete">❌</button>
            <span>${text}</span>
        </li>
    `;
    // li의 id 값은 '문자열' 타입임

    toDoList.innerHTML += innerToDoList;

    if (toDoList) {
        // event delegation: 요소 내 버튼 종류가 많을 때 사용하면 좋음
        toDoList.addEventListener("click", deleteToDo);
    }

    // ul 안에 요소 생성하는 코드 (클론 코딩)
    // const li = document.createElement("li");
    // const delBtn = document.createElement("button");
    // const span = document.createElement("span");
    // const newId = toDos.length + 1;
    
    // delBtn.innerText = "❌";
    // delBtn.addEventListener("click", deleteToDo);
    
    // span.innerText = text;
    
    // li.appendChild(delBtn);
    // li.appendChild(span);
    // li.id = newId;          // ★li에 id 추가
    // toDoList.appendChild(li);

    const toDoObj = {
        text: text,
        id: newId
    };
    toDos.push(toDoObj);    // toDos array 안에 toDoObj 집어넣음
    saveToDos();
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue =  toDoInput.value;

    if (currentValue === '') {
        alert("내용을 입력해주세요.");
    } else{
        paintToDo(currentValue);
        toDoInput.value = "";
        // enter-submit한 뒤 input 내부의 작성 내용을 없애는(초기화) 기능
    }
}

// local storage에 있는 내용을 화면에 뿌려주는 함수
function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    // loadedToDos 의 타입: String

    if (loadedToDos !== null) {
        // string -> object
        const parsedToDos = JSON.parse(loadedToDos);
        
        // ★forEach: parsedToDos 안에 있는 각 array 요소들에 대하여 함수를 내부에서 바로 실행
        parsedToDos.forEach(function(toDo) {
            paintToDo(toDo.text);
        });
    }
}

function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit)
    // form 태그는 submit 액션 가능
}

init();