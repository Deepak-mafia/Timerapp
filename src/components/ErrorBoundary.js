// components/ErrorBoundary.js
import React from 'react';
import {Text, View} from 'react-native';

class ErrorBoundary extends React.Component {
  state = {hasError: false};

  static getDerivedStateFromError() {
    return {hasError: true};
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Text style={{textAlign: 'center'}}>Something went wrong</Text>
        </View>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
