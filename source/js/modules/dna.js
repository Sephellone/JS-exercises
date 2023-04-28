const DIRECTION_STRINGS = {
  '35' : 'from 3\' to 5\'',
  '53' : 'from 5\' to 3\''
}

const DNA_LETTERS = ['A', 'T', 'C', 'G'];

const DNA_LIB = {
  'A': 'T',
  'T': 'A',
  'C': 'G',
  'G': 'C'
}

const RNA_LIB = {
  'A': 'U',
  'T': 'A',
  'C': 'G',
  'G': 'C'
}

const makeClearSequence = (inputValue) => {
  if (inputValue === '') {
    return
  }
  const clearSequence = inputValue.split(/[\s\n]+/).join('');
  if (clearSequence === '') {
    return
  }

  return clearSequence.toUpperCase();
};

const checkNonDnaSymbols = (sequence) => sequence.split('').every(letter => DNA_LETTERS.includes(letter));

const renderErrorMessage = (sequence) => {
  const resultField = document.querySelector('[data-dna="result-container"]');
  resultField.innerHTML = '';
  const errorTemplate = document.querySelector('#error');

  if (!errorTemplate) {
    alert('There are non-DNA letters in the sequence!');
    return
  }

  const errorElement = errorTemplate.cloneNode(true).content.querySelector('[data-dna="analysis-wrapper"]');

  const initialSequenceField = errorElement.querySelector('[data-dna="initial"]');
  initialSequenceField.innerHTML = '';

  const sequenceArray = sequence.split('');
  sequenceArray.forEach((letter) => {
    const letterSpan = document.createElement('span');
    letterSpan.textContent = letter;
    if (!DNA_LETTERS.includes(letter)) {
      letterSpan.classList.add('dna__error-letter')
    }
    initialSequenceField.append(letterSpan);
  })

  resultField.append(errorElement);
};

const make35DNAStrand = (sequence) => {
  const complementaryStrand = [];
  sequence.split('').forEach(letter => {
    complementaryStrand.push(DNA_LIB[letter]);
  });
  return complementaryStrand.join('');
};

const make35RNAStrand = (sequence) => {
  const complementaryStrand = [];
  sequence.split('').forEach(letter => {
    complementaryStrand.push(RNA_LIB[letter]);
  });
  return complementaryStrand.join('');
};

const make53Strand = (sequence) => sequence.split('').reverse().join('');

const getNaOption = (parent) => parent.querySelector('[name="na"]:checked') ? parent.querySelector('[name="na"]:checked').value : 'dna';

const getDirectionOption = (parent) => parent.querySelector('[name="direction"]:checked') ? parent.querySelector('[name="direction"]:checked').value : '53';


const copyButtonHandler = (dataToCopy, onSuccess, onFail) => {
  navigator.clipboard.writeText(dataToCopy).then(
    () => {
      onSuccess();
    },
    (err) => {
      console.log(err);
      onFail();
    }
  );
};

const renderResult = (na, direction, sequence) => {
  if (!document.querySelector('#result')) {
    return
  }
  const resultContainer = document.querySelector('[data-dna="result-container"]');
  if (!resultContainer) {
    return
  }

  resultContainer.innerHTML = '';

  const resultElement = document.querySelector('#result').cloneNode(true).content.querySelector('[data-dna="result-wrapper"]');
  resultElement.querySelector('.dna__result-title').textContent = `Complementary ${na.toUpperCase()} strand from ${direction.split('')[0]}' to ${direction.split('')[1]}':`;
  const resultStrand = resultElement.querySelector('[data-dna="result"]');
  resultStrand.textContent = sequence;
  resultStrand.classList.add(`dna__result--${direction}`);

  const copyButton = resultElement.querySelector('[data-dna="copy-button"]');

  const onSuccessCopy = () => {
    copyButton.disable = true;
    const initialText = copyButton.textContent;
    copyButton.textContent = 'Copied!'
    setTimeout(() => {
      copyButton.disable = false;
      copyButton.textContent = initialText;
    }, 1500)
  }

  const onFailCopy = () => {
    console.log('error');
  }

  copyButton.addEventListener('click', () => {
    copyButtonHandler(sequence, onSuccessCopy, onFailCopy)
  });

  resultContainer.append(resultElement);
}


const createButtonClickHandler = (inputElement, parentElement) => {
  const sequence = makeClearSequence(inputElement.value);
  if (!sequence) {
    console.log('empty')
    return
  }

  const naOption = getNaOption(parentElement);
  const directionOption = getDirectionOption(parentElement);
  const isDNA = checkNonDnaSymbols(sequence);

  if (!isDNA) {
    renderErrorMessage(sequence);
    return;
  }

  let strand35;
  let strand53;
  let strandForRender;

  if (naOption === 'dna') {
    strand35 = make35DNAStrand(sequence);
  } else {
    strand35 = make35RNAStrand(sequence);
  };

  strand53 = make53Strand(strand35);

  strandForRender = (directionOption === '53') ? strand53 : strand35;

  renderResult(naOption, directionOption, strandForRender);
}

// Final function
const initDnaComplement = () => {
  const complementParent = document.querySelector('[data-dna="parent"]');

  if (!complementParent) {
    return
  }

  const inputField = complementParent.querySelector('[data-dna="input"]');
  const createButton = complementParent.querySelector('[data-dna="button-create"]');

  if (!inputField || !createButton) {
    return
  }

  createButton.addEventListener('click', () => {
    createButtonClickHandler(inputField, complementParent);
  });
}

export {initDnaComplement};
