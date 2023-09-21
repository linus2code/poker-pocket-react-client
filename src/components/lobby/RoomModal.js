import React from 'react';

const lobby = () => {
  return (
    <div
      className="modal fade"
      id="selectRoomModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="SelectModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="SelectModalLabel">
              Select room
            </h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p>
              <button
                type="button"
                onClick="getRooms('all'); if (enableSounds) {playCardChipLayOne.play();}"
                className="btn btn-primary btn3d"
              >
                Playing rooms
              </button>
              <button
                type="button"
                onClick="getSpectateRooms(); if (enableSounds) {playCardChipLayOne.play();}"
                className="btn btn-default btn3d"
              >
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
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default lobby;
