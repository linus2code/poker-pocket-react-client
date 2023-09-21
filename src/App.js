import React from 'react';
import Providers from '@/context/Providers';
import BaseRouter from '@/components/routing/BaseRouter';
import config from '@/clientConfig';
import GoogleAnalytics from '@/components/analytics/GoogleAnalytics';

const App = () => {
  return (
    <Providers>
      <BaseRouter />
      {config.isProduction && <GoogleAnalytics />}
    </Providers>
  );
};

export default App;
