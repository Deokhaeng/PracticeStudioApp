import { Dispatch, SetStateAction, useCallback, useRef } from 'react';
import { Animated } from 'react-native';

export default function usePlayerAnimation() {
  const letterboxOpacity = useRef(new Animated.Value(1)).current;
  const playButtonOpacity = useRef(new Animated.Value(1)).current;
  const pauseButtonOpacity = useRef(new Animated.Value(1)).current;

  const padeOutLetterbox = useCallback(() => {
    setTimeout(() => {
      Animated.timing(letterboxOpacity, {
        toValue: 0,
        duration: 700,
        useNativeDriver: false,
      }).start();
    }, 3000);
  }, [letterboxOpacity]);

  const padeInLetterbox = useCallback(() => {
    Animated.timing(letterboxOpacity, {
      toValue: 1,
      duration: 0,
      useNativeDriver: false,
    }).start();
  }, [letterboxOpacity]);

  const padeOutPauseButton = useCallback(
    (setPauseButtonVisible: Dispatch<SetStateAction<boolean>>) => {
      padeOutLetterbox();
      const set = setInterval(() => {
        Animated.timing(pauseButtonOpacity, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: false,
        }).start(() => setPauseButtonVisible(false));
        clearInterval(set);
      }, 2000);
    },
    [pauseButtonOpacity]
  );

  const padeInPauseButton = useCallback(
    (setPauseButtonVisible: Dispatch<SetStateAction<boolean>>) => {
      return new Promise<boolean>((resolve, rejects) => {
        try {
          padeInLetterbox();
          Animated.timing(pauseButtonOpacity, {
            toValue: 1,
            duration: 0,
            useNativeDriver: false,
          }).start();
          setPauseButtonVisible(true);
          resolve(true);
        } catch {
          resolve(false);
          rejects();
        }
      });
    },
    [pauseButtonOpacity]
  );

  const padeOutPlayButton = useCallback(() => {
    Animated.timing(playButtonOpacity, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [playButtonOpacity]);

  const padeInPlayButton = useCallback(() => {
    Animated.timing(playButtonOpacity, {
      toValue: 1,
      duration: 0,
      useNativeDriver: false,
    }).start();
  }, [playButtonOpacity]);

  return {
    letterboxOpacity,
    playButtonOpacity,
    pauseButtonOpacity,
    padeOutLetterbox,
    padeInLetterbox,
    padeOutPauseButton,
    padeInPauseButton,
    padeOutPlayButton,
    padeInPlayButton,
  };
}
