import React from 'react';
import styled from 'styled-components';

const StyledCard = styled.div`
  background-color: #434343;
  width: 100%;
  padding-top: 5px;
  padding-bottom: 5px;
`;

const RoomStatus = () => {
  return (
    <StyledCard className="card">
      {/* <!-- Room status --> */}
      <div className="row">
        <div className="col-10">
          <div className="container">
            <div className="row">
              <div className="col-sm">
                <div id="roomName" style={{ color: '#FFFFFF', fontSize: '14px' }}>
                  ♦ Default room
                </div>
              </div>
              <div className="col-sm">
                <div id="spectatorsCount" style={{ color: '#FFFFFF', fontSize: '12px' }}>
                  ♦ Spectating: 0
                </div>
              </div>
              <div className="col-sm">
                <div id="waitingPlayersCount" style={{ color: '#FFFFFF', fontSize: '12px' }}>
                  ♦ Waiting: 0
                </div>
              </div>
              <div className="col-sm">
                <div id="deckStatus" style={{ color: '#FFFFFF', fontSize: '12px' }}>
                  ♦ Deck: -
                </div>
              </div>
              <div className="col-sm">
                <div id="deckCardsBurned" style={{ color: '#FFFFFF', fontSize: '12px' }}>
                  ♦ Burned: -
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-8">
          <div className="container">
            <div className="row">
              <div className="col-sm">
                <div id="roomStatusText" style={{ color: 'white', textAlign: 'left' }}>
                  Wait for parameters...
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StyledCard>
  );
};

export default RoomStatus;
