import React, { useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import NavButton from '@/components/buttons/NavButton';
import contentContext from '@/context/content/contentContext';
import modalContext from '@/context/modal/modalContext';
import SelectRoomModal from '@/modals/SelectRoomModal';
import RankingsModal from '@/modals/RankingsModal';
import GameInfoModal from '@/modals/GameInfoModal';
import CommandModal from '@/modals/CommandModal';
import UserModal from '@/modals/UserModal';
import SignInModal from '@/modals/SignInModal';
import SignOnModal from '@/modals/SignOnModal';
import socketContext from '@/context/websocket/socketContext';
import gameContext from '@/context/game/gameContext';

const LS_ENABLE_SOUNDS_STATE = 'LS_ENABLE_SOUNDS_STATE';

const Navbar = ({ loggedIn }) => {
  const { t } = useContext(contentContext);
  const { openModal, closeModal } = useContext(modalContext);

  const { socket } = useContext(socketContext);
  const socketCtx = useContext(socketContext);
  const gameCtx = useContext(gameContext);

  function getRankings() {}
  function getGameInformation() {}
  function getLoggedInUserStatistics() {}

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

  function toggleSounds() {
    setEnableSounds(!enableSounds);
  }

  const openRoomModal = (mode) => {
    if (socket) {
      openModal(
        () => (
          <SelectRoomModal mode={mode} context={{ socketCtx, gameCtx }} closeModal={closeModal} />
        ),
        t('Select room'),
        t('CLOSE')
      );
    }
  };

  const openRankingsModal = () => openModal(() => <RankingsModal />, t('Rankings'), t('CLOSE'));

  const openGameInfoModal = () =>
    openModal(() => GameInfoModal, t('SERVER_INFORMATION'), t('CLOSE'));

  const openCmdModal = () => openModal(() => <CommandModal />, t('Command prompt'), t('CLOSE'));

  const openUserModal = () => openModal(() => <UserModal />, t('My statistics'), t('CLOSE'));

  const openSignInModal = () => openModal(() => <SignInModal />, t('Login'), t('CLOSE'));

  const openSignOnModal = () => openModal(() => <SignOnModal />, t('REGISTER'), t('CLOSE'));

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
              <NavButton onClick={() => openRoomModal('all')}>{t('GET_ROOMS')}</NavButton>
              <NavButton onClick={() => openRoomModal('Spec')}>{t('SPECTATE')}</NavButton>
              <NavButton onClick={() => openRankingsModal() && getRankings()}>
                {t('RANKINGS')}
              </NavButton>
              <NavButton onClick={() => openGameInfoModal() && getGameInformation}>
                {t('SERVER')}
              </NavButton>
              <NavButton onClick={openCmdModal}>{t('COMMAND')}</NavButton>
              <NavButton onClick={toggleSounds}>
                {enableSounds ? t('SOUNDS_DISABLE') : t('SOUNDS_ENABLE')}
              </NavButton>
              <NavButton onClick={() => toast.success('Wow so easy!')}>
                {t('NOTIFICATION')}
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
