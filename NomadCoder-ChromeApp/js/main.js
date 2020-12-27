const container = document.querySelector(".container")

function init() {
    window.onload = function() {
        container.style.display = "block";
        resize();
    }
    
    window.addEventListener("reszie", resize);
}

function resize() {
    let containerLeft = (window.innerWidth - container.clientWidth) / 2;
    let containerTop = (window.innerHeight - container.clientHeight) / 2;
    
    container.style.marginLeft = containerLeft + "px";
    
    if (window.innerHeight > 600) {
        container.style.marginTop = containerTop + "px";
    } else {
        container.style.marginTop = 50;
    }
}

init();