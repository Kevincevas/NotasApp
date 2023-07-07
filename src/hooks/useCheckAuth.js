import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FirebaseAuth } from "../firebase/config";
import { login, logout } from "../store/auth";


export const useCheckAuth = () => {
    //cuando el estado siempre este en 'checking' aparece la pantalla de carga
    const {status} = useSelector(status => status.auth);
    const dispatch = useDispatch();
    //mantener la sesion del usuario despues de recargar la página
    useEffect(() => {
        
        onAuthStateChanged(FirebaseAuth, async(user) => {
        if(!user) return dispatch( logout() );
        const {uid,email,displayName,photoURL} = user;
        dispatch( login({uid,email,displayName,photoURL}) )
        });

    }, []);

    return status
}
