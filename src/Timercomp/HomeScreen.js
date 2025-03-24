// screens/HomeScreen.js
import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {TimerContext} from '../../TimerContext';
import {TimerList} from './TimerList';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {AddTimerForm} from './AddTimerForm';
import {storage} from '../../App';

export const HomeScreen = ({navigation}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const {state} = useContext(TimerContext);

  const categories = [...new Set(state.timers.map(timer => timer.category))];

  const filteredCategories =
    selectedCategory.length > 0 ? selectedCategory : categories;

  const getTimerStats = () => {
    const timers = selectedCategory
      ? state.timers.filter(timer => timer.category === selectedCategory)
      : state.timers;
    const total = timers.length;
    const active = timers.filter(t => !t.isCompleted).length;
    return {total, active};
  };

  const stats = getTimerStats();

  const updateSelectedCategory = category => {
    if (selectedCategory.includes(category)) {
      setSelectedCategory(prev => {
        let newData = prev.filter(item => item != category);
        return newData;
      });
    } else {
      setSelectedCategory(prev => {
        return [...prev, category];
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setIsModalVisible(true)}>
          <Text style={styles.addButtonText}>Add Timer +</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.historyButton}
          onPress={() => navigation.navigate('History')}>
          <MaterialCommunityIcons name="history" color={'gray'} size={24} />
        </TouchableOpacity>
      </View>

      {/* Category Filter */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryContainer}
        contentContainerStyle={styles.categoryContent}>
        {categories.map(category => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryChip,
              selectedCategory.includes(category) && styles.selectedChip,
            ]}
            onPress={() => updateSelectedCategory(category)}>
            <Text
              style={[
                styles.categoryText,
                selectedCategory.includes(category) &&
                  styles.selectedCategoryText,
              ]}>
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <AddTimerForm onClose={() => setIsModalVisible(false)} />
        </View>
      </Modal>

      <ScrollView>
        <TimerList categories={filteredCategories} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  addButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 18,
  },
  addButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  historyButton: {
    padding: 10,
    borderRadius: 18,
  },
  categoryContainer: {
    maxHeight: 50,
    paddingVertical: 5,
  },
  categoryContent: {
    paddingHorizontal: 10,
    gap: 10,
  },
  categoryChip: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 32,
    borderColor: '#ddd',
  },
  selectedChip: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  categoryText: {
    fontSize: 14,
    color: '#666',
  },
  selectedCategoryText: {
    color: '#fff',
  },
  statsContainer: {
    paddingHorizontal: 15,
    paddingBottom: 10,
  },
  statsText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});
