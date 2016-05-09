export default class TurnController {
  constructor(turnContainer, playerCount = 2, ...scoreCounters) {
    this.turnContainer = turnContainer;
    this.scoreCounters = scoreCounters;
    this.setParticipantCount(playerCount);
    this.updateTurns();

    scoreCounters.forEach((scoreCounter) => {
      scoreCounter.onScoreChange(() => {
        this.updateTurns();
      });
    });
  }

  // reset() {
  //   this._setTurn(1);
  // }
  //
  // next() {
  //   // Make counting start from 0;
  //   const currTurn = this.turn - 1;
  //   // Turn starting from zero.
  //   const nextTurnUnormalised = (currTurn + 1) % this.playerCount;
  //   // Turn starting from 1.
  //   const nextTurn = nextTurnUnormalised + 1;
  //   this._setTurn(nextTurn);
  // }
  //
  // prev() {
  //   // Make counting start from 0;
  //   const currTurn = this.turn - 1;
  //   // Turn starting from zero.
  //   // We add playerCount to make the number never be negative.
  //   const prevTurnUnormalised = (this.playerCount + currTurn - 1) % this.playerCount;
  //   // Turn starting from 1.
  //   const prevTurn = prevTurnUnormalised + 1;
  //   this._setTurn(prevTurn);
  // }

  updateTurns() {
    let pointsSum = 0;
    this.scoreCounters.forEach((scoreCounter) => {
      pointsSum += scoreCounter.getScore();
    });

    // Plus one because turns begin from 1 and not from 0.
    const turn = (pointsSum % this.playerCount) + 1;
    this._setTurn(turn);
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
