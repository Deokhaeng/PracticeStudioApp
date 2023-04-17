import theme from '@theme/index';
import React, { JSXElementConstructor, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';

export const Loading = {
  Indicator: styled(ActivityIndicator)(({ theme }) => ({
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.BACKGROUND,
    zIndex: 999,
  })),
};

export function IsLoadingHOC<P>(WrappedComponent: JSXElementConstructor<P>, loadingMessage?: string) {
  return function HOC(props: P) {
    const [isLoading, setIsLoading] = useState(true);

    const setLoadingState = (isComponentLoading: boolean) => {
      setIsLoading(isComponentLoading);
    };

    return (
      <>
        {isLoading && <Loading.Indicator size={'large'} color={theme.colors.LIGHTGRAY} />}
        <WrappedComponent {...(props as P)} setLoading={setLoadingState} />
      </>
    );
  };
}

export default IsLoadingHOC;
