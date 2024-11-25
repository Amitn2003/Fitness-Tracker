import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

function AddRoutine() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    exercises: [],
    difficulty: '',
    estimatedDuration: '',
    targetMuscleGroups: [],
    workoutType: '',
    equipment: [],
    tags: [],
    isPublic: false
  })
  const [availableExercises, setAvailableExercises] = useState([])
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { user } = useAuth()

  useEffect(() => {
    fetchExercises()
  }, [])

  const fetchExercises = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/exercises`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      const data = await response.json()
      if (response.ok) {
        setAvailableExercises(data.exercises)
      } else {
        setError('Failed to fetch exercises')
      }
    } catch (err) {
      setError('An error occurred while fetching exercises')
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleArrayChange = (e) => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value.split(',').map(item => item.trim())
    }))
  }

  const handleExerciseChange = (index, field, value) => {
    const updatedExercises = [...formData.exercises]
    updatedExercises[index] = { ...updatedExercises[index], [field]: value }
    setFormData({ ...formData, exercises: updatedExercises })
  }

  const addExercise = () => {
    setFormData({
      ...formData,
      exercises: [...formData.exercises, { exercise: '', sets: '', reps: '', restBetweenSets: '' }]
    })
  }

  const removeExercise = (index) => {
    const updatedExercises = formData.exercises.filter((_, i) => i !== index)
    setFormData({ ...formData, exercises: updatedExercises })
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
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        navigate('/routines')
      } else {
        const data = await response.json()
        setError(data.message || 'Failed to create routine')
      }
    } catch (err) {
      setError('An error occurred while creating the routine')
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Create New Routine</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-1">Routine Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="description" className="block mb-1">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="difficulty" className="block mb-1">Difficulty</label>
          <select
            id="difficulty"
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          >
            <option value="">Select difficulty</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>
        <div>
          <label htmlFor="estimatedDuration" className="block mb-1">Estimated Duration (minutes)</label>
          <input
            type="number"
            id="estimatedDuration"
            name="estimatedDuration"
            value={formData.estimatedDuration}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="targetMuscleGroups" className="block mb-1">Target Muscle Groups (comma-separated)</label>
          <input
            type="text"
            id="targetMuscleGroups"
            name="targetMuscleGroups"
            value={formData.targetMuscleGroups.join(', ')}
            onChange={handleArrayChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="workoutType" className="block mb-1">Workout Type</label>
          <input
            type="text"
            id="workoutType"
            name="workoutType"
            value={formData.workoutType}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="equipment" className="block mb-1">Equipment (comma-separated)</label>
          <input
            type="text"
            id="equipment"
            name="equipment"
            value={formData.equipment.join(', ')}
            onChange={handleArrayChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="tags" className="block mb-1">Tags (comma-separated)</label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={formData.tags.join(', ')}
            onChange={handleArrayChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="isPublic"
              checked={formData.isPublic}
              onChange={handleChange}
              className="mr-2"
            />
            Make this routine public
          </label>
        </div>
        <div>
          <h3 className="font-bold mb-2">Exercises</h3>
          {formData.exercises.map((exercise, index) => (
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
              <input
                type="number"
                placeholder="Rest between sets (seconds)"
                value={exercise.restBetweenSets}
                onChange={(e) => handleExerciseChange(index, 'restBetweenSets', e.target.value)}
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
