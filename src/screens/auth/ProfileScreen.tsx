import React from 'react';
import styled from 'styled-components/native';
import { Typo } from '@components/index';

const Profile = {
  Container: styled.View({
    flex: 1,
  }),
  Typo: styled(Typo.Normal_3)({}),
};

export default function RankScreen() {
  return (
    <Profile.Container>
      <Profile.Typo>RankScreen</Profile.Typo>
    </Profile.Container>
  );
}
