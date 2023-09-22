/* WebSocket communication handler */
var CONNECTION_ID = -1;
var SOCKET_KEY = null;
var ROOM_ID = -1;
var webSocket = null;
var showRoomsModal = true;
var actionButtonsEnabled = false;
var autoPlay = false; // Set true makes logged in player play automatically
var autoPlayCommandRequested = false;

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

/* Seat related */
var seats = [];

function setupSeats() {
  seats.push(new Seat('s1SeatFrame', 's1c0', 's1c1', 's1CardView', 's1Name', 's1Money', 's1TimeBar', 's1BetFrame', 's1TotalBet', 's1ActionFrame', 's1LastActionText', 's1DealerChip')); // 1
  seats.push(new Seat('s2SeatFrame', 's2c0', 's2c1', 's2CardView', 's2Name', 's2Money', 's2TimeBar', 's2BetFrame', 's2TotalBet', 's2ActionFrame', 's2LastActionText', 's2DealerChip')); // 2
  seats.push(new Seat('s3SeatFrame', 's3c0', 's3c1', 's3CardView', 's3Name', 's3Money', 's3TimeBar', 's3BetFrame', 's3TotalBet', 's3ActionFrame', 's3LastActionText', 's3DealerChip')); // 3
  seats.push(new Seat('s4SeatFrame', 's4c0', 's4c1', 's4CardView', 's4Name', 's4Money', 's4TimeBar', 's4BetFrame', 's4TotalBet', 's4ActionFrame', 's4LastActionText', 's4DealerChip')); // 4
  seats.push(new Seat('s5SeatFrame', 's5c0', 's5c1', 's5CardView', 's5Name', 's5Money', 's5TimeBar', 's5BetFrame', 's5TotalBet', 's5ActionFrame', 's5LastActionText', 's5DealerChip')); // 5
  seats.push(new Seat('s6SeatFrame', 's6c0', 's6c1', 's6CardView', 's6Name', 's6Money', 's6TimeBar', 's6BetFrame', 's6TotalBet', 's6ActionFrame', 's6LastActionText', 's6DealerChip')); // 6
  initSeats();
}

function initSeats() {
  for (var i = 0; i < seats.length; i++) {
    seats[i].initSeat();
  }
}

export default startApp;
