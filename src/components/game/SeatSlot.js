import React, { useContext, useMemo } from 'react';
import styles from './SeatSlot.module.css';
import globalContext from '@/context/global/globalContext';
import { formatMoney } from '@/utils/Money';
import { getCardResource } from '@/utils/CardRes';

// Sleep promise
// function sleep(ms) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }

const SeatSlot = ({ pos, className, connId, seat, betLeft, betRight }) => {
  const { cardStyle } = useContext(globalContext);

  // async function hideLastActionAsync() {
  //   await sleep(1000);
  //   seat.seatLastAction = null;
  // }

  const actionView = useMemo(() => {
    const seatLastAction = seat.seatLastAction;
    // console.log('actionView', seat.seatLastAction);
    // hideLastActionAsync();

    console.log('seatLastAction', seat.id, seat.seatLastAction);

    return (
      <div className="container player-action-pos">
        {seatLastAction ? (
          <div className="lastActionTexts magicTimeAction puffIn action-animation">
            {seatLastAction}
          </div>
        ) : null}
      </div>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seat, seat.refreshLastAction]);

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
            className={`cardOne magictime puffIn ${seat.seatWinningGlowCard0 ? 'card-glow' : ''}`}
            style={{
              backgroundImage: seat.seatCard0 ? `url(${path0})` : seat.seatIsFold ? 'url()' : '',
            }}
          ></div>
        </div>
        <div className="col" style={{ marginLeft: '-20px' }}>
          <div
            className={`cardTwo magictime puffIn ${seat.seatWinningGlowCard1 ? 'card-glow' : ''}`}
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
                className="progress-bar"
                role="progressbar"
                id="TimeBar"
                aria-valuemin="0"
                aria-valuemax="100"
                style={
                  seat.seatTimeBar > 0
                    ? {
                        width: '100%',
                        animation: `lineburn ${seat.seatTimeBar / 1000}s linear forwards`,
                      }
                    : {}
                }
              ></div>
            </div>
          </div>
        </div>
        {seat.seatBetFrame ? (
          <div
            id="BetFrame"
            className={`container ${seat.seatDoBet ? 'magictime puffIn' : ''} bet-pos ${
              betLeft ? 'bet-left' : ''
            } ${betRight ? 'bet-right' : ''}
            `}
            style={{
              animation: seat.seatCollectChips ? pos + 'ChipsToPot 0.5s alternate' : '',
            }}
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

export default SeatSlot;
