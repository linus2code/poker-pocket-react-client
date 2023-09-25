import React, { useState } from 'react';
import GameContext from './gameContext';
import { NewRoomInfo, NewBoard, NewCtrl } from '@/components/game/domains/Room';

const GameState = ({ children }) => {
  const [roomId, setRoomId] = useState(-1); // ROOM_ID = -1;
  const [enableSounds, setEnableSounds] = useState(true);

  const [actionButtonsEnabled, setActionButtonsEnabled] = useState(false);
  // Set true makes logged in player play automatically
  const [autoPlay, setAutoPlay] = useState(false);
  const [autoPlayCommandRequested, setAutoPlayCommandRequested] = useState(false);
  const [players, setPlayers] = useState(false);

  const [roomInfo, setRoomInfo] = useState({ data: NewRoomInfo() });
  const [board, setBoard] = useState({ data: NewBoard(enableSounds) });
  const [ctrl, setCtrl] = useState({ data: NewCtrl(enableSounds) });

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
        board,
        setBoard,
        roomInfo,
        setRoomInfo,
        ctrl,
        setCtrl,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameState;
