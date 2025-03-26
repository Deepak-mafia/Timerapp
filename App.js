import React from 'react';
import {TimerProvider} from './TimerContext';
import {NavigationContainer} from '@react-navigation/native';
import {TimerStack} from './src/Navigation/Stack';
import {ThemeProvider} from './src/Theme/ThemeContext';
import {MMKV} from 'react-native-mmkv';

export const storage = new MMKV();
const App = () => {
  return (
    <NavigationContainer>
      <ThemeProvider>
        <TimerProvider>
          <TimerStack />
        </TimerProvider>
      </ThemeProvider>
    </NavigationContainer>
  );
};

export default App;
