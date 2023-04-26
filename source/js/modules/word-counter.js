const countSymbols = (inputValue) => inputValue.split('').length;

const countCharacters = (inputValue) => inputValue.split('').filter((item) => item !== '\n').length;

const isSpace = (symbol) => symbol === ' ' || symbol === '\n';

const isOnlySpaces = (word) => word.split('').every(isSpace);

const countNonSpaceSymbols = (inputValue) => inputValue.split('').filter(item => isSpace(item) === false).length;

const isSpecialSymbols = (symbol) => /[!-\/:-@[-`{-~]/.test(symbol);

const isOnlySpecial = (word) => word.split('').every(char => isSpecialSymbols(char));

const isNumber = (symbol) => parseInt(symbol) >= 0;

const isOnlyNumbers = (word) => word.split('').every(char => isNumber(char));

const countSpecialSymbols = (inputValue) => inputValue.split('').filter(symbol => isSpecialSymbols(symbol)).length;

const countNumbers = (inputValue) => inputValue.split('').filter(symbol => isNumber(symbol)).length;

const countWords = (inputValue) => {
  const filteredWords = inputValue.split(/[\s\n]+/).filter((item) => {
    return item !== '' && isOnlySpecial(item) === false && isOnlyNumbers(item) === false;
  });
  return filteredWords.length;
};

const countParagraphs = (inputValue) => {
  const paragraphs = inputValue.split('\n').filter((item) => {
    return item !== '' && !isOnlySpaces(item);
  });
  return paragraphs.length;
}

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
  const characters = wordCounterParent.querySelector('[data-counter="not-line-break"]');
  const nonSpaceSymbols = wordCounterParent.querySelector('[data-counter="non-space"]');
  const words = wordCounterParent.querySelector('[data-counter="words"]');
  const specialChars = wordCounterParent.querySelector('[data-counter="specials"]');
  const numbers = wordCounterParent.querySelector('[data-counter="numbers"]');
  const paragraphs = wordCounterParent.querySelector('[data-counter="paragraphs"]');

  function inputHandler(evt) {
    const inputedValue = evt.target.value;
    if (symbols) {
      symbols.textContent = countSymbols(inputedValue);
    }

    if (characters) {
      characters.textContent = countCharacters(inputedValue);
    }

    if (nonSpaceSymbols) {
      nonSpaceSymbols.textContent = countNonSpaceSymbols(inputedValue);
    }

    if (words) {
      words.textContent = countWords(inputedValue);
    }

    if (specialChars) {
      specialChars.textContent = countSpecialSymbols(inputedValue);
    }

    if (numbers) {
      numbers.textContent = countNumbers(inputedValue);
    }

    if (paragraphs) {
      paragraphs.textContent = countParagraphs(inputedValue);
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

export {initWordCounter};
