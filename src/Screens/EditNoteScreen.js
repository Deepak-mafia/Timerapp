// src/screens/EditNoteScreen.js
import React, {useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {useNoteStore} from '../stores/notesStore';

const availableColors = [
  '#FF5733', // Vivid Red-Orange
  '#FFC300', // Vivid Yellow
  '#39FF14', // Neon Green
  '#00BFFF', // Deep Sky Blue
  '#FF1493', // Deep Pink
  '#FF4500', // Orange Red
  '#9b59b6', // Amethyst Purple
  '#f39c12', // Bright Orange
  '#e74c3c', // Vivid Red
  '#1abc9c', // Vibrant Turquoise
  '#8e44ad', // Vivid Purple
  '#3498db', // Vibrant Blue
  '#2ecc71', // Vibrant Green
  '#e67e22', // Vibrant Orange
  '#F1C40F', // Bright Yellow
];

const EditNoteScreen = ({route, navigation}) => {
  const {note} = route.params || {};
  const {createNote, updateNote, deleteNote} = useNoteStore();

  const [title, setTitle] = useState(note?.title || '');
  const [content, setContent] = useState(note?.content || '');
  const [bgColor, setBgColor] = useState(note?.bgColor || '#000000');
  const [lastEdited, setLastEdited] = useState(
    note?.updatedAt ? new Date(note.updatedAt) : new Date(),
  );
  const [showColors, setShowColors] = useState(false);
  const [noteId, setNoteId] = useState(note?.id || null);

  const handleSave = () => {
    const now = new Date();
    setLastEdited(now);

    if (title.trim() === '' && content.trim() === '' && noteId) {
      deleteNote(noteId);
      return;
    }

    if (noteId) {
      updateNote(noteId, {title, content, bgColor, updatedAt: now});
    } else {
      if (title.trim() !== '' || content.trim() !== '') {
        const newId = Date.now().toString();
        setNoteId(newId);
        createNote({
          id: newId,
          title,
          content,
          bgColor,
          createdAt: now,
          updatedAt: now,
        });
      }
    }
  };

  const handleBack = () => {
    handleSave();
    navigation.goBack();
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Note',
      'Are you sure you want to delete this note?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            if (noteId) {
              deleteNote(noteId);
            }
            navigation.goBack();
          },
        },
      ],
      {cancelable: true},
    );
  };

  return (
    <View style={[styles.container, {backgroundColor: bgColor}]}>
      {/* Simplified Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <Text style={styles.headerIcon}>Back</Text>
        </TouchableOpacity>
      </View>

      {/* {noteId && <Text style={styles.noteId}>Note ID: {noteId}</Text>} */}

      <KeyboardAvoidingView
        style={styles.flexContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          contentContainerStyle={styles.contentContainer}
          keyboardShouldPersistTaps="handled">
          <TextInput
            style={[styles.input, {fontSize: 24}]}
            placeholder="Title"
            placeholderTextColor="#ffffff90"
            value={title}
            onChangeText={setTitle}
            onEndEditing={handleSave}
            editable={true}
            autoFocus={!noteId} // Auto-focus for new notes
          />
          <TextInput
            style={[styles.input, styles.multilineInput, {fontSize: 20}]}
            placeholder="Content"
            placeholderTextColor="#ffffff90"
            value={content}
            onChangeText={setContent}
            onEndEditing={handleSave}
            multiline
            editable={true}
          />
        </ScrollView>
      </KeyboardAvoidingView>

      <View style={styles.bottomBar}>
        <Text style={styles.lastEdited}>
          Last edited: {lastEdited.toLocaleTimeString()}
        </Text>
        <View style={styles.bottomIcons}>
          <TouchableOpacity onPress={handleDelete}>
            <Text style={styles.bottomIcon}>Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowColors(!showColors)}>
            <Text style={styles.bottomIcon}>Color</Text>
          </TouchableOpacity>
        </View>
      </View>

      {showColors && (
        <View style={styles.colorListContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {availableColors.map(color => (
              <TouchableOpacity
                key={color}
                style={[
                  styles.colorCircle,
                  {
                    backgroundColor: color,
                    borderWidth: bgColor === color ? 2 : 0,
                  },
                ]}
                onPress={() => {
                  setBgColor(color);
                  setShowColors(false);
                  handleSave();
                }}
              />
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 40,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerIcon: {
    color: '#03dac6',
    fontSize: 18,
  },
  noteId: {
    textAlign: 'center',
    color: '#aaa',
    marginVertical: 8,
  },
  contentContainer: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingBottom: 80, // leave space for the bottom bar
  },
  input: {
    // backgroundColor: '#333',
    color: '#fff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  multilineInput: {
    minHeight: 150,
    textAlignVertical: 'top',
  },
  bottomBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#1e1e1e',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastEdited: {
    color: '#fff',
    fontSize: 12,
  },
  bottomIcons: {
    flexDirection: 'row',
  },
  bottomIcon: {
    color: '#03dac6',
    marginLeft: 16,
    fontSize: 16,
  },
  colorListContainer: {
    position: 'absolute',
    bottom: 60,
    left: 0,
    right: 0,
    paddingVertical: 10,
    backgroundColor: '#1e1e1e',
  },
  colorCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 8,
  },
});

export default EditNoteScreen;
