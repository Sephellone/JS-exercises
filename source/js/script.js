import { initDnaComplement } from './modules/dna.js';
import { initDigitalPhone } from './modules/digital-phone.js';
import { initWordCounter } from './modules/word-counter.js';
import { initRoundPhone } from './modules/round-phone.js';
import { initDigitalLock } from './modules/digital-lock.js';
import { initFloating } from './modules/floating.js';
import { initFlashingInput } from './modules/flashing.js';
import { initMemoryGame } from './modules/memory-game.js';
import { initTimer } from './modules/timer.js';

window.addEventListener('DOMContentLoaded', () => {

  // Modules
  // ---------------------------------

  window.addEventListener('load', () => {
    initWordCounter();
    initDnaComplement();
    initDigitalPhone();
    initRoundPhone();
    initDigitalLock();
    initFloating();
    initFlashingInput();
    initMemoryGame();
    initTimer();
  });
});
