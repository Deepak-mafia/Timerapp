// 5. screens/HomeScreen.js (Updated)
import React from 'react';
import {useAuthActions, useCountStore, useUser} from '../stores/authStore';
import {Button, Text, View} from 'react-native';
import Courses from '../components/Courses';

const HomeScreen = () => {
  const {logout} = useAuthActions();
  const user = useUser();
  const {reset, increment, count, decrement} = useCountStore(state => state);
  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        // justifyContent: 'space-around',
        alignContent: 'center',
        // gap: 20,
        // width: '100%',
      }}>
      <Courses />
      {/* <Text style={{textAlign: 'center'}}>Welcome {user?.name}</Text>
      <Text style={{textAlign: 'center'}}>count {count}</Text>
      <Button title="Increment" onPress={increment} />
      <Button title="Decrement" onPress={decrement} />
      <Button
        title="increaseBy5"
        onPress={() => useCountStore.getState().increaseBy5()}
      />
      <Button title="Resrt" onPress={reset} />
      <Button title="Logout" onPress={logout} /> */}
    </View>
  );
};

export default HomeScreen;
