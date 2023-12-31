import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import {Link as RouterLink} from 'react-router-dom';
import { Google, Password } from '@mui/icons-material';
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material';
import React from 'react';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks';
import { startGoogleSignIn, startLoginWithEmailPassword } from "../../store/auth/thunks";

const formData = {
  email:'',
  password: '',
}

export const LoginPage = () => {
  
  const {status, displayName, errorMessage} = useSelector( state => state.auth );
  const dispatch = useDispatch();
  
  const {email, password, onInputChange} = useForm(formData);
  
  //deshabilitando los bototes mientras se autentica mediante google
  const isAuthenticated = useMemo( () => status === 'checking', [status] );
  
  

  const onSubmit = (event) => {
    event.preventDefault();
    // console.log({email,password})
    //llamando al thunk y enviando el email y password para validar
    dispatch( startLoginWithEmailPassword({ email,password }) );
  }
  
  const onGoogleSignIn = () => {
    dispatch( startGoogleSignIn() );
    console.log('OnGoogleSignIn')
  }




  return (

    <AuthLayout title='Login'>
        <form aria-label="submit-form" action="" onSubmit={onSubmit}>
          <Grid container>
            <Grid item xs={12} sx={{mt: 2}}>
              <TextField 
                label='Correo' 
                type= 'email'
                placeholder='correo@google.com'
                fullWidth
                name='email'
                value={ email }
                onChange={ onInputChange }
              />
            </Grid>

            <Grid item xs={12} sx={{mt: 2}}>
              <TextField 
                label='Password' 
                inputProps={{
                  'data-testid':'password'
                }}
                type= 'password'
                placeholder='Password'
                fullWidth
                name='password'
                value={ password }
                onChange={ onInputChange }
              />
            </Grid>

            <Grid 
              container
              display = { !!errorMessage ? '' : 'none'}
              sx={{ mt:1}}>
              <Grid 
                item 
                xs={12}
              >
                <Alert severity='error'>
                  {errorMessage}                  
                </Alert>
              </Grid>
            </Grid>

            <Grid container spacing={ 2 } sx={{ mb:2, mt:1 }}>
              {/* xs: pantalla pequeña, sm, md, xl: pantalla mas grande consecutivamente*/}



              <Grid item xs={12} sm={6}>
                <Button 
                  disabled= {isAuthenticated}
                  type='submit' 
                  variant='contained' 
                  fullWidth
                >
                  Loggin
                </Button>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Button 
                  disabled= {isAuthenticated}
                  variant='contained' 
                  fullWidth 
                  aria-label="google-btn"
                  onClick={onGoogleSignIn}
                >
                  <Google />
                  <Typography sx={{ml:1}}>Google</Typography>
                </Button>
              </Grid>

            </Grid>

            <Grid container direction='row' justifyContent='end'>
              <Link component={RouterLink} to='/auth/register'>
                Registrarse
              </Link>
              
            </Grid>

          </Grid>
        </form>
    </AuthLayout>
    
  )
}
