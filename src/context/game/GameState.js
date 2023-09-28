import React from 'react';
import GameContext from './gameContext';

const GameState = ({ children }) => {
  // eslint-disable-next-line prettier/prettier
  return (
    <GameContext.Provider
      value={{}}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameState;
