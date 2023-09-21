import React, { useContext } from 'react';
import OfflineContext from './offlineContext';
import useServiceWorker from '@/hooks/useServiceWorker';
import modalContext from '@/context/modal/modalContext';
import contentContext from '@/context/content/contentContext';

const OfflineProvider = ({ children }) => {
  const { openModal } = useContext(modalContext);
  const { t } = useContext(contentContext);

  const [updateServiceWorker] = useServiceWorker(() => onUpdateServiceWorker());

  const onUpdateServiceWorker = () => {
    openModal(
      () => <div>{t('service_worker-update_available')}</div>,
      t('service_worker-update_headline'),
      t('service_worker-update_confirm_btn_txt'),
      updateServiceWorker
    );
  };

  return <OfflineContext.Provider value={{}}>{children}</OfflineContext.Provider>;
};

export default OfflineProvider;
