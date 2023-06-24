import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from "notiflix";


const inputEl = document.querySelector('#datetime-picker');
const  startBtn = document.querySelector('button[data-start]');
const timer = document.querySelector('.timer')
const dataDays = document.querySelector('span[data-days]');
const dataHours = document.querySelector('span[data-hours]');
const dataMinutes = document.querySelector('span[data-minutes]');
const dataSeconds = document.querySelector('span[data-seconds]');
document.body.style.backgroundColor = 'DarkSlateGray'
startBtn.style.cssText ="background : LightSlateGray";

startBtn.style = 'width : 200px; height: 50px;color : Orange '
timer.style = 'display :flex; gap : 30px; color : Gold';

let selectedDate = null;
let currentDate = null;
let remainingTime  =  0;
let timerId = null;


startBtn.addEventListener('click', onStartBtnClick);
startBtn.disabled = true;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        onDateCheck(selectedDates);
    },
  };
flatpickr(inputEl, options);




function onDateCheck(selectedDates){
    selectedDate = selectedDates[0].getTime();
    currentDate = new Date().getTime();
   if(selectedDate > currentDate){
    startBtn.disabled = false;
    Notify.success('🥰 Congratulation! Click on start!');
    return;
   }
   Notify.failure('Please choose a date in the future');
    return ;
}
function onStartBtnClick(){
    timerId = setInterval(startTimer, 1000)
}

function startTimer(){
    startBtn.disabled = true;
if(selectedDate - currentDate <= 1000){
    Notify.success('Time end');
    clearInterval(timerId);
    
}else{
    currentDate += 1000;
    remainingTime = Math.floor(selectedDate - currentDate);
    convertMs(remainingTime);
  
   }
}



function updateTime({ days, hours, minutes, seconds }) {
  dataDays.textContent = addLeadingZero(days);
  dataHours.textContent = addLeadingZero(hours);
  dataMinutes.textContent = addLeadingZero(minutes);
  dataSeconds.textContent = addLeadingZero(seconds);
}


function addLeadingZero(value){
    return String(value).padStart(2, '0');
}

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    updateTime({ days, hours, minutes, seconds })
    return { days, hours, minutes, seconds };
   
    
  } 

