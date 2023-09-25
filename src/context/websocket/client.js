/* WebSocket communication handler */
var webSocket = null;
var showRoomsModal = true;

// For log in user's
const LS_POLICY_ACCEPTED = "LS_POLICY_ACCEPTED";
const LS_LOGGED_IN = "LS_LOGGED_IN";
const LS_USERNAME = "LS_USERNAME";
const LS_PASSWORD = "LS_PASSWORD";
const LS_USE_BLACK_CARDS = "LS_USE_BLACK_CARDS";
const LS_USE_PURPLE_TABLE = "LS_USE_PURPLE_TABLE";

// Start app
function startApp() {
  let mode = false;
  const mode_state = localStorage.getItem(LS_MODE_TOGGLE_STATE);
  if (mode_state !== 'null') {
    mode = mode_state === 'true';
  }

  // if (enableSounds) {
  //   playCardOpenPackage.play();
  // }
  setupSeats();
  initRoom();
  startWebSocket(mode);
  // document.addEventListener('keyup', keyCommands, false);
  //debugCheck();
}

export default startApp;
