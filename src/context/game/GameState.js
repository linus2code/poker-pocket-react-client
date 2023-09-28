import React, { useState, useEffect, useContext, useRef } from 'react';
import GameContext from './gameContext';
import socketContext from '@/context/websocket/socketContext';
import { NewRoomInfo, NewBoard, NewCtrl } from '@/components/game/domains/Room';
import { setupSeats } from '@/components/game/domains/Seat';

const GameState = ({ children }) => {
  const { socketDisconnected } = useContext(socketContext);

  const [roomId, setRoomId] = useState(-1); // ROOM_ID = -1;
  const [enableSounds, setEnableSounds] = useState(true);

  const [actionButtonsEnabled, setActionButtonsEnabled] = useState(false);
  // Set true makes logged in player play automatically
  const [autoPlay, setAutoPlay] = useState(false);
  const [autoPlayCommandRequested, setAutoPlayCommandRequested] = useState(false);
  const [players, setPlayers] = useState(null);

  const [roomInfo, setRoomInfo] = useState({ data: NewRoomInfo() });
  const [board, setBoard] = useState({ data: NewBoard(enableSounds) });
  const [ctrl, setCtrl] = useState({ data: NewCtrl(enableSounds) });

  const seatsRef = useRef(setupSeats());
  const [seats, setSeats] = useState({ data: seatsRef.current });
  const [heroTurn, setHeroTurn] = useState({ data: null });

  useEffect(() => {
    setPlayers(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socketDisconnected]);

  return (
    <GameContext.Provider
      value={{
        roomId,
        setRoomId,
        heroTurn,
        setHeroTurn,
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
