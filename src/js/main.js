/* global io */

import Score from './Score';
import TurnController from './TurnController';
import SocketController from './SocketController';

function init() {
  const banners = document.querySelectorAll('.pp-score_number');
  const addBtns = document.querySelectorAll('.pp-score_add');
  const removeBtns = document.querySelectorAll('.pp-score_remove');

  const score1 = new Score(banners[0], addBtns[0], removeBtns[0]);
  const score2 = new Score(banners[1], addBtns[1], removeBtns[1]);

  const resetBtn = document.querySelector('.pp-reset_button');
  resetBtn.addEventListener('click', () => {
    score1.reset();
    score2.reset();
  });

  const turnContainer = document.querySelector('.pp-header_turn');
  const turnController = new TurnController(turnContainer, 4, score1, score2); // eslint-disable-line no-unused-vars, max-len

  if (typeof io !== 'undefined') {
    const socket = io();
    const socketController = new SocketController(socket, turnController, score1, score2); // eslint-disable-line no-unused-vars, max-len
  }

  const allButtons = document.querySelectorAll('button');
  handleButtonClicks(allButtons);
}

function handleButtonClicks(buttons) {
  const pressedClass = 'pressed';
  const delay = '100';

  [].forEach.call(buttons, (button) => {
    button.addEventListener('click', () => {
      clearTimeout(button.timeout);
      setPressed(button);
      button.timeout = setTimeout(() => {
        setNotPressed(button);
      }, delay);
    });
  });

  function setPressed(button) {
    button.classList.add(pressedClass);
  }

  function setNotPressed(button) {
    button.classList.remove(pressedClass);
  }
}

init();
