import isAndroid from '@utils/isAndroid';
import React from 'react';
import styled from 'styled-components/native';
import { ShadowPropsType } from '~types/otherTypes';

const ShadowContainer = styled.View<Partial<ShadowPropsType>>(({ _isAndroid, borderRadius, theme }) => ({
  shadowColor: !_isAndroid ? '#000' : undefined,
  shadowOffset: !_isAndroid ? '0px 3px' : undefined,
  shadowOpacity: !_isAndroid ? '0.2' : undefined,
  shadowRadius: !_isAndroid ? 5 : undefined,
  elevation: _isAndroid ? '6' : undefined,
  borderRadius: borderRadius,
  width: '100%',
  backgroundColor: theme.colors.WHITE,
}));

export default function Shadow({ children, borderRadius }: ShadowPropsType) {
  return (
    <ShadowContainer _isAndroid={isAndroid} borderRadius={borderRadius}>
      {children}
    </ShadowContainer>
  );
}
