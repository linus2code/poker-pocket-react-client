export const NewWsSocket = (url, onConnect, onClose) => {
  const webSocket = new WebSocket(url);

  const id = Math.floor(Math.random() * 1000);
  const data = { webSocket, id };

  let onMessageHandler = null;
  let onRoomHandler = null;
  let onGameHandler = null;
  let onAuthHandler = null;

  const registerCallbacks = (webSocket) => {
    // WebSocket events
    webSocket.onopen = (event) => {
      if (onConnect) onConnect(data);
    };
    webSocket.onmessage = (event) => {
      const jsonData = JSON.parse(event.data);
      console.log('jsonData ', jsonData.key);
      // console.log(JSON.stringify(jsonData));
      // console.log('jsonData ', jsonData.key);
      if (onRoomHandler && onRoomHandler(jsonData)) {
        return;
      }

      if (onGameHandler && onGameHandler(jsonData)) {
        return;
      }

      if (onAuthHandler && onAuthHandler(jsonData)) {
        return;
      }

      if (onMessageHandler) onMessageHandler(jsonData);
    };
    webSocket.onclose = () => {
      if (onClose) onClose(data);
    };
  };

  registerCallbacks(webSocket);

  const regMessageHandler = (callback) => {
    onMessageHandler = callback;
  };

  const regRoomHandler = (callback) => {
    onRoomHandler = callback;
  };

  const regGameHandler = (callback) => {
    onGameHandler = callback;
  };

  const regAuthHandler = (callback) => {
    onAuthHandler = callback;
  };

  const send = (data) => {
    webSocket.send(data);
  };

  const close = () => {
    webSocket.close();
  };
  data.send = send;
  data.close = close;

  data.regMessageHandler = regMessageHandler;
  data.regGameHandler = regGameHandler;
  data.regRoomHandler = regRoomHandler;
  data.regAuthHandler = regAuthHandler;

  // debug
  data.onRoomHandler = onRoomHandler;

  return data;
};
