import React from 'react'
import { Routes,Route, Navigate } from 'react-router-dom'
import { AuthRoutes } from '../auth/routes/AuthRoutes'
import { JournalRoutes } from '../journal/routes/JournalRoutes'
import { CheckingAuth } from '../ui/components/CheckingAuth'
import { useCheckAuth } from '../hooks'


export const AppRouter = () => {
  
  const status = useCheckAuth();
  
  if(status === 'checking') {
    return <CheckingAuth />
  }
  
  return (
    <Routes>
        {
          (status === 'authenticated')
          ?
          // {/* JournalApp */}
          <Route path='/*' element={ <JournalRoutes /> } />
          :
          // {/* Login y registro */}
          <Route path='/auth/*' element={ <AuthRoutes /> } />
        }

        <Route path='/*' element={<Navigate to='auth/login' />} />



    </Routes>
  )
}
