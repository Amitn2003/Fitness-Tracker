import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

function StartWorkout() {
  const [routines, setRoutines] = useState([])
  const [selectedRoutine, setSelectedRoutine] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    fetchRoutines()
  }, [])

  const fetchRoutines = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/routines`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      const data = await response.json()
      if (response.ok) {
        setRoutines(data.routines)
      } else {
        setError('Failed to fetch routines')
      }
    } catch (err) {
      setError('An error occurred while fetching routines')
    } finally {
      setLoading(false)
    }
  }

  const handleStartWorkout = () => {
    if (selectedRoutine) {
      navigate('/log-workout', { state: { routineId: selectedRoutine } })
    } else {
      setError('Please select a routine')
    }
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div className="text-red-500">{error}</div>

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Start Workout</h2>
      <div className="mb-4">
        <label htmlFor="routine" className="block mb-2">Select a Routine:</label>
        <select
          id="routine"
          className="w-full p-2 border rounded"
          value={selectedRoutine}
          onChange={(e) => setSelectedRoutine(e.target.value)}
        >
          <option value="">Choose a routine</option>
          {routines.map(routine => (
            <option key={routine._id} value={routine._id}>{routine.name}</option>
          ))}
        </select>
      </div>
      {selectedRoutine && (
        <div className="mb-4">
          <h3 className="font-bold">Routine Details:</h3>
          <p>{routines.find(r => r._id === selectedRoutine).description}</p>
        </div>
      )}
      <button
        onClick={handleStartWorkout}
        className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Start Workout
      </button>
    </div>
  )
}

export default StartWorkout

