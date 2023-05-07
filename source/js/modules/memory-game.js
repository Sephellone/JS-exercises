const TRANSITION_TIME = 150;
const MAX_CARDS = 26;

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
};

const openCard = (card) => {
  card.classList.add('rotated');
  setTimeout(() => {
    card.classList.add('open');
    card.classList.remove('rotated');
  }, TRANSITION_TIME)
}

const closeCard = (card) => {
  card.classList.add('rotated');
  setTimeout(() => {
    card.classList.remove('open');
    card.classList.remove('rotated');
  }, TRANSITION_TIME)
}

const compareCards = (card1, card2) => {
  return card1.dataset.memory === card2.dataset.memory;
}


const initMemoryGame = () => {
  const memoryGameParent = document.querySelector('[data-memory="parent"]');

  if (!memoryGameParent) {
    return
  }

  const field = memoryGameParent.querySelector('[data-memory="field"]');
  const startButton = memoryGameParent.querySelector('[data-memory="start"]');
  const gameOverMessage = memoryGameParent.querySelector('[data-memory="message"]');

  if(!field || !startButton || !gameOverMessage) {
    return
  }

  field.style.setProperty('--transition', `${TRANSITION_TIME}ms`);
  let cardArtType;
  let cardsToRender = 24;
  let isFirstOpen = false;
  let first;
  let second;
  let moves = 0;
  let bestToCalc;
  const gameType = {
    12 : 'easy',
    24 : 'normal',
    36 : 'hard',
    48 : 'insane'
  }
  const bestMoves = {
    'easy' : 0,
    'normal' : 0,
    'hard' : 0,
    'insane' : 0
  };
  let cardsAmount;

  const showGameOverMessage = () => {
    gameOverMessage.querySelector('[data-memory="message-moves"]').textContent = moves;
    gameOverMessage.querySelector('[data-memory="message-best-moves"]').textContent = bestMoves[bestToCalc];

    gameOverMessage.classList.remove('hidden');
  };

  const fieldClickHandler = (evt) => {
    const target = evt.target
    if (target.dataset.memory === 'field' || !target.dataset.memory || target.classList.contains('open')) {
      return
    }

    if (first && second) {
      return
    }

    moves++;

    if (!isFirstOpen) {
      openCard(target);
      isFirstOpen = true;
      first = target;
    } else {
      openCard(target)
      second = target;

      if(compareCards(first, second)) {

        setTimeout(() => {
          [first, second].forEach((card) => {
            card.classList.add('hidden');
          });
          isFirstOpen = false;
          first = null;
          second = null;
        }, (TRANSITION_TIME + 900));

        cardsAmount -= 2;

        if (cardsAmount === 0) {
          if (bestMoves[bestToCalc] === 0 || moves < bestMoves[bestToCalc]) {
            bestMoves[bestToCalc] = moves;
          }
          setTimeout(showGameOverMessage, (TRANSITION_TIME + 900))
        }
      } else {
        setTimeout(() => {
          [first, second].forEach((card) => {
            closeCard(card);
          });
          isFirstOpen = false;
          first = null;
          second = null;
        }, TRANSITION_TIME + 1000);
      }
    }
  }

  const getOptions = () => {
    const typeRadio = memoryGameParent.querySelector('[name="type"]:checked');
    cardArtType = typeRadio.value;
    const sizeRadio = memoryGameParent.querySelector('[name="size"]:checked');
    cardsToRender = parseInt(sizeRadio.value);
    bestToCalc = gameType[cardsToRender];
  }

  const renderCards = () => {
    const arrayForRender = [];
    while (arrayForRender.length < cardsToRender) {
      const i = Math.floor(Math.random() * MAX_CARDS + 1);
      if (!arrayForRender.includes(i)) {
        arrayForRender.push(i);
        arrayForRender.push(i);
      }
    }
    shuffleArray(arrayForRender);
    field.innerHTML = '';
    arrayForRender.forEach(item => {
      const card = document.createElement('div');
      card.classList.add('memory__card');
      const img = document.createElement('img');
      img.setAttribute('src', `img/memory/${cardArtType}s/${cardArtType}_${item}.webp`);
      card.append(img);
      card.setAttribute('data-memory', item);
      field.append(card);
    })
    cardsAmount = arrayForRender.length;
  }

  const startButtonClickHandler = () => {
    moves = 0;
    getOptions();
    renderCards();
    field.addEventListener('click', fieldClickHandler);
  }

  startButton.addEventListener('click', startButtonClickHandler);
  gameOverMessage.querySelector('[data-memory="message-button"]').addEventListener('click', () => {
    field.removeEventListener('click', fieldClickHandler);
    gameOverMessage.classList.add('hidden');
  })

}

export {initMemoryGame};
