import React, { useEffect } from 'react';
import { getCardResource } from './domains/CardRes';

const StyledCard = ({ id }) => {
  return <div id={id} className="middleCard magictime puffIn"></div>;
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

const BoardCards = ({ board }) => {
  console.log('init BoardCards', board);

  useEffect(() => {
    console.log('useEffect board');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [board]);

  return (
    <div className="container">
      <div className="row justify-center" style={{ justifyContent: 'center' }}>
        {board.middleCards
          ? board.middleCards.map((card, index) => (
              <StyledCard
                key={'MC' + index}
                style={
                  card
                    ? { backgroundImage: `url(${getCardResource(card)})` }
                    : { backgroundImage: 'url()' }
                }
              />
            ))
          : ''}
      </div>
      <div id="totalPot" className="totalPotText">
        {
          board.getTotalPot() > 0
            ? formatMoney(board.getTotalPot()) + '$' // totalPot.style.visibility = 'visible';
            : '' // totalPot.style.visibility = 'hidden';
        }
      </div>
      <div id="minBet" className="minBetText">
        {
          board.getMinBet() > 0
            ? 'MB ' + formatMoney(board.getMinBet()) + '$' // minBet.style.visibility = 'visible';
            : '' // minBet.style.visibility = 'hidden';
        }
      </div>
    </div>
  );
};

export default BoardCards;
