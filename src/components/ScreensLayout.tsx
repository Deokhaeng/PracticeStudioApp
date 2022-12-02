import React, { ReactNode } from 'react';
import { Shadow } from 'react-native-shadow-2';
import styled from 'styled-components/native';
import { ScreensLayoutPropsType } from '~types/otherTypes';
// \
const Layout = {
  Shadow: styled(Shadow)({
    width: '100%',
    height: '1%',
  }),
  Container: styled.View({
    flex: 1,
    backgroundColor: '#fff',
  }),
};

export default function ScreensLayout({ children }: ScreensLayoutPropsType) {
  return (
    <>
      <Layout.Shadow distance={7} startColor="#e7e7e7" endColor="#fff" />
      <Layout.Container>{children}</Layout.Container>
      <Layout.Shadow offset={[0, 10]} startColor="#e7e7e7" endColor="#fff" />
    </>
  );
}
