import React, {useEffect, useContext} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import {TimerContext} from '../../TimerContext';

export const Timer = ({timer}) => {
  const {dispatch} = useContext(TimerContext);

  useEffect(() => {
    let interval;
    if (timer.isRunning && timer.remainingTime > 0) {
      interval = setInterval(() => {
        const newRemainingTime = timer.remainingTime - 1;

        // Check for halfway alert
        if (
          timer.halfwayAlert &&
          newRemainingTime === Math.floor(timer.duration / 2)
        ) {
          Alert.alert('Halfway There!', `${timer.name} is at 50%`);
        }

        if (newRemainingTime === 0) {
          clearInterval(interval);
          dispatch({type: 'COMPLETE_TIMER', payload: timer.id});
          Alert.alert('Timer Complete!', `${timer.name} has finished!`);
        } else {
          dispatch({
            type: 'UPDATE_TIMER_TIME',
            payload: {id: timer.id, remainingTime: newRemainingTime},
          });
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer.isRunning, timer.remainingTime]);

  const handleStart = () => {
    dispatch({type: 'START_TIMER', payload: timer.id});
  };

  const handlePause = () => {
    dispatch({type: 'PAUSE_TIMER', payload: timer.id});
  };

  const handleReset = () => {
    dispatch({type: 'RESET_TIMER', payload: timer.id});
  };

  const progress =
    ((timer.duration - timer.remainingTime) / timer.duration) * 100;

  return (
    <View
      style={[
        styles.timerContainer,
        timer.isCompleted && styles.completedTimer,
      ]}>
      <View style={styles.timerInfo}>
        <Text
          style={[styles.timerName, timer.isCompleted && styles.completedText]}>
          {timer.name}
        </Text>
        <Text
          style={[styles.timerTime, timer.isCompleted && styles.completedText]}>
          {timer.isCompleted ? 'Completed' : `${timer.remainingTime}s`}
        </Text>
      </View>

      <View style={styles.progressBarContainer}>
        <View
          style={[
            styles.progressBar,
            {width: timer.isCompleted ? '100%' : `${progress}%`},
            timer.isCompleted && styles.completedProgressBar,
          ]}
        />
      </View>

      <View style={styles.controls}>
        {!timer.isCompleted ? (
          <>
            {!timer.isRunning ? (
              <TouchableOpacity style={styles.button} onPress={handleStart}>
                <Text style={styles.buttonText}>Start</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.button} onPress={handlePause}>
                <Text style={styles.buttonText}>Pause</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity style={styles.button} onPress={handleReset}>
              <Text style={styles.buttonText}>Reset</Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
            <Text style={styles.buttonText}>Restart</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  timerContainer: {
    padding: 15,
    backgroundColor: '#fff',
    marginVertical: 5,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  timerInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  timerName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  timerTime: {
    fontSize: 16,
    color: '#666',
  },
  progressBarContainer: {
    height: 4,
    backgroundColor: '#eee',
    borderRadius: 2,
    marginBottom: 10,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 2,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
  button: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: '#2196F3',
    borderRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  completedTimer: {
    backgroundColor: '#f5f5f5',
    opacity: 0.8,
  },
  completedText: {
    color: '#666',
  },
  completedProgressBar: {
    backgroundColor: '#999',
  },
  resetButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: '#666',
    borderRadius: 4,
  },
});
