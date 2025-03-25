import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const ScreenTwo = ({navigation}) => {
  return (
    <View>
      <Text>ScreenTwo</Text>
      <Text>ScreenTwo</Text>

      <Pressable onPress={() => navigation.goBack()}>
        <Text>Go Back</Text>
      </Pressable>
    </View>
  );
};

export default ScreenTwo;

const styles = StyleSheet.create({});
