import React, { useEffect, useContext, useMemo, useRef } from 'react';
import { toast } from 'react-toastify';
import socketContext from '@/context/websocket/socketContext';
import roomContext from '@/context/room/roomContext';

const StyledBetBtn = ({ onClick, label }) => {
  return (
    <button onClick={onClick} type="button" className="btn btn-danger" style={{ margin: '0 2px' }}>
      {label}
    </button>
  );
};

const StyledActBtn = ({ className, onClick, label }) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className={`btn btn-danger ${className || ''}`}
      style={{ margin: '0 2px' }}
    >
      {label}
    </button>
  );
};

const TurnControl = () => {
  const { socket, connId, socketKey } = useContext(socketContext);
  const { roomId, ctrl, players, heroTurn, autoCheck, autoPlay } = useContext(roomContext);

  useEffect(() => {
    if (socket) {
      socket.handle('autoPlayActionResult', (jsonData) => autoPlayActionResult(jsonData.data));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  useEffect(() => {
    const hero = heroTurn.data;
    if (autoCheck && hero && hero.isPlayerTurn) {
      checkBtnClick(hero);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoCheck, heroTurn]);

  const autoPlayCommandRequested = useRef(null);

  useEffect(() => {
    const hero = heroTurn.data;
    if (autoPlay && hero && hero.isPlayerTurn && !autoPlayCommandRequested.current) {
      getAutoPlayAction();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoPlay, heroTurn]);

  // If auto play enabled, request action via this function
  function getAutoPlayAction() {
    if (socket) {
      autoPlayCommandRequested.current = true;
      console.log('# Requesting auto play action');
      const data = JSON.stringify({
        connectionId: connId,
        socketKey: socketKey,
        key: 'autoPlayAction',
      });
      socket.send(data);
    }
  }

  // AutoPlay action result parser
  function autoPlayActionResult(aData) {
    // console.log(JSON.stringify(aData));
    // example {"action":"bot_call","amount":0}
    console.log('AutoPlay action: ' + aData.action);

    switch (aData.action) {
      case 'bot_fold':
        setFold();
        break;
      case 'bot_check':
        setCheck();
        break;
      case 'bot_call':
        setCheck();
        break;
      case 'bot_raise':
        setRaise(aData.amount);
        break;
      case 'remove_bot': // Bot run out of money
        toast.error('Run out of money basically'); // location.reload();
        break;
      default:
        setCheck();
        break;
    }
    autoPlayCommandRequested.current = false; // reset always
  }

  function setFold() {
    if (socket) {
      const data = JSON.stringify({
        connectionId: connId,
        socketKey: socketKey,
        key: 'setFold',
        roomId: roomId,
      });
      socket.send(data);
    }
  }

  function setCheck() {
    if (socket) {
      const data = JSON.stringify({
        connectionId: connId,
        socketKey: socketKey,
        key: 'setCheck',
        roomId: roomId,
      });
      socket.send(data);
    }
  }

  function setRaise(amount) {
    if (socket && amount > 0) {
      const data = JSON.stringify({
        connectionId: connId,
        socketKey: socketKey,
        key: 'setRaise',
        roomId: roomId,
        amount: amount,
      });
      socket.send(data);
    }
  }

  function raiseHelper(amount, allIn) {
    for (let i = 0; i < players.length; i++) {
      const player = players[i];
      if (player.playerId === connId && player.isPlayerTurn && Number(player.playerMoney) > 0) {
        if (!allIn) {
          if (player.playerMoney + player.tempBet > 0) {
            const playerTotalBet = player.playerTotalBet + amount;
            const playerMoney = player.playerMoney - amount;
            player.tempBet = player.tempBet + amount;
            player.setPlayerMoney(playerMoney);
            player.setPlayerTotalBet(playerTotalBet);
          } else {
            toast.error('Not enough money to raise!');
            return;
          }
        } else {
          const playerTotalBet = player.playerMoney + player.tempBet;
          const playerMoney = 0;
          player.tempBet = player.playerMoney + player.tempBet;
          player.setPlayerMoney(playerMoney);
          player.setPlayerTotalBet(playerTotalBet);
        }
        // if (enableSounds) {
        //   playCardPlaceChipsOne.play();
        // }
      }
    }
  }

  function betTenClick() {
    raiseHelper(10, false);
  }

  function betTwentyFiveClick() {
    raiseHelper(25, false);
  }

  function betOneHundredClick() {
    raiseHelper(100, false);
  }

  function betFiveHundredClick() {
    raiseHelper(500, false);
  }

  function betAllInClick() {
    raiseHelper(0, true);
  }

  function myRaiseHelper() {
    const hero = heroTurn.data;
    if (hero) {
      const rTempBet = hero.tempBet;
      hero.tempBet = 0;
      return rTempBet;
    }
    return 0;
  }

  function foldBtnClick(hero) {
    if (hero && hero.isPlayerTurn) {
      setFold();
    }
  }

  function checkBtnClick(hero) {
    if (hero && hero.isPlayerTurn) {
      if (hero.tempBet > 0) {
        toast.info('You have already thrown chips in... raising...');

        const rTempBet = hero.tempBet;
        hero.tempBet = 0;
        setRaise(rTempBet);
      } else {
        setCheck();
      }
    }
  }

  function raiseBtnClick(hero) {
    if (hero && hero.isPlayerTurn) {
      const chips = myRaiseHelper();
      setRaise(chips);
    }
  }

  const view = useMemo(() => {
    const current = ctrl.data;
    const hero = heroTurn.data;

    return (
      // <!-- Bottom controls -->
      <div
        className="card"
        style={{ backgroundColor: '#434343', width: '100%', marginTop: '-20px' }}
      >
        {/* {console.log('RE-RENDER TurnControl', hero)} */}
        <div className="container" style={{ width: '100%', padding: '10px', marginLeft: '10%' }}>
          <div className="row" style={{ width: '100%' }}>
            <div className="col">
              <StyledBetBtn onClick={betTenClick} label="+10" />
              <StyledBetBtn onClick={betTwentyFiveClick} label="+25" />
              <StyledBetBtn onClick={betOneHundredClick} label="+100" />
              <StyledBetBtn onClick={betFiveHundredClick} label="+500" />
              <StyledBetBtn onClick={betAllInClick} label="All In" />
            </div>
            {!autoCheck && !autoPlay && hero && hero.isPlayerTurn ? (
              <div className="col">
                <StyledActBtn
                  onClick={() => foldBtnClick(hero)}
                  className={`${current.isFoldBtn ? 'ctrl-btn-visiable' : 'ctrl-btn-hide'}`}
                  label="Fold"
                />
                {/* When calling situation occurs, swap check btn text to call (handled by statusUpdate call from server) */}
                <StyledActBtn
                  onClick={() => checkBtnClick(hero)}
                  className={`${current.isCheckBtn ? 'ctrl-btn-visiable' : 'ctrl-btn-hide'}`}
                  label={current.isCallSituation ? 'Call' : 'Check'}
                />
                <StyledActBtn
                  onClick={() => raiseBtnClick(hero)}
                  className={`${current.isRaiseBtn ? 'ctrl-btn-visiable' : 'ctrl-btn-hide'}`}
                  label="Raise"
                />
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ctrl, heroTurn, autoCheck, autoPlay]);

  return view;
};

export default TurnControl;
