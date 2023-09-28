import React, { useState, useEffect, useContext, useMemo, useRef } from 'react';
// import styled from 'styled-components';
import contentContext from '@/context/content/contentContext';

const UserDashboardModal = ({ context, closeModal }) => {
  const { t } = useContext(contentContext);

  const { socketCtx } = context;
  const { socket, connId, socketKey, myDashboardData, setMyDashboardDataRefresh } = socketCtx;

  useEffect(() => {
    if (socket) {
      // [{"money":3588,"win_count":1993,"lose_count":2572},{"money":3688,"win_count":1994,"lose_count":2572},..
      socket.handle('getPlayerChartDataResult', (jsonData) =>
        getPlayerChartDataResult(jsonData.data)
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  function getPlayerChartData() {
    if (socket) {
      const data = JSON.stringify({
        connectionId: connId,
        socketKey: socketKey,
        key: 'getPlayerChartData',
      });
      socket.send(data);
    }
  }

  const playerMoneyChartRef = useRef(null);
  const playerWinLoseChartRef = useRef(null);

  // Draw morris chart of player statistics
  function getPlayerChartDataResult(cData) {
    // console.log(JSON.stringify(cData));
    // Init chart views
    playerMoneyChartRef.current.innerHTML = '';
    // playerMoneyChartRef.css('height', 200);

    playerWinLoseChartRef.current.innerHTML = '';
    // playerWinLoseChartRef.css('height', 200);

    // Fetch data
    let moneyData = [];
    let winLoseData = [];
    let moneyMinVal = null,
      moneyMaxVal = null,
      winLoseMinVal = null,
      winLoseMaxVal = null;
    for (let i = 0; i < cData.length; i++) {
      moneyData.push({ id: i, money: cData[i].money });
      winLoseData.push({ id: i, win_count: cData[i].win_count, lose_count: cData[i].lose_count });
      if (i === 0) {
        moneyMinVal = cData[i].money;
        moneyMaxVal = cData[i].money;
        winLoseMinVal = cData[i].win_count;
        winLoseMaxVal = cData[i].lose_count;
      }
      moneyMinVal = moneyMinVal > cData[i].money ? cData[i].money : moneyMinVal;
      moneyMaxVal = moneyMaxVal < cData[i].money ? cData[i].money : moneyMaxVal;
      winLoseMinVal = winLoseMinVal > cData[i].win_count ? cData[i].win_count : winLoseMinVal;
      winLoseMinVal = winLoseMinVal > cData[i].lose_count ? cData[i].lose_count : winLoseMinVal;
      winLoseMaxVal = winLoseMaxVal < cData[i].win_count ? cData[i].win_count : winLoseMaxVal;
      winLoseMaxVal = winLoseMaxVal < cData[i].lose_count ? cData[i].lose_count : winLoseMaxVal;
    }
    // Draw
    /*
    new Morris.Line({
      element: 'playerMoneyChart',
      data: moneyData,
      xkey: 'id',
      ykeys: ['money'],
      labels: ['Money'],
      resize: true,
      parseTime: false,
      ymin: moneyMinVal,
      ymax: moneyMaxVal,
    });
    new Morris.Line({
      element: 'playerWinLoseChart',
      data: winLoseData,
      xkey: 'id',
      ykeys: ['win_count', 'lose_count'],
      labels: ['Wins', 'Losses'],
      resize: true,
      parseTime: false,
      ymin: winLoseMinVal,
      ymax: winLoseMaxVal,
      lineColors: ['#0b62a4', '#c10039'],
    });
    */
  }

  useEffect(() => {
    setMyDashboardDataRefresh({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [myData, setMyData] = useState(null);

  useEffect(() => {
    if (myDashboardData) {
      parserloggedInUserStatisticsResults(myDashboardData);
    } else {
      setMyData(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myDashboardData]);

  function parserloggedInUserStatisticsResults(uData) {
    console.log('parserloggedInUserStatisticsResults');
    let userStatsMedalsTitle = '';
    let xpLevel = Number(uData.xp);
    if (xpLevel >= 1000) {
      userStatsMedalsTitle = 'You have following medals';
    }

    const data = {
      userStatsMoney: Number(uData.money).currencyFormat(2, '.', ',') + '$',
      userStatsWins: uData.winCount,
      userStatsLoses: uData.loseCount,
      userXP: uData.xp + ' xp',
      xpNeededForNextMedalText: 'Next medal ' + '+' + uData.xpNeededForNextMedal + 'xp',
      userStatsMedalsTitle: userStatsMedalsTitle,
      havingMedals: uData.havingMedals,
    };

    setMyData(data);
  }

  const MedalsView = useMemo(() => {
    if (!myData || !myData.havingMedals) {
      return null;
    }

    return myData.havingMedals.map((medal) => {
      const imgSrc = './assets/images/' + medal.image + '.png';
      const title = medal.title;

      // var $loggedInUserMedal = $('#loggedInUserMedal');
      // $loggedInUserMedal.attr('src', imgSrc);

      return (
        <div className="p-2" key={'medal-' + title}>
          <figure>
            <img style={{ width: '30px', height: '60px' }} alt="" src={imgSrc} />
            <figcaption>{title}</figcaption>
          </figure>
        </div>
      );
    });
  }, [myData]);

  return (
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">{t('MY_STATISTICS')}</h5>
          <button type="button" className="close" onClick={closeModal}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
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
              {MedalsView}
            </div>
            {/* <!-- Player statistics chart comes here --> */}
            <div>
              <div id="playerMoneyChart" ref={playerMoneyChartRef}></div>
            </div>
            <div>
              <div id="playerWinLoseChart" ref={playerWinLoseChartRef}></div>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={getPlayerChartData}>
            {t('Load player chart')}
          </button>
          <button type="button" className="btn btn-secondary" onClick={closeModal}>
            {t('CLOSE')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDashboardModal;
