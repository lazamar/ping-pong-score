export default class SocketController {
  constructor(socket, ...scoreControllers) {
    this.scoreControllers = scoreControllers;
    this.socket = socket;

    socket.on('score change', (newScore) => {
      this.scoreControllers[0].setScore(newScore.team1Score);
      this.scoreControllers[1].setScore(newScore.team2Score);
    });

    scoreControllers.forEach((scoreController) => {
      scoreController.onScoreChange(() => {
        socket.emit('score change', this._getScore());
      });
    });
  }

  _getScore() {
    const team1Score = this.scoreControllers[0].getScore();
    const team2Score = this.scoreControllers[1].getScore();
    return { team1Score, team2Score };
  }
}
