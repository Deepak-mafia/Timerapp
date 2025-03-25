import {createNativeStackNavigator} from '@react-navigation/native-stack';

import ScreenOne from '../Screens/BasicSetup/ScreenOne';
import ScreenTwo from '../Screens/BasicSetup/ScreenTwo';

// Create the navigator
const Stack = createNativeStackNavigator();

const BasicStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="ScreenOne" component={ScreenOne} />
      <Stack.Screen name="ScreenTwo" component={ScreenTwo} />
    </Stack.Navigator>
  );
};

export {BasicStack};
