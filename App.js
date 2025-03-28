// 2. App.js (Critical Fixes)
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import ErrorBoundary from './src/components/ErrorBoundary';
import {NotesStack} from './src/Navigation/AppNavigator';
import {ActivityIndicator, SafeAreaView, View} from 'react-native';
import {useNoteStore} from './src/stores/notesStore';

const App = () => {
  const isHydrated = useNoteStore.persist.hasHydrated();

  useEffect(() => {
    const initializeStore = async () => {
      try {
        await useNoteStore.persist.rehydrate();
      } catch (error) {
        console.error('Store initialization failed:', error);
      }
    };

    if (!isHydrated) {
      initializeStore();
    }
  }, [isHydrated]);

  if (!isHydrated) {
    return (
      <View style={{flex: 1}}>
        <ActivityIndicator size={30} color={'green'} />
      </View>
    );
  }
  return (
    <ErrorBoundary>
      <SafeAreaView style={{flex: 1}}>
        <NavigationContainer>
          <NotesStack />
        </NavigationContainer>
      </SafeAreaView>
    </ErrorBoundary>
  );
};

export default App;
