import { CircularProgress, Grid } from '@mui/material'
import React from 'react'

export const CheckingAuth = () => {
  return (
    <Grid 
      container
      spacing={0}
      direction='column'
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: '100vh', backgroundColor: 'primary.main', padding: 4 }}
    >

        {/* contenedor formulario */}
        <Grid container
            direction='row'
            justifyContent='center'
        >
            <CircularProgress color='warning' />

        </Grid>
    </Grid>
  )
}
