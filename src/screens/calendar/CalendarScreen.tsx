import React from 'react';
import { Text, View } from 'react-native';
import styled from 'styled-components/native';

const CalendarContainer = styled.View({
  flex: 1,
});

export default function CalendarScreen() {
  return (
    <CalendarContainer>
      <Text>Calendar Screen</Text>
    </CalendarContainer>
  );
}
