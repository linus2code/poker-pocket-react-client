import React, { useState } from 'react';
import GlobalContext from './globalContext';

const GlobalState = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [id, setId] = useState(null);
  const [userName, setUserName] = useState(null);
  const [email, setEmail] = useState(null);
  const [tables, setTables] = useState(null);
  const [players, setPlayers] = useState(null);
  const [roomData, setRoomData] = useState(null);

  return (
    <GlobalContext.Provider
      value={{
        isLoading,
        setIsLoading,
        userName,
        setUserName,
        email,
        setEmail,
        id,
        setId,
        tables,
        setTables,
        roomData,
        setRoomData,
        players,
        setPlayers,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalState;
