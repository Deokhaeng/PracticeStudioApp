import React from 'react';
import styled from 'styled-components/native';
import { Typo } from '@components/common';

const Profile = {
  Container: styled.View({
    flex: 1,
  }),
  Typo: styled(Typo.Normal_3)({}),
};

export default function ProfileScreen() {
  return (
    <Profile.Container>
      <Profile.Typo>ProfileScreen</Profile.Typo>
    </Profile.Container>
  );
}
