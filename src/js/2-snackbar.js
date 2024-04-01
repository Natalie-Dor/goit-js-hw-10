//import library
import iziToast from 'izitoast';

import 'izitoast/dist/css/iziToast.min.css';
// =====================================================
// `✅ Fulfilled promise in ${delay}ms`;
// `❌ Rejected promise in ${delay}ms`;

// ===================================================================
const form = document.querySelector('.form');
// let delay = event.currentTarget.elements.delay.value;
// let state = event.currentTarget.elements.state.value;

form.addEventListener('submit', event => {
  let delay = event.currentTarget.elements.delay.value;
  let state = event.currentTarget.elements.state.value;

  event.preventDefault();

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve();
      } else {
        reject();
      }
      console.log(delay, state);
    }, delay);
  });

  promise
    .then(value => {
      iziToast.success({
        color: 'green',
        position: 'topRight',
        message: `✅ Fulfilled promise in ${delay}ms`,
      });
    })
    .catch(error => {
      iziToast.error({
        color: 'red',
        position: 'topRight',
        message: `❌ Rejected promise in ${delay}ms`,
      });
    });
});
