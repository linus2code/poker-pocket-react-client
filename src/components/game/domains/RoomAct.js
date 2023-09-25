// Hole Cards  ({"players":[{"playerId":0,"cards":["3♠","4♥"]}]})
function holeCards(pData) {
  //console.log("HoleCards: "+JSON.stringify(pData));
  for (var p = 0; p < pData.players.length; p++) {
    for (var i = 0; i < players.length; i++) {
      if (Number(players[i].playerId) == Number(pData.players[p].playerId)) {
        players[i].playerCards.push(pData.players[p].cards[0]);
        players[i].playerCards.push(pData.players[p].cards[1]);
      }
    }
  }
  holeCardsAsync();
}

async function holeCardsAsync() {
  for (var c = 0; c < 2; c++) {
    for (var i = 0; i < players.length; i++) {
      if (!players[i].isFold) {
        await sleep(300);
        players[i].setPlayerCard(c, false, false);
      }
    }
  }
}