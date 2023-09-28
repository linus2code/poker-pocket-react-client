import React, { useState, useEffect, useMemo } from 'react';
// import styled from 'styled-components';
import { toast } from 'react-toastify';

const RankingsModal = ({ context }) => {
  const { socketCtx } = context;
  const { socket, connId, socketKey } = socketCtx;

  useEffect(() => {
    if (socket) {
      socket.handle('getRankingsResult', getRankingsResult);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  useEffect(() => {
    getRankings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [rankingData, setRankingData] = useState(null);

  function getRankings() {
    if (socket) {
      const data = JSON.stringify({
        connectionId: connId,
        socketKey: socketKey,
        key: 'getRankings',
      });
      socket.send(data);
    }
  }

  // eslint-disable-next-line no-unused-vars
  function getRankingsResult(jsonData) {
    const responseCode = jsonData.code;
    const rData = jsonData.data;

    console.log(JSON.stringify(rData));
    if (Number(responseCode) === 200) {
      setRankingData(rData);
    } else {
      toast.info('Unspecified error while retrieving rankings');
    }
  }

  function loadMedalImage(iconName) {
    return './assets/images/' + iconName + '.png';
  }

  const RankingView = useMemo(() => {
    if (!rankingData) {
      return null;
    }

    return rankingData.map((rData) => {
      return (
        <button key={rData.name} className="list-group-item list-group-item-action">
          <div className="d-flex flex-row">
            <div className="p-2" style={{ marginLeft: '-10px' }}>
              <img
                src={loadMedalImage(rData.icon)}
                alt=""
                style={{ width: '25px', height: '50px' }}
              />
            </div>
            <div className="p-2" style={{ marginLeft: '-10px', width: '150px' }}>
              <div className="grid" style={{ marginLeft: '30px' }}>
                <div className="row">
                  <b>{rData.name}</b>
                </div>
                <div className="row">
                  <label>{rData.xp + ' xp'}</label>
                </div>
              </div>
            </div>
            <div className="p-2">
              <div className="container">
                <div className="row">
                  <div className="col-md-8">
                    <h6>
                      Wins
                      <span className="badge badge-secondary">{rData.win_count}</span>
                    </h6>
                  </div>
                  <div className="col-md-8">
                    <h6>
                      Losses <span className="badge badge-secondary">{rData.lose_count}</span>
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </button>
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rankingData]);

  return (
    <>
      <div style={{ width: '100%', textAlign: 'center' }}>Starts from best players</div>
      <ul id="rankingListGroup" className="list-group" style={{ marginTop: '10px' }}>
        {RankingView}
      </ul>
    </>
  );
};

export default RankingsModal;
