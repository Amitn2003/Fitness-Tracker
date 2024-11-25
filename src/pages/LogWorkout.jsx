import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

function LogWorkout() {
  const [routine, setRoutine] = useState(null)
  const [exercises, setExercises] = useState([])
  const [duration, setDuration] = useState('')
  const [notes, setNotes] = useState('')
  const [feelingRating, setFeelingRating] = useState(3)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { user } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (location.state && location.state.routineId) {
      fetchRoutine(location.state.routineId)
    } else {
      setError('No routine selected')
      setLoading(false)
    }
  }, [location])

  const fetchRoutine = async (routineId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/routines/${routineId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      const data = await response.json()
      if (response.ok) {
        setRoutine(data)
        setExercises(data.exercises.map(ex => ({
          ...ex,
          sets: ex.sets.map(() => ({ weight: '', reps: '', duration: '', restAfter: '' }))
        })))
      } else {
        setError('Failed to fetch routine')
      }
    } catch (err) {
      setError('An error occurred while fetching the routine')
    } finally {
      setLoading(false)
    }
  }

  const handleSetChange = (exerciseIndex, setIndex, field, value) => {
    const updatedExercises = [...exercises]
    updatedExercises[exerciseIndex].sets[setIndex][field] = value
    setExercises(updatedExercises)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/workouts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          user: user._id,
          routine: routine._id,
          duration: parseInt(duration),
          exercises: exercises.map(ex => ({
            exercise: ex.exercise._id,
            sets: ex.sets
          })),
          notes,
          feelingRating: parseInt(feelingRating)
        })
      })
      const data = await response.json()
      if (response.ok) {
        navigate('/dashboard')
      } else {
        setError(data.message || 'Failed to log workout')
      }
    } catch (err) {
      setError('An error occurred while logging the workout')
    }
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div className="text-red-500">{error}</div>

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Log Workout: {routine.name}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {exercises.map((exercise, exerciseIndex) => (
          <div key={exercise._id} className="border p-4 rounded">
            <h3 className="font-bold">{exercise.exercise.name}</h3>
            {exercise.sets.map((set, setIndex) => (
              <div key={setIndex} className="flex space-x-2 mt-2">
                <input
                  type="number"
                  placeholder="Weight"
                  value={set.weight}
                  onChange={(e) => handleSetChange(exerciseIndex, setIndex, 'weight', e.target.value)}
                  className="w-1/4 p-2 border rounded"
                />
                <input
                  type="number"
                  placeholder="Reps"
                  value={set.reps}
                  onChange={(e) => handleSetChange(exerciseIndex, setIndex, 'reps', e.target.value)}
                  className="w-1/4 p-2 border rounded"
                />
                <input
                  type="number"
                  placeholder="Duration (s)"
                  value={set.duration}
                  onChange={(e) => handleSetChange(exerciseIndex, setIndex, 'duration', e.target.value)}
                  className="w-1/4 p-2 border rounded"
                />
                <input
                  type="number"
                  placeholder="Rest (s)"
                  value={set.restAfter}
                  onChange={(e) => handleSetChange(exerciseIndex, setIndex, 'restAfter', e.target.value)}
                  className="w-1/4 p-2 border rounded"
                />
              </div>
            ))}
          </div>
        ))}
        <div>
          <label htmlFor="duration" className="block mb-2">Workout Duration (minutes):</label>
          <input
            type="number"
            id="duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="notes" className="block mb-2">Notes:</label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full p-2 border rounded"
            rows="3"
          ></textarea>
        </div>
        <div>
          <label htmlFor="feelingRating" className="block mb-2">How did you feel? (1-5):</label>
          <input
            type="range"
            id="feelingRating"
            min="1"
            max="5"
            value={feelingRating}
            onChange={(e) => setFeelingRating(e.target.value)}
            className="w-full"
          />
          <div className="flex justify-between">
            <span>1 (Terrible)</span>
            <span>3 (OK)</span>
            <span>5 (Great)</span>
          </div>
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Log Workout
        </button>
      </form>
    </div>
  )
}

export default LogWorkout

