import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'

function Dashboard() {
  const [workoutVolume, setWorkoutVolume] = useState(null)
  const [muscleInsights, setMuscleInsights] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { user } = useAuth()

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const [volumeResponse, insightsResponse] = await Promise.all([
        fetch(`${import.meta.env.VITE_API_URL}/progress/volume`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }),
        fetch(`${import.meta.env.VITE_API_URL}/progress/muscle-insights`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        })
      ])

      const volumeData = await volumeResponse.json()
      const insightsData = await insightsResponse.json()

      if (volumeResponse.ok && insightsResponse.ok) {
        setWorkoutVolume(volumeData)
        setMuscleInsights(insightsData)
      } else {
        setError('Failed to fetch dashboard data')
      }
    } catch (err) {
      setError('An error occurred while fetching dashboard data')
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div className="text-red-500">{error}</div>

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-xl font-bold mb-2">Workout Volume</h3>
          {workoutVolume && (
            <ul>
              <li>Total workouts: {workoutVolume.totalWorkouts}</li>
              <li>Total volume: {workoutVolume.totalVolume} kg</li>
              <li>Average volume per workout: {workoutVolume.averageVolumePerWorkout} kg</li>
            </ul>
          )}
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-xl font-bold mb-2">Muscle Group Insights</h3>
          {muscleInsights && (
            <ul>
              {Object.entries(muscleInsights).map(([muscleGroup, data]) => (
                <li key={muscleGroup}>
                  {muscleGroup}: {data.totalVolume} kg ({data.percentageOfTotal}% of total volume)
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard

