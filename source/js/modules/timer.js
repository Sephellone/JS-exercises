const timerContainer = document.querySelector('.timer');

const createTimeString = (time) => {
  const seconds = time % 60;
  const minutes = ((time - seconds) / 60) % 60;
  const hours = (time - minutes * 60 - seconds) / 3600;

  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
};

const initTimer = () => {
  if (!timerContainer) return;

  const timer = timerContainer.querySelector('.timer__time');

  const hoursInput = timerContainer.querySelector('.timer__input--hours');
  const minutesInput = timerContainer.querySelector('.timer__input--minutes');
  const secondsInput = timerContainer.querySelector('.timer__input--seconds');

  const startButton = timerContainer.querySelector('.timer__button--start');
  const stopButton = timerContainer.querySelector('.timer__button--stop');

  let time = 0;
  let timerInterval = null;

  const startTimer = () => {
    if (time <= 0) return;
    if (!timerInterval) {
      timerInterval = setInterval(() => {
        timer.textContent = createTimeString(time);
        time--;

        if (time < 0) {
          stopTimer();
        }
      }, 1000)
    }
  }

  const stopTimer = () => {
    clearInterval(timerInterval);
    timerInterval = null;
    timer.textContent = createTimeString(0);
  };

  const onStartClick = () => {
    if(!hoursInput.value && !minutesInput.value && !secondsInput.value) return;
    stopTimer();
    time = Number(hoursInput.value) * 3600 + Number(minutesInput.value) *60 + Number(secondsInput.value);
    startTimer();
  };

  startButton.addEventListener('click', onStartClick);
  stopButton.addEventListener('click', stopTimer);
};

export { initTimer };
