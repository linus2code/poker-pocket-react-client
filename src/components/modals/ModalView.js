import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

const ModalWrapper = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 101;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalView = ({ children, onClose }) => {
  return ReactDOM.createPortal(
    <ModalWrapper
      id="wrapper"
      onClick={(e) => {
        if (e.target.id === 'wrapper') {
          onClose();
        }
      }}
    >
      {children}
      {/* </div> */}
    </ModalWrapper>,
    document.getElementById('modal')
  );
};

export default ModalView;
