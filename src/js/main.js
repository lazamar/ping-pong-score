class Score {
  constructor(banner, addBtn, removeBtn, turnController) {
    this.banner = banner;
    this.turnController = turnController;

    this.addBtn = addBtn;
    this.addBtn.addEventListener('click', () => {
      this.add(1);
    });

    this.removeBtn = removeBtn;
    this.removeBtn.addEventListener('click', () => {
      this.remove(1);
    });

    this.score = 0;
    this.reset();
  }

  reset() {
    this._updateScore(0);
  }

  add(amount = 1) {
    const newScore = this.score + amount;
    this._updateScore(newScore);
  }

  remove(amount = 1) {
    const newScore = this.score - amount;
    this._updateScore(newScore);
  }

  _updateScore(newScore) {
    if (typeof newScore !== 'number') {
      throw new Error(`Invalid socore value: ${newScore}`);
    } if (newScore < 0) {
      this._blinkRed();
      return false;
    }

    const scoreDiff = newScore - this.score;
    if (scoreDiff > 0) {
      for (let i = 0; i < scoreDiff; i++) {
        this.turnController.next();
      }
    } else {
      const absoluteDiff = Math.abs(scoreDiff);
      for (let i = 0; i < absoluteDiff; i++) {
        this.turnController.prev();
      }
    }

    this.score = newScore;
    this.banner.textContent = newScore;
    return true;
  }

  _blinkRed() {
    console.log('Pretend it is blinking');
  }
}

class TurnController {
  constructor(turnContainer, playerCount = 2) {
    this.turnContainer = turnContainer;
    this.setParticipantCount(playerCount);
    this.reset();
  }

  reset() {
    this._setTurn(1);
  }

  next() {
    // Make counting start from 0;
    const currTurn = this.turn - 1;
    // Turn starting from zero.
    const nextTurnUnormalised = (currTurn + 1) % this.playerCount;
    // Turn starting from 1.
    const nextTurn = nextTurnUnormalised + 1;
    this._setTurn(nextTurn);
  }

  prev() {
    // Make counting start from 0;
    const currTurn = this.turn - 1;
    // Turn starting from zero.
    // We add playerCount to make the number never be negative.
    const prevTurnUnormalised = (this.playerCount + currTurn - 1) % this.playerCount;
    // Turn starting from 1.
    const prevTurn = prevTurnUnormalised + 1;
    this._setTurn(prevTurn);
  }

  setParticipantCount(playerCount) {
    if (typeof playerCount !== 'number') {
      throw new Error(`Invalid participant number: ${playerCount}`);
    }

    if ((playerCount % 2) !== 0) {
      console.error(`Invalid participant number: ${playerCount}.
        Participants number must be pair.`);
    }

    this.playerCount = playerCount;
  }

  _setTurn(turnNumber = 1) {
    if (typeof turnNumber !== 'number') {
      throw new Error(`Invalid turn number: ${turnNumber}`);
    }

    this.turn = turnNumber;
    this.turnContainer.textContent = turnNumber;
  }
}


function init() {
  const turnContainer = document.querySelector('.pp-header_turn');
  const turnController = new TurnController(turnContainer, 4);

  const banners = document.querySelectorAll('.pp-score_number');
  const addBtns = document.querySelectorAll('.pp-score_add');
  const removeBtns = document.querySelectorAll('.pp-score_remove');

  const score1 = new Score(banners[0], addBtns[0], removeBtns[0], turnController);
  const score2 = new Score(banners[1], addBtns[1], removeBtns[1], turnController);

  const resetBtn = document.querySelector('.pp-reset_button');
  resetBtn.addEventListener('click', () => {
    score1.reset();
    score2.reset();
    turnController.reset();
  });
}

init();
