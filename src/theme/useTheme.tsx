import { useState, useEffect } from 'react';
import { Appearance } from 'react-native';
import { DefaultTheme } from 'styled-components';
import { DarkColors, LightColors } from '@styles/Styles';

export default function useTheme(): DefaultTheme {
  const [theme, setTheme] = useState<DefaultTheme>({ ...DarkColors });
  const [mode, setMode] = useState<string>(Appearance.getColorScheme() || 'dark');

  useEffect(() => {
    setTheme(mode === 'dark' ? { ...DarkColors } : { ...LightColors });
  }, [mode]);

  useEffect(() => {
    const updateMode = () => {
      const currentMode = Appearance.getColorScheme();
      setMode(currentMode === 'dark' ? 'dark' : 'light');
    };

    Appearance.addChangeListener(updateMode);
  }, []);

  return theme;
}
