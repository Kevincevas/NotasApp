import { TurnedInNot } from '@mui/icons-material'
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import React, { useMemo } from 'react'

export const SideBarItem = ({title,body,id}) => {

    //recortando el titulo si es muy extenso
    const newTitle = useMemo(() => {
        return title.length > 17
            ? title.substring(0,17) + '...'
            :title
    }, [title])
  return (
    <ListItem disablePadding>
        <ListItemButton>
            <ListItemIcon>
                <TurnedInNot />
            </ListItemIcon>
            <Grid container>
                <ListItemText primary= { newTitle } />
                <ListItemText primary= { body } />
            </Grid>
        </ListItemButton>
    </ListItem>
  )
}
