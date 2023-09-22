const config = {
  isProduction: process.env.NODE_ENV === 'production',
  googleAnalyticsTrackingId: process.env.REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID,
  socketURI:
    process.env.NODE_ENV === 'production'
      ? 'wss://pokerpocket-wss.nitramite.com'
      : 'ws://localhost:8000',
};

export default config;
