import { useRef } from 'react';

export const useThrottle = () => {
  const busy = useRef(false);

  const throttle = async (callback: () => void) => {
    setTimeout(() => {
      busy.current = false;
    }, 500);

    if (!busy.current) {
      busy.current = true;
      callback();
    }
  };

  return { throttle };
};
