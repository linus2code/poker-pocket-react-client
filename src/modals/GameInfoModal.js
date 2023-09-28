import React, { useState, useEffect, useContext } from 'react';
import contentContext from '@/context/content/contentContext';

const GameInfomModal = ({ context }) => {
  const { t } = useContext(contentContext);

  const { socketCtx } = context;
  const { socket, connId, socketKey } = socketCtx;

  useEffect(() => {
    if (socket) {
      socket.handle('getGameInformation', gameInformation);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  useEffect(() => {
    getGameInformation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [infoData, setInfoData] = useState(null);

  function getGameInformation() {
    if (socket) {
      const data = JSON.stringify({
        connectionId: connId,
        socketKey: socketKey,
        key: 'getGameInformation',
      });
      socket.send(data);
    }
  }

  // Parse game information
  // {"roomCount":3,"totalConnectionsCount":3,"activeConnectionsCount":3,"serverFreeMemory":42.07421875,"serverTotalMemory":925.51953125,"serverUpTime":419942,"serverLoadAverage":0}
  function gameInformation(jsonData) {
    console.log('fafa', JSON.stringify(jsonData));

    const gData = jsonData.data;

    const data = {
      totalConnectionsCount: gData.totalConnectionsCount + ' total',
      activeConnectionsCount: gData.activeConnectionsCount + ' active',
      serverUpTime: '' + Math.round(Number(gData.serverUpTime) / 60 / 60) + ' hours',

      // serverFreeMemory: Math.round(Number(gData.serverFreeMemory) / 10) + '%',
      serverTotalMemory: '' + Math.round(Number(gData.serverTotalMemory)),
      serverLoadAverage: '0',
    };
    if (Number(gData.serverLoadAverage) > 1) {
      data.serverLoadAverage = '' + Math.round(Number(gData.serverLoadAverage));
    }

    setInfoData(data);
  }

  return infoData ? (
    <>
      <div className="row">
        <div className="col-md-4">
          <div style={{ width: '100%', textAlign: 'center' }}>{t('T Connections')}</div>
          <button type="button" className="btn btn-danger" style={{ width: '100%' }}>
            {infoData.totalConnectionsCount}
          </button>
        </div>
        <div className="col-md-4">
          <div style={{ width: '100%', textAlign: 'center' }}>{t('A Connections')}</div>
          <button type="button" className="btn btn-danger" style={{ width: '100%' }}>
            {infoData.activeConnectionsCount}
          </button>
        </div>
        <div className="col-md-4">
          <div style={{ width: '100%', textAlign: 'center' }}>{t('Server uptime')}</div>
          <button type="button" className="btn btn-danger" style={{ width: '100%' }}>
            {infoData.serverUpTime}
          </button>
        </div>
      </div>
      {/* <div>Server free memory</div>
       <div class="progress">
         <div class="progress-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" style="width: 0%;">{infoData.serverFreeMemory}</div>
       </div> */}
      <div>Server total memory</div>
      <div className="progress">
        <div
          className="progress-bar"
          role="progressbar"
          aria-valuenow="60"
          aria-valuemin="0"
          aria-valuemax="1000"
          style={{ width: infoData.serverTotalMemory + '%' }}
        >
          {infoData.serverTotalMemory + 'mb'}
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
          style={{ width: infoData.serverLoadAverage + '%' }}
        >
          {infoData.serverLoadAverage}
        </div>
      </div>
    </>
  ) : null;
};

export default GameInfomModal;
