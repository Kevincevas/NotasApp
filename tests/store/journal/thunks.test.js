import { collection, deleteDoc, getDocs } from "firebase/firestore/lite";
import { addNewEmptyNote, savingNewNote, setActiveNote } from "../../../src/store/journal/journalSlice";
import { startNewNote } from "../../../src/store/journal/thunks";
import { FirebaseDB } from "../../../src/firebase/config";

describe('Pruebas en journal thunks', () => {
    //mock de dispatch
    const dispatch = jest.fn();
    const getState = jest.fn();

    //limpiando todas las funciones mock
    beforeEach( () => jest.clearAllMocks())

    /*en la conf de firebase se hizo un nuevo proyecto sin credenciales para
    hacer testing sin credenciales */
    test('Debe crear una nueva nota en blanco', async() => {

        const uid = 'TEST-UID';
        getState.mockReturnValue({ auth: {uid} })

        await startNewNote()(dispatch, getState);
        
        expect(dispatch).toHaveBeenCalledWith( savingNewNote() );
        expect(dispatch).toHaveBeenCalledWith( addNewEmptyNote({
            body:'',
            title:'',
            //ya que no se vale el valor del id y el date
            id: expect.any(String),
            date: expect.any(Number),
        }) );
        expect(dispatch).toHaveBeenCalledWith( setActiveNote({
            body:'',
            title:'',
            //ya que no se vale el valor del id y el date
            id: expect.any(String),
            date: expect.any(Number),
        }) );

        // Borrar de firebase
        const colectionRef = collection( FirebaseDB, `${uid}/journal/notes` );
        const docs = await getDocs(colectionRef);
        
        const deletePromises = [];
        docs.forEach( doc => deletePromises.push( deleteDoc( doc.ref ) ) );

        //llamando al arreglo con las promesas definidas (borrando notas)
        await Promise.all( deletePromises );


    })
    
  
})
