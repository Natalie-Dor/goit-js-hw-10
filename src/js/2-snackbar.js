//import library
import iziToast from 'izitoast';

import 'izitoast/dist/css/iziToast.min.css';
// =====================================================
// `✅ Fulfilled promise in ${delay}ms`;
// `❌ Rejected promise in ${delay}ms`;

const createBtn = document.querySelector('button');
const delay = document.querySelector('input[name="delay"]');

createBtn.addEventListener('click', createNotification);

function createNotification(e) {
  e.preventDefault();
  let state = document.querySelector('input[name="state"]:checked');
  if (delay.value && state.value) {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (state.value == 'fulfilled') {
          resolve();
          console.log(promise);
          iziToast.success({
            title: 'Success!',
            message: `✅ Fulfilled promise in ${delay.value}ms`,
            position: 'topRight',
          });
        }
        if (state.value == 'rejected') {
          reject(`Rejected promise in ${delay.value}ms`);
          console.log(promise);
          iziToast.error({
            title: 'Error',
            message: `❌ Rejected promise in ${delay.value}ms`,
            position: 'topRight',
          });
        }
      }, delay.value);
    });
    return promise;
  }
}
