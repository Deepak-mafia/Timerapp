// src/screens/AllNotesScreen.js
import React from 'react';
import {View, FlatList, TouchableOpacity, Text, StyleSheet} from 'react-native';
import NoteItem from '../components/NoteItem';
import {useNoteStore} from '../stores/notesStore';

const AllNotesScreen = ({navigation}) => {
  const {notes} = useNoteStore();

  return (
    <View style={styles.container}>
      {notes.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No notes available</Text>
        </View>
      ) : (
        <FlatList
          data={notes}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <NoteItem
              note={item}
              onPress={() => navigation.navigate('EditNote', {note: item})}
            />
          )}
        />
      )}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('EditNote', {note: null})}>
        <Text style={styles.addText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 16,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    color: '#fff',
    fontSize: 18,
  },
  addButton: {
    backgroundColor: '#03dac6',
    padding: 16,
    borderRadius: 50,
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  addText: {
    color: '#121212',
    fontSize: 24,
    textAlign: 'center',
  },
});

export default AllNotesScreen;
