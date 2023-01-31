import { useMediaQuery } from 'usehooks-ts';

export const useIsMobile = () => {
  return useMediaQuery('(min-width: 480px)');
};

export const useIsTablet = () => {
  return useMediaQuery('(min-width: 768px)');
};

export const useIsDesktop = () => {
  return useMediaQuery('(min-width: 1024px)');
};
