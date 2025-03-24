// theme/ThemeContext.js
import React, {createContext, useContext, useState, useEffect} from 'react';
import {useColorScheme} from 'react-native';
import {darkColors, lightColors, spacing, typography} from './theme';
import {storage} from '../../App';

const ThemeContext = createContext({
  isDark: storage.getBoolean('isDark'),
  colors: lightColors,
  setScheme: () => {},
});

export const ThemeProvider = ({children}) => {
  const theme = useColorScheme();
  const colorScheme = storage.contains('theme')
    ? storage.getString('theme')
    : theme;
  const [isDark, setIsDark] = useState(colorScheme === 'dark');

  useEffect(() => {
    setIsDark(colorScheme === 'dark');
  }, [colorScheme]);

  const defaultTheme = {
    isDark,
    colors: isDark ? darkColors : lightColors,
    typography,
    spacing,
    setScheme: scheme => setIsDark(scheme === 'dark'),
  };

  return (
    <ThemeContext.Provider value={defaultTheme}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
