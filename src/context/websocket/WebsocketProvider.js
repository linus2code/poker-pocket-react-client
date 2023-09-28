import React, { useState, useEffect, useContext, useRef } from 'react';
import { toast } from 'react-toastify';
import config from '@/clientConfig';
import SocketContext from './socketContext';
import globalContext from '@/context/global/globalContext';
import { NewWsSocket } from './wssocket';

const WebSocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const { isLoggedIn } = useContext(globalContext);

  // for listening connection hook
  const [socketConnected, setSocketConnected] = useState(null);
  const [socketDisconnected, setSocketDisconnected] = useState(null);

  const [socketId, setSocketId] = useState(null);

  // const [connId, setConnId] = useState(-1); // CONNECTION_ID = -1;
  const connIdRef = useRef(-1); // CONNECTION_ID = -1;
  const setConnId = (val) => {
    connIdRef.current = val;
  };

  // const [socketKey, setSocketKey] = useState(null); // SOCKET_KEY = null;
  const socketKeyRef = useRef(null); // SOCKET_KEY = null;
  const setSocketKey = (val) => {
    socketKeyRef.current = val;
  };

  useEffect(() => {
    console.log('WebSocketProvider useEffect isLoggedIn', isLoggedIn);

    if (isLoggedIn) {
      console.log('setLoggedInUserParams');
      setLoggedInUserParams(isLoggedIn);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  // ----------------------------------------------------
  // From server commands a.k.a. messages
  const onMessageHandler = (socket) => {
    socket.handle('connectionId', connectionIdResult);
    socket.handle('loggedInUserParamsResult', loggedInUserParamsResult);
    socket.handle('loggedInUserStatisticsResults', () => {});
    socket.handle('onXPGained', () => {});
    socket.handle('clientMessage', () => {});
    socket.handle('autoPlayActionResult', () => {});
    socket.handle('getPlayerChartDataResult', () => {});
  };

  function connectionIdResult(jsonData) {
    const CONNECTION_ID = Number(jsonData.connectionId);
    setConnId(CONNECTION_ID);
    const SOCKET_KEY = jsonData.socketKey;
    setSocketKey(SOCKET_KEY);

    console.log('onMessage isLoggedIn', isLoggedIn);
    if (isLoggedIn) {
      setLoggedInUserParams(isLoggedIn);
    }
    setSocketConnected({});
  }

  // Login related functions
  function setLoggedInUserParams(isLoggedIn) {
    // SHA3-512
    var username = isLoggedIn.username;
    var passwordHash = isLoggedIn.password;
    if (socket) {
      socket.send(
        JSON.stringify({
          connectionId: connIdRef.current,
          socketKey: socketKeyRef.current,
          key: 'loggedInUserParams',
          name: username,
          password: passwordHash,
        })
      );
      console.log('Set logged in user prms for: ' + username);
    }
  }

  function loggedInUserParamsResult(jsonData) {
    const lData = jsonData.data;
    if (!lData.result) {
      toast.error('You are logged in from another instance, which is forbidden!');
    } else {
      // getLoggedInUserStatistics();
    }
  }

  useEffect(() => {
    window.addEventListener('beforeunload', () => cleanUp);
    window.addEventListener('beforeclose', () => cleanUp);

    socket || connect();

    return () => {
      window.removeEventListener('beforeunload', cleanUp);
      window.removeEventListener('beforeclose', cleanUp);

      cleanUp('callback');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function cleanUp(reason) {
    if (socket) {
      console.log('cleanUp found socket', reason);

      const webSocket = socket;

      setSocketDisconnected();
      setSocket(null);
      setSocketId(null);

      // window.socket.emit(DISCONNECT);
      webSocket.close();
    } else {
      console.log('cleanUp not found', reason);
    }
  }

  const connect = () => {
    console.log('Using url: ' + config.socketURI);

    NewWsSocket(
      config.socketURI,
      (wsSocket) => {
        onMessageHandler(wsSocket);
        setSocket(wsSocket);
        // window.socket = wsSocket;
      },
      (wsSocket) => {
        toast.error('WebSocket closed!');
        cleanUp('WebSocket closed!');
      }
    );
  };

  const reconnect = () => {
    cleanUp('reconnect') || connect();
  };

  return (
    <SocketContext.Provider
      value={{
        socket,
        socketId,
        socketConnected,
        socketDisconnected,
        connId: connIdRef.current,
        setConnId,
        socketKey: socketKeyRef.current,
        reconnect,
        cleanUp,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default WebSocketProvider;
