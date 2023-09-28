/* eslint-disable prettier/prettier */
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import GlobalState from './global/GlobalState';
import LocaProvider from './localization/LocaProvider';
import ContentProvider from './content/ContentProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ModalProvider from './modal/ModalProvider';
import OfflineProvider from './offline/OfflineProvider';
import WebSocketProvider from './websocket/WebsocketProvider';
import AuthState from './auth/AuthState';
import GameState from './game/GameState';
import RoomState from './room/RoomState';

const Providers = ({ children }) => (
  <BrowserRouter>
    <GlobalState>
      <LocaProvider>
        <ContentProvider>
          <ToastContainer />
          <ModalProvider>
            <OfflineProvider>
              <WebSocketProvider>
                <AuthState>
                  <GameState>
                    <RoomState>
                      {children}
                    </RoomState>
                  </GameState>
                </AuthState>
              </WebSocketProvider>
            </OfflineProvider>
          </ModalProvider>
        </ContentProvider>
      </LocaProvider>
    </GlobalState>
  </BrowserRouter>
);

export default Providers;
