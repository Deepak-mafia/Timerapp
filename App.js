import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StarWarsStack} from './src/Navigation/Stack';

const App = () => {
  return (
    <NavigationContainer>
      <StarWarsStack />
    </NavigationContainer>
  );
};

export default App;
