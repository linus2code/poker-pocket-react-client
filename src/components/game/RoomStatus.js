import React, { useContext, useMemo } from 'react';
import styled from 'styled-components';
import roomContext from '@/context/room/roomContext';

const StyledCard = styled.div`
  background-color: #434343;
  width: 100%;
  padding-top: 5px;
  padding-bottom: 5px;
`;

const RoomStatus = () => {
  const { roomInfo } = useContext(roomContext);

  const view = useMemo(() => {
    const current = roomInfo.data;

    return (
      <StyledCard className="card">
        {/* <!-- Room status --> */}
        <div className="row">
          <div className="col-10">
            <div className="container">
              <div className="row">
                <div className="col-sm">
                  <div id="roomName" style={{ color: '#FFFFFF', fontSize: '14px' }}>
                    {current.getRoomName()}
                  </div>
                </div>
                <div className="col-sm">
                  <div id="spectatorsCount" style={{ color: '#FFFFFF', fontSize: '12px' }}>
                    {current.getRoomSpectatorCount()}
                  </div>
                </div>
                <div className="col-sm">
                  <div id="waitingPlayersCount" style={{ color: '#FFFFFF', fontSize: '12px' }}>
                    {current.getRoomWaitingPlayersCount()}
                  </div>
                </div>
                <div className="col-sm">
                  <div id="deckStatus" style={{ color: '#FFFFFF', fontSize: '12px' }}>
                    {current.getRoomDeckStatus()}
                  </div>
                </div>
                <div className="col-sm">
                  <div id="deckCardsBurned" style={{ color: '#FFFFFF', fontSize: '12px' }}>
                    {current.getRoomDeckBurnedCount()}
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
                    <span style={{ marginRight: '30px' }}>{current.getRoomStatusText()}</span>
                    <span style={{ marginRight: '30px' }}>{current.getRoomTurnText()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </StyledCard>
    );
  }, [roomInfo]);

  return view;
};

export default RoomStatus;
