// 3. navigation/AppNavigator.js (Fixed Implementation)
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useUser} from '../stores/authStore';
import HomeScreen from '../Screens/HomeScreen';
import LoginScreen from '../Screens/LoginScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const user = useUser();

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {user ? (
        <Stack.Screen name="Home" component={HomeScreen} />
      ) : (
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{animationTypeForReplace: 'pop'}}
        />
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;
