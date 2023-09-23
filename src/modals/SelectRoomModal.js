import React from 'react';
// import styled from 'styled-components';

const SelectRoomModal = () => {
  function PlayingRoomClick() {}
  function SpectateRoomClick() {}

  return (
    <>
      <p>
        <button type="button" onClick={PlayingRoomClick} className="btn btn-primary btn3d">
          Playing rooms
        </button>
        <button type="button" onClick={SpectateRoomClick} className="btn btn-default btn3d">
          Spectate rooms
        </button>
      </p>
      <div style={{ marginLeft: '10px', marginBottom: '5px' }}>
        <div className="custom-control custom-radio custom-control-inline">
          <input
            id="allRB"
            name="radio"
            type="radio"
            checked="checked"
            className="custom-control-input"
          />
          <label className="custom-control-label" htmlFor="allRB">
            All
          </label>
        </div>
        <div className="custom-control custom-radio custom-control-inline">
          <input id="lowRB" name="radio" type="radio" className="custom-control-input" />
          <label className="custom-control-label" htmlFor="lowRB">
            Low bets
          </label>
        </div>
        <div className="custom-control custom-radio custom-control-inline">
          <input id="mediumRB" name="radio" type="radio" className="custom-control-input" />
          <label className="custom-control-label" htmlFor="mediumRB">
            Medium bets
          </label>
        </div>
        <div className="custom-control custom-radio custom-control-inline">
          <input id="highRB" name="radio" type="radio" className="custom-control-input" />
          <label className="custom-control-label" htmlFor="highRB">
            High bets
          </label>
        </div>
      </div>
      <div id="roomListGroup" className="list-group">
        {/* <!-- Dynamically appending here from javascript --> */}
      </div>
    </>
  );
};

export default SelectRoomModal;
