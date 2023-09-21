import React from 'react';
import BoardCards from './BoardCards';
import Seat from './Seat';

const RoomTable = () => {
  return (
    <div id="pokerTable" className="poker-table">
      {/* <!-- Top layout --> */}
      <div className="row" style={{ height: '140px' }}>
        <div className="col">
          {/* <!-- Seat layout --> */}
          <Seat className="float-right" id={'s3'} name={'Seat 3'} moneylbl={'10,000$'} betRight />
          {/* <!-- /Seat --> */}
        </div>
        <div className="col-2">{/* <!-- POT INFO --> */}</div>
        <div className="col">
          {/* <!-- Seat layout --> */}
          <Seat className="float-left" id={'s4'} name={'Seat 4'} moneylbl={'10,000$'} betLeft />
          {/* <!-- /Seat --> */}
        </div>
      </div>

      {/* <!-- Middle layout --> */}
      <div className="row" style={{ height: '140px' }}>
        <div className="col">
          {/* <!-- Seat layout --> */}
          <Seat middle id={'s2'} name={'Seat 2'} moneylbl={'10,000$'} betRight />
          {/* <!-- /Seat --> */}
        </div>
        <div className="col-5">
          {/* <!-- MIDDLE CARDS --> */}
          <div style={{ marginTop: '15px', marginLeft: '20px' }}>
            <BoardCards />
          </div>
          {/* <!-- /MIDDLE CARDS --> */}
        </div>
        <div className="col">
          {/* <!-- Seat layout --> */}
          <Seat middle id={'s5'} name={'Seat 5'} moneylbl={'10,000$'} betLeft />
        </div>
      </div>

      {/* <!-- Bottom layout --> */}
      <div className="row" style={{ height: '140px' }}>
        <div className="col">
          <Seat className="float-right" id={'s1'} name={'Seat 1'} moneylbl={'10,000$'} betRight />
        </div>
        <div className="col-2">{/* <!-- Empty space --> */}</div>
        <div className="col">
          {/* <!-- Seat layout --> */}
          <Seat className="float-left" id={'s6'} name={'Seat 6'} moneylbl={'10,000$'} betLeft />
        </div>
      </div>
    </div>
  );
};

export default RoomTable;
