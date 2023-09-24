import React from 'react';
import styled from 'styled-components';
import Room from '@/components/game/Room';
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
        <Room />
        <Footer />
      </StyledContainer>
    </>
  );
};

export default GamePage;
