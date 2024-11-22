import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

function Header() {
  const { user, logout } = useAuth()

  return (
    <header className="bg-blue-600 text-white">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">Fitz</Link>
        <nav>
          <ul className="flex space-x-4">
            {user ? (
              <>
                <li><Link to="/exercises">Exercises</Link></li>
                <li><Link to="/routines">Routines</Link></li>
                <li><Link to="/workouts">Workouts</Link></li>
                <li><Link to="/profile">Profile</Link></li>
                <li><Link to="/settings">Settings</Link></li>
                <li><button onClick={logout}>Logout</button></li>
              </>
            ) : (
              <>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Register</Link></li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header

