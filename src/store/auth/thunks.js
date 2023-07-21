//thunks: acciones que se puede despachar, tienen una tarea async

import { loginUserWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, signInWithGoogle } from "../../firebase/providers";
import { clearNotesLogout } from "../journal/journalSlice";
import { checkingCredentials, login, logout } from "./authSlice";

export const checkingAuthentication = ( email, password) => {
    return async( dispatch ) => {

        //bloquear botones
        dispatch( checkingCredentials() );
    }
}

export const startGoogleSignIn = () => {
    return async( dispatch ) => {
        
        //bloquear botones
        dispatch( checkingCredentials() );
        const result = await signInWithGoogle();
        
        //usado para el test
        // console.log({result})

        if (!result.ok) return dispatch( logout( result.errorMessage ) );
        dispatch( login( result ) );


    }
}

export const startCreatingUserWithEmailAndPassword = ({ email,password,displayName }) => {
    return async( dispatch ) => {
        //bloquear botones
        
        dispatch( checkingCredentials() );
        const {ok, uid, photoURL, errorMessage} = await registerUserWithEmailPassword({ email,password,displayName });
        if(!ok) return dispatch( logout({errorMessage}) )

        dispatch( login( {uid, displayName, email, photoURL} ) );

    }

}

export const startLoginWithEmailPassword = ({email,password}) => {
    return async( dispatch ) => {

        dispatch( checkingCredentials() );
        const {ok, uid, photoURL, errorMessage, displayName} = await loginUserWithEmailPassword({email,password })
        if(!ok) return dispatch( logout({errorMessage}) )

        dispatch( login( {ok, uid, photoURL, email, errorMessage, displayName} ) )

    }
}

export const startLogout = () => {
    return async(dispatch) => {
        await logoutFirebase();
        dispatch( clearNotesLogout() );
        dispatch( logout({}) );
    }
}

