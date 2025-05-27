"use client"

import { useState } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import { AppProvider } from "./context/AppContext"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import Projects from "./pages/Projects"
import Tasks from "./pages/Tasks"
import Team from "./pages/Team"
import Reports from "./pages/Reports"
import ProtectedRoute from "./components/ProtectedRoute"
import { initialData } from "./data/initialData"
import MainPage from "./pages/MainPage"

function App() {
  const [appData, setAppData] = useState(initialData)
  const [notifications, setNotifications] = useState([])

  const addNotification = (message) => {
    const newNotification = {
      id: Date.now(),
      message,
      timestamp: new Date().toISOString(),
    }
    setNotifications([newNotification, ...notifications])
  }

  return (
    <AppProvider value={{ appData, setAppData, notifications, addNotification }}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/main" element={<MainPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/projects"
          element={
            <ProtectedRoute>
              <Projects />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tasks"
          element={
            <ProtectedRoute>
              <Tasks />
            </ProtectedRoute>
          }
        />
        <Route
          path="/team"
          element={
            <ProtectedRoute>
              <Team />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <Reports />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppProvider>
  )
}

export default App
