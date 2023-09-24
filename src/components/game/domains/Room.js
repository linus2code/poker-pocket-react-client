// import { getCardResource } from './CardRes';
import { playCardTakeOutFromPackageOne, playCardSlideSix } from '@/components/audio';

/*
const setMiddleCard0 = (cardStr, middleCard) => {
  middleCard.style.backgroundImage = 'url(' + getCardResource(cardStr) + ')';
  middleCard.classList.toggle('magictime');
  middleCard.classList.toggle('puffIn');
};
*/

const clearMiddleCard0 = (middleCard) => {
  middleCard.style.backgroundImage = 'url()';
};

const animateMiddleCard0 = (middleCard) => {
  // middleCard.style.animation = 'slideUp 1.0s infinite alternate';
};

export const NewBoard = (enableSounds) => {
  let totalPot = 240;
  let minBet = 100;

  const middleCards = [];
  let middleCard0 = null;
  let middleCard1 = null;
  let middleCard2 = null;
  let middleCard3 = null;
  let middleCard4 = null;

  // middleCards.push(middleCard0);
  // middleCards.push(middleCard1);
  // middleCards.push(middleCard2);
  // middleCards.push(middleCard3);
  // middleCards.push(middleCard4);

  const clearMiddleCards = () => {
    clearMiddleCard0(middleCard0);
    clearMiddleCard0(middleCard1);
    clearMiddleCard0(middleCard2);
    clearMiddleCard0(middleCard3);
    clearMiddleCard0(middleCard4);
  };

  const setMiddleCard = (number, isMiddleOfTheGame) => {
    if (enableSounds && !isMiddleOfTheGame) {
      playCardSlideSix.play();
    }
    switch (number) {
      case 0:
        middleCards[number] = middleCard0;
        // setMiddleCard0(middleCards[number], middleCard0);
        break;
      case 1:
        middleCards[number] = middleCard1;
        // setMiddleCard0(middleCards[number], middleCard1);
        break;
      case 2:
        middleCards[number] = middleCard2;
        // setMiddleCard0(middleCards[number], middleCard2);
        break;
      case 3:
        middleCards[number] = middleCard3;
        // setMiddleCard0(middleCards[number], middleCard3);
        break;
      case 4:
        middleCards[number] = middleCard4;
        // setMiddleCard0(middleCards[number], middleCard4);
        break;
      default:
        break;
    }
  };

  const startWinnerCardGlowAnimation = (cardNumber) => {
    switch (cardNumber) {
      case 0:
        animateMiddleCard0(middleCard0);
        break;
      case 1:
        animateMiddleCard0(middleCard1);
        break;
      case 2:
        animateMiddleCard0(middleCard2);
        break;
      case 3:
        animateMiddleCard0(middleCard3);
        break;
      case 4:
        animateMiddleCard0(middleCard4);
        break;
      default:
        break;
    }
  };

  const setTotalPot = (money) => {
    if (money > 0) {
      totalPot = money;
    }
  };

  const getTotalPot = () => {
    return totalPot;
  };

  const setMinBet = (money) => {
    if (money > 0) {
      minBet = money;
    }
  };

  const getMinBet = () => {
    return minBet;
  };

  return {
    middleCards,
    setTotalPot,
    getTotalPot,
    setMinBet,
    getMinBet,
    clearMiddleCards,
    setMiddleCard,
    startWinnerCardGlowAnimation,
  };
};

