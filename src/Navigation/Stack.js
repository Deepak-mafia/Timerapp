import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HistoryScreen} from '../Timercomp/HistoryScreen';
import {HomeScreen as TimerHomeScreen} from '../Timercomp/HomeScreen';

// Create the navigator
const Stack = createNativeStackNavigator();

// Onboarding Stack Component

const TimerStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={TimerHomeScreen} />
      <Stack.Screen name="History" component={HistoryScreen} />
    </Stack.Navigator>
  );
};

export {TimerStack};
