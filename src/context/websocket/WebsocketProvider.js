import React, { useState, useEffect, useContext } from 'react';
// import io from 'socket.io-client';
import { toast } from 'react-toastify';
import config from '@/clientConfig';
import SocketContext from './socketContext';
import globalContext from '@/context/global/globalContext';
import modalContext from '@/context/modal/modalContext';
import SelectRoomModal from '@/modals/SelectRoomModal';

let onRoomHandler = null;

const WebSocketProvider = ({ children }) => {
  const { setTables, setPlayers } = useContext(globalContext);
  const { openModal } = useContext(modalContext);

  const [socket, setSocket] = useState(null);
  const [socketId, setSocketId] = useState(null);

  const [connId, setConnId] = useState(-1); // CONNECTION_ID = -1;
  const [socketKey, setSocketKey] = useState(null); // SOCKET_KEY = null;

  const regRoomHandler = (callback) => {
    onRoomHandler = callback;
  };

  const openRoomModal = (mode) => {
    if (socket) {
      console.log('socket', socket);
      openModal(() => <SelectRoomModal mode={mode} />, 'Select room', 'CLOSE');
    }
  };

  // ----------------------------------------------------
  // From server commands a.k.a. messages
  const onMessageHandler = (jsonData) => {
    if (onRoomHandler && onRoomHandler(jsonData)) {
      return;
    }

    console.log('main jsonData', jsonData.key);
    switch (jsonData.key) {
      case 'connectionId': {
        const CONNECTION_ID = Number(jsonData.connectionId);
        setConnId(CONNECTION_ID);
        const SOCKET_KEY = jsonData.socketKey;
        setSocketKey(SOCKET_KEY);
        console.log('My socket key: ' + SOCKET_KEY);
        openRoomModal('all');
        // if (localStorage.getItem(LS_LOGGED_IN) === 'true') {
        //   setLoggedInUserParams();
        // }
        break;
      }
      case 'getRooms':
        setTables(jsonData.data);
        break;
      case 'getSpectateRooms':
        setTables(jsonData.data);
        break;
      case 'getGameInformation':
        // gameInformation(jsonData.data);
        break;
      case 'accountCreated':
        // accountCreated(jsonData.data);
        break;
      case 'loginResult':
        // loginResult(jsonData.data);
        break;
      case 'loggedInUserParamsResult':
        // loggedInUserParamsResult(jsonData.data);
        break;
      case 'serverCommandResult':
        // commandRunResult(jsonData.data);
        break;
      case 'loggedInUserStatisticsResults':
        // loggedInUserStatisticsResults(jsonData.data);
        break;
      case 'getRankingsResult':
        // getRankingsResult(jsonData.code, jsonData.data);
        break;
      case 'onXPGained':
        // onXPGained(jsonData.code, jsonData.data);
        break;
      case 'clientMessage':
        // clientMessage(jsonData.data);
        break;
      case 'autoPlayActionResult':
        // autoPlayActionResult(jsonData.data);
        break;
      case 'getPlayerChartDataResult':
        // getPlayerChartDataResult(jsonData.data);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    window.addEventListener('beforeunload', cleanUp);
    window.addEventListener('beforeclose', cleanUp);

    socket || connect();

    return () => cleanUp();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function cleanUp() {
    if (window.socket) {
      // window.socket.emit(DISCONNECT);
      window.socket.close();
    }
    setSocket(null);
    setSocketId(null);
    setPlayers(null);
    setTables(null);
  }

  function connect() {
    console.log('Using url: ' + config.socketURI);
    const webSocket = new WebSocket(config.socketURI);
    registerCallbacks(webSocket);
  }

  const reconnect = (mode) => {
    cleanUp() || connect();
  };

  function registerCallbacks(webSocket) {
    // WebSocket events
    webSocket.onopen = (event) => {
      setSocket(webSocket);
      window.socket = webSocket;
    };
    webSocket.onmessage = (event) => {
      onMessageHandler(JSON.parse(event.data));
    };
    webSocket.onclose = () => {
      toast.error('WebSocket closed!');
      cleanUp();
    };
  }

  return (
    <SocketContext.Provider
      value={{
        socket,
        socketId,
        connId,
        socketKey,
        reconnect,
        cleanUp,
        regRoomHandler,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default WebSocketProvider;
