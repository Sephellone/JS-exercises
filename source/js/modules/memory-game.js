const TRANSITION_TIME = 300;
const CARDS_TO_RENDER = 24;
const CARDS_DATA = [
  {'value' : 1, 'url' : ''},
  {'value' : 2, 'url' : ''},
  {'value' : 3, 'url' : ''},
  {'value' : 4, 'url' : ''},
  {'value' : 5, 'url' : ''},
  {'value' : 6, 'url' : ''},
  {'value' : 9, 'url' : ''},
  {'value' : 10, 'url' : ''},
  {'value' : 11, 'url' : ''},
  {'value' : 12, 'url' : ''},
  {'value' : 13, 'url' : ''},
  {'value' : 14, 'url' : ''},
  {'value' : 15, 'url' : ''},
  {'value' : 16, 'url' : ''},
  {'value' : 17, 'url' : ''},
  {'value' : 18, 'url' : ''},
  {'value' : 19, 'url' : ''},
  {'value' : 20, 'url' : ''}
];

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

  let isFirstOpen = false;
  let first;
  let second;
  let moves = 0;
  let best = 0;
  let cardsAmount = CARDS_TO_RENDER;

  // if (localStorage.bestMoves) {
  //   best = localStorage.bestMoves;
  // }

  const showGameOverMessage = () => {
    gameOverMessage.querySelector('[data-memory="message-moves"]').textContent = moves;
    gameOverMessage.querySelector('[data-memory="message-best-moves"]').textContent = best;
    // localStorage.bestMoves = best;

    gameOverMessage.classList.remove('hidden');
  };

  const fieldClickHandler = (evt) => {
    const target = evt.target
    if (target.dataset.memory === 'field' || target.classList.contains('open')) {
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
        [first, second].forEach((card) => {
          setTimeout(() => {
            card.classList.add('hidden');
          }, (TRANSITION_TIME * 4))
        })
        isFirstOpen = false;
        first = null;
        second = null;
        cardsAmount -= 2;
        if (cardsAmount === 0) {
          if (best === 0 || moves < best) {
            best = moves;
          }
          setTimeout(showGameOverMessage, (TRANSITION_TIME * 5))
        }
      } else {
        [first, second].forEach((card) => {
          setTimeout(() => {
            closeCard(card);
          }, (TRANSITION_TIME * 4))
        })
        isFirstOpen = false;
        first = null;
        second = null;
      }
    }
  }

  const renderCards = () => {
    const arrayForRender = [];
    while (arrayForRender.length < CARDS_TO_RENDER) {
      const i = Math.floor(Math.random() * CARDS_DATA.length);
      if (!arrayForRender.includes(CARDS_DATA[i])) {
        arrayForRender.push(CARDS_DATA[i]);
        arrayForRender.push(CARDS_DATA[i]);
      }
    }
    shuffleArray(arrayForRender);
    field.innerHTML = '';
    arrayForRender.forEach(item => {
      const card = document.createElement('div');
      card.classList.add('memory__card');
      card.setAttribute('data-memory', item.value);
      field.append(card);
    })
    cardsAmount = arrayForRender.length;

    // console.log(arrayForRender);
  }

  const startButtonClickHandler = () => {
    moves = 0;
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
