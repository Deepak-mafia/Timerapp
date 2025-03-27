// 4. screens/LoginScreen.js (Optimized)
import React from 'react';
import {Button, Text, TextInput, View} from 'react-native';
import {useAuthActions} from '../stores/authStore';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = React.useState('');
  const {login} = useAuthActions();

  const handleLogin = () => {
    login({
      user: {id: '1', name: 'User', email},
      token: 'mock-token',
    });
  };

  return (
    <View style={{padding: 20}}>
      <Text></Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

export default LoginScreen;
