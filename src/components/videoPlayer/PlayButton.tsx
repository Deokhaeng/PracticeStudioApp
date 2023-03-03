import { Dispatch, FC, SetStateAction } from 'react';
import styled from 'styled-components/native';
import VideoIcon from '@assets/image/icon-video.svg';
import { Animated } from 'react-native';
import theme from '@theme/index';

const Player = {
  PlayButtonBox: styled(Animated.View)(({ theme }) => ({
    position: 'absolute',
    width: 90,
    height: 70,
    top: '50%',
    left: '50%',
    marginTop: -(70 / 2),
    marginLeft: -(90 / 2),
    backgroundColor: theme.colors.BACKGROUND,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
  })),
  Button: styled.TouchableOpacity({}),
};

type PlayButtonPropsType = {
  playButtonVisible: boolean;
  playButtonOpacity: Animated.Value;
  isHorizontalMode: boolean;
  setPlaying: Dispatch<SetStateAction<boolean>>;
};

const PlayButton: FC<PlayButtonPropsType> = ({ playButtonVisible, playButtonOpacity, isHorizontalMode, setPlaying }) => {
  return (
    <Player.PlayButtonBox
      style={{
        display: playButtonVisible ? 'flex' : 'none',
        opacity: playButtonOpacity,
        transform: [{ rotate: isHorizontalMode ? '360deg' : '90deg' }],
      }}
    >
      <Player.Button
        onPress={() => {
          setPlaying(true);
        }}
      >
        <VideoIcon fill={theme.colors.PRIMARY} width={90} height={90} />
      </Player.Button>
    </Player.PlayButtonBox>
  );
};

export default PlayButton;
