import React, { useContext } from 'react';
// import styled from 'styled-components';
import contentContext from '@/context/content/contentContext';

const UserModal = () => {
  const { t } = useContext(contentContext);

  return (
    <>
      <div className="row">
        <div className="col-md-6">
          <div style={{ width: '100%', textAlign: 'center' }}>{t('Money')}</div>
          <button
            id="userStatsMoney"
            type="button"
            className="btn btn-danger"
            style={{ width: '100%', fontSize: '2em' }}
          ></button>
        </div>
        <div className="col-md-3">
          <div style={{ width: '100%', textAlign: 'center' }}>{t('Wins')}</div>
          <button
            id="userStatsWins"
            type="button"
            className="btn btn-danger"
            style={{ width: '100%', fontSize: '2em' }}
          ></button>
        </div>
        <div className="col-md-3">
          <div style={{ width: '100%', textAlign: 'center' }}>{t('Losses')}</div>
          <button
            id="userStatsLoses"
            type="button"
            className="btn btn-danger"
            style={{ width: '100%', fontSize: '2em' }}
          ></button>
        </div>
      </div>
      <hr className="my-3" />
      <div style={{ width: '100%', marginTop: '10px' }}>
        <button
          id="userXP"
          type="button"
          className="btn btn-danger"
          style={{ width: '100%', fontSize: '2em' }}
        ></button>
        <div
          id="userStatsMedalsTitle"
          style={{ width: '100%', marginTop: '10px', textAlign: 'center' }}
        >
          {t('No medals')}
        </div>
        <div id="userStatsMedalsFlexBox" className="d-flex justify-content-center flex-row">
          {/* <!-- Dynamically appending here from javascript --> */}
        </div>
        {/* <!-- Player statistics chart comes here --> */}
        <div>
          <div id="playerMoneyChart"></div>
        </div>
        <div>
          <div id="playerWinLoseChart"></div>
        </div>
      </div>
    </>
  );
};

export default UserModal;
