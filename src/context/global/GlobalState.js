import React, { useState } from 'react';
import GlobalContext from './globalContext';
import { parserCardStyle } from '@/utils/CardRes';

const LS_USE_BLACK_CARDS = 'LS_USE_BLACK_CARDS';

const cards_style = localStorage.getItem(LS_USE_BLACK_CARDS);

const GlobalState = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [cardStyle, setCardStyle] = useState(parserCardStyle(cards_style));

  return (
    <GlobalContext.Provider
      value={{
        isLoading,
        setIsLoading,
        cardStyle,
        setCardStyle,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalState;
