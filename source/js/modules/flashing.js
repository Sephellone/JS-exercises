const PHONE_VALUES = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '#']

const initFlashingInput = () => {
  const flashingParent = document.querySelector('[data-flashing="parent"]');
  if(!flashingParent) {
    return
  }

  const inputField = flashingParent.querySelector('[data-flashing="input"]');
  const valueField = flashingParent.querySelector('[data-flashing="value"]');
  const startButton = flashingParent.querySelector('[data-flashing="start"]');
  const stopButton = flashingParent.querySelector('[data-flashing="stop"]');
  const grabButton = flashingParent.querySelector('[data-flashing="grab"]');
  const resetButton = flashingParent.querySelector('[data-flashing="reset"]');

  if (!inputField || !valueField || !startButton || !stopButton || !grabButton || !resetButton) {
    return
  }

  let i = 0;
  let interval;

  const changeValue = () => {
    valueField.textContent = PHONE_VALUES[i];
    i++;
    if (i === PHONE_VALUES.length) {
      i = 0;
    }
  }

  const makeValuesFlash = () => {
    if (!interval) {
      interval = setInterval(changeValue, 500);
    }
  }

  const makeValuesStop = () => {
    clearInterval(interval);
    interval = null;
  }

  const grabButtonClickHandler = () => {
    inputField.value += valueField.textContent;
  }

  const stopButtonClickHandler = () => {
    makeValuesStop();
    grabButton.removeEventListener('click', grabButtonClickHandler);
  }

  const startButtonClickHandler = () => {
    makeValuesFlash();
    grabButton.addEventListener('click', grabButtonClickHandler);
    stopButton.addEventListener('click', stopButtonClickHandler);
  }

  const resetButtonClickHandler = () => {
    stopButton.click();
    stopButton.removeEventListener('click', stopButtonClickHandler);
    i = 0;
    inputField.value = '';
    valueField.textContent = '';
  }

  startButton.addEventListener('click', startButtonClickHandler);
  resetButton.addEventListener('click', resetButtonClickHandler);

};

export {initFlashingInput};
