import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

function Home() {
  const { user } = useAuth()

  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to Fitsz</h1>
      <p className="mb-4">Your personal fitness tracker</p>
      {user ? (
        <div>
          <p className="mb-4">Hello, {user.username}!</p>
          <Link to="/workouts" className="bg-blue-500 text-white px-4 py-2 rounded">Start Tracking</Link>
        </div>
      ) : (
        <div>
          <Link to="/login" className="bg-blue-500 text-white px-4 py-2 rounded mr-2">Login</Link>
          <Link to="/register" className="bg-green-500 text-white px-4 py-2 rounded">Register</Link>
        </div>
      )}
    </div>
  )
}

export default Home

