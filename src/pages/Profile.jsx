import React from 'react'
import { useAuth } from '../contexts/AuthContext'

function Profile() {
  const { user } = useAuth()

  if (!user) {
    return <div>Please log in to view your profile.</div>
  }

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">User Profile</h2>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <strong className="block text-gray-700 text-sm font-bold mb-2">Username:</strong>
          <p className="text-gray-700">{user.username}</p>
        </div>
        <div className="mb-4">
          <strong className="block text-gray-700 text-sm font-bold mb-2">Email:</strong>
          <p className="text-gray-700">{user.email}</p>
        </div>
        <div className="mb-4">
          <strong className="block text-gray-700 text-sm font-bold mb-2">Age:</strong>
          <p className="text-gray-700">{user.age}</p>
        </div>
        <div className="mb-4">
          <strong className="block text-gray-700 text-sm font-bold mb-2">Gender:</strong>
          <p className="text-gray-700">{user.gender}</p>
        </div>
        <div className="mb-4">
          <strong className="block text-gray-700 text-sm font-bold mb-2">Height:</strong>
          <p className="text-gray-700">{user.height} cm</p>
        </div>
        <div className="mb-4">
          <strong className="block text-gray-700 text-sm font-bold mb-2">Weight:</strong>
          <p className="text-gray-700">{user.weight} kg</p>
        </div>
        <div className="mb-4">
          <strong className="block text-gray-700 text-sm font-bold mb-2">Weight Goal:</strong>
          <p className="text-gray-700">{user.weightGoal} kg</p>
        </div>
        <div className="mb-4">
          <strong className="block text-gray-700 text-sm font-bold mb-2">Main Goal:</strong>
          <p className="text-gray-700">{user.mainGoal}</p>
        </div>
        <div className="mb-4">
          <strong className="block text-gray-700 text-sm font-bold mb-2">Fitness Level:</strong>
          <p className="text-gray-700">{user.fitnessLevel}</p>
        </div>
        <div className="mb-4">
          <strong className="block text-gray-700 text-sm font-bold mb-2">Preferred Workout Split:</strong>
          <p className="text-gray-700">{user.preferredWorkoutSplit}</p>
        </div>
      </div>
    </div>
  )
}

export default Profile

