export default class SocketController {
  constructor(socket, score1, score2) {
    this.score1 = score1;
    this.score2 = score2;
    this.socket = socket;

    socket.on('score change', (newScore) => {
      this.score1.setScore(newScore.team1Score);
      this.score2.setScore(newScore.team2Score);
    });

    score1.onScoreChange(() => {
      socket.emit('score change', this.getScore());
    });

    score2.onScoreChange(() => {
      socket.emit('score change', this.getScore());
    });
  }

  _getScore(score1 = this.score1, score2 = this.score2) {
    return {
      team1Score: score1,
      team2Score: score2,
    };
  }
}
