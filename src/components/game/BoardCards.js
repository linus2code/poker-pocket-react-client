import React from 'react';

const StyledCard = ({ id }) => {
  return <div id={id} className="middleCard magictime puffIn"></div>;
};

const BoardCards = () => {
  return (
    <div className="container">
      <div className="row justify-center" style={{ justifyContent: 'center' }}>
        <StyledCard id="mC0" />
        <StyledCard id="mC1" />
        <StyledCard id="mC2" />
        <StyledCard id="mC3" />
        <StyledCard id="mC4" />
      </div>
      <div id="totalPot" className="totalPotText">
        24,000$
      </div>
      <div id="minBet" className="minBetText">
        MB 100,00$
      </div>
    </div>
  );
};

export default BoardCards;
