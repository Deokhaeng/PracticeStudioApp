import React from 'react';
import styled from 'styled-components/native';
import SeekToLeftIcon from '@assets/image/icon-seekTo-left.svg';
import SeekToRightIcon from '@assets/image/icon-seekTo-right.svg';
import { Animated } from 'react-native';
import theme from '@theme/index';
import { SeekToType } from '@screens/videoPlayer/VideoPlayerScreen';
import { useThrottle } from '@hooks/index';

const Player = {
  PauseButtonBox: styled(Animated.View)<{ type: SeekToType }>(({ theme, type }) => ({
    position: 'absolute',
    width: 50,
    height: 60,
    top: type === 'forward' ? '60%' : '40%',
    left: '50%',
    marginTop: -(50 / 2),
    marginLeft: -(50 / 2),
  })),
  Button: styled.TouchableOpacity({}),
};

export default function SeekToButtonBox({
  type,
  seeToButtonOpacity,
  seeTo,
}: {
  type: SeekToType;
  seeToButtonOpacity: Animated.Value;
  seeTo: (type: SeekToType) => void;
}) {
  const { throttle } = useThrottle();
  return (
    <Player.PauseButtonBox style={{ opacity: seeToButtonOpacity, transform: [{ rotate: '90deg' }] }} type={type}>
      <Player.Button onPress={() => throttle(() => seeTo(type))}>
        {type === 'back' && <SeekToLeftIcon fill={theme.colors.BACKGROUND} width={50} height={50} />}
        {type === 'forward' && <SeekToRightIcon fill={theme.colors.BACKGROUND} width={50} height={50} />}
      </Player.Button>
    </Player.PauseButtonBox>
  );
}
