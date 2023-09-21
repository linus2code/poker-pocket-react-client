import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import GlobalState from './global/GlobalState';
import LocaProvider from './localization/LocaProvider';
import ContentProvider from './content/ContentProvider';
import ModalProvider from './modal/ModalProvider';
import OfflineProvider from './offline/OfflineProvider';

const Providers = ({ children }) => (
  <BrowserRouter>
    <GlobalState>
      <LocaProvider>
        <ContentProvider>
          <ModalProvider>
            <OfflineProvider>{children}</OfflineProvider>
          </ModalProvider>
        </ContentProvider>
      </LocaProvider>
    </GlobalState>
  </BrowserRouter>
);

export default Providers;
