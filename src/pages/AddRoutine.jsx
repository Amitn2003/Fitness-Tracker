import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

function AddRoutine() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [exercises, setExercises] = useState([{ exercise: '', sets: '', reps: '' }])
  const [availableExercises, setAvailableExercises] = useState([])
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { user } = useAuth()

  useEffect(() => {
    // Fetch available exercises from the API
    const fetchExercises = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/exercises`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        })
        const data = await response.json()
        setAvailableExercises(data.exercises)
      } catch (err) {
        setError('Failed to fetch exercises')
      }
    }

    fetchExercises()
  }, [])

  const handleExerciseChange = (index, field, value) => {
    const newExercises = [...exercises]
    newExercises[index][field] = value
    setExercises(newExercises)
  }

  const addExercise = () => {
    setExercises([...exercises, { exercise: '', sets: '', reps: '' }])
  }

  const removeExercise = (index) => {
    const newExercises = exercises.filter((_, i) => i !== index)
    setExercises(newExercises)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/routines`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          name,
          description,
          exercises: exercises.map(e => ({
            exercise: e.exercise,
            sets: parseInt(e.sets),
            reps: parseInt(e.reps)
          }))
        })
      })

      if (!response.ok) {
        throw new Error('Failed to create routine')
      }

      navigate('/routines')
    } catch (err) {
      setError(err.message)
    }
  }

  if (!user) {
    return <div>Please log in to add a routine.</div>
  }

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add New Routine</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-1">Routine Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="description" className="block mb-1">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <h3 className="font-bold mb-2">Exercises</h3>
          {exercises.map((exercise, index) => (
            <div key={index} className="mb-4 p-4 border rounded">
              <select
                value={exercise.exercise}
                onChange={(e) => handleExerciseChange(index, 'exercise', e.target.value)}
                required
                className="w-full px-3 py-2 border rounded mb-2"
              >
                <option value="">Select an exercise</option>
                {availableExercises.map((ex) => (
                  <option key={ex._id} value={ex._id}>{ex.name}</option>
                ))}
              </select>
              <input
                type="number"
                placeholder="Sets"
                value={exercise.sets}
                onChange={(e) => handleExerciseChange(index, 'sets', e.target.value)}
                required
                className="w-full px-3 py-2 border rounded mb-2"
              />
              <input
                type="number"
                placeholder="Reps"
                value={exercise.reps}
                onChange={(e) => handleExerciseChange(index, 'reps', e.target.value)}
                required
                className="w-full px-3 py-2 border rounded mb-2"
              />
              <button
                type="button"
                onClick={() => removeExercise(index)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Remove Exercise
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addExercise}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Add Exercise
          </button>
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Create Routine
        </button>
      </form>
    </div>
  )
}

export default AddRoutine

