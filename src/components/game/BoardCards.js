import React, { useContext, useMemo } from 'react';
import globalContext from '@/context/global/globalContext';
import gameContext from '@/context/game/gameContext';
import { getCardResource } from '@/utils/CardRes';
import { formatMoney } from '@/utils/Money';

const StyledCard = ({ style }) => {
  return <div className="middleCard magictime puffIn" style={style}></div>;
};

// Sleep promise
// function sleep(ms) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }

const BoardCards = () => {
  const { cardStyle } = useContext(globalContext);
  const { board } = useContext(gameContext);

  const view = useMemo(() => {
    const current = board.data;

    return current ? (
      <div className="container">
        {/* {console.log('RE-RENDER board')} */}
        <div className="row justify-center" style={{ justifyContent: 'center' }}>
          {current.middleCards
            ? current.middleCards.map((card, index) => {
                let path = null;
                if (card) {
                  path = getCardResource(card, cardStyle);
                }
                return (
                  <StyledCard
                    key={'MC' + index}
                    style={{ backgroundImage: card ? `url(${path})` : 'url()' }}
                  />
                );
              })
            : ''}
        </div>
        <div id="totalPot" className="totalPotText">
          {current.getTotalPot() > 0 ? formatMoney(current.getTotalPot()) + '$' : ''}
        </div>
        <div id="minBet" className="minBetText">
          {current.getMinBet() > 0 ? 'MB ' + formatMoney(current.getMinBet()) + '$' : ''}
        </div>
      </div>
    ) : (
      ''
    );
  }, [board, cardStyle]);

  return view;
};

export default BoardCards;
