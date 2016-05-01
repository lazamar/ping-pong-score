'use strict'
var babelHelpers = {};

babelHelpers.classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

babelHelpers.createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

babelHelpers;

var Score = function () {
  function Score(banner, addBtn, removeBtn, turnController) {
    var _this = this;

    babelHelpers.classCallCheck(this, Score);

    this.banner = banner;
    this.turnController = turnController;

    this.addBtn = addBtn;
    this.addBtn.addEventListener('click', function () {
      _this.add(1);
    });

    this.removeBtn = removeBtn;
    this.removeBtn.addEventListener('click', function () {
      _this.remove(1);
    });

    this.score = 0;
    this.reset();
  }

  babelHelpers.createClass(Score, [{
    key: 'reset',
    value: function reset() {
      this._updateScore(0);
    }
  }, {
    key: 'add',
    value: function add() {
      var amount = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];

      var newScore = this.score + amount;
      this._updateScore(newScore);
    }
  }, {
    key: 'remove',
    value: function remove() {
      var amount = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];

      var newScore = this.score - amount;
      this._updateScore(newScore);
    }
  }, {
    key: '_updateScore',
    value: function _updateScore(newScore) {
      if (typeof newScore !== 'number') {
        throw new Error('Invalid socore value: ' + newScore);
      }if (newScore < 0) {
        this._blinkRed();
        return false;
      }

      var scoreDiff = newScore - this.score;
      if (scoreDiff > 0) {
        for (var i = 0; i < scoreDiff; i++) {
          this.turnController.next();
        }
      } else {
        var absoluteDiff = Math.abs(scoreDiff);
        for (var _i = 0; _i < absoluteDiff; _i++) {
          this.turnController.prev();
        }
      }

      this.score = newScore;
      this.banner.textContent = newScore;
      return true;
    }
  }, {
    key: '_blinkRed',
    value: function _blinkRed() {
      console.log('Pretend it is blinking');
    }
  }]);
  return Score;
}();

var TurnController = function () {
  function TurnController(turnContainer) {
    var playerCount = arguments.length <= 1 || arguments[1] === undefined ? 2 : arguments[1];
    babelHelpers.classCallCheck(this, TurnController);

    this.turnContainer = turnContainer;
    this.setParticipantCount(playerCount);
    this.reset();
  }

  babelHelpers.createClass(TurnController, [{
    key: 'reset',
    value: function reset() {
      this._setTurn(1);
    }
  }, {
    key: 'next',
    value: function next() {
      // Make counting start from 0;
      var currTurn = this.turn - 1;
      // Turn starting from zero.
      var nextTurnUnormalised = (currTurn + 1) % this.playerCount;
      // Turn starting from 1.
      var nextTurn = nextTurnUnormalised + 1;
      this._setTurn(nextTurn);
    }
  }, {
    key: 'prev',
    value: function prev() {
      // Make counting start from 0;
      var currTurn = this.turn - 1;
      // Turn starting from zero.
      // We add playerCount to make the number never be negative.
      var prevTurnUnormalised = (this.playerCount + currTurn - 1) % this.playerCount;
      // Turn starting from 1.
      var prevTurn = prevTurnUnormalised + 1;
      this._setTurn(prevTurn);
    }
  }, {
    key: 'setParticipantCount',
    value: function setParticipantCount(playerCount) {
      if (typeof playerCount !== 'number') {
        throw new Error('Invalid participant number: ' + playerCount);
      }

      if (playerCount % 2 !== 0) {
        console.error('Invalid participant number: ' + playerCount + '.\n        Participants number must be pair.');
      }

      this.playerCount = playerCount;
    }
  }, {
    key: '_setTurn',
    value: function _setTurn() {
      var turnNumber = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];

      if (typeof turnNumber !== 'number') {
        throw new Error('Invalid turn number: ' + turnNumber);
      }

      this.turn = turnNumber;
      this.turnContainer.textContent = turnNumber;
    }
  }]);
  return TurnController;
}();

function init() {
  var turnContainer = document.querySelector('.pp-header_turn');
  var turnController = new TurnController(turnContainer, 4);

  var banners = document.querySelectorAll('.pp-score_number');
  var addBtns = document.querySelectorAll('.pp-score_add');
  var removeBtns = document.querySelectorAll('.pp-score_remove');

  var score1 = new Score(banners[0], addBtns[0], removeBtns[0], turnController);
  var score2 = new Score(banners[1], addBtns[1], removeBtns[1], turnController);

  var resetBtn = document.querySelector('.pp-reset_button');
  resetBtn.addEventListener('click', function () {
    score1.reset();
    score2.reset();
    turnController.reset();
  });
}

init();
//# sourceMappingURL=main.js.map
