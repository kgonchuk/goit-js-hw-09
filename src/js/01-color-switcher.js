function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}


const startBtn = document.querySelector('button[data-start]');
console.log(startBtn);
const stopBtn = document.querySelector('button[data-stop]');
console.log(stopBtn)
const bodyBg = document.querySelector('body')

startBtn.addEventListener('click', onstartBtnClick);
stopBtn.addEventListener('click', onStopBtnClick);

let timerChange = null;
 
function onstartBtnClick(){

startBtn.disabled = true;
stopBtn.disabled = false;
timerChange = setInterval(() => { bodyBg.style.backgroundColor = getRandomHexColor()}, 1000);

}

function onStopBtnClick(){
    startBtn.disabled = false;
stopBtn.disabled = true;
clearInterval(timerChange)
}
