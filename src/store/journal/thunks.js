//hacer o despachar acciones asycronas

import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { addNewEmptyNote, deleteNoteByID, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from "./journalSlice";
import { loadNotes } from "../../helpers/loadNotes";
import { fileUpload } from "../../helpers/fileUpload";

export const startNewNote = () => {
    return async( dispatch, getState ) => {//getState: tiene todos los datos del usuario almacenado en el store

        dispatch( savingNewNote() );

        const { uid } = getState().auth;
        //uid


        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
        }

        const newDoc = doc( collection( FirebaseDB, `${uid}/journal/notes` ) );
        await setDoc(newDoc, newNote);

        newNote.id = newDoc.id;

        dispatch( addNewEmptyNote(newNote) )
        dispatch( setActiveNote(newNote) )

    }
}

export const startLoadingNotes = () => {
    return async( dispatch, getState ) => {
        //obteniendo el id usuario
        const { uid } = getState().auth;
        if(!uid) throw new Error('El UID del usuario no existe');

        const notes = await loadNotes( uid );

        dispatch( setNotes(notes) );

    }
}

export const startSaveNote = () => {
    return async(dispatch, getState) => {
        
        //bloquea botones y pone en un estado de carga
        dispatch( setSaving() );

        //obteniendo el id usuario
        const { uid } = getState().auth;
        const { active: note } = getState().journal;

        const noteToFireStore = {...note};
        //borrando el id de la nota actualizada para que no sobreescriba en la base de datos de fireStore
        delete noteToFireStore.id;
        
        //actualizando en la base de datos
        const docRef = doc( FirebaseDB, `${uid}/journal/notes/${note.id}` ); //note.id: para obtener el id de la nota
        await setDoc( docRef, noteToFireStore, {merge: true} );

        dispatch( updateNote(note) );
    }
}

export const startUploadingFiles = ( files = [] ) => {
    return async( dispatch ) => {
        //bloquea botones y pone en un estado de carga
        dispatch( setSaving() );

        //await fileUpload( files[0] );
        
        //subiendo multiples archivos a la vez con promesas
        const fileUploadPromises = [];
        for (const file of files) {
            fileUploadPromises.push( fileUpload( file ) )
        }

        const photosUrls = await Promise.all( fileUploadPromises );
        console.log(photosUrls)
        dispatch( setPhotosToActiveNote(photosUrls) );

    }
}

export const startDeletingNote = () => {
    return async(dispatch, getState) => {
        const {uid} = getState().auth;
        const {active:note} = getState().journal;
        
        //obteniendo la referencia de la nota
        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
        //eliminando la nota
        await deleteDoc(docRef);

        dispatch( deleteNoteByID(note.id) );
        
    }
}
