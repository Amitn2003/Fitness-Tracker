import React, { createContext, useState, useContext, useEffect } from 'react'

const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const storedUser = JSON.parse(localStorage.getItem('user'))
    if (token && storedUser) {
      setUser(storedUser)
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await response.json()
      if (response.ok) {
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
        setUser(data.user)
      } else {
        throw new Error(data.message)
      }
    } catch (error) {
      throw error
    }
  }

  const register = async (userData) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      })
      const data = await response.json()
      if (response.ok) {
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
        setUser(data.user)
      } else {
        throw new Error(data.message)
      }
    } catch (error) {
      throw error
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
  }

  const updateUser = (updatedUserData) => {
    setUser(updatedUserData)
    localStorage.setItem('user', JSON.stringify(updatedUserData))
  }

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode)
  }

  const value = {
    user,
    login,
    register,
    logout,
    updateUser,
    darkMode,
    toggleDarkMode,
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
