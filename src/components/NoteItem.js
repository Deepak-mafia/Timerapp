// src/components/NoteItem.js
import React from 'react';
import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';

const NoteItem = ({note, onPress}) => {
  return (
    <TouchableOpacity
      style={[styles.noteItem, {backgroundColor: note.bgColor}]}
      onPress={onPress}>
      <Text style={styles.noteTitle}>{note.title}</Text>
      {note.content ? (
        <Text style={styles.noteContent} numberOfLines={2}>
          {note.content}
        </Text>
      ) : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  noteItem: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 10,
  },
  noteTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  noteContent: {
    color: '#eee',
    fontSize: 14,
    marginTop: 4,
  },
});

export default NoteItem;
