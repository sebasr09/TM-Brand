import { Alert, AlertTitle, Fade } from '@mui/material'
import React, { createContext, useContext, useState } from 'react'
import PropTypes from 'prop-types';

const ToastContext = createContext(undefined)

export const ToastProvider = ({children}) => {
  const [toast, setToast] = useState({
    type: '',
    title: '',
    message: ''
  })

  const showToast = (toastInfo) => {
    setToast(toastInfo)
    setTimeout(() => {
      setToast({
        type: '',
        title: '',
        message: ''
      })
    }, 10000)
  }

  return (
    <ToastContext.Provider value={{ toast, showToast }}>
      <Fade in={toast.message.length > 0}>
        <Alert severity={toast.type} sx={{
          position: 'fixed',
          bottom: {xs: '80px', md: '20px'},
          left: '20px',
          zIndex: 10,
        }}>
          <AlertTitle>{toast.title}</AlertTitle>
          {toast.message}
        </Alert>
      </Fade>
      {children}
    </ToastContext.Provider>
  )
}

ToastProvider.propTypes = {
  children: PropTypes.object
}

export const useToastContext = () => {
  const context = useContext(ToastContext)

  if (context === undefined) {
    throw new Error('Attempting to read ToastContext outside a Provider heirarchy')
  }

  return context
}