import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { MenuOutlined, LogoutOutlined } from '@mui/icons-material'
import { AppBar, IconButton, Toolbar } from '@mui/material'
import { Button, Grid, Link, TextField, Typography } from '@mui/material';
import { startLogout } from '../../store/auth';

export const NavBar = ({ drawerWidth= 240 }) => {

    const dispatch = useDispatch();

    const onLogout = () => {
        dispatch(startLogout())
    }

  return (
    <AppBar 
        position='fixed'
        sx={{ 
            width: {sm: `calc(100% - ${drawerWidth}px)`},
            ml: { sm: `${drawerWidth} px` }
        }}
    >
        <Toolbar>
            <IconButton
                color='inherit'
                edge='start'
                sx={{ mr:2, display: { sm: 'none' } }}
            >
                <MenuOutlined />
            </IconButton>

            <Grid container direction='row' justifyContent='space-between' alignItems='center'>
                <Typography variant='h6' noWrap component='div'>JournalApp</Typography>

                {/* button logout */}
                <IconButton onClick={ onLogout } color='error'>
                    <LogoutOutlined />
                </IconButton>
            </Grid>

        </Toolbar>
    </AppBar>
  )
}
