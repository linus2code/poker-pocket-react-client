import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import LocaContext from './locaContext';

const initialState = localStorage.getItem('lang') || 'en';

const LocaProvider = ({ children }) => {
  const [lang, setLang] = useState(initialState);
  const location = useLocation();

  useEffect(() => {
    const lang = new URLSearchParams(location.search).get('lang');
    lang && setLang(lang);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    localStorage.setItem('lang', lang);
    document.documentElement.setAttribute('lang', lang);
    // eslint-disable-next-line
  }, [lang]);

  return (
    // eslint-disable-next-line prettier/prettier
    <LocaContext.Provider value={{ lang, setLang }}>
      {children}
    </LocaContext.Provider>
  );
};

export default LocaProvider;
