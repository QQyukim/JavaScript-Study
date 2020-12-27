const clock = document.querySelector(".js-clock");
    // clockTitle = clockContainer.querySelector("p");

function getTime() {
    const date = new Date();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const seconds = date.getSeconds();

    // apply mini-if (삼항 연산자)
    // 조건 ? true일 때 값 : false일 때 값
    clock.innerText = `${hours < 10 ? `0${hours}` : hours}:${
                            minutes < 10 ? `0${minutes}` : minutes}:${
                            seconds < 10 ? `0${seconds}` : seconds}`;
    // 시간:분:초 형태로 나오게 하기 위하여 위와 같이 코드를 정리해줌
}

function init() {
    getTime();
    // 시계처럼 작동하게 1초마다 시계에 들어갈 값 업데이트
    setInterval(getTime, 1000);
}

init();