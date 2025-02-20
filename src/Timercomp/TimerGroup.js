// components/TimerGroup.js
import React, {useState, useContext} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Timer} from './Timer';
import {TimerContext} from '../../TimerContext';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export const TimerGroup = ({category, timers}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const {dispatch} = useContext(TimerContext);

  // Sort timers: incomplete first, then completed
  const sortedTimers = [...timers].sort((a, b) => {
    if (a.isCompleted === b.isCompleted) {
      // If both are completed or both are incomplete, sort by name
      return a.name.localeCompare(b.name);
    }
    // Put incomplete timers first
    return a.isCompleted ? 1 : -1;
  });

  const incompleteCount = timers.filter(t => !t.isCompleted).length;

  const handleBulkStart = () => {
    dispatch({type: 'BULK_START', payload: category});
  };

  const handleBulkPause = () => {
    dispatch({type: 'BULK_PAUSE', payload: category});
  };

  const handleBulkReset = () => {
    dispatch({type: 'BULK_RESET', payload: category});
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.header}
        onPress={() => setIsExpanded(!isExpanded)}>
        <View style={styles.headerLeft}>
          <Text style={styles.categoryTitle}>{category}</Text>
          <View style={styles.bulkActions}>
            {incompleteCount > 0 && (
              <>
                <TouchableOpacity onPress={handleBulkStart}>
                  <Feather name="play-circle" color={'gray'} size={24} />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleBulkPause}>
                  <Feather name="pause-circle" color={'gray'} size={24} />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleBulkReset}>
                  <MaterialCommunityIcons
                    name="restart"
                    color={'gray'}
                    size={24}
                  />
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </TouchableOpacity>

      {isExpanded && (
        <View style={styles.timerList}>
          {sortedTimers.map(timer => (
            <Timer key={timer.id} timer={timer} />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    overflow: 'hidden',
  },
  header: {
    padding: 15,
    backgroundColor: '#e0e0e0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  bulkActions: {
    width: '70%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  actionButton: {
    color: '#007AFF',
    fontWeight: '500',
  },
  timerList: {
    padding: 10,
  },
  headerLeft: {
    gap: 10,
    // backgroundColor: 'green',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  timerCount: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
});
