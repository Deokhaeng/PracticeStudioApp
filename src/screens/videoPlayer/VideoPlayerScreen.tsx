import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Button, Alert, useWindowDimensions, View, Animated } from 'react-native';
import YoutubePlayer, { YoutubeIframeRef } from 'react-native-youtube-iframe';
import styled from 'styled-components/native';
import { Spacer, Typo } from '@components/common';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RouteParams } from '~types/navigationTypes';
import MirrorModeIcon from '@assets/image/icon-mirror-mode.svg';
import useTheme from '@theme/useTheme';
import VideoIcon from '@assets/image/icon-video.svg';
import PauseIcon from '@assets/image/icon-pause.svg';

const Player = {
  Container: styled.View<{ isHorizontalMode: boolean; screenWidth: number; screenHeight: number }>(({ isHorizontalMode, screenWidth, screenHeight }) => ({
    height: screenHeight,
    width: screenWidth,
    // flex: 1,
    alignItems: 'center',
    justifyContent: isHorizontalMode ? undefined : 'center',
  })),
  Box: styled.View<{ videoHeight: number; videoWidth: number; isHorizontalMode: boolean }>(({ videoHeight, videoWidth, isHorizontalMode }) => ({
    height: videoHeight,
    width: videoWidth,
    flexDirection: isHorizontalMode ? 'column' : 'row',
  })),
  LetterboxTop: styled(Animated.View)<{ videoWidth: number }>(({ theme, videoWidth }) => ({
    position: 'absolute',
    height: 50,
    width: videoWidth,
    backgroundColor: '#000',
    top: 0,
    zIndex: 999,
    justifyContent: 'center',
    paddingHorizontal: 10,
  })),
  LetterboxBottom: styled(Animated.View)<{ videoWidth: number }>(({ theme, videoWidth }) => ({
    position: 'absolute',
    height: 50,
    width: videoWidth,
    backgroundColor: '#000',
    bottom: 0,
    zIndex: 999,
  })),
  LeftBox: styled.View<{ videoHeight: number; isHorizontalMode: boolean }>(({ videoHeight, isHorizontalMode }) => ({
    position: 'absolute',
    height: isHorizontalMode ? videoHeight : 70,
    width: isHorizontalMode ? 70 : videoHeight,
    right: isHorizontalMode ? 0 : undefined,
    bottom: isHorizontalMode ? undefined : 0,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginBottom: 10,
    marginRight: 10,
  })),
  PlayButtonBox: styled(Animated.View)(({ theme }) => ({
    position: 'absolute',
    width: 80,
    height: 60,
    top: '50%',
    left: '50%',
    marginTop: -(50 / 2),
    marginLeft: -(70 / 2),
    backgroundColor: theme.colors.BACKGROUND,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
  })),
  PauseButtonBox: styled(Animated.View)(({ theme }) => ({
    position: 'absolute',
    width: 80,
    height: 90,
    top: '50%',
    left: '50%',
    marginTop: -(80 / 2),
    marginLeft: -(80 / 2),
  })),
  Button: styled.TouchableOpacity({}),
  Typo: styled(Typo.Normal_4)(({ theme }) => ({
    color: theme.colors.WHITE,
  })),
};

type VideoStatesType = 'ended' | 'paused' | 'playing' | 'unstarted' | 'buffering' | 'video cued';

export default function VideoPlayerScreen() {
  const theme = useTheme();
  const [playing, setPlaying] = useState(false);
  const route = useRoute<RouteProp<RouteParams, 'VideoPlayerScreen'>>();
  const playerRef = useRef<YoutubeIframeRef>(null);
  const { height: screenHeight, width: screenWidth } = useWindowDimensions();
  const { videoContent } = route.params;
  const isHorizontalMode = screenWidth > screenHeight;
  const videoHeight = isHorizontalMode ? screenHeight : screenWidth;
  const videoWidth = isHorizontalMode ? screenWidth - 145 : screenHeight - 145;
  const [isMirrorMode, setIsMirrorMode] = useState<boolean>(false);
  const [buttonVisible, setButtonVisible] = useState<boolean>(false);
  const letterboxOpacity = useRef(new Animated.Value(0.95)).current;
  const playButtonOpacity = useRef(new Animated.Value(1)).current;

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

  const handleIsMirrorMode = () => {
    setIsMirrorMode(!isMirrorMode);
  };

  const onStateChange = useCallback((state: any) => {
    const videoState: VideoStatesType = state;
    if (videoState === 'ended') {
      setPlaying(false);
    }
    if (videoState === 'buffering' || videoState === 'playing') {
      padeOutPlayButton();
    }
    if (videoState === 'playing') {
      padeOutLetterbox();
    }
    if (videoState === 'paused') {
      padeInLetterbox();
      padeInPlayButton();
    }
  }, []);

  return (
    <>
      <Player.Container isHorizontalMode={isHorizontalMode} screenHeight={screenHeight} screenWidth={screenWidth}>
        <Player.Box
          pointerEvents="none"
          videoHeight={videoHeight}
          videoWidth={videoWidth}
          isHorizontalMode={isHorizontalMode}
          style={{ transform: [{ rotate: isHorizontalMode ? '360deg' : '90deg' }] }}
        >
          {/* {!playing && ( */}
          <Player.LetterboxTop videoWidth={videoWidth} style={{ opacity: letterboxOpacity }}>
            <Player.Typo numberOfLines={1} ellipsizeMode="tail">
              {videoContent.title}
            </Player.Typo>
          </Player.LetterboxTop>
          {/* )} */}
          <YoutubePlayer
            height={videoHeight}
            play={playing}
            videoId={videoContent.videoId}
            onChangeState={onStateChange}
            webViewStyle={{ width: videoWidth, position: 'relative', transform: [{ scaleX: isMirrorMode ? -1 : 1 }] }}
            ref={playerRef}
          />
          {/* {!playing &&  */}
          <Player.LetterboxBottom videoWidth={videoWidth} style={{ opacity: letterboxOpacity }} />
          {/* } */}
        </Player.Box>
        <Player.PlayButtonBox style={{ opacity: playButtonOpacity, transform: [{ rotate: isHorizontalMode ? '360deg' : '90deg' }] }}>
          <Player.Button
            onPress={() => {
              setPlaying(true);
            }}
          >
            <VideoIcon fill={theme.colors.PRIMARY} width={80} height={80} />
          </Player.Button>
        </Player.PlayButtonBox>
        <Player.PauseButtonBox style={{ transform: [{ rotate: isHorizontalMode ? '360deg' : '90deg' }] }}>
          <Player.Button
            onPress={() => {
              setPlaying(true);
            }}
          >
            <PauseIcon fill={theme.colors.BACKGROUND} width={80} height={80} />
          </Player.Button>
        </Player.PauseButtonBox>
      </Player.Container>
      <Player.LeftBox videoHeight={videoHeight} isHorizontalMode={isHorizontalMode}>
        <Player.Button onPress={handleIsMirrorMode} style={{ transform: [{ rotate: isHorizontalMode ? '360deg' : '90deg' }] }}>
          <MirrorModeIcon fill={isMirrorMode ? theme.colors.PRIMARY : theme.colors.BLACK} />
        </Player.Button>
      </Player.LeftBox>
    </>
  );
}
