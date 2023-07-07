import { Button, Grid, Link, TextField, Typography } from '@mui/material';
import React from 'react'

export const AuthLayout = ({ children, title='' }) => {
  return (
    // contenedor fondo
    <Grid 
      container
      spacing={0}
      direction='column'
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: '100vh', backgroundColor: 'primary.main', padding: 4 }}
    >

        {/* contenedor formulario */}
        <Grid 
            item
            className='animate__animated animate__fadeInLeft animated__faster'
            xs={3}
            sx={{ width: {md:450 }, backgroundColor: 'white', padding: 3, borderRadius: 2 }} 
        >
            <Typography variant='h5' sx={{ mb:5 }}>{title}</Typography>

            {children}

        </Grid>
    </Grid>

  )
}
