import React from 'react';
import styled from 'styled-components';

const StyledItem = styled.div`
  margin-top: 10px;
`;

const StyledLabel = styled.div`
  color: #ffffff;
  margin-left: -20px;
  font-size: 13px;
`;

const Footer = () => {
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
          <StyledLabel>Purple table</StyledLabel>
          <div className="row">
            <input
              type="checkbox"
              name="purple-table-mode-toggle"
              data-on-color="danger"
              data-off-color="danger"
              data-on-text="Off"
              data-off-text="On"
              data-size="small"
              data-label-width="0"
            />
          </div>
        </StyledItem>
        <StyledItem className="col">
          <StyledLabel>Black cards</StyledLabel>
          <div className="row">
            <input
              type="checkbox"
              name="black-cards-mode-toggle"
              data-on-color="danger"
              data-off-color="danger"
              data-on-text="Off"
              data-off-text="On"
              data-size="small"
              data-label-width="0"
            />
          </div>
        </StyledItem>
        <StyledItem className="col">
          <StyledLabel>Auto check</StyledLabel>
          <div className="row">
            <input
              type="checkbox"
              name="auto-check-mode-toggle"
              data-on-color="danger"
              data-off-color="danger"
              data-on-text="Off"
              data-off-text="On"
              data-size="small"
              data-label-width="0"
            />
          </div>
        </StyledItem>
        <StyledItem className="col">
          <StyledLabel>Connection</StyledLabel>
          <div className="row">
            <input
              type="checkbox"
              name="connection-mode-toggle"
              data-on-color="danger"
              data-off-color="danger"
              data-on-text="Dev"
              data-off-text="Prod"
              data-size="small"
              data-label-width="0"
            />
          </div>
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
