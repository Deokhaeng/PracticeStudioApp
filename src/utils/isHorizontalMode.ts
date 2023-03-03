import { useWindowDimensions } from 'react-native';

export default function isHorizontalMode() {
  const { height, width } = useWindowDimensions();
  const isHorizontalMode = width > height;

  return isHorizontalMode;
}
