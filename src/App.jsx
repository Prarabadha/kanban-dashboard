import React from 'react'
import { Route, Routes } from "react-router"
import Dashboard from './pages/Dashboard'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import { TaskProvider } from './Context/TaskContext'
import KanbanBoard from './pages/KanbanBoard'
import ProtectedRoute from './Components/ProtectedRoute'

export default function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<LoginPage/>}/>
      <Route path='/signup' element={<SignUpPage/>}/>
    </Routes>
     
    <TaskProvider>
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
    </TaskProvider>
    </>
  )
}
