import React from 'react';
import { Text, View } from 'react-native';
import styled from 'styled-components/native';

const RankingContainer = styled.View({
  flex: 1,
});

export default function RankScreen() {
  return (
    <RankingContainer>
      <Text>RankScreen</Text>
    </RankingContainer>
  );
}
