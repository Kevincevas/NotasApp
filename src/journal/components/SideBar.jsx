import { TurnedInNot } from '@mui/icons-material'
import { Box, Drawer, List, Toolbar, Divider, Typography, ListItem, ListItemButton, ListItemIcon, Grid, ListItemText } from '@mui/material'


import React from 'react'

export const SideBar = ({ drawerWidth= 240 }) => {
  return (
    <Box
        component='nav'
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm:0 } }}
    >
        <Drawer
            variant='permanent'
            open={true}
            sx={{
                display: { xs: 'block' },
                '& .MuiDrawer-paper': { boxSizing:'border-box', width: drawerWidth }
            }}
        >
            <Toolbar>
                <Typography variant='h6' noWrap component='div'> Kevin Cevallos </Typography>
            </Toolbar>
            <Divider />
            
            <List>
                {
                    ['Enero','Febrero','Marzo'].map( text =>(
                        <ListItem key={ text } disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <TurnedInNot />
                                </ListItemIcon>
                                <Grid container>
                                    <ListItemText primary= { text } />
                                    <ListItemText primary= { 'Lorem ipsum, dolor sit amet consectetur.' } />
                                </Grid>
                            </ListItemButton>
                        </ListItem>
                    ))
                }
            </List>



        </Drawer>

    </Box>
  )
}
