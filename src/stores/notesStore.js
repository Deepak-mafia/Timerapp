import {create} from 'zustand';
import {devtools, persist} from 'zustand/middleware';
import {zustandStorage} from './storage';

export const useNoteStore = create(
  devtools(
    persist(
      set => ({
        notes: [],
        createNote: note =>
          set(state => ({
            notes: [
              ...state.notes,
              {
                ...note,
                id: Date.now().toString(),
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              },
            ],
          })),
        updateNote: (id, updates) =>
          set(state => ({
            notes: state.notes.map(note =>
              note.id === id
                ? {...note, ...updates, updatedAt: new Date().toISOString()}
                : note,
            ),
          })),
        deleteNote: id =>
          set(state => ({
            notes: state.notes.filter(note => note.id !== id),
          })),
      }),
      {
        name: 'notes-storage',
        storage: zustandStorage,
        serialize: data => JSON.stringify(data),
        deserialize: str => JSON.parse(str),
        version: 1,
      },
    ),
    {name: 'NoteStore'},
  ),
);
// // src/store/notesStore.js
// import {create} from 'zustand';
// import {persist, devtools} from 'zustand/middleware';
// import {zustandStorage} from './storage';

// export const useNoteStore = create(
//   devtools(
//     persist(
//       set => ({
//         notes: [],
//         // Create a new note
//         createNote: note =>
//           set(state => ({
//             notes: [
//               ...state.notes,
//               {
//                 ...note,
//                 id: Date.now().toString(),
//                 createdAt: new Date(),
//                 updatedAt: new Date(),
//               },
//             ],
//           })),
//         // Update a note
//         updateNote: (id, updates) =>
//           set(state => ({
//             notes: state.notes.map(note =>
//               note.id === id
//                 ? {...note, ...updates, updatedAt: new Date()}
//                 : note,
//             ),
//           })),
//         // Delete a note
//         deleteNote: id =>
//           set(state => ({
//             notes: state.notes.filter(note => note.id !== id),
//           })),
//       }),
//       {
//         name: 'notes-storage',
//         getStorage: () => zustandStorage,
//         onRehydrateStorage: () => state => {
//           console.log('Rehydration complete:', state);
//         },
//         version: 1, // Increment when changing store structure
//         migrate: (persistedState, version) => {
//           if (version === 0) {
//             // Add migration logic if needed
//           }
//           return persistedState;
//         },
//       },
//     ),
//     {name: 'NoteStore'},
//   ),
// );
