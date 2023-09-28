/* Seat related */
export function setupSeats() {
  const seats = [];
  seats.push(new Seat('s1SeatFrame', 's1CardView', 'Seat 1')); // 1
  seats.push(new Seat('s2SeatFrame', 's2CardView', 'Seat 2')); // 2
  seats.push(new Seat('s3SeatFrame', 's3CardView', 'Seat 3')); // 3
  seats.push(new Seat('s4SeatFrame', 's4CardView', 'Seat 4')); // 4
  seats.push(new Seat('s5SeatFrame', 's5CardView', 'Seat 5')); // 5
  seats.push(new Seat('s6SeatFrame', 's6CardView', 'Seat 6')); // 6

  return seats;
}

export function initSeats(seats) {
  for (let i = 0; i < seats.length; i++) {
    const seat = seats[i];
    seat.initSeat();
  }
}

export default function Seat(seatId, elemCardView, seatName) {
  this.id = seatId;
  this.refreshLastAction = null;
  this.seatFrame = true;
  // null: no card; '': hide cards
  this.seatCard0 = '';
  this.seatCard1 = '';
  this.seatIsFold = false;
  this.seatShowCards = false;
  this.seatCardView = document.getElementById(elemCardView);
  this.seatName = seatName;
  this.seatMoney = 10000;
  this.seatTurn = false;
  this.seatTimeBar = 5000;
  this.seatBetFrame = true;
  this.seatTotalBet = 10000;
  this.seatDoBet = false;
  this.seatLastAction = 'Check';
  this.cardAnimation = false;
  this.seatDealerChip = true;
  this.seatCollectChips = true;
  this.seatWinningGlowCard0 = false;
  this.seatWinningGlowCard1 = false;
}

Seat.prototype.initSeat = function () {
  this.refreshLastAction = {};
  this.setSeatFrameVisibility(false);
  this.setName('-');
  this.setMoney(0);
  this.setFold(false);
  this.setTurn(false);
  this.setTimeBar(0);
  this.setBetFrameVisibility(false);
  this.setTotalBet(0);
  this.setShowCards(false);
  this.resetCards();
  this.seatDealerChip = false;
  this.setLastAction(null);
  this.setDealerChipVisibility(false);
  this.cardAnimation = false;
  this.seatWinningGlowCard0 = false;
  this.seatWinningGlowCard1 = false;
};

Seat.prototype.setSeatFrameVisibility = function (bool) {
  this.seatFrame = bool;
};

Seat.prototype.resetCards = function () {
  this.seatCard0 = '';
  this.seatCard1 = '';
};

Seat.prototype.clearCards = function () {
  this.seatCard0 = null;
  this.seatCard1 = null;
};

Seat.prototype.setCards = function (cardStr0, cardStr1) {
  this.seatCard0 = cardStr0;
  this.seatCard1 = cardStr1;
};

Seat.prototype.setShowCards = function (bool) {
  this.seatShowCards = bool;
};

Seat.prototype.setName = function (name) {
  this.seatName = name;
};

Seat.prototype.setMoney = function (money) {
  this.seatMoney = money;
};

Seat.prototype.setFold = function (bool) {
  this.seatIsFold = bool;
};

Seat.prototype.setTurn = function (bool) {
  this.seatTurn = bool;
};

Seat.prototype.setTimeBar = function (time) {
  this.seatTimeBar = time;
};

Seat.prototype.setBetFrameVisibility = function (bool) {
  this.seatBetFrame = bool;
};

Seat.prototype.setTotalBet = function (value) {
  const previousValue = this.seatTotalBet;
  if (value !== previousValue && value !== 0 && value !== void 0) {
    this.seatDoBet = true;
  }
  this.seatTotalBet = value;
};

Seat.prototype.seatStartWinningGlowAnimation = function () {
  this.cardAnimation = true;
};

Seat.prototype.seatStartWinningGlowCardAnimation = function (cardNumber) {
  cardNumber === 0 ? (this.seatWinningGlowCard0 = true) : (this.seatWinningGlowCard1 = true);
};

Seat.prototype.setLastAction = function (actionStr) {
  this.seatLastAction = actionStr;
};

Seat.prototype.setDealerChipVisibility = function (bool) {
  this.seatDealerChip = bool;
};

Seat.prototype.seatCollectChipsToPot = function () {
  this.seatCollectChips = true;
  var _this = this;
  setTimeout(function () {
    _this.seatCollectChips = false;
    _this.setBetFrameVisibility(false);
    // TODO: trigger render
  }, 500);
};
