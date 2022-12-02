import styled from 'styled-components/native';
import { SpacerPropsType } from '~types/otherTypes';

const Spacer = styled.View<Partial<SpacerPropsType>>(({ height, width }) => ({
  height: height,
  width: width,
}));

export default Spacer;