export const NewRoomInfo = () => {
  let roomName = '♦ Default room';
  let spectatorsCount = '♦ Spectating: 0';
  let waitingPlayersCount = '♦ Waiting: 0';
  let deckStatus = '♦ Deck: -';
  let deckCardsBurned = '♦ Burned: -';
  let roomStatusText = 'Wait for parameters...';

  const setRoomStatusText = (statusStr) => {
    roomStatusText = statusStr;
  };

  const getRoomStatusText = () => {
    return roomStatusText;
  };

  const setRoomName = (val) => {
    roomName = '♦ ' + val;
  };

  const getRoomName = () => {
    return roomName;
  };

  const setRoomSpectatorCount = (val) => {
    spectatorsCount = '♦ Spectating: ' + val;
  };

  const getRoomSpectatorCount = () => {
    return spectatorsCount;
  };

  const setRoomWaitingPlayersCount = (val) => {
    waitingPlayersCount = '♦ Waiting: ' + val;
  };

  const getRoomWaitingPlayersCount = () => {
    return waitingPlayersCount;
  };

  const setRoomDeckStatus = (val) => {
    deckStatus = '♦ Deck: ' + val;
  };

  const getRoomDeckStatus = () => {
    return deckStatus;
  };

  const setRoomDeckBurnedCount = (val) => {
    deckCardsBurned = '♦ Burned: ' + val;
  };

  const getRoomDeckBurnedCount = () => {
    return deckCardsBurned;
  };

  return {
    getRoomStatusText,
    getRoomName,
    getRoomSpectatorCount,
    getRoomWaitingPlayersCount,
    getRoomDeckStatus,
    getRoomDeckBurnedCount,
    setRoomStatusText,
    setRoomName,
    setRoomSpectatorCount,
    setRoomWaitingPlayersCount,
    setRoomDeckStatus,
    setRoomDeckBurnedCount,
  };
};

export const NewCtrl = (enableSounds) => {
  let isFoldBtn = true;
  let isCheckBtn = true;
  let isRaiseBtn = true;
  let isCallSituation = true;
  // When calling situation occurs, swap check btn text to call (handled by statusUpdate call from server)
  const toggleCheckAndCall = (val) => {
    isCallSituation = val;
  };

  const actionBtnVisibility = (visible, isInit) => {
    if (visible) {
      if (!isFoldBtn && !isInit) {
        if (enableSounds) {
          playCardTakeOutFromPackageOne.play();
        }
      }
      isFoldBtn = true;
      isCheckBtn = true;
      isRaiseBtn = true;
    } else {
      if (isFoldBtn && !isInit) {
        if (enableSounds) {
          playCardTakeOutFromPackageOne.play();
        }
      }
      isFoldBtn = false;
      isCheckBtn = false;
      isRaiseBtn = false;
    }
  };

  return {
    isCallSituation,
    isFoldBtn,
    isCheckBtn,
    isRaiseBtn,
    toggleCheckAndCall,
    actionBtnVisibility,
  };
};

const NewRoom = (roomInfo, board, ctrl) => {
  return {
    roomInfo,
    board,
    ctrl,
  };
};

export const initRoom = (room) => {
  initBoard(room.board);

  room.setTotalPot(0);
  room.setMinBet(0);
  room.ctrl.actionBtnVisibility(false, true);
};

export const initBoard = (board) => {
  board.middleCards = [];
  board.clearMiddleCards();
  // board.middleCard0.classList.remove('magictime');
  // board.middleCard0.classList.remove('puffIn');
  // board.middleCard0.style.animation = '';
  // board.middleCard1.classList.remove('magictime');
  // board.middleCard1.classList.remove('puffIn');
  // board.middleCard1.style.animation = '';
  // board.middleCard2.classList.remove('magictime');
  // board.middleCard2.classList.remove('puffIn');
  // board.middleCard2.style.animation = '';
  // board.middleCard3.classList.remove('magictime');
  // board.middleCard3.classList.remove('puffIn');
  // board.middleCard3.style.animation = '';
  // board.middleCard4.classList.remove('magictime');
  // board.middleCard4.classList.remove('puffIn');
  // board.middleCard4.style.animation = '';
};

// ----------------------------------------------------
export const statusUpdate = (sData, room) => {
  const roomInfo = room.roomInfo;
  roomInfo.setRoomStatusText(sData.currentStatus);
  roomInfo.setRoomName(sData.roomName);
  roomInfo.setRoomSpectatorCount(sData.spectatorsCount);
  roomInfo.setRoomWaitingPlayersCount(sData.appendPlayersCount);
  roomInfo.setRoomDeckStatus(sData.deckStatus);
  roomInfo.setRoomDeckBurnedCount(sData.deckCardsBurned);

  const board = room.board;
  board.setTotalPot(sData.totalPot);

  const ctrl = room.ctrl;
  ctrl.toggleCheckAndCall(sData.isCallSituation);
};

export default NewRoom;
