const initFloating = () => {
  const floatingParent = document.querySelector('[data-floating="parent"]');

  if (!floatingParent) {
    return
  }

  const inputField = floatingParent.querySelector('[data-floating="input"]');
  const field = floatingParent.querySelector('[data-floating="field"]');
  const buttons = floatingParent.querySelectorAll('.floating__button');
  const resetButton = floatingParent.querySelector('[data-floating="reset"]');
  const startButton = floatingParent.querySelector('[data-floating="start"]');

  if (!inputField || !field || !buttons || !buttons.length || !resetButton || !startButton) {
    return
  }

  let interval;
  let maxLeft = field.getBoundingClientRect().width - buttons[0].getBoundingClientRect().width;
  let maxTop = field.getBoundingClientRect().height - buttons[0].getBoundingClientRect().height;

  const changeButtonsPosition = () => {
    buttons.forEach(button => {
      button.style.left = `${Math.random() * maxLeft}px`;
      button.style.top = `${Math.random() * maxTop}px`;
    })
  };

  const makeButtonsFloat = () => {
    if (interval === null || interval === undefined) {
      interval = setInterval(changeButtonsPosition, 1200);
    }
  };

  const makeButtonsStop = () => {
    clearInterval(interval);
    interval = null;
  }

  const fieldClickHandler = (evt) => {
    if(evt.target.dataset.floating === 'field') {
      return
    }

    inputField.value += evt.target.dataset.floating;
  };

  const startButtonClickHandler = () => {
    maxLeft = field.getBoundingClientRect().width - buttons[0].getBoundingClientRect().width;
    maxTop = field.getBoundingClientRect().height - buttons[0].getBoundingClientRect().height;
    makeButtonsFloat();
    field.addEventListener('click', fieldClickHandler);
  };

  const resetButtonClickHandler = () => {
    inputField.value = '';
    makeButtonsStop();
    field.removeEventListener('click', fieldClickHandler);
    buttons.forEach(button => {
      button.style.left = '45%';
      button.style.top = '45%';
    })
  }

  startButton.addEventListener('click', startButtonClickHandler);
  resetButton.addEventListener('click', resetButtonClickHandler);
};

export {initFloating};
