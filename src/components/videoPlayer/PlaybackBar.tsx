import { useSetInterval } from '@hooks/useSetInterval';
import React, { FC, useEffect, useState } from 'react';
import { YoutubeIframeRef } from 'react-native-youtube-iframe';
import styled from 'styled-components/native';

const Playback = {
  Container: styled.View(({ theme }) => ({
    position: 'absolute',
    width: '100%',
    height: 30,
    bottom: 50,
    zIndex: 999,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#000',
  })),
  BackBar: styled.View(({ theme }) => ({
    backgroundColor: theme.colors.LIGHTGRAY,
    height: 5,
    width: '100%',
    borderRadius: 10,
  })),
  ActiveBar: styled.View<{ percent: string }>(({ theme, percent }) => ({
    backgroundColor: theme.colors.PRIMARY,
    height: 5,
    width: percent,
    borderRadius: 10,
    paddingLeft: 10,
  })),
  Circle: styled.TouchableOpacity(({ theme }) => ({
    position: 'absolute',
    width: 15,
    height: 15,
    borderRadius: 15,
    backgroundColor: theme.colors.PRIMARY,
    right: 0,
    top: '50%',
    marginTop: -(15 / 2),
  })),
};

const PlyabackBar: FC<{ player: YoutubeIframeRef }> = ({ player }) => {
  const [totalDuration, setTotalDuration] = useState<number>(0);
  const [percent, setPercet] = useState<number>(0);

  useSetInterval(() => {
    player?.getCurrentTime().then((duration) => {
      const currentDuration = Math.ceil(duration);
      if (totalDuration > 0) {
        setPercet(Math.ceil((currentDuration / totalDuration) * 100));
      }
    });
  }, 1000);

  useEffect(() => {
    const checkDuration = setTimeout(
      () =>
        player.getDuration().then((duration) => {
          console.log(duration);
          setTotalDuration(Math.floor(duration));
        }),
      1000
    );

    return () => clearTimeout(checkDuration);
  }, []);

  return (
    <Playback.Container>
      <Playback.BackBar>
        <Playback.ActiveBar percent={`${percent}%`}>
          <Playback.Circle />
        </Playback.ActiveBar>
      </Playback.BackBar>
    </Playback.Container>
  );
};

export default PlyabackBar;
