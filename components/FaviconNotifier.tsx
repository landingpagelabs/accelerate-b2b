'use client';

import { useEffect } from 'react';

const DEFAULT_ICON = '/favicon.png';
const ALERT_ICON = '/favicon-alert.png';
const ALERT_TITLE = '(1) New Message';

/**
 * Swaps the tab title and favicon to "(1) New Message" when the visitor switches to
 * another browser tab, and restores the defaults when they come back.
 */
export function FaviconNotifier() {
  useEffect(() => {
    const getIconLink = () => {
      let link = document.querySelector<HTMLLinkElement>("link[rel~='icon']");
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.head.appendChild(link);
      }
      return link;
    };

    const link = getIconLink();
    const defaultIcon = link.getAttribute('href') || DEFAULT_ICON;
    const defaultTitle = document.title;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        document.title = ALERT_TITLE;
        link.setAttribute('type', 'image/png');
        link.setAttribute('href', ALERT_ICON);
      } else {
        document.title = defaultTitle;
        link.setAttribute('href', defaultIcon);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      // restore defaults on unmount
      document.title = defaultTitle;
      link.setAttribute('href', defaultIcon);
    };
  }, []);

  return null;
}
