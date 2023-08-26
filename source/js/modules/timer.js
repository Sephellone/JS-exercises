const timerContainer = document.querySelector('.timer');

const createTimeString = (time) => {
  const seconds = time % 60;
  const minutes = ((time - seconds) / 60) % 60;
  const hours = (time - minutes * 60 - seconds) / 3600;

  return `${hours.toString().padStart(2, '0')} : ${minutes.toString().padStart(2, '0')} : ${seconds.toString().padStart(2, '0')}`
};

const initTimer = () => {
  if (!timerContainer) return;

  const timer = timerContainer.querySelector('.timer__time');
  const input = timerContainer.querySelector('.timer__input');
  const startButton = timerContainer.querySelector('.timer__button--start');
  const stopButton = timerContainer.querySelector('.timer__button--stop');

  let time = 0;
  let timerInterval = null;

  const startTimer = () => {
    if (time <= 0) return;
    if (!timerInterval) {
      timerInterval = setInterval(() => {
        time--;
        timer.textContent = createTimeString(time);

        if (time === 0) {
          stopTimer();
        }
      }, 1000)
    }
  }

  const stopTimer = () => {
    clearInterval(timerInterval);
    timerInterval = null;
  };

  const onStartClick = () => {
    if(!input.value) return;
    stopTimer();
    time = Number(input.value);
    startTimer();
  };

  startButton.addEventListener('click', onStartClick);
  stopButton.addEventListener('click', stopTimer);
};

export { initTimer };
