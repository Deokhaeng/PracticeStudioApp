import { FC } from 'react';
import PauseIcon from '@assets/image/icon-pause.svg';
import styled from 'styled-components/native';
import { Animated } from 'react-native';
import theme from '@theme/index';

const Player = {
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
};

type PauseButtonPropsType = {
  pauseButtonOpacity: Animated.Value;
  playVideo: () => void;
};
const PauseButton: FC<PauseButtonPropsType> = ({ pauseButtonOpacity, playVideo }) => {
  return (
    <Player.PauseButtonBox style={{ opacity: pauseButtonOpacity, transform: [{ rotate: '90deg' }] }}>
      <Player.Button onPress={playVideo}>
        <PauseIcon fill={theme.colors.BACKGROUND} width={80} height={80} />
      </Player.Button>
    </Player.PauseButtonBox>
  );
};

export default PauseButton;
