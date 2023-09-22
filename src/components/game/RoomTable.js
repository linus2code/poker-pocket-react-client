import React from 'react';
import BoardCards from './BoardCards';
import SeatUI from './SeatUI';

const RoomTable = () => {
  return (
    <div id="pokerTable" className="poker-table">
      {/* <!-- Top layout --> */}
      <div className="row" style={{ height: '140px' }}>
        <div className="col">
          {/* <!-- Seat layout --> */}
          <SeatUI className="float-right" id={'s3'} name={'Seat 3'} moneylbl={'10,000$'} betRight />
          {/* <!-- /Seat --> */}
        </div>
        <div className="col-2">{/* <!-- POT INFO --> */}</div>
        <div className="col">
          {/* <!-- Seat layout --> */}
          <SeatUI className="float-left" id={'s4'} name={'Seat 4'} moneylbl={'10,000$'} betLeft />
          {/* <!-- /Seat --> */}
        </div>
      </div>

      {/* <!-- Middle layout --> */}
      <div className="row" style={{ height: '140px' }}>
        <div className="col">
          {/* <!-- Seat layout --> */}
          <SeatUI middle id={'s2'} name={'Seat 2'} moneylbl={'10,000$'} betRight />
          {/* <!-- /Seat --> */}
        </div>
        <div className="col-5">
          {/* <!-- MIDDLE CARDS --> */}
          <div style={{ marginTop: '15px', marginLeft: '20px' }}>
            <BoardCards />
          </div>
          {/* <!-- /MIDDLE CARDS --> */}
        </div>
        <div className="col">
          {/* <!-- Seat layout --> */}
          <SeatUI middle id={'s5'} name={'Seat 5'} moneylbl={'10,000$'} betLeft />
        </div>
      </div>

      {/* <!-- Bottom layout --> */}
      <div className="row" style={{ height: '140px' }}>
        <div className="col">
          <SeatUI className="float-right" id={'s1'} name={'Seat 1'} moneylbl={'10,000$'} betRight />
        </div>
        <div className="col-2">{/* <!-- Empty space --> */}</div>
        <div className="col">
          {/* <!-- Seat layout --> */}
          <SeatUI className="float-left" id={'s6'} name={'Seat 6'} moneylbl={'10,000$'} betLeft />
        </div>
      </div>
    </div>
  );
};

export default RoomTable;

// function Room() {
//   this.roomName = document.getElementById('roomName');
//   this.spectatorsCount = document.getElementById('spectatorsCount');
//   this.waitingPlayersCount = document.getElementById('waitingPlayersCount');
//   this.deckStatus = document.getElementById('deckStatus');
//   this.deckCardsBurned = document.getElementById('deckCardsBurned');
//   this.middleCards = [];
//   this.roomStatusText = document.getElementById('roomStatusText');
//   this.middleCard0 = document.getElementById('mC0');
//   this.middleCard1 = document.getElementById('mC1');
//   this.middleCard2 = document.getElementById('mC2');
//   this.middleCard3 = document.getElementById('mC3');
//   this.middleCard4 = document.getElementById('mC4');
//   this.totalPot = document.getElementById('totalPot');
//   this.minBet = document.getElementById('minBet');
//   this.foldBtn = document.getElementById('foldBtn');
//   this.checkBtn = document.getElementById('checkBtn');
//   this.raiseBtn = document.getElementById('raiseBtn');
// }

// function initRoom() {
//   room.middleCards = [];
//   room.clearMiddleCards();
//   room.setTotalPot(0);
//   room.setMinBet(0);
//   room.actionBtnVisibility(false, true);
//   room.middleCard0.classList.remove('magictime');
//   room.middleCard0.classList.remove('puffIn');
//   room.middleCard0.style.animation = '';
//   room.middleCard1.classList.remove('magictime');
//   room.middleCard1.classList.remove('puffIn');
//   room.middleCard1.style.animation = '';
//   room.middleCard2.classList.remove('magictime');
//   room.middleCard2.classList.remove('puffIn');
//   room.middleCard2.style.animation = '';
//   room.middleCard3.classList.remove('magictime');
//   room.middleCard3.classList.remove('puffIn');
//   room.middleCard3.style.animation = '';
//   room.middleCard4.classList.remove('magictime');
//   room.middleCard4.classList.remove('puffIn');
//   room.middleCard4.style.animation = '';
// }

// Room.prototype.setRoomStatusText = function (statusStr) {
//   this.roomStatusText.innerHTML = "Current status: " + statusStr;
// };

// Room.prototype.setRoomName = function (roomNameStr) {
//   this.roomName.innerHTML = "♦ " + roomNameStr;
// };

// Room.prototype.setRoomSpectatorCount = function (spectatorCount) {
//   this.spectatorsCount.innerHTML = "♦ Spectating: " + spectatorCount;
// };

// Room.prototype.setRoomWaitingPlayersCount = function (waitingPlayersCount) {
//   this.waitingPlayersCount.innerHTML = "♦ Waiting: " + waitingPlayersCount;
// };

// Room.prototype.setRoomDeckStatus = function (deckStatus) {
//   this.deckStatus.innerHTML = "♦ Deck: " + deckStatus;
// };

