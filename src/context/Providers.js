/* eslint-disable prettier/prettier */
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import GlobalState from './global/GlobalState';
import LocaProvider from './localization/LocaProvider';
import ContentProvider from './content/ContentProvider';
import ModalProvider from './modal/ModalProvider';
import OfflineProvider from './offline/OfflineProvider';
import WebSocketProvider from './websocket/WebsocketProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Providers = ({ children }) => (
  <BrowserRouter>
    <GlobalState>
      <LocaProvider>
        <ContentProvider>
          <ModalProvider>
            <OfflineProvider>
              <ToastContainer />
              <WebSocketProvider>
                {children}
              </WebSocketProvider>
            </OfflineProvider>
          </ModalProvider>
        </ContentProvider>
      </LocaProvider>
    </GlobalState>
  </BrowserRouter>
);

export default Providers;
