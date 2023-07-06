import { AddOutlined, MailOutline, PostAddOutlined } from '@mui/icons-material'
import { IconButton, Typography } from '@mui/material'
import React from 'react'
import { JournalLayout } from '../layout/JournalLayout'
import { NothingSelectedView } from '../view/NothingSelectedView'
import { NoteView } from '../view/NoteView'

export const JournalPage = () => {
  return (
    <>
      <JournalLayout>
        {/* <Typography>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quis temporibus, provident aperiam optio blanditiis laboriosam ratione perferendis cum sit quod aut distinctio? Natus, cum velit necessitatibus similique minus molestias distinctio.</Typography> */}
        {/* <NothingSelectedView /> */}
        <NoteView />
      </JournalLayout>

      <IconButton
        size='large'
        sx={{
          color:'white', 
          backgroundColor:'error.main',
          ':hover': {backgroundColor: 'error.main', opacity:0.9},
          position:'fixed',
          right:50,
          bottom:50
        }}
      >
        <AddOutlined sx={{fontSize: 30,}}>

        </AddOutlined>

      </IconButton>
    
    </>
  )
}
