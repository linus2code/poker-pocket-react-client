import React from 'react';

const Seat = ({ className, id, name, moneylbl, betLeft, betRight }) => {
  return (
  );
}

export default Seat;

Seat.prototype.initSeat = function () {
  this.setSeatFrameVisibility(false);
  this.setName("-");
  this.setMoney(0);
  this.setTimeBar(0);
  this.setBetFrameVisibility(false);
  this.setTotalBet(0);
  this.clearCards();
  this.setActionFrameVisibility(false);
  this.setDealerChipVisibility(false);
};

Seat.prototype.initAnimations = function () {
  this.seatCard0.classList.remove('magictime');
  this.seatCard0.classList.remove('puffIn');
  this.seatCard1.classList.remove('magictime');
  this.seatCard1.classList.remove('puffIn');
  this.seatCard0.style.animation = '';
  this.seatCard1.style.animation = '';
  this.seatCardView.style.animation = '';
  this.seatBetFrame.classList.remove('magictime');
  this.seatBetFrame.classList.remove('puffIn');
};

Seat.prototype.setSeatFrameVisibility = function (bool) {
  bool ? this.seatFrame.style.visibility = 'visible' : this.seatFrame.style.visibility = 'hidden'
};

Seat.prototype.clearCards = function () {
  this.seatCard0.style.backgroundImage = 'url()';
  this.seatCard1.style.backgroundImage = 'url()';
};

Seat.prototype.setCard0 = function (cardStr, playerId, isResultsCall, isMiddleOfTheGame) {
  if (enableSounds && !isMiddleOfTheGame) {
    playCardSlideSix.play();
  }
  if (playerId == CONNECTION_ID || isResultsCall) {
    this.seatCard0.style.backgroundImage = 'url(' + getCardResource(cardStr) + ')';
  } else {
    this.seatCard0.style.backgroundImage = 'url(' + imgFolder + 'card_top_red.png' + ')';
  }
  this.seatCard0.classList.toggle('magictime');
  this.seatCard0.classList.toggle('puffIn');
};

Seat.prototype.setCard1 = function (cardStr, playerId, isResultsCall, isMiddleOfTheGame) {
  if (enableSounds && !isMiddleOfTheGame) {
    playCardSlideSix.play();
  }
  if (playerId == CONNECTION_ID || isResultsCall) {
    this.seatCard1.style.backgroundImage = 'url(' + getCardResource(cardStr) + ')';
  } else {
    this.seatCard1.style.backgroundImage = 'url(' + imgFolder + 'card_top_red.png' + ')';
  }
  this.seatCard1.classList.toggle('magictime');
  this.seatCard1.classList.toggle('puffIn');
};

Seat.prototype.setName = function (name) {
  this.seatName.innerHTML = name;
};

Seat.prototype.setMoney = function (money) {
  this.seatMoney.innerHTML = Number(money).currencyFormat(2, '.', ',') + '$';
};

Seat.prototype.setTimeBar = function (progress) {
  this.seatTimeBar.style = 'width:' + progress + '%';
};

Seat.prototype.setBetFrameVisibility = function (bool) {
  bool ? this.seatBetFrame.style.visibility = 'visible' : this.seatBetFrame.style.visibility = 'hidden'
};

Seat.prototype.setTotalBet = function (value) {
  var previousValue = Number(this.seatTotalBet.innerHTML);
  if (value != previousValue && value != 0 && value != void 0) {
    // toastr["info"]("{ value change: " + value + " }");
    this.seatBetFrame.classList.toggle('magictime');
    this.seatBetFrame.classList.toggle('puffIn');
  }
  this.seatTotalBet.innerHTML = value;
};

Seat.prototype.seatStartWinningGlowAnimation = function () {
  this.seatCardView.style.animation = 'winnerPulse 0.5s infinite alternate';
};

Seat.prototype.seatStartWinningGlowCardAnimation = function (cardNumber) {
  cardNumber == 0 ? this.seatCard0.style.animation = 'slideUp 1.0s infinite alternate' :
    this.seatCard1.style.animation = 'slideUp 1.0s infinite alternate';
};

Seat.prototype.setActionFrameVisibility = function (bool) {
  bool ? this.seatActionFrame.style.visibility = 'visible' : this.seatActionFrame.style.visibility = 'hidden';
};

Seat.prototype.setActionFrameLastAction = function (actionStr) {
  var _this = this;
  this.setActionFrameVisibility(true);
  this.seatActionFrame.innerHTML = ''; // clean inner element's
  var textDiv = document.createElement('div'); // Create new div element
  textDiv.className = 'lastActionTexts magicTimeAction puffIn';
  textDiv.innerHTML = actionStr;
  this.seatActionFrame.appendChild(textDiv);
  hideLastActionAsync();

  async function hideLastActionAsync() {
    await sleep(1000);
    _this.setActionFrameVisibility(false);
  }
};

Seat.prototype.setDealerChipVisibility = function (bool) {
  bool ? this.seatDealerChip.style.visibility = 'visible' : this.seatDealerChip.style.visibility = 'hidden';
};


Seat.prototype.seatCollectChipsToPot = function () {
  var _this = this;
  this.seatBetFrame.style.animation = this.seatBetFrame.getAttribute('id').substring(0, 2) + 'ChipsToPot 0.5s alternate';
  console.log('collect pot full animation name was: ' + this.seatBetFrame.getAttribute('id').substring(0, 2) + 'ChipsToPot 0.5s alternate');
  setTimeout(function () {
    _this.seatBetFrame.style.animation = '';
    _this.setBetFrameVisibility(false);
  }, 500)
};

