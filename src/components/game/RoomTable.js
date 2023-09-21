import React from 'react';
import Seat from './Seat';

const RoomTable = () => {
  return (
    <div id="pokerTable" className="poker-table">
      {/* <!-- Top layout --> */}
      <div className="row" style={{ height: '133px' }}>
        <div className="col">
          {/* <!-- Seat layout --> */}
          <Seat
            top
            id={'s3'}
            name={'Seat 3'}
            moneylbl={'10,000$'}
            actStyle="margin-left: 40px;"
            betStyle="margin-right: -10px;"
          />
          {/* <!-- /Seat --> */}
        </div>
        <div className="col-2">{/* <!-- POT INFO --> */}</div>
        <div className="col">
          {/* <!-- Seat layout --> */}
          <Seat
            top
            id={'s4'}
            name={'Seat 4'}
            moneylbl={'10,000$'}
            actStyle="margin-left: -210px;"
            betStyle="margin-left: -50px;"
          />
          {/* <!-- /Seat --> */}
        </div>
      </div>

      {/* <!-- Middle layout --> */}
      <div className="row" style={{ height: '133px' }}>
        <div className="col">
          {/* <!-- Seat layout --> */}
          <Seat
            middle
            id={'s2'}
            name={'Seat 2'}
            moneylbl={'10,000$'}
            actStyle="margin-left: 90px;"
            betStyle="margin-right: 1px;"
            dealStyle="margin-left: 165px;"
          />
          {/* <!-- /Seat --> */}
        </div>
        <div className="col-5">
          {/* <!-- MIDDLE CARDS --> */}
          <div className="container">
            <div className="row" style={{ marginTop: '15px', marginLeft: '20px' }}>
              <div id="mC0" className="middleCard magictime puffIn"></div>
              <div id="mC1" className="middleCard magictime puffIn"></div>
              <div id="mC2" className="middleCard magictime puffIn"></div>
              <div id="mC3" className="middleCard magictime puffIn"></div>
              <div id="mC4" className="middleCard magictime puffIn"></div>
            </div>
            <div id="totalPot" className="totalPotText">
              24,000$
            </div>
            <div id="minBet" className="minBetText">
              MB 100,00$
            </div>
          </div>
          {/* <!-- /MIDDLE CARDS --> */}
        </div>
        <div className="col">
          {/* <!-- Seat layout --> */}
          <Seat
            middle
            id={'s5'}
            name={'Seat 5'}
            moneylbl={'10,000$'}
            actStyle="margin-left: -120px;"
            betStyle="margin-left: -40px;"
            dealStyle="margin-left: 15px;"
          />
        </div>
      </div>

      {/* <!-- Bottom layout --> */}
      <div className="row" style={{ height: '133px' }}>
        <div className="col">
          <Seat
            bottom
            id={'s1'}
            name={'Seat 1'}
            moneylbl={'10,000$'}
            betStyle="margin-right: 20px;"
            actStyle="margin-left: -50px;"
            dealStyle="margin-left: 160px;"
          />
        </div>
        <div className="col-2">{/* <!-- Empty space --> */}</div>
        <div className="col">
          {/* <!-- Seat layout --> */}
          <Seat
            bottom
            id={'s6'}
            name={'Seat 6'}
            moneylbl={'10,000$'}
            betStyle="margin-left: -20px"
            actStyle="margin-left: -120px;"
            dealStyle=""
          />
        </div>
      </div>
    </div>
  );
};

export default RoomTable;
