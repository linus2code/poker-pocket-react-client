import React, { useContext } from 'react';
import NavButton from '@/components/buttons/NavButton';
import contentContext from '@/context/content/contentContext';

const Navbar = ({ loggedIn, openModal }) => {
  const { t } = useContext(contentContext);

  function getRooms(roomSortParam) {}
  function getSpectateRooms() {}
  function getRankings() {}
  function getGameInformation() {}
  function toggleSounds() {}
  function getLoggedInUserStatistics() {}
  function PlayingRoomClick() {}
  function SpectateRoomClick() {}

  const openRoomModal = () =>
    openModal(
      () => (
        <>
          <p>
            <button type="button" onClick={PlayingRoomClick} className="btn btn-primary btn3d">
              Playing rooms
            </button>
            <button type="button" onClick={SpectateRoomClick} className="btn btn-default btn3d">
              Spectate rooms
            </button>
          </p>
          <div style={{ marginLeft: '10px', marginBottom: '5px' }}>
            <div className="custom-control custom-radio custom-control-inline">
              <input
                id="allRB"
                name="radio"
                type="radio"
                checked="checked"
                className="custom-control-input"
              />
              <label className="custom-control-label" htmlFor="allRB">
                All
              </label>
            </div>
            <div className="custom-control custom-radio custom-control-inline">
              <input id="lowRB" name="radio" type="radio" className="custom-control-input" />
              <label className="custom-control-label" htmlFor="lowRB">
                Low bets
              </label>
            </div>
            <div className="custom-control custom-radio custom-control-inline">
              <input id="mediumRB" name="radio" type="radio" className="custom-control-input" />
              <label className="custom-control-label" htmlFor="mediumRB">
                Medium bets
              </label>
            </div>
            <div className="custom-control custom-radio custom-control-inline">
              <input id="highRB" name="radio" type="radio" className="custom-control-input" />
              <label className="custom-control-label" htmlFor="highRB">
                High bets
              </label>
            </div>
          </div>
          <div id="roomListGroup" className="list-group">
            {/* <!-- Dynamically appending here from javascript --> */}
          </div>
        </>
      ),
      t('Select room'),
      t('CLOSE')
    );

  const openRankingsModal = () =>
    openModal(
      () => (
        <>
          <div style={{ width: '100%', textAlign: 'center' }}>{t('Starts from best players')}</div>
          <ul id="rankingListGroup" className="list-group" style={{ marginTop: '10px' }}>
            {/* <!-- Dynamically appending here from javascript --> */}
          </ul>
        </>
      ),
      t('Rankings'),
      t('CLOSE')
    );

  const openGameInfoModal = () =>
    openModal(
      () => (
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
      ),
      t('SERVER_INFORMATION'),
      t('CLOSE')
    );

  const openCmdModal = () =>
    openModal(
      () => (
        <>
          <input
            id="cmdCommandLineOne"
            className="form-control"
            autoComplete="off"
            type="text"
            placeholder="/c"
            required
            style={{ marginTop: '5px' }}
          />
          <input
            id="cmdCommandLineTwo"
            className="form-control"
            autoComplete="off"
            type="text"
            placeholder="/r"
            required
            style={{ marginTop: '5px' }}
          />
          <input
            id="cmdCommandLineThree"
            className="form-control"
            autoComplete="off"
            type="text"
            placeholder="/p"
            required
            style={{ marginTop: '5px' }}
          />
          <input
            id="cmdPassword"
            className="form-control"
            autoComplete="off"
            type="password"
            placeholder="Password"
            required
            style={{ marginTop: '5px' }}
          />
        </>
      ),
      t('Command prompt'),
      t('CLOSE')
    );

  const openUserModal = () =>
    openModal(
      () => (
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
      ),
      t('My statistics'),
      t('CLOSE')
    );

  function forgotPasswordBtn() {}

  const openSignInModal = () =>
    openModal(
      () => (
        <>
          <div id="div-forms">
            {/* <!-- Begin # Login Form --> */}
            <form id="login-form">
              <div id="div-login-msg" style={{ marginLeft: '2px' }}>
                <span id="text-login-msg">
                  Give your Poker Pocket account username and password.
                </span>
              </div>
              <input
                id="login_username"
                className="form-control"
                type="text"
                placeholder="Username"
                required
                style={{ marginTop: '5px' }}
              />
              <input
                id="login_password"
                className="form-control"
                type="password"
                placeholder="Password"
                required
                style={{ marginTop: '5px' }}
              />
              <div className="modal-footer">
                <div>
                  <button className="btn btn-primary btn-md btn-block">Login</button>
                </div>
                <div>
                  <button id="login_register_btn" type="button" className="btn btn-default">
                    {t('REGISTER')}
                  </button>
                  <button
                    id="login_lost_btn"
                    type="button"
                    className="btn btn-default"
                    onClick={() => forgotPasswordBtn()}
                  >
                    Forgot password?
                  </button>
                </div>
              </div>
            </form>
          </div>
        </>
      ),
      t('Login'),
      t('CLOSE')
    );

  const openSignOnModal = () =>
    openModal(
      () => (
        <>
          <div id="div-forms">
            {/* <!-- Begin | Register Form --> */}
            <form id="register-form" style={{ display: 'none' }}>
              <div id="div-register-msg" style={{ marginLeft: '2px' }}>
                <span id="text-register-msg">Register Poker Pocket account.</span>
              </div>
              <input
                id="register_username"
                className="form-control"
                type="text"
                placeholder="Username"
                required
                style={{ marginTop: '5px' }}
              />
              <input
                id="register_password"
                className="form-control"
                type="password"
                placeholder="Password"
                required
                style={{ marginTop: '5px' }}
              />
              <input
                id="register_email"
                className="form-control"
                type="email"
                placeholder="Email"
                required
                style={{ marginTop: '5px' }}
              />
              <div className="modal-footer">
                <div>
                  <button className="btn btn-primary btn-md btn-block">{t('REGISTER')}</button>
                </div>
                <div>
                  <button id="register_login_btn" type="button" className="btn btn-default">
                    Log In
                  </button>
                  <button
                    id="register_lost_btn"
                    type="button"
                    className="btn btn-default"
                    onClick={() => forgotPasswordBtn()}
                  >
                    Forgot password?
                  </button>
                </div>
              </div>
            </form>
          </div>
        </>
      ),
      t('REGISTER'),
      t('CLOSE')
    );

  if (!loggedIn)
    return (
      <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <a className="navbar-brand" href="http://www.nitramite.com/poker-pocket.html">
            <img
              src="./assets/images/logo.png"
              style={{ width: '30px', height: '30px' }}
              className="d-inline-block align-top"
              alt="Poker Pocket logo"
            />
            Poker Pocket
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto mt-1 mt-md-0">
              <NavButton onClick={() => openRoomModal() && getRooms('all')}>
                {t('GET_ROOMS')}
              </NavButton>
              <NavButton onClick={() => openRoomModal() && getSpectateRooms()}>
                {t('SPECTATE')}
              </NavButton>
              <NavButton onClick={() => openRankingsModal() && getRankings()}>
                {t('RANKINGS')}
              </NavButton>
              <NavButton onClick={() => openGameInfoModal() && getGameInformation}>
                {t('SERVER')}
              </NavButton>
              <NavButton onClick={openCmdModal}>{t('COMMAND')}</NavButton>
              <NavButton id="soundToggleBtn" onClick={toggleSounds}>
                {t('SOUNDS_DISABLE')}
              </NavButton>
            </ul>
            <ul
              id="loggedInUserIcon"
              className="nav navbar-nav navbar-right"
              onClick={() => openUserModal() && getLoggedInUserStatistics()}
            >
              <li style={{ marginRight: '5px' }}>
                <div
                  id="xpNeededForNextMedalText"
                  style={{ color: 'white', height: '100%', textAlign: 'center', marginTop: '5px' }}
                ></div>
              </li>
              <li>
                <div style={{ marginRight: '5px' }}>
                  <img
                    id="loggedInUserMedal"
                    style={{ width: '40px', height: '40px' }}
                    src="./assets/images/shaded_medal_blank.png"
                    alt="User medal"
                  />
                </div>
              </li>
              <li>
                <div style={{ marginRight: '5px' }}>
                  <img
                    style={{ width: '40px', height: '40px' }}
                    src="./assets/images/logo_circle.png"
                    alt="Poker Pocket circle logo"
                  />
                </div>
              </li>
            </ul>
            <form className="form-inline mt-1 my-md-0">
              <button
                id="nav_bar_login_btn"
                className="btn btn-outline-success my-2 my-sm-0"
                onClick={openSignInModal}
              >
                {t('LOGIN')}
              </button>
              <button
                id="nav_bar_login_btn"
                className="btn btn-outline-success my-2 my-sm-0"
                onClick={openSignOnModal}
              >
                {t('REGISTER')}
              </button>
              <button
                id="login_logout_btn"
                className="btn btn-outline-success my-2 my-sm-0"
                type="button"
              >
                {t('LOGOUT')}
              </button>
            </form>
          </div>
        </nav>
      </>
    );
};

export default Navbar;
