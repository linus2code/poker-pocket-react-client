import React, { useContext } from 'react';
import styled from 'styled-components';
import contentContext from '@/context/content/contentContext';
import SwitchButton from '@/components/buttons/SwitchButton';

const StyledItem = styled.div`
  margin-top: 10px;
`;

const LS_USE_PURPLE_TABLE = 'LS_USE_PURPLE_TABLE';
const LS_USE_BLACK_CARDS = 'LS_USE_BLACK_CARDS';

const changeTableColor = (state) => {
  var pokerTable = document.getElementById('pokerTable');
  // localStorage.getItem(LS_USE_PURPLE_TABLE) === 'false');

  if (state) {
    pokerTable.style.backgroundImage = "url('./assets/images/poker_table_purple.png')";
  } else {
    pokerTable.style.backgroundImage = "url('./assets/images/poker_table_green.png')";
  }

  localStorage.setItem(LS_USE_PURPLE_TABLE, JSON.stringify(state));
};

const changeBlackCards = (state) => {
  localStorage.setItem(LS_USE_BLACK_CARDS, JSON.stringify(state));
};

const Footer = () => {
  const { t } = useContext(contentContext);

  return (
    // <!-- Copyright & badge -->
    <div className="container" style={{ minWidth: '850px' }}>
      <div className="row">
        <div className="col-4">
          <footer className="footer">
            <div style={{ color: '#FFFFFF' }}>♣ ♦ ♥ ♠</div>
            <div style={{ color: '#FFFFFF' }}>&copy; Nitramite 2017 - MK</div>
            <div style={{ color: '#FFFFFF' }}>Graphics Raphael Ciribelly</div>
          </footer>
        </div>
        <StyledItem className="col">
          <SwitchButton
            label={t('PURPLE_TABLE')}
            name="purple-table-mode-toggle"
            onChange={(event) => changeTableColor(event.target.checked)}
          />
        </StyledItem>
        <StyledItem className="col">
          <SwitchButton
            label={t('BLACK_CARDS')}
            name="black-cards-mode-toggle"
            onChange={(event) => changeBlackCards(event.target.checked)}
          />
        </StyledItem>
        <StyledItem className="col">
          <SwitchButton label={t('AUTO_CHECK')} name="auto-check-mode-toggle" />
        </StyledItem>
        <StyledItem className="col">
          <SwitchButton
            label={t('CONNECTION')}
            name="connection-mode-toggle"
            onText="Dev"
            offText="Prod"
          />
        </StyledItem>
        <div className="col-3" style={{ marginTop: '20px' }}>
          <div className="row">
            <a href="https://play.google.com/store/apps/details?id=com.nitramite.pokerpocket">
              <img
                className="playBadge"
                src="./assets/images/badge_play.png"
                alt="Poker Pocket on Google Play"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
