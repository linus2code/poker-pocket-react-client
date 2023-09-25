import React, { useContext, useMemo } from 'react';
import styles from './SeatUI.module.css';
import globalContext from '@/context/global/globalContext';
import { formatMoney } from '@/utils/Money';
import { getCardResource } from '@/utils/CardRes';

// Sleep promise
// function sleep(ms) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }

const SeatUI = ({ className, connId, seat, betLeft, betRight }) => {
  const { cardStyle } = useContext(globalContext);

  // async function hideLastActionAsync() {
  //   await sleep(1000);
  //   seat.seatActionFrame = null;
  // }

  const actionView = useMemo(() => {
    const seatActionFrame = seat.seatActionFrame;
    console.log('actionView', seat.seatActionFrame);
    // hideLastActionAsync();

    return (
      <div className="container player-action-pos">
        <div className="lastActionTexts magicTimeAction puffIn action-animation">
          {seatActionFrame}
        </div>
      </div>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seat, seat.seatActionFrame]);

  const cardsView = useMemo(() => {
    let path0 = null;
    let path1 = null;

    if (seat.playerId === connId || seat.seatShowCards) {
      // show cards
      if (seat.seatCard0) {
        path0 = getCardResource(seat.seatCard0, cardStyle);
      }
      if (seat.seatCard1) {
        path1 = getCardResource(seat.seatCard1, cardStyle);
      }
    } else {
      // hide cards
      if (seat.seatCard0) {
        path0 = getCardResource('', cardStyle);
      }
      if (seat.seatCard1) {
        path1 = getCardResource('', cardStyle);
      }
    }

    return (
      <div className="row">
        <div className="col" style={{ marginLeft: '22px' }}>
          <div
            className={`cardOne magictime puffIn ${seat.seatWinningGlowCard0 && 'card-glow'}`}
            style={{
              backgroundImage: seat.seatCard0 ? `url(${path0})` : seat.seatIsFold ? 'url()' : '',
            }}
          ></div>
        </div>
        <div className="col" style={{ marginLeft: '-20px' }}>
          <div
            className={`cardTwo magictime puffIn ${seat.seatWinningGlowCard1 && 'card-glow'}`}
            style={{
              backgroundImage: seat.seatCard1 ? `url(${path1})` : seat.seatIsFold ? 'url()' : '',
            }}
          ></div>
        </div>
        <div className="col"></div>
      </div>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    cardStyle,
    seat.seatCard0,
    seat.seatCard1,
    seat.seatWinningGlowCard0,
    seat.seatWinningGlowCard1,
  ]);

  return (
    <div className={styles.root}>
      <div id={'S-' + seat.id} className={`SeatFrame ${className}`}>
        {actionView}
        <div className="container" style={{ width: '200px' }}>
          {cardsView}
        </div>
        <div className="container" style={{ width: '200px', marginTop: '-20px' }}>
          <div id="CardView" className={`card ${seat.cardAnimation ? 'card-animation' : ''}`}>
            <div id="Name" className="seatTexts">
              {seat.seatName}
            </div>
            <div id="Money" className="seatTexts">
              {formatMoney(seat.seatMoney) + '$'}
            </div>
            <div className="progress">
              <div
                className={`progress-bar ${
                  seat.seatTurn && seat.seatTimeBar > 0 ? 'p-time-bar' : ''
                }`}
                role="progressbar"
                id="TimeBar"
                aria-valuemin="0"
                aria-valuemax="100"
                style={{ width: seat.seatTimeBar + '%' }}
              ></div>
            </div>
          </div>
        </div>
        {seat.seatBetFrame ? (
          <div
            id="BetFrame"
            className={`container ${seat.seatDoBet ? 'magictime puffIn' : ''} bet-pos ${
              betLeft ? 'bet-left' : ''
            } ${betRight ? 'bet-right' : ''}`}
          >
            <div className="moneyView"></div>
            <div id="TotalBet" className="betTexts">
              {seat.seatTotalBet}
            </div>
          </div>
        ) : (
          ''
        )}
        {seat.seatDealerChip ? <div id="DealerChip" className="dealerChipView"></div> : ''}
      </div>
    </div>
  );
};

export default SeatUI;
