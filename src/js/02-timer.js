import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const startBtn = document.querySelector('[data-start]');
startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const dateNow = new Date();
    if (selectedDate <= dateNow) {
      Notiflix.Report.failure(
        'Warning!',
        'Please choose a date in the future',
        'Close',
        {
          width: '360px',
          svgSize: '120px',
        }
      );
      return;
    }
    startBtn.disabled = false;
  },
};

flatpickr('#datetime-picker', options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

startBtn.addEventListener('click', () => {
  const endDate = new Date(document.getElementById('datetime-picker').value);
  const timerInterval = setInterval(() => {
    const currentTime = new Date();
    const remainingTime = endDate - currentTime;
    if (remainingTime <= 0) {
      clearInterval(timerInterval);
      Notiflix.Report.success(
        'Countdown finished!',
        'The time is now!',
        'Close',
        {
          width: '360px',
          svgSize: '120px',
        }
      );
      return;
    }
    const timeElements = convertMs(remainingTime);

    const remainingDays = document.querySelector('[data-days]');
    remainingDays.textContent = addLeadingZero(timeElements.days);

    const remainingHours = document.querySelector('[data-hours]');
    remainingHours.textContent = addLeadingZero(timeElements.hours);

    const remainingMinutes = document.querySelector('[data-minutes]');
    remainingMinutes.textContent = addLeadingZero(timeElements.minutes);

    const remainingSeconds = document.querySelector('[data-seconds]');
    remainingSeconds.textContent = addLeadingZero(timeElements.seconds);
  }, 1000);
});
