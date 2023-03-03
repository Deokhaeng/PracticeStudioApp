import React from 'react';
import { useWindowDimensions } from 'react-native';
import { Shadow } from 'react-native-shadow-2';
import styled from 'styled-components/native';
import { ScreensLayoutPropsType } from '~types/otherTypes';

const Layout = {
  Shadow: styled(Shadow)<{ screenWidth: number }>(({ screenWidth }) => ({
    width: screenWidth,
    height: '1%',
  })),
  Container: styled.View({
    flex: 1,
    backgroundColor: '#fff',
  }),
};

export default function ScreensLayout({ children }: ScreensLayoutPropsType) {
  const { height: screenHeight, width: screenWidth } = useWindowDimensions();

  return (
    <>
      <Layout.Shadow distance={7} startColor="#e7e7e7" endColor="#fff" screenWidth={screenWidth} />
      <Layout.Container>{children}</Layout.Container>
      <Layout.Shadow offset={[0, 10]} startColor="#e7e7e7" endColor="#fff" screenWidth={screenWidth} />
    </>
  );
}
