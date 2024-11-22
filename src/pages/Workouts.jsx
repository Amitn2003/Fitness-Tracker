import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const { user } = useAuth()

  useEffect(() => {
    fetchWorkouts()
  }, [currentPage])

  const fetchWorkouts = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/workouts?page=${currentPage}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      const data = await res.json()
      if (res.ok) {
        setWorkouts(data.workouts)
        setTotalPages(data.totalPages)
      } else {
        setError(data.message)
      }
    } catch (err) {
      setError('Failed to fetch workouts')
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div className="text-red-500">{error}</div>

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Workouts</h2>
      <div className="space-y-4">
        {workouts.map(workout => (
          <div key={workout._id} className="border p-4 rounded">
            <h3 className="font-bold">{workout.routine.name}</h3>
            <p><strong>Date:</strong> {new Date(workout.date).toLocaleDateString()}</p>
            <h4 className="font-semibold mt-2">Exercises:</h4>
            {workout.exercises.map(exercise => (
              <div key={exercise._id} className="ml-4">
                <h5 className="font-medium">{exercise.exercise.name}</h5>
                <ul className="list-disc list-inside">
                  {exercise.sets.map((set, index) => (
                    <li key={index}>
                      Set {index + 1}: {set.weight} kg x {set.reps} reps
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-between">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default Workouts

