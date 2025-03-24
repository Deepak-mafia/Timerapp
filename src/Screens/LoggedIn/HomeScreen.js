import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {storage} from '../../../App';

export default function HomeScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{fontSize: 24, fontStyle: 'normal', fontWeight: '500'}}>
        HomeScreen
      </Text>
      <TouchableOpacity
        onPress={() => {
          storage.set('isLoggedIn', false);
        }}>
        <Text>Click to logout</Text>
      </TouchableOpacity>
    </View>
  );
}
