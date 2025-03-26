import {View, Text, TouchableOpacity, TextInput, Modal} from 'react-native';
import React, {useState} from 'react';
import {storage} from '../../../App';
import {useTheme} from '../../Theme/ThemeContext';
import {createStyles} from '../../Theme/styles';

const WelcomeScreen = () => {
  const {colors, isDark, setScheme} = useTheme();
  const styles = createStyles(colors, isDark);

  const toggleTheme = () => {
    storage.set('theme', isDark ? 'light' : 'dark');
    setScheme(isDark ? 'light' : 'dark');
  };

  const handleLogin = () => {
    console.log('handleLogin');

    storage.set('isLoggedIn', true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <TouchableOpacity
          onPress={handleLogin}
          style={[styles.button.primary, {marginVertical: 8}]}>
          <Text style={styles.text.body1}>Click to login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WelcomeScreen;
