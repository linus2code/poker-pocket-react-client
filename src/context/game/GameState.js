import React, { useState } from 'react';
import GameContext from './gameContext';

const GameState = ({ children }) => {
  const [roomId, setRoomId] = useState(-1); // ROOM_ID = -1;
  const [enableSounds, setEnableSounds] = useState(true);

  const [actionButtonsEnabled, setActionButtonsEnabled] = useState(false);
  // Set true makes logged in player play automatically
  const [autoPlay, setAutoPlay] = useState(false);
  const [autoPlayCommandRequested, setAutoPlayCommandRequested] = useState(false);
  const [players, setPlayers] = useState(false);

  return (
    <GameContext.Provider
      value={{
        roomId,
        setRoomId,
        players,
        setPlayers,
        enableSounds,
        setEnableSounds,
        actionButtonsEnabled,
        setActionButtonsEnabled,
        autoPlay,
        setAutoPlay,
        autoPlayCommandRequested,
        setAutoPlayCommandRequested,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameState;
