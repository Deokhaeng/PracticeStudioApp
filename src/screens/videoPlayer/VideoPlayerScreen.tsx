import React, { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import { useWindowDimensions, Animated, Dimensions, View } from 'react-native';
import YoutubePlayer, { YoutubeIframeRef } from 'react-native-youtube-iframe';
import styled from 'styled-components/native';
import { IsLoadingHOC, Spacer, Typo } from '@components/common';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RouteParams } from '~types/navigationTypes';
import MirrorModeIcon from '@assets/image/icon-mirror-mode.svg';
import theme from '@theme/index';
import { usePlayerAnimation } from '@hooks/videoPlayer';
import { PauseButton, PlayButton, PlaybackBar, SeekToButton } from '@components/videoPlayer';
import PlaybackRateIcon from '@assets/image/icon-playbackRate.svg';
import { useThrottle } from '@hooks/index';

const Player = {
  Container: styled.Pressable<{ screenHeight: number }>(({ screenHeight }) => ({
    height: screenHeight,
    alignItems: 'center',
    justifyContent: 'center',
  })),
  Box: styled.View<{ videoHeight: number; videoWidth: number }>(({ videoHeight, videoWidth }) => ({
    flexDirection: 'row',
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
  RightBox: styled.View<{ videoHeight: number }>(({ videoHeight }) => ({
    position: 'absolute',
    height: 70,
    width: videoHeight,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginBottom: 10,
    marginRight: 10,
  })),
  SeekToBox: styled.View({
    flexDirection: 'row',
    height: 300,
  }),
  Button: styled.TouchableOpacity({}),
  Typo: styled(Typo.Normal_4)(({ theme }) => ({
    color: theme.colors.WHITE,
  })),
};

type VideoStatesType = 'ended' | 'paused' | 'playing' | 'unstarted' | 'buffering' | 'video cued';

export type SeekToType = 'forward' | 'back';

interface playbackRate {
  str: '1.0' | '0.75' | '0.5';
  num: 1 | 0.75 | 0.5;
}

const VideoPlayerScreen = ({ setLoading }: { setLoading?: (value: boolean) => void }) => {
  const [playing, setPlaying] = useState(false);
  const route = useRoute<RouteProp<RouteParams, 'VideoPlayerScreen'>>();
  const playerRef = useRef<YoutubeIframeRef>(null);
  const { height: screenHeight, width: screenWidth } = useWindowDimensions();
  const { videoContent } = route.params;
  const isTablet = 744 <= screenWidth;
  const videoHeight = useMemo(() => {
    if (isTablet) {
      return 490;
    } else {
      return screenWidth;
    }
  }, [isTablet]);
  const videoWidth = screenHeight - 145;
  const [isMirrorMode, setIsMirrorMode] = useState<boolean>(false);
  const [pauseButtonVisible, setPauseButtonVisible] = useState<boolean>(false);
  const [playButtonVisible, setPlayButtonVisible] = useState<boolean>(true);
  const [playbackRate, setPalybackRate] = useState<playbackRate>({ str: '1.0', num: 1 });
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
  const { throttle } = useThrottle();

  const handleIsMirrorMode = () => {
    setIsMirrorMode(!isMirrorMode);
  };

  const handlePlaybackRate = () => {
    switch (playbackRate.str) {
      case '1.0': {
        setPalybackRate({ str: '0.75', num: 0.75 });
        break;
      }
      case '0.75': {
        setPalybackRate({ str: '0.5', num: 0.5 });
        break;
      }
      case '0.5': {
        setPalybackRate({ str: '1.0', num: 1 });
        break;
      }
    }
  };

  const onStateChange = useCallback((state: any) => {
    const videoState: VideoStatesType = state;
    if (videoState === 'ended') {
      setPlaying(false);
      padeInLetterbox();
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
    if (videoState === 'unstarted') {
      playVideo();
    }
  }, []);

  const playVideo = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

  const seekTo = (type: SeekToType) => {
    const seekToTime = type === 'forward' ? 10 : -10;
    playerRef.current?.getCurrentTime().then((duration) => {
      const currentDuration = Math.ceil(duration);
      playerRef.current?.seekTo(currentDuration + seekToTime, true);
    });
  };

  const handlePuaseButton = () => {
    throttle(() => {
      padeInPauseButton(setPauseButtonVisible).then((res) => {
        if (res) {
          padeOutPauseButton(setPauseButtonVisible);
        }
      });
    });
  };

  useEffect(() => {
    if (!playing) {
      padeInLetterbox();
    }
  }, [playing]);

  useEffect(() => {
    if (setLoading) {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, []);

  return (
    <>
      <Player.Container
        onPress={() => {
          if (playing) {
            handlePuaseButton();
          }
        }}
        screenHeight={screenHeight}
      >
        <Player.Box pointerEvents="none" videoHeight={videoHeight} videoWidth={videoWidth} style={{ transform: [{ rotate: '90deg' }] }}>
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
            playbackRate={playbackRate.num}
          />
          <Player.LetterboxBottom videoWidth={videoWidth} style={{ opacity: letterboxOpacity }}>
            {playerRef.current && <PlaybackBar player={playerRef.current} />}
          </Player.LetterboxBottom>
        </Player.Box>
        <PlayButton playButtonOpacity={playButtonOpacity} playButtonVisible={playButtonVisible} playVideo={() => throttle(playVideo)} />
        {pauseButtonVisible && playing && (
          <>
            <SeekToButton seeToButtonOpacity={pauseButtonOpacity} type="back" seeTo={seekTo} />
            <PauseButton pauseButtonOpacity={pauseButtonOpacity} playVideo={playVideo} />
            <SeekToButton seeToButtonOpacity={pauseButtonOpacity} type="forward" seeTo={seekTo} />
          </>
        )}
      </Player.Container>
      <Player.RightBox videoHeight={screenWidth}>
        <View style={{ flexDirection: 'row' }}>
          <Player.Button onPress={() => throttle(handleIsMirrorMode)} style={{ transform: [{ rotate: '90deg' }] }}>
            <MirrorModeIcon fill={isMirrorMode ? theme.colors.PRIMARY : theme.colors.BLACK} />
          </Player.Button>
          <Typo.Normal_1 style={{ transform: [{ rotate: '90deg' }], width: 40, textAlign: 'center' }}>{playbackRate.str}</Typo.Normal_1>
          <Spacer width={5} />
          <Player.Button onPress={() => throttle(handlePlaybackRate)} style={{ transform: [{ rotate: '90deg' }] }}>
            <PlaybackRateIcon fill={playbackRate.num === 1 ? theme.colors.BLACK : theme.colors.PRIMARY} />
          </Player.Button>
          <Spacer width={10} />
        </View>
      </Player.RightBox>
    </>
  );
};

export default IsLoadingHOC(VideoPlayerScreen);
