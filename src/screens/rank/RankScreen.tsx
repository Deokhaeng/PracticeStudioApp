import React, { FC } from 'react';
import { Text, View } from 'react-native';
import styled from 'styled-components/native';

const RankingContainer = styled.View({
  flex: 1,
});

const RankScreen: FC = () => {
  return (
    <RankingContainer>
      <Text>RankScreen</Text>
    </RankingContainer>
  );
};

export default RankScreen;
