import styled from 'styled-components/native';
import { TypoPropsType } from '~types/otherTypes';

/**
 * 26px / normal
 */
const Normal_6 = styled.Text<Partial<TypoPropsType>>(({ theme, color, weight }) => ({
  fontSize: 26 * ((1 - theme.fonts.fontScale) * 0.5 + theme.fonts.fontScale) || 26,
  color: color || theme.colors.TEXT_DEFAULT,
  fontWeight: weight || 'normal',
}));

/**
 * 20px / normal
 */
const Normal_5 = styled.Text<Partial<TypoPropsType>>(({ theme, color, weight }) => ({
  fontSize: 20 * ((1 - theme.fonts.fontScale) * 0.5 + theme.fonts.fontScale) || 20,
  color: color || theme.colors.TEXT_DEFAULT,
  fontWeight: weight || 'normal',
}));

/**
 * 16px / normal
 */
const Normal_4 = styled.Text<Partial<TypoPropsType>>(({ theme, color, weight }) => ({
  fontSize: 16 * ((1 - theme.fonts.fontScale) * 0.5 + theme.fonts.fontScale) || 16,
  color: color || theme.colors.TEXT_DEFAULT,
  fontWeight: weight || 'normal',
}));

/**
 * 14px / normal
 */
const Normal_3 = styled.Text<Partial<TypoPropsType>>(({ theme, color, weight }) => ({
  fontSize: 14 * ((1 - theme.fonts.fontScale) * 0.5 + theme.fonts.fontScale) || 14,
  color: color || theme.colors.TEXT_DEFAULT,
  fontWeight: weight || 'normal',
}));

/**
 * 12px / normal
 */
const Normal_2 = styled.Text<Partial<TypoPropsType>>(({ theme, color, weight }) => ({
  fontSize: 12 * ((1 - theme.fonts.fontScale) * 0.5 + theme.fonts.fontScale) || 12,
  color: color || theme.colors.TEXT_DEFAULT,
  fontWeight: weight || 'normal',
}));

/**
 * 10px / normal
 */
const Normal_1 = styled.Text<Partial<TypoPropsType>>(({ theme, color, weight }) => ({
  fontSize: 10 * ((1 - theme.fonts.fontScale) * 0.5 + theme.fonts.fontScale) || 10,
  color: color || theme.colors.TEXT_DEFAULT,
  fontWeight: weight || 'normal',
}));

export default {
  Normal_1,
  Normal_2,
  Normal_3,
  Normal_4,
  Normal_5,
  Normal_6,
};
