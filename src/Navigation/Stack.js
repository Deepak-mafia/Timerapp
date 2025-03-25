import {createNativeStackNavigator} from '@react-navigation/native-stack';
import WelcomeScreen from '../Screens/Onboarding/WelcomeScreen';
import HomeScreen from '../Screens/LoggedIn/HomeScreen';
import {HistoryScreen} from '../Timercomp/HistoryScreen';
import {HomeScreen as TimerHomeScreen} from '../Timercomp/HomeScreen';
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

// Onboarding Stack Component
const OnboardingStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      {/* <Stack.Screen name="Login" component={LoginScreen} /> */}
      {/* <Stack.Screen name="Signup" component={SignupScreen} /> */}
    </Stack.Navigator>
  );
};

// LoggedIn Stack Component

const LoggedInStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        // headerStyle: {
        //   backgroundColor: '#f4511e',
        // },
        // headerTintColor: '#fff',
        // headerTitleStyle: {
        //   fontWeight: 'bold',
        // },
        headerShown: false,
      }}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        // options={{
        //   title: 'Dashboard',
        // }}
      />
      {/* <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'My Profile',
        }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: 'Settings',
        }}
      /> */}
    </Stack.Navigator>
  );
};

const TimerStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={TimerHomeScreen} />
      <Stack.Screen name="History" component={HistoryScreen} />
    </Stack.Navigator>
  );
};

export {OnboardingStack, LoggedInStack, TimerStack, StarWarsStack};
