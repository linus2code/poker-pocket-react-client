import React, { useContext, useMemo } from 'react';
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
  const { roomId, ctrl, players, heroTurn } = useContext(roomContext);

  let isloading = false;

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
      socket.send(
        JSON.stringify({
          connectionId: connId,
          socketKey: socketKey,
          key: 'setCheck',
          roomId: roomId,
        })
      );
    }
  }

  function setRaise(amount) {
    if (socket && amount > 0) {
      socket.send(
        JSON.stringify({
          connectionId: connId,
          socketKey: socketKey,
          key: 'setRaise',
          roomId: roomId,
          amount: amount,
        })
      );
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

  function foldBtnClick() {
    if (!isloading) {
      setFold();
      isloading = true;
    }
  }

  function checkBtnClick() {
    if (!isloading) {
      const hero = heroTurn.data;
      if (hero) {
        if (hero.tempBet > 0) {
          toast.info('You have already thrown chips in... raising...');

          const rTempBet = hero.tempBet;
          hero.tempBet = 0;
          setRaise(rTempBet);
        } else {
          setCheck();
        }
        isloading = true;
      }
    }
  }

  function raiseBtnClick() {
    if (!isloading) {
      const chips = myRaiseHelper();
      setRaise(chips);
      isloading = true;
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
            {hero && hero.isPlayerTurn ? (
              <div className="col">
                <StyledActBtn
                  onClick={foldBtnClick}
                  className={`${current.isFoldBtn ? 'ctrl-btn-visiable' : 'ctrl-btn-hide'}`}
                  label="Fold"
                />
                {/* When calling situation occurs, swap check btn text to call (handled by statusUpdate call from server) */}
                <StyledActBtn
                  onClick={checkBtnClick}
                  className={`${current.isCheckBtn ? 'ctrl-btn-visiable' : 'ctrl-btn-hide'}`}
                  label={current.isCallSituation ? 'Call' : 'Check'}
                />
                <StyledActBtn
                  onClick={raiseBtnClick}
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
  }, [ctrl, heroTurn]);

  return view;
};

export default TurnControl;
