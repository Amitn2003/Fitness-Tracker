import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'

function Settings() {
  const { user, updateUser, darkMode, toggleDarkMode } = useAuth()
  const [formData, setFormData] = useState({ ...user })
  const [message, setMessage] = useState('')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // Here you would typically send a request to your backend to update the user
      // For now, we'll just update the local state
      updateUser(formData)
      setMessage('Profile updated successfully!')
    } catch (error) {
      setMessage('Failed to update profile. Please try again.')
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Settings</h2>
      <div className="mb-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={darkMode}
            onChange={toggleDarkMode}
            className="mr-2"
          />
          Dark Mode
        </label>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block mb-1">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="email" className="block mb-1">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="age" className="block mb-1">Age</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="gender" className="block mb-1">Gender</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="height" className="block mb-1">Height (cm)</label>
          <input
            type="number"
            id="height"
            name="height"
            value={formData.height}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="weight" className="block mb-1">Weight (kg)</label>
          <input
            type="number"
            id="weight"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="weightGoal" className="block mb-1">Weight Goal (kg)</label>
          <input
            type="number"
            id="weightGoal"
            name="weightGoal"
            value={formData.weightGoal}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="mainGoal" className="block mb-1">Main Goal</label>
          <input
            type="text"
            id="mainGoal"
            name="mainGoal"
            value={formData.mainGoal}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="fitnessLevel" className="block mb-1">Fitness Level</label>
          <select
            id="fitnessLevel"
            name="fitnessLevel"
            value={formData.fitnessLevel}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
        <div>
          <label htmlFor="preferredWorkoutSplit" className="block mb-1">Preferred Workout Split</label>
          <input
            type="text"
            id="preferredWorkoutSplit"
            name="preferredWorkoutSplit"
            value={formData.preferredWorkoutSplit}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Update Profile
        </button>
      </form>
      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  )
}

export default Settings

