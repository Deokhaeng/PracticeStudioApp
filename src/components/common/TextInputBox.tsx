import styled from 'styled-components/native';
import { TextInputBoxProps } from '~types/otherTypes';

const TextInputBox = styled.TextInput<Partial<TextInputBoxProps>>(
  ({ borderRadius, fontWeight, fontSize, theme, maxWidth, minWidth, backgroundColor, paddingHorizontal }) => ({
    backgroundColor: backgroundColor || theme.colors.LIGHTGRAY,
    borderRadius: borderRadius || 4,
    fontWeight: fontWeight || 500,
    fontSize: fontSize || 16,
    paddingHorizontal: paddingHorizontal || 10,
    height: 40,
    maxWidth: maxWidth || 300,
    minWidth: minWidth || 100,
  })
);

export default TextInputBox;