// Room.prototype.setRoomDeckBurnedCount = function (burnedCards) {
//   this.deckCardsBurned.innerHTML = "♦ Burned: " + burnedCards;
// };

// Room.prototype.setTotalPot = function (money) {
//   if (money > 0) {
//     this.totalPot.style.visibility = 'visible';
//     this.totalPot.innerHTML = Number(money).currencyFormat(2, '.', ',') + '$';
//   } else {
//     this.totalPot.style.visibility = 'hidden';
//   }
// };

// Room.prototype.setMinBet = function (money) {
//   if (money > 0) {
//     this.minBet.style.visibility = 'visible';
//     this.minBet.innerHTML = 'MB ' + Number(money).currencyFormat(2, '.', ',') + '$';
//   } else {
//     this.minBet.style.visibility = 'hidden';
//   }
// };

// // When calling situation occurs, swap check btn text to call (handled by statusUpdate call from server)
// Room.prototype.toggleCheckAndCall = function (isCallSituation) {
//   isCallSituation ? this.checkBtn.innerHTML = 'Call' : this.checkBtn.innerHTML = 'Check';
// };

// Room.prototype.actionBtnVisibility = function (visible, isInit) {
//   if (visible) {
//     if (this.foldBtn.style.visibility !== 'visible' && !isInit) {
//       if (enableSounds) {
//         playCardTakeOutFromPackageOne.play();
//       }
//     }
//     this.foldBtn.style.visibility = 'visible';
//     this.checkBtn.style.visibility = 'visible';
//     this.raiseBtn.style.visibility = 'visible';
//   } else {
//     if (this.foldBtn.style.visibility !== 'hidden' && !isInit) {
//       if (enableSounds) {
//         playCardTakeOutFromPackageOne.play();
//       }
//     }
//     this.foldBtn.style.visibility = 'hidden';
//     this.checkBtn.style.visibility = 'hidden';
//     this.raiseBtn.style.visibility = 'hidden';
//   }
// };

// Room.prototype.clearMiddleCards = function () {
//   this.middleCard0.style.backgroundImage = 'url()';
//   this.middleCard1.style.backgroundImage = 'url()';
//   this.middleCard2.style.backgroundImage = 'url()';
//   this.middleCard3.style.backgroundImage = 'url()';
//   this.middleCard4.style.backgroundImage = 'url()';
// };

// Room.prototype.setMiddleCard = function (number, isMiddleOfTheGame) {
//   if (enableSounds && !isMiddleOfTheGame) {
//     playCardSlideSix.play();
//   }
//   switch (number) {
//     case 0:
//       this.setMiddleCard0(this.middleCards[number]);
//       break;
//     case 1:
//       this.setMiddleCard1(this.middleCards[number]);
//       break;
//     case 2:
//       this.setMiddleCard2(this.middleCards[number]);
//       break;
//     case 3:
//       this.setMiddleCard3(this.middleCards[number]);
//       break;
//     case 4:
//       this.setMiddleCard4(this.middleCards[number]);
//       break;
//   }
// };

// Room.prototype.setMiddleCard0 = function (cardStr) {
//   this.middleCard0.style.backgroundImage = 'url(' + getCardResource(cardStr) + ')';
//   this.middleCard0.classList.toggle('magictime');
//   this.middleCard0.classList.toggle('puffIn');
// };

// Room.prototype.setMiddleCard1 = function (cardStr) {
//   this.middleCard1.style.backgroundImage = 'url(' + getCardResource(cardStr) + ')';
//   this.middleCard1.classList.toggle('magictime');
//   this.middleCard1.classList.toggle('puffIn');
// };

// Room.prototype.setMiddleCard2 = function (cardStr) {
//   this.middleCard2.style.backgroundImage = 'url(' + getCardResource(cardStr) + ')';
//   this.middleCard2.classList.toggle('magictime');
//   this.middleCard2.classList.toggle('puffIn');
// };

// Room.prototype.setMiddleCard3 = function (cardStr) {
//   this.middleCard3.style.backgroundImage = 'url(' + getCardResource(cardStr) + ')';
//   this.middleCard3.classList.toggle('magictime');
//   this.middleCard3.classList.toggle('puffIn');
// };

// Room.prototype.setMiddleCard4 = function (cardStr) {
//   this.middleCard4.style.backgroundImage = 'url(' + getCardResource(cardStr) + ')';
//   this.middleCard4.classList.toggle('magictime');
//   this.middleCard4.classList.toggle('puffIn');
// };

// Room.prototype.startWinnerCardGlowAnimation = function (cardNumber) {
//   switch (cardNumber) {
//     case 0:
//       this.middleCard0.style.animation = 'slideUp 1.0s infinite alternate';
//       break;
//     case 1:
//       this.middleCard1.style.animation = 'slideUp 1.0s infinite alternate';
//       break;
//     case 2:
//       this.middleCard2.style.animation = 'slideUp 1.0s infinite alternate';
//       break;
//     case 3:
//       this.middleCard3.style.animation = 'slideUp 1.0s infinite alternate';
//       break;
//     case 4:
//       this.middleCard4.style.animation = 'slideUp 1.0s infinite alternate';
//       break;
//   }
// };
