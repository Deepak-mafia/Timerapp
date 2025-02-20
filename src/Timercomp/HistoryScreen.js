// screens/HistoryScreen.js
import React, {useContext} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {TimerContext} from '../../TimerContext';

export const HistoryScreen = () => {
  const {state} = useContext(TimerContext);

  const renderHistoryItem = ({item}) => {
    const completedDate = new Date(item.completedAt).toLocaleString();

    return (
      <View style={styles.historyItem}>
        <View style={styles.itemHeader}>
          <Text style={styles.timerName}>{item.name}</Text>
          <Text style={styles.category}>{item.category}</Text>
        </View>

        <View style={styles.itemDetails}>
          <Text style={styles.duration}>Duration: {item.duration} seconds</Text>
          <Text style={styles.completedAt}>Completed: {completedDate}</Text>
        </View>
      </View>
    );
  };

  const groupedHistory = state.history.reduce((groups, item) => {
    const date = new Date(item.completedAt).toLocaleDateString();
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(item);
    return groups;
  }, {});

  const sections = Object.entries(groupedHistory)
    .sort(([dateA], [dateB]) => new Date(dateB) - new Date(dateA))
    .map(([date, items]) => ({
      title: date,
      data: items,
    }));

  return (
    <View style={styles.container}>
      {state.history.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>No completed timers yet</Text>
        </View>
      ) : (
        <FlatList
          data={sections}
          keyExtractor={item => item.title}
          renderItem={({item: section}) => (
            <View style={styles.section}>
              <Text style={styles.sectionHeader}>{section.title}</Text>
              <FlatList
                data={section.data}
                renderItem={renderHistoryItem}
                keyExtractor={item => item.id}
              />
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: '#e0e0e0',
    padding: 10,
    color: 'black',
  },
  historyItem: {
    backgroundColor: 'white',
    padding: 15,
    marginHorizontal: 10,
    marginTop: 10,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  timerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'gray',
  },
  category: {
    fontSize: 14,
    color: '#666',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  itemDetails: {
    flexDirection: 'column',
  },
  duration: {
    color: '#666',
    marginBottom: 4,
  },
  completedAt: {
    color: '#666',
    fontSize: 12,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyStateText: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
  },
});
