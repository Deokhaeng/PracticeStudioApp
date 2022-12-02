import { Appearance } from 'react-native';

const isDark = Appearance.getColorScheme() === 'dark';

export default isDark;
