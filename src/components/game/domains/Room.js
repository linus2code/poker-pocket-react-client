import { playCardTakeOutFromPackageOne, playCardSlideSix } from '@/components/audio';

export const NewBoard = (enableSounds) => {
  let totalPot = 240;
  let minBet = 100;

  const middleCards = [];
  const middleCardsSlideUp = [];
  for (let m = 0; m < 5; m++) {
    middleCards.push(null);
    middleCardsSlideUp.push(null);
  }

  const resetMiddleCards = () => {
    for (let m = 0; m < middleCards.length; m++) {
      middleCards[m] = null;
      middleCardsSlideUp[m] = false;
    }
  };

  const setMiddleCard = (number, cardStr, isMiddleOfTheGame) => {
    if (enableSounds && !isMiddleOfTheGame) {
      playCardSlideSix.play();
    }

    middleCards[number] = cardStr;
  };

  const startWinnerCardGlowAnimation = (cardNumber) => {
    if (cardNumber < 0 || cardNumber > 4) return;

    middleCardsSlideUp[cardNumber] = true;
  };

  const setTotalPot = (money) => {
    totalPot = money;
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
    middleCardsSlideUp,
    setTotalPot,
    getTotalPot,
    setMinBet,
    getMinBet,
    resetMiddleCards,
    setMiddleCard,
    startWinnerCardGlowAnimation,
  };
};

export const initBoard = (board) => {
  board.setTotalPot(0);
  board.setMinBet(0);
  board.resetMiddleCards();
};

export const NewRoomInfo = () => {
  let roomName = '♦ Default room';
  let spectatorsCount = '♦ Spectating: 0';
  let waitingPlayersCount = '♦ Waiting: 0';
  let deckStatus = '♦ Deck: -';
  let deckCardsBurned = '♦ Burned: -';
  let roomStatusText = 'Wait for parameters...';
  let roomTurnText = 'No Turn...';

  const setRoomStatusText = (statusStr) => {
    roomStatusText = statusStr;
  };

  const getRoomStatusText = () => {
    return roomStatusText;
  };

  const setRoomTurnText = (turnStr) => {
    roomTurnText = turnStr;
  };

  const getRoomTurnText = () => {
    return roomTurnText;
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
    getRoomTurnText,
    getRoomName,
    getRoomSpectatorCount,
    getRoomWaitingPlayersCount,
    getRoomDeckStatus,
    getRoomDeckBurnedCount,
    setRoomStatusText,
    setRoomTurnText,
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

export const initCtrl = (ctrl) => {
  ctrl.actionBtnVisibility(false, true);
};

const NewRoom = (roomInfo, board, ctrl) => {
  return {
    roomInfo,
    board,
    ctrl,
  };
};

// ----------------------------------------------------
export const roomUpdate = (sData, room) => {
  const roomInfo = room.roomInfo;
  roomInfo.setRoomStatusText(sData.currentStatus);
  roomInfo.setRoomTurnText(sData.currentTurnText);
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
