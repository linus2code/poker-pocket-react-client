import React, { useEffect, useContext } from 'react';
import gameContext from '@/context/game/gameContext';
import socketContext from '@/context/websocket/socketContext';
import NewRoom, {
  NewRoomInfo,
  NewBoard,
  NewCtrl,
  initRoom,
  statusUpdate,
} from '@/components/game/domains/Room';
import { setupSeats, initSeats } from '@/components/game/domains/Seat';
import Player from '@/components/game/domains/Player';
import { playChipsHandleFive } from '@/components/audio';
import RoomStatus from '@/components/game/RoomStatus';
import RoomTable from '@/components/game/RoomTable';
import BoardCards from '@/components/game/BoardCards';
import ActionControl from '@/components/game/ActionControl';

const Room = () => {
  const { connId, regRoomHandler } = useContext(socketContext);

  const {
    setPlayers,
    enableSounds,
    autoPlay,
    setActionButtonsEnabled,
    autoPlayCommandRequested,
    setRoomInfo,
    setBoard,
    setCtrl,
    setSeats,
  } = useContext(gameContext);

  useEffect(() => {
    // console.log('reg onRoomHandler');
    regRoomHandler(onRoomHandler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onRoomHandler(jsonData) {
    // console.log('onRoomHandler jsonData', jsonData);
    if (!jsonData) return;

    switch (jsonData.key) {
      case 'roomParams':
        // Example: {"playerCount":3,"roomMinBet":10,"middleCards":["Q♠","6♦","9♠","4♠"],"playersData":[{"playerId":0,"playerName":"Bot362","playerMoney":6462.5,"isDealer":false},{"playerId":1,"playerName":"Bot265","playerMoney":9902.5,"isDealer":false},{"playerId":2,"playerName":"Bot966","playerMoney":13500,"isDealer":true}]}
        roomParameters(jsonData.data);
        break;
      case 'holeCards':
        // Hole Cards  ({"players":[{"playerId":0,"cards":["3♠","4♥"]}]})
        holeCards(jsonData.data);
        break;
      case 'statusUpdate':
        // Status update ({"totalPot":30,"currentStatus":"Betting round 4","middleCards":["2♦","4♥","5♦","A♠","3♠"],"playersData":[{"playerId":1,"playerName":"Anon250","playerMoney":10000,"totalBet":0,"isPlayerTurn":false,"isFold":true,"timeBar":0},{"playerId":2,"playerName":"Anon93","playerMoney":9970,"totalBet":30,"isPlayerTurn":true,"isFold":false,"timeBar":0}],"isCallSituation":false,"isResultsCall":false})
        setRoomUpdate(jsonData.data);
        break;
      case 'lastUserAction':
        // Example: {"playerId":0,"actionText":"raise"}
        playerLastActionHandler(jsonData.data);
        break;
      case 'theFlop':
        // The Flop (theFlop: {"middleCards":["8♣","5♣","2♥"]})
        theFlop(jsonData.data);
        break;
      case 'theTurn':
        // The turn (theTurn: {"middleCards":["Q♦","J♥","3♥","6♠"]})
        theTurn(jsonData.data);
        break;
      case 'theRiver':
        // The river (theRiver: {"middleCards":["8♥","8♦","J♣","J♠","7♣"]})
        theRiver(jsonData.data);
        break;
      case 'collectChipsToPot':
        // collectChipsToPotAction(jsonData.data);
        break;
      case 'allPlayersCards':
        // allPlayersCards(jsonData.data);
        break;
      case 'audioCommand':
        // audioCommand(jsonData.data);
        break;
      default:
        return false;
    }
    return true;
  }

  const roomInfo = NewRoomInfo();
  const board = NewBoard(enableSounds);
  const ctrl = NewCtrl(enableSounds);
  const room = NewRoom(roomInfo, board, ctrl);

  let players = [];
  const seats = setupSeats();

  // init room data
  function roomParameters(rData) {
    console.log('Room params: ' + JSON.stringify(rData));
    initRoom(room);
    initSeats(seats);
    // getLoggedInUserStatistics(); // Added so refreshing xp needed counter updates automatically
    roomStatusParser(rData);
    boardParser(rData);
    setRoomInfo({ data: roomInfo });
    setBoard({ data: board });

    playerParser(rData);
    setSeats({ data: seats });
  }

  function roomStatusParser(rData) {}

  function boardParser(rData) {
    board.setMinBet(rData.roomMinBet);

    const gameStarted = rData.gameStarted;
    if (rData.middleCards?.length > 0) {
      for (let m = 0; m < rData.middleCards.length; m++) {
        board.middleCards[m] = rData.middleCards[m];
        board.setMiddleCard(m, gameStarted);
      }
    }

    return board;
  }

  function playerParser(rData) {
    const gameStarted = rData.gameStarted;
    const playerCount = rData.playerCount;

    var playerIds = [],
      playerNames = [],
      playerMoneys = [],
      playerIsDealer = [];
    for (var i = 0; i < rData.playersData.length; i++) {
      playerIds.push(Number(rData.playersData[i].playerId));
      playerNames.push(rData.playersData[i].playerName);
      playerMoneys.push(Number(rData.playersData[i].playerMoney));
      playerIsDealer.push(rData.playersData[i].isDealer);
    }

    switch (playerCount) {
      case 1:
        giveSeats(
          playerCount,
          [0],
          playerIds,
          playerNames,
          playerMoneys,
          playerIsDealer,
          gameStarted
        );
        break;
      case 2:
        giveSeats(
          playerCount,
          [0, 3],
          playerIds,
          playerNames,
          playerMoneys,
          playerIsDealer,
          gameStarted
        );
        break;
      case 3:
        giveSeats(
          playerCount,
          [0, 2, 3],
          playerIds,
          playerNames,
          playerMoneys,
          playerIsDealer,
          gameStarted
        );
        break;
      case 4:
        giveSeats(
          playerCount,
          [0, 2, 3, 5],
          playerIds,
          playerNames,
          playerMoneys,
          playerIsDealer,
          gameStarted
        );
        break;
      case 5:
        giveSeats(
          playerCount,
          [0, 1, 2, 3, 5],
          playerIds,
          playerNames,
          playerMoneys,
          playerIsDealer,
          gameStarted
        );
        break;
      case 6:
        giveSeats(
          playerCount,
          [0, 1, 2, 3, 4, 5, 6],
          playerIds,
          playerNames,
          playerMoneys,
          playerIsDealer,
          gameStarted
        );
        break;
      default:
        break;
    }
  }

  function giveSeats(
    playerCount,
    seatPositions,
    playerIds,
    playerNames,
    playerMoneys,
    playerIsDealer,
    gameStarted
  ) {
    players = []; // initialize array
    console.log('players initialize', players);

    for (let i = 0; i < playerCount; i++) {
      players.push(
        new Player(seats[seatPositions[i]], playerIds[i], playerNames[i], playerMoneys[i])
      );
      players[i].initPlayer(gameStarted);
      if (playerIsDealer[i] === true) {
        players[i].setPlayerAsDealer();
      }
    }
    console.log('players initialize end', players);

    return players;
  }

  // eslint-disable-next-line no-unused-vars
  function statusPlayerUpdate(sData, players) {
    for (let i = 0; i < sData.playersData.length; i++) {
      const playerRaw = sData.playersData[i];
      const pMoney = playerRaw.playerMoney;
      const pTotalBet = playerRaw.totalBet;
      const pTurn = playerRaw.isPlayerTurn;
      const pIsFold = playerRaw.isFold;
      const pTimeBar = playerRaw.timeBar;
      const pId = playerRaw.playerId;

      let player = players[i];
      if (player == null) {
        // problem occure
        console.log('player null', i);
        console.log('player null while ', playerRaw);
      }

      player.setTimeBar(pTimeBar);
      if (Number(pId) === Number(connId) && player.tempBet > 0) {
        // Hero Do nothing
      } else {
        player.setPlayerMoney(pMoney);
        if (sData.collectingPot === false) {
          player.setPlayerTotalBet(pTotalBet);
        }
      }
      if (pIsFold) {
        if (!player.isFold) {
          if (enableSounds) {
            // playCardFoldOne.play();
          }
          player.setPlayerFold();
        }
      }
      if (Number(pId) === Number(connId)) {
        // Hero
        player.setPlayerTurn(pTurn, sData.isCallSituation);
        ctrl.actionBtnVisibility(pTurn, false);

        setActionButtonsEnabled(true);
        if (pTurn && autoPlay && !autoPlayCommandRequested) {
          // getAutoPlayAction();
        }
      }
    }
    if (sData.isResultsCall) {
      // showdown round
      if (enableSounds) {
        playChipsHandleFive.play();
      }
      for (let i = 0; i < players.length; i++) {
        const player = players[i];

        player.tempBet = 0;
        player.setPlayerTotalBet(0);
        if (player.playerId !== connId) {
          // villain
          if (!player.isFold) {
            player.setPlayerCards();
            player.setShowCards(true);
            // trigger cards sound
          }
        }
        for (var w = 0; w < sData.roundWinnerPlayerIds.length; w++) {
          if (Number(sData.roundWinnerPlayerIds[w]) === Number(player.playerId)) {
            player.startWinnerGlowAnimation();
            if ('roundWinnerPlayerCards' in sData) {
              var cl = sData.roundWinnerPlayerCards.length;
              for (var c = 0; c < cl; c++) {
                player.startWinnerGlowCardsAnimation(sData.roundWinnerPlayerCards[c], board);
              }
            }
          }
        }
      }
    }

    setPlayers(players);
  }

  const setRoomUpdate = (sData) => {
    console.log('statusUpdate ', sData);

    statusUpdate(sData, room);
    setRoomInfo({ data: roomInfo });
    setCtrl({ data: ctrl });
    statusPlayerUpdate(sData, players);
    setSeats({ data: seats });
  };

  // ----------------------------------------------------
  function holeCards(pData) {
    for (let p = 0; p < pData.players.length; p++) {
      for (let i = 0; i < players.length; i++) {
        const playerRaw = pData.players[p];

        const player = players[i];
        if (Number(player.playerId) === Number(playerRaw.playerId)) {
          player.playerCards.push(playerRaw.cards[0]);
          player.playerCards.push(playerRaw.cards[1]);
        }
      }
    }
    holeCardsAsync();
  }

  async function holeCardsAsync() {
    for (let c = 0; c < 2; c++) {
      for (let i = 0; i < players.length; i++) {
        const player = players[i];
        if (!player.isFold) {
          // await sleep(300);
          player.setPlayerCards();
          player.setShowCards(false);
          // trigger cards sound
        }
      }
    }
  }

  // Handles last player action animation
  function playerLastActionHandler(aData) {
    //console.log(JSON.stringify(aData));
    for (let i = 0; i < players.length; i++) {
      const player = players[i];
      if (player.playerId === aData.playerId) {
        player.setPlayerActionText(aData.actionText);
      }
    }
  }

  async function theFlop(fData) {
    board.middleCards[0] = fData.middleCards[0];
    board.middleCards[1] = fData.middleCards[1];
    board.middleCards[2] = fData.middleCards[2];
    console.log('set theFlop');
    setBoard({ data: board });
  }

  async function theTurn(tData) {
    board.middleCards[3] = tData.middleCards[3];
    console.log('set theTurn');
    setBoard({ data: board });
  }

  function theRiver(rData) {
    console.log('set theRiver');

    board.middleCards[4] = rData.middleCards[4];
    setBoard({ data: board });
  }

  return (
    <>
      {/* {console.log('RE-RENDER Room')} */}
      <RoomStatus />
      {/* <!-- Poker table --> */}
      <RoomTable>
        <div style={{ marginTop: '15px', marginLeft: '20px' }}>
          <BoardCards />
        </div>
      </RoomTable>
      <ActionControl />
    </>
  );
};

export default Room;
