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
      state.messageSaved = '';

    },

    setNotes: (state, action) => {
      state.notes = ( action.payload );

    },

    setSaving: (state) => {
      state.isSaving= true;
      state.messageSaved = '';
      
    },

    updateNote: (state, action) => {
      state.isSaving = false;
      //map barre los elementos del arreglo y regresa esos valores
      state.notes = state.notes.map( note => {

        //actualiza los valores en el side de las notas
        if( note.id === action.payload.id ) {
          return action.payload;
        }

        return note;
      } );

      state.messageSaved = `${action.payload.title}, actualizada correctamente`


    },

    setPhotosToActiveNote: (state,action) => {
      state.active.imageUrls = [...state.active.imageUrls, ...action.payload];
      state.isSaving = false;
    },

    //limpiando el active del usuario cuando cierra sesión
    clearNotesLogout: (state) => {
      state.isSaving = false;
      state.messageSaved = '';
      state.notes = [];
      state.active = null;
    },

    deleteNoteByID: (state, action) => {
      state.active = null;
      state.notes = state.notes.filter( note => note.id !== action.payload )
      
    },
  },
});

// Action creators are generated for each case reducer function
export const { 
  savingNewNote, 
  addNewEmptyNote, 
  clearNotesLogout, 
  setActiveNote, 
  setNotes, 
  setSaving, 
  updateNote, 
  setPhotosToActiveNote, 
  deleteNoteByID 
} = journalSlice.actions;
