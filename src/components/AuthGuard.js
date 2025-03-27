import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import {useAuth} from '../hooks/useAuth';

const AuthGuard = ({children}) => {
  const {isLoading, isAuthenticated} = useAuth();

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!isAuthenticated) {
    // Use navigation.replace instead of navigation.navigate
    return null; // The navigation logic should be handled at the screen level
  }

  return children;
};

export default AuthGuard;
