import React from 'react';
import RoomStatus from '@/components/game/RoomStatus';
import RoomTable from '@/components/game/RoomTable';
import BoardCards from '@/components/game/BoardCards';
import TurnControl from '@/components/game/TurnControl';

const Room = () => {
  return (
    <>
      {console.log('RE-RENDER Room')}
      <RoomStatus />
      {/* <!-- Poker table --> */}
      <RoomTable>
        <div style={{ marginTop: '15px', marginLeft: '20px' }}>
          <BoardCards />
        </div>
      </RoomTable>
      <TurnControl />
    </>
  );
};

export default Room;
