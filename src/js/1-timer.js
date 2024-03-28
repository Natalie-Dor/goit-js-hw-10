// import library
import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';

import 'izitoast/dist/css/iziToast.min.css';
// ===============================================================

const inputPicker = document.getElementById('datetime-picker');
const startBtn = document.querySelector('[data-start]');
const timerDays = document.querySelector('[data-days]');
const timerHours = document.querySelector('[data-hours]');
const timerMinutes = document.querySelector('[data-minutes]');
const timerSeconds = document.querySelector('[data-seconds]');
const TIMER_DELAY = 1000;

let timeDifference;
let timerId;
let formatDate;
let currentDate = Date.now();
let userSelectedDate;
// ===========================================================
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    currentDifferenceDate(selectedDates[0]);
    userSelectedDate = selectedDates[0];
  },
};
flatpickr(inputPicker, options);
startBtn.setAttribute('disabled', true);

function currentDifferenceDate(userSelectedDate) {
  if (userSelectedDate < currentDate) {
    startBtn.setAttribute('disabled', true);
    return iziToast.error({
      title: 'Error',
      message: 'Please choose a date in the future',
      position: 'topRight',
    });
  }

  timeDifference = userSelectedDate.getTime() - currentDate;
  formatDate = convertMs(timeDifference);

  renderDate(formatDate);
  startBtn.removeAttribute('disabled');
}

startBtn.addEventListener('click', onBtnStart);

//====================================================================
function onBtnStart() {
  timerId = setInterval(startTimer, TIMER_DELAY);
}

function startTimer() {
  startBtn.setAttribute('disabled', true);
  inputPicker.setAttribute('disabled', true);

  timeDifference -= TIMER_DELAY;
  if (timeDifference <= TIMER_DELAY) {
    clearInterval(timerId);
    timerSeconds.textContent = '00';
    timerMinutes.textContent = '00';
    timerHours.textContent = '00';
    timerDays.textContent = '00';
  } else {
    formatDate = convertMs(timeDifference);
    renderDate(formatDate);
  }
}
// ================================================
function renderDate(formatDate) {
  timerSeconds.textContent = formatDate.seconds;
  timerMinutes.textContent = formatDate.minutes;
  timerHours.textContent = formatDate.hours;
  timerDays.textContent = formatDate.days;
}
// =====================================================

// ====================================================
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function pad(value) {
  return String(value).padStart(2, '0');
}
// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
