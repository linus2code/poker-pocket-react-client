import React, { useState, useEffect, useContext } from 'react';
// import io from 'socket.io-client';
import config from '@/clientConfig';
import globalContext from '@/context/global/globalContext';
import SocketContext from './socketContext';
import { toast } from 'react-toastify';

// ----------------------------------------------------
// From server commands a.k.a. messages
function onMessageHandler(jsonData) {
  switch (jsonData.key) {
    case 'connectionId':
      // CONNECTION_ID = Number(jsonData.connectionId);
      // SOCKET_KEY = jsonData.socketKey;
      // console.log('My socket key: ' + SOCKET_KEY);
      // $('#selectRoomModal').modal('show');
      // getRooms("all");
      // if (localStorage.getItem(LS_LOGGED_IN) === 'true') {
      //   setLoggedInUserParams();
      // }
      break;
    case 'getRooms':
      // disableRoomSortButtons(false);
      // parseRooms(jsonData.data, false);
      break;
    // case 'getSpectateRooms':
    //   disableRoomSortButtons(true);
    //   parseRooms(jsonData.data, true);
    //   break;
    // case 'roomParams':
    //   roomParameters(jsonData.data);
    //   break;
    // case 'holeCards':
    //   holeCards(jsonData.data);
    //   break;
    // case 'statusUpdate':
    //   statusUpdate(jsonData.data);
    //   break;
    // case 'theFlop':
    //   theFlop(jsonData.data);
    //   break;
    // case 'theTurn':
    //   theTurn(jsonData.data);
    //   break;
    // case 'theRiver':
    //   theRiver(jsonData.data);
    //   break;
    // case 'allPlayersCards':
    //   allPlayersCards(jsonData.data);
    //   break;
    // case 'audioCommand':
    //   audioCommand(jsonData.data);
    //   break;
    // case 'getGameInformation':
    //   gameInformation(jsonData.data);
    //   break;
    // case 'lastUserAction':
    //   playerLastActionHandler(jsonData.data);
    //   break;
    // case 'accountCreated':
    //   accountCreated(jsonData.data);
    //   break;
    // case 'loginResult':
    //   loginResult(jsonData.data);
    //   break;
    // case 'loggedInUserParamsResult':
    //   loggedInUserParamsResult(jsonData.data);
    //   break;
    // case "serverCommandResult":
    //   commandRunResult(jsonData.data);
    //   break;
    // case "loggedInUserStatisticsResults":
    //   loggedInUserStatisticsResults(jsonData.data);
    //   break;
    // case "getRankingsResult":
    //   getRankingsResult(jsonData.code, jsonData.data);
    //   break;
    // case "onXPGained":
    //   onXPGained(jsonData.code, jsonData.data);
    //   break;
    // case "clientMessage":
    //   clientMessage(jsonData.data);
    //   break;
    // case "autoPlayActionResult":
    //   autoPlayActionResult(jsonData.data);
    //   break;
    // case "collectChipsToPot":
    //   collectChipsToPotAction(jsonData.data);
    //   break;
    // case "getPlayerChartDataResult":
    //   getPlayerChartDataResult(jsonData.data);
    //   break;
    default:
      break;
  }
}

const WebSocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [socketId, setSocketId] = useState(null);
  const { setTables, setPlayers } = useContext(globalContext);

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

  function registerCallbacks(webSocket) {
    // WebSocket events
    console.log(webSocket);
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
    <SocketContext.Provider value={{ socket, socketId, cleanUp }}>
      {children}
    </SocketContext.Provider>
  );
};

export default WebSocketProvider;
