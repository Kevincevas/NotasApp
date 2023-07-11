import { createSlice } from "@reduxjs/toolkit";

export const journalSlice = createSlice({
  name: "journal",
  initialState: {
    isSaving: false,
    messageSaved: '',
    notes: [],
    active: null,
    // active: {
    //     id: '123',
    //     title: '',
    //     body: '',
    //     date: 1234567,
    //     imageUrls: [], //hppts://foto1.jpg, hppts://foto2.jpg .....
    // }
  },
  reducers: {
    //siempre son trabajos syncronos, no pueden ser asyncronos, porque son reducer:funciones puras
    
    //funcion para evitar que el usuario de click varias veces el boton muy seguido
    savingNewNote: (state) => {
      state.isSaving = true;
    },

    addNewEmptyNote: (state, action) => {
      state.notes.push( action.payload );
      state.isSaving = false;


    },

    setActiveNote: (state, action) => {
      state.active = action.payload;

    },

    setNotes: (state, action) => {
      state.notes = ( action.payload );

    },

    setSaving: (state) => {

    },

    updateNote: (state, action) => {

    },

    deleteNoteByID: (state, action) => {

    },
  },
});

// Action creators are generated for each case reducer function
export const { savingNewNote, addNewEmptyNote, setActiveNote, setNotes, setSaving, updateNote, deleteNoteByID } = journalSlice.actions;
