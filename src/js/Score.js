/* eslint-disable no-underscore-dangle */

export default class Score {
  constructor(banner, addBtn, removeBtn) {
    this.banner = banner;
    this.scoreChangeListeners = [];

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

  getScore() {
    return this.score;
  }

  setScore(newScore, noNotify) {
    return this._updateScore(newScore, noNotify);
  }

  _updateScore(newScore, noNotify) {
    if (typeof newScore !== 'number') {
      throw new Error(`Invalid socore value: ${newScore}`);
    } else if (newScore < 0) {
      this._blinkRed();
      return false;
    } else if (newScore === this.score) {
      return true;
    }

    this.score = newScore;
    this.banner.textContent = newScore;
    if (!noNotify) { this._notifyScoreChange(); }
    return true;
  }

  onScoreChange(fn) {
    if (typeof fn !== 'function') {
      throw new Error('onScoreChange: Argument must be a function.');
    }

    this.scoreChangeListeners.push(fn);
  }

  _notifyScoreChange() {
    this.scoreChangeListeners.forEach((fn) => {
      fn(this.score);
    });
  }

  _blinkRed() {
    console.log('Pretend it is blinking');
  }
}
