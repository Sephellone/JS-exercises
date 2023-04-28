const resetButtonClickHandler = (input) => {
  input.value = '';
}

const initDigitalPhone = () => {
  const parent = document.querySelector('[data-digital-phone="parent"]');

  if (!parent) {
    return
  }

  const input = parent.querySelector('[data-digital-phone="input"]');

  const digitalButtons = document.querySelector('[data-digital-phone="buttons"]');

  const buttonSound = new Audio;

  const digitalButtonsClickHandler = (evt) => {
    buttonSound.pause();
    const button = evt.target;
    const value = button.dataset.digitalPhone;

    if (value === 'buttons') {
      return
    }

    buttonSound.src = (value !== '*' && value !== '#') ? `./sounds/dial${value}.wav` : './sounds/dial1.wav';
    buttonSound.play();
    input.value += value;
  }
  digitalButtons.addEventListener('click', digitalButtonsClickHandler);

  parent.querySelector('.phones__reset').addEventListener('click', () => {
    resetButtonClickHandler(input);
  });
}

export {initDigitalPhone};
