import React, { useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import NavButton from '@/components/buttons/NavButton';
import contentContext from '@/context/content/contentContext';
import modalContext from '@/context/modal/modalContext';
import SelectRoomModal from '@/modals/SelectRoomModal';
import RankingsModal from '@/modals/RankingsModal';
import GameInfoModal from '@/modals/GameInfoModal';
import CommandModal from '@/modals/CommandModal';
import UserDashboardModal from '@/modals/UserDashboardModal';
import SignInOnModal from '@/modals/SignInOnModal';
import socketContext from '@/context/websocket/socketContext';
import authContext from '@/context/auth/authContext';
import roomContext from '@/context/room/roomContext';

const LS_ENABLE_SOUNDS_STATE = 'LS_ENABLE_SOUNDS_STATE';

const Navbar = () => {
  const { t } = useContext(contentContext);
  const { openView, openModal, closeModal } = useContext(modalContext);

  const { socket, socketConnected } = useContext(socketContext);
  const { isLoggedIn } = useContext(authContext);

  const socketCtx = useContext(socketContext);
  const authCtx = useContext(authContext);
  const roomCtx = useContext(roomContext);

  const [enableSounds, setEnableSounds] = useState(true);

  useEffect(() => {
    const sounds = localStorage.getItem(LS_ENABLE_SOUNDS_STATE);
    setEnableSounds(sounds);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    localStorage.setItem(LS_ENABLE_SOUNDS_STATE, enableSounds ? 'true' : 'false');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enableSounds]);

  useEffect(() => {
    if (isLoggedIn) {
      openRoomModal('all');
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socketConnected]);

  function toggleSounds() {
    setEnableSounds(!enableSounds);
  }

  const openRoomModal = (mode) => {
    if (socket) {
      openModal(
        () => (
          <SelectRoomModal mode={mode} context={{ socketCtx, roomCtx }} closeModal={closeModal} />
        ),
        t('SELECT_ROOM'),
        t('CLOSE')
      );
    }
  };

  const openRankingsModal = () =>
    openModal(() => <RankingsModal context={{ socketCtx }} />, t('RANKINGS'), t('CLOSE'));

  const openGameInfoModal = () =>
    openModal(() => <GameInfoModal context={{ socketCtx }} />, t('SERVER_INFORMATION'), t('CLOSE'));

  const openCmdModal = () =>
    openView(() => <CommandModal context={{ socketCtx }} closeModal={closeModal} />);

  const openUserModal = () =>
    openView(() => <UserDashboardModal context={{ socketCtx, authCtx }} closeModal={closeModal} />);

  const openSignInModaVuew = () => {
    openView(() => (
      <SignInOnModal mode={0} context={{ socketCtx, authCtx }} closeModal={closeModal} />
    ));
  };

  const logoutClick = () => {
    window.location.reload();
  };

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
            <NavButton onClick={() => openRoomModal('all')}>{t('GET_ROOMS')}</NavButton>
            <NavButton onClick={() => openRoomModal('spec')}>{t('SPECTATE')}</NavButton>
            <NavButton onClick={() => openRankingsModal()}>{t('RANKINGS')}</NavButton>
            <NavButton onClick={() => openGameInfoModal()}>{t('SERVER')}</NavButton>
            <NavButton onClick={openCmdModal}>{t('COMMAND')}</NavButton>
            <NavButton onClick={toggleSounds}>
              {enableSounds ? t('SOUNDS_DISABLE') : t('SOUNDS_ENABLE')}
            </NavButton>
            <NavButton onClick={() => toast.success('Wow so easy!')}>{t('NOTIFICATION')}</NavButton>
          </ul>
          {isLoggedIn ? (
            <ul
              id="loggedInUserIcon"
              className="nav navbar-nav navbar-right"
              onClick={() => openUserModal()}
            >
              <li style={{ marginRight: '5px' }}>
                <div
                  id="xpNeededForNextMedalText"
                  style={{
                    color: 'white',
                    height: '100%',
                    textAlign: 'center',
                    marginTop: '5px',
                  }}
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
          ) : null}
          <div className="form-inline mt-1 my-md-0">
            {!isLoggedIn ? (
              <button
                id="nav_bar_login_btn"
                className="btn btn-outline-success my-2 my-sm-0"
                onClick={() => openSignInModaVuew()}
              >
                {t('LOGIN')}
              </button>
            ) : (
              <button
                id="login_logout_btn"
                className="btn btn-outline-success my-2 my-sm-0"
                type="button"
                onClick={() => logoutClick()}
              >
                {t('LOGOUT')}
              </button>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
