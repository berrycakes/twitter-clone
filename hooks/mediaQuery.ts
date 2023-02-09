import { useEffect, useState } from 'react';

const useMediaQuery = (mediaQueryString: string) => {
  const [matches, setMatches] = useState<boolean | null>(null);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(mediaQueryString);
    const listener = () => setMatches(!!mediaQueryList.matches);
    listener();
    mediaQueryList.addListener(listener);
    return () => mediaQueryList.removeListener(listener);
  }, [mediaQueryString]);

  return matches;
};

export const useIsMobile = () => {
  return useMediaQuery('(max-width: 480px)');
};

export const useIsTablet = () => {
  return useMediaQuery('(max-width: 768px)');
};

export const useIsDesktop = () => {
  return useMediaQuery('(max-width: 1024px)');
};
