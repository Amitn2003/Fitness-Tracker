import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'

function Routines() {
  const [routines, setRoutines] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const { user } = useAuth()

  useEffect(() => {
    fetchRoutines()
  }, [currentPage])

  const fetchRoutines = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/routines?page=${currentPage}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      const data = await res.json()
      if (res.ok) {
        setRoutines(data.routines)
        setTotalPages(data.totalPages)
      } else {
        setError(data.message)
      }
    } catch (err) {
      setError('Failed to fetch routines')
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div className="text-red-500">{error}</div>

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Routines</h2>
      <Link to="/routines/add" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mb-4 inline-block">
        Create New Routine
      </Link>
      <div className="space-y-
4">
        {routines.map(routine => (
          <div key={routine._id} className="border p-4 rounded">
            <h3 className="font-bold">{routine.name}</h3>
            <p>{routine.description}</p>
            <p><strong>Difficulty:</strong> {routine.difficulty}</p>
            <p><strong>Estimated Duration:</strong> {routine.estimatedDuration} minutes</p>
            <p><strong>Workout Type:</strong> {routine.workoutType}</p>
            <p><strong>Target Muscle Groups:</strong> {routine.targetMuscleGroups.join(', ')}</p>
            <p><strong>Equipment:</strong> {routine.equipment.join(', ')}</p>
            <p><strong>Tags:</strong> {routine.tags.join(', ')}</p>
            <p><strong>Likes:</strong> {routine.likes}</p>
            <p><strong>Times Used:</strong> {routine.timesUsed}</p>
            <Link to={`/routines/${routine._id}`} className="text-blue-500 hover:underline">View Details</Link>
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

export default Routines
