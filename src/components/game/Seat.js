import React from 'react';
import styles from './Seat.module.css';

const Seat = ({ className, id, name, moneylbl, betLeft, betRight }) => {
  return (
    <div className={styles.root}>
      <div id={'SeatFrame' + id} className={`SeatFrame ${className}`}>
        <div id="ActionFrame" className="container">
          {/* <!-- text div with animation is appended here at 'room' --> */}
        </div>
        <div className="container" style={{ width: '200px' }}>
          <div className="row">
            <div className="col" style={{ marginLeft: '22px' }}>
              <div id="c0" className="cardOne magictime puffIn"></div>
            </div>
            <div className="col" style={{ marginLeft: '-20px' }}>
              <div id="c1" className="cardTwo magictime puffIn"></div>
            </div>
            <div className="col"></div>
          </div>
        </div>
        <div id="ActionFrame" className="container">
          {/* <!-- text div with animation is appended here at 'room' --> */}
        </div>
        <div className="container" style={{ width: '200px', marginTop: '-20px' }}>
          <div id="CardView" className="card">
            <div id="Name" className="seatTexts">
              {name}
            </div>
            <div id="Money" className="seatTexts">
              {moneylbl}
            </div>
            <div className="progress">
              <div
                className="progress-bar"
                role="progressbar"
                id="TimeBar"
                aria-valuemin="0"
                aria-valuemax="100"
                style={{ width: '50%' }}
              ></div>
            </div>
          </div>
        </div>
        <div
          id="BetFrame"
          className={`container magictime puffIn bet-pos ${betLeft ? 'bet-left' : ''} ${
            betRight ? 'bet-right' : ''
          }`}
        >
          <div className="moneyView"></div>
          <div id="TotalBet" className="betTexts">
            10000
          </div>
        </div>
        <div id="DealerChip" className="dealerChipView"></div>
      </div>
    </div>
  );
};

export default Seat;
