import React from 'react'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({ children }) {
  try {
    const isLoggedIn = localStorage.getItem('isLoggedIn')
    if (isLoggedIn === 'true') {
      return children
    }
  } catch (error) {
    console.log(error)
  }
  return <Navigate to='/' replace />
}
