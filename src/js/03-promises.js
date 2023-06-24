import { Notify } from "notiflix";

const formEl = document.querySelector('.form');


formEl.addEventListener('submit', onSubmitForm);

function onSubmitForm(evt){
  evt.preventDefault();
  const {delay, step, amount}  = evt.currentTarget.elements;
  let delayValue = Number(delay.value);
  let stepValue = Number(step.value);
  let amountValue = Number(amount.value);
  if(delayValue <  0 || stepValue < 0 || amountValue < 0){
    Notify.failure('Будь ласка введіть позитивне число!');
  }
  for(let i = 1; i <= amountValue; i += 1){
    delayValue += stepValue;
  
  createPromise(i, delayValue )
  .then(({ position, delay }) => {
    Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    console.log(`✅ Fulfilled promise ${position} in ${delay}ms`)
  })
  .catch(({ position, delay }) => {
    Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  });
  evt.currentTarget.reset();
  }

}






function createPromise(position, delay) {
  return new Promise ((resolve, reject) =>  {
    const shouldResolve = Math.random() > 0.3;
setTimeout(() => {
  if (shouldResolve) {
    resolve ({position, delay})
  } else {
    reject ({position, delay})
  }
}, delay) 
  }) 
}

