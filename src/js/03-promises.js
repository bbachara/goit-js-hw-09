import Notiflix from 'notiflix';

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

const form = document.querySelector('.form');
form.addEventListener('submit', event => {
  event.preventDefault();

  const firstDelay = parseInt(
    document.querySelector('input[name="delay"]').value
  );
  const delayStep = parseInt(
    document.querySelector('input[name="step"]').value
  );
  const amount = parseInt(document.querySelector('input[name="amount"]').value);

  for (let i = 1; i <= amount; i++) {
    const delay = firstDelay + (i - 1) * delayStep;
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
        // console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
        // console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
});
