import { playCardTakeOutFromPackageOne, playCardSlideSix } from '@/components/audio';

const animateMiddleCard0 = (middleCard) => {
  // middleCard.style.animation = 'slideUp 1.0s infinite alternate';
};

export const NewBoard = (enableSounds) => {
  let totalPot = 240;
  let minBet = 100;

  const middleCards = [];
  for (let m = 0; m < 5; m++) {
    middleCards.push(null);
  }

  const resetMiddleCards = () => {
    for (let m = 0; m < middleCards.length; m++) {
      middleCards[m] = null;
    }
  };

  const setMiddleCard = (number, isMiddleOfTheGame) => {
    if (enableSounds && !isMiddleOfTheGame) {
      playCardSlideSix.play();
    }
  };

  const startWinnerCardGlowAnimation = (cardNumber) => {
    if (cardNumber < 0 || cardNumber > 5) return;
    animateMiddleCard0(middleCards[cardNumber]);
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
    resetMiddleCards,
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
  initCtrl(room.ctrl);
};

export const initBoard = (board) => {
  board.setTotalPot(0);
  board.setMinBet(0);
  board.resetMiddleCards();
};

export const initCtrl = (ctrl) => {
  ctrl.actionBtnVisibility(false, true);
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
