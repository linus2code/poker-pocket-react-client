// Constructor
export default function Player(playerSeat_, playerId_, playerName_, playerMoney_) {
  this.playerSeat = playerSeat_;
  this.playerId = playerId_;
  this.playerName = playerName_;
  this.playerMoney = playerMoney_;
  this.playerTotalBet = 0;
  this.tempBet = 0;
  this.playerCards = [];
  this.isPlayerTurn = false;
  this.isFold = false;
  this.isDealer = false;
  this.isCallSituation = false;
}

// ???
Player.prototype.initPlayer = function (isMiddleOfTheGame) {
  this.setPlayerSeatVisibility();
  this.setPlayerName();
  this.setPlayerMoney();
  if (isMiddleOfTheGame) {
    // TODO: why knows cards ?
    this.setPlayerCards();
    this.setShowCards(false);
  }
};

Player.prototype.setPlayerSeatVisibility = function () {
  this.playerSeat.setSeatFrameVisibility(true);
};

Player.prototype.setPlayerName = function () {
  this.playerSeat.setName(this.playerName);
};

Player.prototype.setPlayerMoney = function (amount) {
  this.playerMoney = amount;
  this.playerSeat.setMoney(amount);
};

Player.prototype.setPlayerTotalBet = function (value) {
  this.playerTotalBet = value;
  this.playerSeat.setTotalBet(value);
  this.playerTotalBet > 0
    ? this.playerSeat.setBetFrameVisibility(true)
    : this.playerSeat.setBetFrameVisibility(false);
};

Player.prototype.setPlayerTurn = function (isPlayerTurn, isCallSituation) {
  this.isCallSituation = isCallSituation;
  this.isPlayerTurn = isPlayerTurn;
  this.playerSeat.setTurn(isPlayerTurn);
};

Player.prototype.setTimeBar = function (time) {
  this.playerSeat.setTimeBar(time);
};

Player.prototype.setPlayerFold = function () {
  this.isFold = true;
  this.isPlayerTurn = false;
  this.playerSeat.setFold(true);
  this.playerSeat.setTurn(false);
  this.playerSeat.setTimeBar(0);
  this.playerSeat.clearCards();
};

Player.prototype.setPlayerCards = function () {
  this.playerSeat.setCards(this.playerCards[0], this.playerCards[1]);
};

Player.prototype.setShowCards = function (bool) {
  this.playerSeat.setShowCards(bool);
};

// Starts glow animation on seat surroundings
Player.prototype.startWinnerGlowAnimation = function () {
  this.playerSeat.seatStartWinningGlowAnimation();
};

Player.prototype.setPlayerActionText = function (actionStr) {
  this.playerSeat.setLastAction(actionStr);
};

Player.prototype.setPlayerAsDealer = function () {
  this.isDealer = true;
  this.playerSeat.setDealerChipVisibility(true);
};

// Cards that were responsible for output result comes in as winningCards
Player.prototype.startWinnerGlowCardsAnimation = function (winningCards, winningBoards) {
  for (let i = 0; i < winningCards.length; i++) {
    if (winningCards[i] != null || winningCards[i] !== 'null') {
      switch (winningCards[i]) {
        case this.playerCards[0]:
          this.playerSeat.seatStartWinningGlowCardAnimation(0);
          break;
        case this.playerCards[1]:
          this.playerSeat.seatStartWinningGlowCardAnimation(1);
          break;
        case winningBoards.middleCards[0]:
          winningBoards.startWinnerCardGlowAnimation(0);
          break;
        case winningBoards.middleCards[1]:
          winningBoards.startWinnerCardGlowAnimation(1);
          break;
        case winningBoards.middleCards[2]:
          winningBoards.startWinnerCardGlowAnimation(2);
          break;
        case winningBoards.middleCards[3]:
          winningBoards.startWinnerCardGlowAnimation(3);
          break;
        case winningBoards.middleCards[4]:
          winningBoards.startWinnerCardGlowAnimation(4);
          break;
        default:
          break;
      }
    }
  }
};
