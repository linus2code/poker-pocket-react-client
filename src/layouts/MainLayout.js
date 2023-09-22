import React, { useContext } from 'react';
import styled from 'styled-components';
import Navbar from '@/components/navigation/Navbar';
import modalContext from '@/context/modal/modalContext';
import socketContext from '@/context/websocket/socketContext';

const StyledNoSocketWarn = styled.div`
  background-color: #d9534f;
  text-align: center;
  color: white;
  font-size: 20px;
  padding-bottom: 4px;

  height: ${(props) => (props.isWsConnected ? '0' : 'auto')}
  visibility: ${(props) => (props.isWsConnected ? 'collapse' : 'visible')} ;
`;

const MainLayout = ({ children }) => {
  const { openModal } = useContext(modalContext);
  const { socket } = useContext(socketContext);

  return (
    <div id="layout-wrapper">
      <Navbar loggedIn={false} openModal={openModal} className="blur-target" />
      <StyledNoSocketWarn
        isWsConnected={socket != null}
        onClick={() => window.location.reload()}
        role="button"
      >
        No connection, click here to try again
      </StyledNoSocketWarn>
      <main className="blur-target">{children}</main>
    </div>
  );
};

export default MainLayout;
