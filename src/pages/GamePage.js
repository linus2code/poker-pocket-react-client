import React from 'react';
import styled from 'styled-components';
import RoomStatus from '@/components/game/RoomStatus';
import RoomTable from '@/components/game/RoomTable';
import ActionControl from '@/components/game/ActionControl';
import Footer from '@/components/navigation/Footer';

const StyledContainer = styled.div`
  min-width: 850px;
  width: 850px;
  margin-top: 5px;
`;

const GamePage = () => {
  return (
    <>
      <StyledContainer className="container">
        <RoomStatus />

        {/* <!-- Poker table --> */}
        <RoomTable />
        <ActionControl />
        <Footer />
      </StyledContainer>
    </>
  );
};

export default GamePage;
