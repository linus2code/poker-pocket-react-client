import React, { useContext } from 'react';
// import styled from 'styled-components';
import contentContext from '@/context/content/contentContext';

const GameInfomModal = () => {
  const { t } = useContext(contentContext);

  return (
    <>
      <div className="row">
        <div className="col-md-4">
          <div style={{ width: '100%', textAlign: 'center' }}>{t('T Connections')}</div>
          <button
            id="totalConnections"
            type="button"
            className="btn btn-danger"
            style={{ width: '100%' }}
          ></button>
        </div>
        <div className="col-md-4">
          <div style={{ width: '100%', textAlign: 'center' }}>{t('A Connections')}</div>
          <button
            id="activeConnections"
            type="button"
            className="btn btn-danger"
            style={{ width: '100%' }}
          ></button>
        </div>
        <div className="col-md-4">
          <div style={{ width: '100%', textAlign: 'center' }}>{t('Server uptime')}</div>
          <button
            id="serverUptime"
            type="button"
            className="btn btn-danger"
            style={{ width: '100%' }}
          ></button>
        </div>
      </div>
      {/* <div>Server free memory</div>
      <div class="progress">
        <div id="serverMemoryFree" class="progress-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" style="width: 0%;">0%</div>
      </div> */}
      <div>Server total memory</div>
      <div className="progress">
        <div
          id="serverMemoryTotal"
          className="progress-bar"
          role="progressbar"
          aria-valuenow="60"
          aria-valuemin="0"
          aria-valuemax="1000"
          style={{ width: '0%' }}
        >
          0%
        </div>
      </div>
      <div>Server load average</div>
      <div id="serverLoadAverage" className="progress">
        <div
          className="progress-bar"
          role="progressbar"
          aria-valuenow="60"
          aria-valuemin="0"
          aria-valuemax="100"
          style={{ width: '0%' }}
        >
          0%
        </div>
      </div>
    </>
  );
};

export default GameInfomModal;
