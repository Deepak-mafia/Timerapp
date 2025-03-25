import {StyleSheet, Text, Pressable, View} from 'react-native';
import React from 'react';

const ScreenOne = ({navigation}) => {
  return (
    <View>
      <Text>ScreenOne</Text>
      <Text>ScreenOne</Text>
      <Pressable onPress={() => navigation.navigate('ScreenTwo')}>
        <Text>Go to ScreenTwo</Text>
      </Pressable>
    </View>
  );
};

export default ScreenOne;

const styles = StyleSheet.create({});
