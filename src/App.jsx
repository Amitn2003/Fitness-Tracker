import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import Header from './components/Header'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import Settings from './pages/Settings'
import Exercises from './pages/Exercises'
import Routines from './pages/Routines'
import AddRoutine from './pages/AddRoutine'
import Workouts from './pages/Workouts'
import StartWorkout from './pages/StartWorkout'
import LogWorkout from './pages/LogWorkout'
import Dashboard from './pages/Dashboard'


function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-gray-100">
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/exercises" element={<Exercises />} />
              <Route path="/routines" element={<Routines />} />
              <Route path="/routines/add" element={<AddRoutine />} />
              <Route path="/workouts" element={<Workouts />} />
              <Route path="/start-workout" element={<StartWorkout />} />
              <Route path="/log-workout" element={<LogWorkout />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </main>
          <footer className="bg-gray-200 text-center py-4">
            <p>&copy; 2024 Fitsz Fitness Tracker. All rights reserved.</p>
          </footer>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App

