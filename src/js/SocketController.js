export default class SocketController {
  constructor(socket, turnController, ...scoreControllers) {
    this.scoreControllers = scoreControllers;
    this.socket = socket;

    socket.on('server score change', (newScore) => {
      console.log('Received change message');
      this.scoreControllers[0].setScore(newScore.team1Score, true);
      this.scoreControllers[1].setScore(newScore.team2Score, true);
      turnController.updateTurns();
    });

    scoreControllers.forEach((scoreController) => {
      scoreController.onScoreChange(() => {
        socket.emit('client score change', this._getScore());
        console.log('Emmitted change message');
      });
    });
  }

  _getScore() {
    const team1Score = this.scoreControllers[0].getScore();
    const team2Score = this.scoreControllers[1].getScore();
    return { team1Score, team2Score };
  }
}
