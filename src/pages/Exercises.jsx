import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'

function Exercises() {
  const [exercises, setExercises] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const { user } = useAuth()

  useEffect(() => {
    fetchExercises()
  }, [currentPage])

  const fetchExercises = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/exercises?page=${currentPage}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      console.log(res)
      const data = await res.json()

      if (res.ok) {
        setExercises(data.exercises)
        setTotalPages(data.totalPages)
      } else {
        setError(data.message)
      }
    } catch (err) {
      setError('Failed to fetch exercises')
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div className="text-red-500">{error}</div>

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Exercises</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {exercises.map(exercise => (
          <div key={exercise._id} className="border p-4 rounded">
            <h3 className="font-bold">{exercise.name}</h3>
            <p>{exercise.description}</p>
            <p><strong>Muscle Group:</strong> {exercise.muscleGroup}</p>
            <p><strong>Equipment:</strong> {exercise.equipment}</p>
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

export default Exercises

