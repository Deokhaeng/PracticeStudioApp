import React, { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import { useWindowDimensions, Animated, Dimensions } from 'react-native';
import YoutubePlayer, { YoutubeIframeRef } from 'react-native-youtube-iframe';
import styled from 'styled-components/native';
import { Typo } from '@components/common';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RouteParams } from '~types/navigationTypes';
import MirrorModeIcon from '@assets/image/icon-mirror-mode.svg';
import theme from '@theme/index';
import { usePlayerAnimation } from '@hooks/videoPlayer';
import { PauseButton, PlayButton } from '@components/videoPlayer';
import isHorizontalMode from '@utils/isHorizontalMode';

const devicesWidth = Math.round(Dimensions.get('window').width);

const Player = {
  Container: styled.Pressable<{ isHorizontalMode: boolean; screenWidth: number; screenHeight: number }>(({ isHorizontalMode, screenWidth, screenHeight }) => ({
    height: screenHeight,
    width: screenWidth,
    alignItems: 'center',
    justifyContent: isHorizontalMode ? undefined : 'center',
  })),
  Box: styled.View<{ videoHeight: number; videoWidth: number; isHorizontalMode: boolean }>(({ videoHeight, videoWidth, isHorizontalMode }) => ({
    height: videoHeight,
    width: videoWidth,
    flexDirection: isHorizontalMode ? 'column' : 'row',
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -(videoHeight / 2),
    marginLeft: -(videoWidth / 2),
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
  RightBox: styled.View<{ videoHeight: number; isHorizontalMode: boolean }>(({ videoHeight, isHorizontalMode }) => ({
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
  Button: styled.TouchableOpacity({}),
  Typo: styled(Typo.Normal_4)(({ theme }) => ({
    color: theme.colors.WHITE,
  })),
};

type VideoStatesType = 'ended' | 'paused' | 'playing' | 'unstarted' | 'buffering' | 'video cued';

export default function VideoPlayerScreen() {
  const [playing, setPlaying] = useState(false);
  const route = useRoute<RouteProp<RouteParams, 'VideoPlayerScreen'>>();
  const playerRef = useRef<YoutubeIframeRef>(null);
  const horizomtalMode = isHorizontalMode();
  const { height: screenHeight, width: screenWidth } = useWindowDimensions();
  const { videoContent } = route.params;
  const isTablet = 744 <= devicesWidth;
  const videoHeight = useMemo(() => {
    if (isTablet) {
      return 510;
    } else {
      if (horizomtalMode) {
        return screenHeight;
      } else {
        return screenWidth;
      }
    }
  }, [horizomtalMode]);
  const videoWidth = horizomtalMode ? screenWidth - 145 : screenHeight - 145;
  const [isMirrorMode, setIsMirrorMode] = useState<boolean>(false);
  const [pauseButtonVisible, setPauseButtonVisible] = useState<boolean>(false);
  const [playButtonVisible, setPlayButtonVisible] = useState<boolean>(true);
  const {
    letterboxOpacity,
    playButtonOpacity,
    pauseButtonOpacity,
    padeOutLetterbox,
    padeInLetterbox,
    padeOutPlayButton,
    padeInPlayButton,
    padeOutPauseButton,
    padeInPauseButton,
  } = usePlayerAnimation();

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
      setPlayButtonVisible(false);
    }
    if (videoState === 'paused') {
      padeInPlayButton();
      padeInLetterbox();
      setPlayButtonVisible(true);
    }
  }, []);

  useEffect(() => {
    if (!playing) {
      padeInLetterbox();
    }
  }, [playing]);

  return (
    <>
      <Player.Container
        onPress={() => {
          if (playing) {
            padeInPauseButton(setPauseButtonVisible);
            padeOutPauseButton(setPauseButtonVisible);
          }
        }}
        isHorizontalMode={horizomtalMode}
        screenHeight={screenHeight}
        screenWidth={screenWidth}
      >
        <Player.Box
          pointerEvents="none"
          videoHeight={videoHeight}
          videoWidth={videoWidth}
          isHorizontalMode={horizomtalMode}
          style={{ transform: [{ rotate: horizomtalMode ? '360deg' : '90deg' }] }}
        >
          <Player.LetterboxTop videoWidth={videoWidth} style={{ opacity: letterboxOpacity }}>
            <Player.Typo numberOfLines={1} ellipsizeMode="tail">
              {videoContent.title}
            </Player.Typo>
          </Player.LetterboxTop>
          <YoutubePlayer
            height={videoHeight}
            play={playing}
            videoId={videoContent.videoId}
            onChangeState={onStateChange}
            webViewStyle={{
              width: videoWidth,
              position: 'relative',
              transform: [{ scaleX: isMirrorMode ? -1 : 1 }],
            }}
            ref={playerRef}
          />

          <Player.LetterboxBottom videoWidth={videoWidth} style={{ opacity: letterboxOpacity }} />
        </Player.Box>
        <PlayButton playButtonOpacity={playButtonOpacity} playButtonVisible={playButtonVisible} isHorizontalMode={horizomtalMode} setPlaying={setPlaying} />
        {pauseButtonVisible && playing && <PauseButton pauseButtonOpacity={pauseButtonOpacity} isHorizontalMode={horizomtalMode} setPlaying={setPlaying} />}
      </Player.Container>
      <Player.RightBox videoHeight={horizomtalMode ? screenHeight : screenWidth} isHorizontalMode={horizomtalMode}>
        <Player.Button onPress={handleIsMirrorMode} style={{ transform: [{ rotate: horizomtalMode ? '360deg' : '90deg' }] }}>
          <MirrorModeIcon fill={isMirrorMode ? theme.colors.PRIMARY : theme.colors.BLACK} />
        </Player.Button>
      </Player.RightBox>
    </>
  );
}
