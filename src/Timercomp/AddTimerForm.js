// components/AddTimerForm.js
import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {TimerContext} from '../../TimerContext';

export const AddTimerForm = ({onClose}) => {
  const {dispatch} = useContext(TimerContext);
  const [name, setName] = useState('');
  const [duration, setDuration] = useState('');
  const [category, setCategory] = useState('');
  const [halfwayAlert, setHalfwayAlert] = useState(false);

  const handleSubmit = () => {
    // Validate inputs
    if (!name.trim() || !duration.trim() || !category.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const durationInSeconds = parseInt(duration, 10);
    if (isNaN(durationInSeconds) || durationInSeconds <= 0) {
      Alert.alert('Error', 'Please enter a valid duration');
      return;
    }

    // Create new timer
    const newTimer = {
      id: Date.now().toString(),
      name: name.trim(),
      duration: durationInSeconds,
      category: category.trim(),
      halfwayAlert,
      remainingTime: durationInSeconds,
      isRunning: false,
      isCompleted: false,
      createdAt: new Date().toISOString(),
    };

    dispatch({type: 'ADD_TIMER', payload: newTimer});
    onClose();
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>Add New Timer</Text>

        <TextInput
          style={styles.input}
          placeholder="Timer Name"
          placeholderTextColor={'gray'}
          value={name}
          onChangeText={setName}
        />

        <TextInput
          style={styles.input}
          placeholder="Duration (seconds)"
          placeholderTextColor={'gray'}
          value={duration}
          onChangeText={setDuration}
          keyboardType="numeric"
        />

        <TextInput
          style={styles.input}
          placeholderTextColor={'gray'}
          placeholder="Category"
          value={category}
          onChangeText={setCategory}
        />

        <TouchableOpacity
          style={styles.alertToggle}
          onPress={() => setHalfwayAlert(!halfwayAlert)}>
          <View
            style={[styles.checkbox, halfwayAlert && styles.checkboxChecked]}
          />
          <Text style={styles.alertText}>Enable halfway alert</Text>
        </TouchableOpacity>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.cancelButton]}
            onPress={onClose}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.submitButton]}
            onPress={handleSubmit}>
            <Text style={styles.buttonText}>Create Timer</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  form: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    width: '90%',
    maxWidth: 400,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#000000',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    color: '#000000',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
  },
  alertToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#007AFF',
    borderRadius: 4,
    marginRight: 10,
  },
  checkboxChecked: {
    backgroundColor: '#007AFF',
  },
  alertText: {
    fontSize: 16,
    color: '#000000',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#FF3B30',
  },
  submitButton: {
    backgroundColor: '#007AFF',
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
