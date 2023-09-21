import React, { useState, useEffect, useContext } from 'react';
import ContentContext from './contentContext';
import locaContext from '@/context/localization/locaContext';
import localesData from '@/locales/en/translation.json';

const ContentProvider = ({ children }) => {
  const { lang } = useContext(locaContext);

  const [isLoading, setIsLoading] = useState(true);
  const [localizedStrings, setLocalizedStrings] = useState({});

  useEffect(() => {
    setIsLoading(true);

    fetchContent();

    setIsLoading(false);
    // eslint-disable-next-line
  }, [lang]);

  const fetchContent = () => {
    let localizedStrings = {};

    for (let key in localesData) {
      localizedStrings[key] = localesData[key];
    }

    setLocalizedStrings(localizedStrings);
  };

  const t = (key) => (localizedStrings[key] ? localizedStrings[key] : key);

  return (
    // eslint-disable-next-line prettier/prettier
    <ContentContext.Provider
      value={{ isLoading, t }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export default ContentProvider;
