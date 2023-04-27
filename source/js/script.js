import { initDnaComplement } from './modules/dna.js';
import {initWordCounter} from './modules/word-counter.js';

window.addEventListener('DOMContentLoaded', () => {

  // Modules
  // ---------------------------------

  window.addEventListener('load', () => {
    initWordCounter();
    initDnaComplement();
  });
});
