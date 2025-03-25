import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Login from '../Screens/StarWars/Login';
import Search from '../Screens/StarWars/Search';

// Create the navigator
const Stack = createNativeStackNavigator();

const StarWarsStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Search" component={Search} />
    </Stack.Navigator>
  );
};

export {StarWarsStack};
