const initWordCounter = () => {
  const wordCounterParent = document.querySelector('[data-counter="parent"]');

  if (!wordCounterParent) {
    return
  }

  const inputField = wordCounterParent.querySelector('[data-counter="textarea"]');
  if (!inputField) {
    return
  }

  inputField.addEventListener('input', inputHandler);

  const resetButton = wordCounterParent.querySelector('[data-counter="reset"]');
  if (resetButton) {
    resetButton.addEventListener('click', resetButtonHandler);
  }

  const symbols = wordCounterParent.querySelector('[data-counter="symbols"]');
  const nonSpaceSymbols = wordCounterParent.querySelector('[data-counter="non-space"]');
  const words = wordCounterParent.querySelector('[data-counter="words"]');

  function inputHandler(evt) {
    const inputedValue = evt.target.value;
    if (symbols) {
      symbols.textContent = countSymbols(inputedValue);
    }

    if (nonSpaceSymbols) {
      nonSpaceSymbols.textContent = countNonSpaceSymbols(inputedValue);
    }

    if (words) {
      words.textContent = countWords(inputedValue);
    }
  }

  function resetButtonHandler() {
    const counterItems = wordCounterParent.querySelectorAll('[data-counter="item"]');
    if (inputField) {
      inputField.value = '';
    }

    if (counterItems && counterItems.length) {
      counterItems.forEach((item) => {
        item.querySelector('[data-counter]').textContent = 0;
      });
    }
  }
}

function countSymbols(inputValue) {
  if(typeof inputValue === 'string') {
    const arrayOfSymbols = inputValue.split('');
    return arrayOfSymbols.length;
  }
}

function countNonSpaceSymbols(inputValue) {
  if(typeof inputValue === 'string') {
    const arrayOfSymbols = inputValue.split('');
    const filteredSymbols = arrayOfSymbols.filter(item => item !== ' ');
    return filteredSymbols.length;
  }
}

function countWords(inputValue) {
  if(typeof inputValue === 'string') {
    const arrayOfWords = inputValue.split(' ');
    const filteredWords = arrayOfWords.filter(item => item !== '');
    return filteredWords.length;
  }
}

export {initWordCounter};
