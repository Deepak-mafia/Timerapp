import React, {useEffect, useState} from 'react';
import {TimerProvider} from './TimerContext';
import {NavigationContainer} from '@react-navigation/native';
import {MMKV, useMMKVBoolean} from 'react-native-mmkv';
import {
  LoggedInStack,
  OnboardingStack,
  TimerStack,
} from './src/Navigation/Stack';
import {ThemeProvider} from './src/Theme/ThemeContext';
import {ActivityIndicator, View} from 'react-native';

export const storage = new MMKV();
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadAuthState = async () => {
      const hasIsLoggedIn = storage.contains('isLoggedIn');
      if (hasIsLoggedIn) {
        setIsLoggedIn(storage.getBoolean('isLoggedIn') || false);
      } else {
        setIsLoggedIn(false);
        storage.set('isLoggedIn', false);
      }
      setIsLoading(false);
    };

    loadAuthState();
  }, []);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#242424', // Darker background for better contrast
        }}>
        <ActivityIndicator size="large" color="#4dabf7" />
      </View>
    );
  }
  return (
    <ThemeProvider>
      <TimerProvider>
        <NavigationContainer>
          {isLoggedIn ? <LoggedInStack /> : <OnboardingStack />}
          {/* <TimerStack /> */}
        </NavigationContainer>
      </TimerProvider>
    </ThemeProvider>
  );
};

export default App;
