// 3. navigation/AppNavigator.js (Fixed Implementation)
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import AllNotesScreen from '../Screens/AllNotesScreen';
import EditNoteScreen from '../Screens/EditNoteScreen';

const Stack = createNativeStackNavigator();

const NotesStack = () => {
  return (
    <Stack.Navigator
      // initialRouteName="AllNotes"
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="AllNotes"
        component={AllNotesScreen}
        options={{
          title: 'All Notes',
          headerStyle: {backgroundColor: '#121212'},
          headerTintColor: '#fff',
        }}
      />
      <Stack.Screen
        name="EditNote"
        component={EditNoteScreen}
        options={{
          title: 'Edit Note',
          headerStyle: {backgroundColor: '#121212'},
          headerTintColor: '#fff',
        }}
      />
    </Stack.Navigator>
  );
};

export {NotesStack};
