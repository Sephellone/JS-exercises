const LOCK_VALUES = ['', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '#'];
const LOCK_LENGTH = 13;

const initDigitalLock = () => {
  const lockParent = document.querySelector('[data-digital-lock="parent"]');

  if (!lockParent) {
    return
  }

  const positionTemplate = document.querySelector('#digital-lock-template');
  const inputField = lockParent.querySelector('[data-digital-lock="input"]')
  const wrapper = lockParent.querySelector('[data-digital-lock="wrapper"]');
  const submitButton = lockParent.querySelector('[data-digital-lock="submit"]');
  const resetButton = lockParent.querySelector('[data-digital-lock="reset"]');

  if (!positionTemplate || !inputField || !wrapper || !submitButton || !resetButton) {
    return
  }

  for (let i = 0; i<= LOCK_LENGTH; i++) {
    const positionElement = positionTemplate.cloneNode(true).content.querySelector('[data-digital-lock="position"]');
    const valueField = positionElement.querySelector('[data-digital-lock="value"]');
    valueField.textContent = '';
    wrapper.append(positionElement);


    const increaseButton = positionElement.querySelector('[data-digital-lock="increase"]');
    const decreaseButton = positionElement.querySelector('[data-digital-lock="decrease"]');

    increaseButton.addEventListener('click', () => {
      const j = LOCK_VALUES.findIndex(elem => elem === valueField.textContent);

      let newIndex = j + 1;
      if (newIndex === LOCK_VALUES.length) {
        newIndex = 0;
      }
      valueField.textContent = LOCK_VALUES[newIndex];
    })

    decreaseButton.addEventListener('click', () => {
      const j = LOCK_VALUES.findIndex(elem => elem === valueField.textContent);

      let newIndex = j - 1;
      if (newIndex < 0) {
        newIndex = LOCK_VALUES.length - 1;
      }
      valueField.textContent = LOCK_VALUES[newIndex];
    })
  };

  submitButton.addEventListener('click', () => {
    const valuesArray = [];
    const values = lockParent.querySelectorAll('[data-digital-lock="value"]');

    values.forEach((value) => {
      valuesArray.push(value.textContent);
    })

    inputField.value = valuesArray.join('');
  });

  resetButton.addEventListener('click', () => {
    const values = lockParent.querySelectorAll('[data-digital-lock="value"]');
    values.forEach(value => value.textContent = '');
    inputField.value = '';
  })
};

export {initDigitalLock};
