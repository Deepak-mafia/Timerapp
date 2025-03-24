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
    storage.set('isLoggedIn', true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* <Text style={[styles.text.h1, {}]}>Welcome</Text>
        <Text style={styles.text.body1}>Welcome1</Text>
        <Text>Welcome1</Text>

        <Text style={styles.text.body1}>This is a sample component</Text>
        <Text style={styles.text.body2}>Welcome</Text>
        <Text style={styles.text.caption}>This is a sample component</Text>

        <TouchableOpacity
          style={styles.button.primary}
          // onPress={toggleTheme}
        >
          <Text style={[styles.text.body1, {color: colors.text.primary}]}>
            toggleTheme
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button.secondary} onPress={toggleTheme}>
          <Text style={[styles.text.body1]}>toggleTheme</Text>
        </TouchableOpacity>
        <TextInput style={styles.input} /> */}
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
