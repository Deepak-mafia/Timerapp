// 2. App.js (Critical Fixes)
import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {ActivityIndicator, View} from 'react-native';

import ErrorBoundary from './src/components/ErrorBoundary';
import AppNavigator from './src/Navigation/AppNavigator';
import {useAuthStore} from './src/stores/authStore';

const App = () => {
  const [isHydrated, setIsHydrated] = useState(false);

  // Separate hydration flow
  useEffect(() => {
    const unsubscribe = useAuthStore.persist.onFinishHydration(() => {
      setIsHydrated(true);
    });

    // Trigger manual rehydration
    useAuthStore.persist.rehydrate();

    return () => unsubscribe();
  }, []);

  if (!isHydrated) {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ErrorBoundary>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </ErrorBoundary>
  );
};

export default App;
