import styled from 'styled-components/native';

const Divider = styled.View<{ height?: boolean; width?: boolean }>(({ theme, height, width }) => ({
  borderWidth: width || height ? 0.5 : undefined,
  borderColor: theme.colors.LIGHTGRAY,
  width: width ? '100%' : undefined,
  height: height ? '100%' : undefined,
}));

export default Divider;
