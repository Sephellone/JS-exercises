import { initDnaComplement } from './modules/dna.js';
import { initDigitalPhone } from './modules/digital-phone.js';
import {initWordCounter} from './modules/word-counter.js';
import { initRoundPhone } from './modules/round-phone.js';

window.addEventListener('DOMContentLoaded', () => {

  // Modules
  // ---------------------------------

  window.addEventListener('load', () => {
    initWordCounter();
    initDnaComplement();
    initDigitalPhone();
    initRoundPhone();
  });
});
