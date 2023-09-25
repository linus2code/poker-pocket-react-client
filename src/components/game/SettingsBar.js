import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import globalContext from '@/context/global/globalContext';
import contentContext from '@/context/content/contentContext';
import SwitchButton from '@/components/buttons/SwitchButton';
import { parserCardStyle } from '@/utils/CardRes';

const StyledItem = styled.div`
  margin-top: 10px;
`;

const LS_USE_PURPLE_TABLE = 'LS_USE_PURPLE_TABLE';
const LS_USE_BLACK_CARDS = 'LS_USE_BLACK_CARDS';

// UI settings
const LS_MODE_TOGGLE_STATE = 'LS_MODE_TOGGLE_STATE';

// Sleep promise
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const purpleBgVal = () => {
  const purpleBgVal = localStorage.getItem(LS_USE_PURPLE_TABLE);
  if (purpleBgVal === null || purpleBgVal === 'undefined') {
    return false;
  }
  return purpleBgVal === 'true';
};

const blackCardVal = () => {
  const blackCardVal = localStorage.getItem(LS_USE_BLACK_CARDS);
  if (blackCardVal === null || blackCardVal === 'undefined') {
    return false;
  }
  return blackCardVal === 'true';
};

const SettingsBar = () => {
  const { setCardStyle } = useContext(globalContext);
  const { t } = useContext(contentContext);

  const [tablePurpleBg, setTablePurpleBg] = useState(purpleBgVal());
  const [blackCards] = useState(blackCardVal());

  useEffect(() => {
    applyTableColor(tablePurpleBg);
    // applyBlackCards(blackCards);
  }, [tablePurpleBg]);

  const applyTableColor = (state) => {
    var pokerTable = document.getElementById('pokerTable');
    if (state) {
      pokerTable.style.backgroundImage = "url('./assets/images/poker_table_purple.png')";
    } else {
      pokerTable.style.backgroundImage = "url('./assets/images/poker_table_green.png')";
    }
    localStorage.setItem(LS_USE_PURPLE_TABLE, JSON.stringify(state));
  };

  const changeTableColor = (state) => {
    setTablePurpleBg(state);
  };

  const changeBlackCards = (state) => {
    const cards_style = JSON.stringify(state);
    setCardStyle(parserCardStyle(cards_style));
    localStorage.setItem(LS_USE_BLACK_CARDS, cards_style);
  };

  const changeConnectMode = (state) => {
    localStorage.setItem(LS_MODE_TOGGLE_STATE, JSON.stringify(state));
    console.log(JSON.stringify(state));
    reloadDelay();
  };

  const [autoCheckInterval, setAutoCheckInterval] = useState(false);

  const changeAutoCheck = (state) => {
    state ? clearInterval(autoCheckInterval) : enableAutoCheck();
  };

  function enableAutoCheck() {
    const interval_id = setInterval(function () {
      // if (webSocket.readyState == webSocket.OPEN) {
      //   for (let i = 0; i < players.length; i++) {
      //     if (players[i].playerId == CONNECTION_ID) {
      //       if (players[i].isPlayerTurn && !players[i].isCallSituation) {
      //         checkBtnClick();
      //       }
      //     }
      //   }
      // }
    }, 3000);

    setAutoCheckInterval(interval_id);
  }

  async function reloadDelay() {
    await sleep(500);
    window.location.reload(); // Reload site with new connection params
  }

  return (
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
          id="purple-table-mode-toggle"
          onText="On"
          offText="Off"
          value={tablePurpleBg}
          onChange={(checked) => changeTableColor(checked)}
        />
      </StyledItem>
      <StyledItem className="col">
        <SwitchButton
          label={t('BLACK_CARDS')}
          id="black-cards-mode-toggle"
          onText="On"
          offText="Off"
          value={blackCards}
          onChange={(checked) => changeBlackCards(checked)}
        />
      </StyledItem>
      <StyledItem className="col">
        <SwitchButton
          label={t('AUTO_CHECK')}
          id="auto-check-mode-toggle"
          onText="On"
          offText="Off"
          onChange={(checked) => changeAutoCheck(checked)}
        />
      </StyledItem>
      <StyledItem className="col">
        <SwitchButton
          label={t('CONNECTION')}
          id="connection-mode-toggle"
          onText="Prod"
          offText="Dev"
          onChange={(checked) => changeConnectMode(checked)}
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
  );
};

export default SettingsBar;
