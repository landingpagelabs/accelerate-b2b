'use client';

import { useEffect } from 'react';

const DEFAULT_ICON = '/favicon.png';
const ALERT_ICON = '/favicon-alert.png';
const ALERT_TITLE = '(1) New Message';

/**
 * Підміняє title та favicon на «(1) New Message», коли користувач
 * перемикається на іншу вкладку браузера, і повертає дефолтні значення,
 * коли він знову відкриває вкладку сайту.
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
