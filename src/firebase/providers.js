import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";

//creando la nueva instancia
const googleProovider = new GoogleAuthProvider();

export const signInWithGoogle = async() => {
    try {
        const result = await signInWithPopup(FirebaseAuth, googleProovider);
        
        const {displayName, email, photoURL, uid } = result.user;
        
        // const credentials = GoogleAuthProvider.credentialFromResult( result );
        // console.log({credentials});

        return {
            ok:true,
            //user info
            displayName, email, photoURL, uid
        }

    } catch (error) {

        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;

        return {
            ok: false,
            errorMessage
        
        }
    }
}


export const registerUserWithEmailPassword = async({email,password,displayName}) => {
    try {
        console.log({email,password,displayName})
        const resp= await createUserWithEmailAndPassword(FirebaseAuth, email, password);
        const { uid, photoURL } = resp.user;
        
        //saber usuario actual: FirebaseAuth.currentUser
        await updateProfile( FirebaseAuth.currentUser, { displayName } );

        return {
            ok: true,
            uid, photoURL, email, displayName
        }

    } catch (error) {
        // console.log(error)
        return {
            ok: false,
            errorMessage: 'Ya existe un usuario con su mismo correo electronico'
        }
    }
}

export const loginUserWithEmailPassword = async({email,password}) => {
    try {
        const resp = await signInWithEmailAndPassword(FirebaseAuth, email,password);
        const { uid, photoURL, displayName } = resp.user;

        return {
            ok:true,
            uid, photoURL, displayName
        }

    } catch (error) {
        return {
            ok: false,
            errorMessage: 'Correo o contraseña no encontrados'
        }
        
    }
}