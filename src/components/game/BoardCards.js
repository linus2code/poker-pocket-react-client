import React, { useContext, useMemo } from 'react';
import globalContext from '@/context/global/globalContext';
import gameContext from '@/context/game/gameContext';
import { getCardResource } from '@/utils/CardRes';

const StyledCard = ({ style }) => {
  return <div className="middleCard magictime puffIn" style={style}></div>;
};

// Sleep promise
// function sleep(ms) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }

function currencyFormat(n, x, y, z) {
  const xc = Math.abs(x);
  var c = isNaN(xc) ? 2 : x,
    d = y ?? '.',
    t = z ?? ',',
    s = n < 0 ? '-' : '',
    i = String(parseInt((n = Math.abs(Number(n) || 0).toFixed(c)))),
    l = i.length,
    j = l > 3 ? l % 3 : 0;
  return (
    s +
    (j ? i.substr(0, j) + t : '') +
    i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + t) +
    (c
      ? d +
        Math.abs(n - i)
          .toFixed(c)
          .slice(2)
      : '')
  );
}

function formatMoney(money) {
  return currencyFormat(Number(money), 2, '.', ',');
}

const BoardCards = () => {
  const { cardStyle } = useContext(globalContext);
  const { board } = useContext(gameContext);

  const view = useMemo(() => {
    const current = board.data;

    return current ? (
      <div className="container">
        {console.log('RE-RENDER board')}
        <div className="row justify-center" style={{ justifyContent: 'center' }}>
          {current.middleCards
            ? current.middleCards.map((card, index) => {
                let path = null;
                if (card) {
                  path = getCardResource(card, cardStyle);
                  console.log(card, path);
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
