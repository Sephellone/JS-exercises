import { initDnaComplement } from './modules/dna.js';
import { initDigitalPhone } from './modules/phone-inputs.js';
import {initWordCounter} from './modules/word-counter.js';

window.addEventListener('DOMContentLoaded', () => {

  // Modules
  // ---------------------------------

  window.addEventListener('load', () => {
    initWordCounter();
    initDnaComplement();
    initDigitalPhone();
  });
});
