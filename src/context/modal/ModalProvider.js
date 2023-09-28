import React, { useState, useEffect } from 'react';
import ModalContext from './modalContext';
import Modal, { initialModalData } from '@/components/modals/Modal';
import ModalView from '@/components/modals/ModalView';

const ModalProvider = ({ children }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(initialModalData);
  const [modalView, setModalView] = useState(null);

  useEffect(() => {
    const layoutWrapper = document.getElementById('layout-wrapper');

    if (showModal) {
      document.body.style.overflow = 'hidden';

      if (layoutWrapper) {
        layoutWrapper.style.filter = 'blur(4px)';
        layoutWrapper.style.pointerEvents = 'none';
        layoutWrapper.tabIndex = '-1';
      }
    } else {
      document.body.style.overflow = 'initial';

      if (layoutWrapper) {
        layoutWrapper.style.filter = 'none';
        layoutWrapper.style.pointerEvents = 'all';
      }
    }
  }, [showModal]);

  const openView = (view) => {
    setModalView(view);
    setModalData(initialModalData);
    setShowModal(true);
  };

  const openModal = (
    children,
    headingText,
    btnText,
    btnCallBack = closeModal,
    onCloseCallBack = closeModal
  ) => {
    setModalData({
      children,
      headingText,
      btnText,
      btnCallBack,
      onCloseCallBack,
    });

    setModalView(null);
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  return (
    <ModalContext.Provider value={{ showModal, openView, modalData, openModal, closeModal }}>
      {children}
      {showModal &&
        (modalView ? (
          <ModalView onClose={closeModal}>{modalView}</ModalView>
        ) : (
          <Modal
            headingText={modalData.headingText}
            btnText={modalData.btnText}
            onClose={modalData.onCloseCallBack}
            onBtnClicked={modalData.btnCallBack}
          >
            {modalData.children()}
          </Modal>
        ))}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
