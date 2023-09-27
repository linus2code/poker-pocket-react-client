import React, { useState } from 'react';
import GameContext from './gameContext';
import { NewRoomInfo, NewBoard, NewCtrl } from '@/components/game/domains/Room';
import { setupSeats } from '@/components/game/domains/Seat';

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
  const [seats, setSeats] = useState({ data: setupSeats() });
  const [hero, setHero] = useState({ data: null });

  return (
    <GameContext.Provider
      value={{
        roomId,
        setRoomId,
        hero,
        setHero,
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
        seats,
        setSeats,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameState;
