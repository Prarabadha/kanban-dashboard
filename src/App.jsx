import React from 'react'
import { Route, Routes } from "react-router"
import { Provider } from 'react-redux'
import { store } from './redux/store'
import Dashboard from './pages/Dashboard'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import KanbanBoard from './pages/KanbanBoard'
import ProtectedRoute from './Components/ProtectedRoute'

export default function App() {
  return (
    <Provider store={store}>
    <>
    <Routes>
      <Route path='/' element={<LoginPage/>}/>
      <Route path='/signup' element={<SignUpPage/>}/>
    </Routes>
     
    <Routes>
      <Route
        path='/dashboard'
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path='/kanbanboard'
        element={
          <ProtectedRoute>
            <KanbanBoard />
          </ProtectedRoute>
        }
      />
    </Routes>
    </>
    </Provider>
  )
}
