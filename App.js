import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {BasicStack} from './src/Navigation/Stack';

const App = () => {
  return (
    <NavigationContainer>
      <BasicStack />
    </NavigationContainer>
  );
};

export default App;
