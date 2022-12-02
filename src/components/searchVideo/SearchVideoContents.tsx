import React from 'react';
import styled from 'styled-components/native';
import { SearchVideoContentsPropsType } from '~types/searchVideoTypes';

const SerchVideo = {
  Container: styled.View(({ theme }) => ({})),
};

export default function SearchVideoContents({ searchVideo }: SearchVideoContentsPropsType) {
  return <SerchVideo.Container />;
}
