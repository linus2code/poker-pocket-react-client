import { useEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';
import config from '@/clientConfig';

const GoogleAnalytics = () => {
  const location = useLocation();
  const action = useNavigationType();

  useEffect(() => {
    const gtag = window.gtag;

    if (action === 'PUSH' && gtag && typeof gtag === 'function') {
      gtag('config', config.googleAnalyticsTrackingId, {
        page_title: document.title,
        page_location: window.location.href,
        page_path: location.pathname,
      });
    }
  }, [location, action]);

  return null;
};

export default GoogleAnalytics;
