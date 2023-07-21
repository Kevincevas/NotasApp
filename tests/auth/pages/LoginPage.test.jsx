import { fireEvent, render,screen } from "@testing-library/react"
import { Provider } from "react-redux"
import { configureStore } from "@reduxjs/toolkit"
import { MemoryRouter } from "react-router-dom"

import { LoginPage } from "../../../src/auth/pages/LoginPage"
import { authSlice } from "../../../src/store/auth/"
import { startGoogleSignIn } from "../../../src/store/auth/thunks"
import { notAuthenticatedState } from "../../fixtures/authFixtures"


const mockStartGoogleSignIn = jest.fn();
const mockStartLoginWithEmailPassword = jest.fn();

//hacer esto cuando tenemos un dispatch en la funcion
//haciendo un mock a todo el thunk de auth
jest.mock('../../../src/store/auth/thunks', () => ({
    startGoogleSignIn: () => mockStartGoogleSignIn,
    startLoginWithEmailPassword: ({email,password}) => {
        return () => mockStartLoginWithEmailPassword({email,password});
    },
}));

//mock solo al dispatch
jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: () => (fn) => fn(),
}))

const store = configureStore({
    reducer: {
        auth: authSlice.reducer
    },

    //precargar un cierto estado del store
    //ayuda a cargar al usuario como no autenticado para el segundo test
    preloadedState:{
        auth: notAuthenticatedState
    }
})

describe('Pruebas en el LoginPage', () => {

    beforeEach(() => jest.clearAllMocks());

    test('debe de mostrar el componente correctamente', () => {
        //renderizar el login para el test
        render(
            <Provider store={store}>
                {/* MemooryRouter: se usa para que los componentes puedan renderizarse ne memoria */}
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        );
        // screen.debug()

        expect(screen.getAllByText('Login').length).toBeGreaterThanOrEqual(1);

    });

    test('boton de google debe de llamar el startGoogleSignIn', () => {
        //renderizar el login para el test
        render(
            <Provider store={store}>
                {/* MemooryRouter: se usa para que los componentes puedan renderizarse ne memoria */}
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        );
        
        const googleBtn = screen.getByLabelText('google-btn');
        fireEvent.click(googleBtn);

        expect(mockStartGoogleSignIn).toHaveBeenCalled();
        
    });

    test('submit debe de llamar startLoginWithEmailPassword', () => {
        
        const email = 'kevin@google.com';
        const password = '123456';
        
        //renderizar el login para el test
        render(
            <Provider store={store}>
                {/* MemooryRouter: se usa para que los componentes puedan renderizarse ne memoria */}
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        );

        const emailField= screen.getByRole('textbox', { name: 'Correo' });
        fireEvent.change( emailField, { target: { name: 'email', value: email }});

        const passwordField= screen.getByTestId('password');
        fireEvent.change( passwordField, { target: { name: 'password', value: password }});
        
        const loginForm= screen.getByLabelText('submit-form');
        fireEvent.submit( loginForm );
        
        expect( mockStartLoginWithEmailPassword ).toHaveBeenCalledWith({
            email: email,
            password: password,
            //o tambien se puede escribir asi
            // email,
            // password,
        })


    });
    
    

    
  
})
