import { fireEvent, render, screen } from "@testing-library/react";
import { loginUserWithEmailPassword, logoutFirebase, signInWithGoogle } from "../../../src/firebase/providers";
import { checkingCredentials, login, logout } from "../../../src/store/auth/authSlice";
import { checkingAuthentication, startGoogleSignIn, startLoginWithEmailPassword, startLogout } from "../../../src/store/auth/thunks"
import { demoUser, notAuthenticatedState } from "../../fixtures/authFixtures";
import { clearNotesLogout } from "../../../src/store/journal/journalSlice";

//hace mock a todo lo que esporta el providers
jest.mock('../../../src/firebase/providers');

describe('Pruebas en auth/thunks', () => {
    
    const dispatch = jest.fn();
    beforeEach( () => jest.clearAllMocks() );

    test('debe de invocar el checkingCredentials', async() => {
        
        await checkingAuthentication()( dispatch );
        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );

    });

    test('startGoogleSignIn debe de llamar checkingCredentials y login', async() => {
        
        const loginData = {ok: true, ...demoUser};
        //provider
        await signInWithGoogle.mockResolvedValue( loginData );

        //thunk
        await startGoogleSignIn()( dispatch );

        expect(dispatch).toHaveBeenCalledWith( checkingCredentials() );
        expect(dispatch).toHaveBeenCalledWith( login( loginData ) );
      
    });

    test('startGoogleSignIn debe de llamar checkingCredentials y login - Error', async() => {
        
        const loginData = {ok: false, errorMessage: 'Un error en Google'};
        //provider
        await signInWithGoogle.mockResolvedValue( loginData );

        //thunk
        await startGoogleSignIn()( dispatch );

        expect(dispatch).toHaveBeenCalledWith( checkingCredentials() );
        expect(dispatch).toHaveBeenCalledWith( logout( loginData.errorMessage ) );
      
    });

    test('startLoginWithEmailPassword debe de llamar checkingCredentials y login - Exito', async() => {
        const loginData = { ok: true, ...demoUser };
        const formData = { email:demoUser.email, password: '123456' };

        await loginUserWithEmailPassword.mockResolvedValue( loginData );

        await startLoginWithEmailPassword(formData)(dispatch);

        expect(dispatch).toHaveBeenCalledWith( checkingCredentials() );
        expect(dispatch).toHaveBeenCalledWith( login( loginData ) );
    });

    test('startLoginWithEmailPassword debe de llamar checkingCredentials y login - Error', async() => {
        const loginData = { ok: false, errorMessage: 'Un error al iniciar sesión' };
        const formData = { email: notAuthenticatedState.email, password: '' };
        
        //provider
        await loginUserWithEmailPassword.mockResolvedValue( loginData );
        //thunk
        await startLoginWithEmailPassword(formData)(dispatch);

        expect(dispatch).toHaveBeenCalledWith( checkingCredentials() );
        // expect(dispatch).toHaveBeenCalledWith( logout( loginData.errorMessage ) );
    });

    test('startLogout debe de llamar logoutFirebase, clearNotes y logout', async() => {
        
        await startLogout()(dispatch);
        expect(logoutFirebase).toHaveBeenCalled();
        expect(dispatch).toHaveBeenCalledWith( clearNotesLogout() );
        expect(dispatch).toHaveBeenCalledWith( logout({}) );

    })
    
    
    
    
  
})
