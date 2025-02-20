import React from 'react';
import {TimerProvider} from './TimerContext';
import {NavigationContainer} from '@react-navigation/native';
import {HomeScreen} from './src/Timercomp/HomeScreen';
import {HistoryScreen} from './src/Timercomp/HistoryScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const App = () => {
  const Stack = createNativeStackNavigator();
  return (
    <TimerProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="History" component={HistoryScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </TimerProvider>
  );
};

export default App;
