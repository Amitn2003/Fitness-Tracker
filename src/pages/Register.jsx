import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const registerSchema = z.object({
  username: z.string().min(3).max(30),
  email: z.string().email(),
  password: z.string().min(6),
  age: z.number().int().positive(),
  gender: z.enum(['male', 'female', 'other']),
  height: z.number().positive(),
  weight: z.number().positive(),
  weightGoal: z.number().positive(),
  mainGoal: z.enum(['weight gain', 'weight loss', 'muscle gain', 'strength training', 'general fitness']),
  fitnessLevel: z.enum(['beginner', 'intermediate', 'advanced']),
  preferredWorkoutSplit: z.enum(['full body', 'upper/lower', 'push/pull/legs', 'bro split', 'custom']),
});

function Register() {
  const { register: registerUser } = useAuth()
  const navigate = useNavigate()
  const [bmi, setBmi] = useState(null)
  const [bmiCategory, setBmiCategory] = useState('')

  const { register, handleSubmit, watch, formState: { errors }, setValue } = useForm({
    resolver: zodResolver(registerSchema),
    mode: 'onChange'
  });

  const weight = watch('weight')
  const height = watch('height')

  useEffect(() => {
    if (weight && height) {
      const bmiValue = calculateBMI(weight, height)
      setBmi(bmiValue)
      setBmiCategory(getBMICategory(bmiValue))
    }
  }, [weight, height])

  const calculateBMI = (weight, height) => {
    const heightInMeters = height / 100
    return (weight / (heightInMeters * heightInMeters)).toFixed(1)
  }

  const getBMICategory = (bmi) => {
    if (bmi < 18.5) return 'Underweight'
    if (bmi >= 18.5 && bmi < 25) return 'Normal weight'
    if (bmi >= 25 && bmi < 30) return 'Overweight'
    return 'Obese'
  }

  const onSubmit = async (data) => {
    try {
      await registerUser(data)
      navigate('/profile')
    } catch (error) {
      console.error('Registration failed:', error)
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="username" className="block mb-1">Username</label>
          <input
            type="text"
            id="username"
            {...register('username')}
            className="w-full px-3 py-2 border rounded"
          />
          {errors.username && <p className="text-red-500">{errors.username.message}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block mb-1">Email</label>
          <input
            type="email"
            id="email"
            {...register('email')}
            className="w-full px-3 py-2 border rounded"
          />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="password" className="block mb-1">Password</label>
          <input
            type="password"
            id="password"
            {...register('password')}
            className="w-full px-3 py-2 border rounded"
          />
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}
        </div>

        <div>
          <label htmlFor="age" className="block mb-1">Age</label>
          <input
            type="number"
            id="age"
            {...register('age', { valueAsNumber: true })}
            className="w-full px-3 py-2 border rounded"
          />
          {errors.age && <p className="text-red-500">{errors.age.message}</p>}
        </div>

        <div>
          <label htmlFor="gender" className="block mb-1">Gender</label>
          <select
            id="gender"
            {...register('gender')}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && <p className="text-red-500">{errors.gender.message}</p>}
        </div>

        <div>
          <label htmlFor="height" className="block mb-1">Height (cm)</label>
          <input
            type="number"
            id="height"
            {...register('height', { valueAsNumber: true })}
            className="w-full px-3 py-2 border rounded"
          />
          {errors.height && <p className="text-red-500">{errors.height.message}</p>}
        </div>

        <div>
          <label htmlFor="weight" className="block mb-1">Weight (kg)</label>
          <input
            type="number"
            id="weight"
            {...register('weight', { valueAsNumber: true })}
            className="w-full px-3 py-2 border rounded"
          />
          {errors.weight && <p className="text-red-500">{errors.weight.message}</p>}
        </div>

        {bmi && (
          <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4" role="alert">
            <p className="font-bold">Your BMI: {bmi}</p>
            <p>Category: {bmiCategory}</p>
          </div>
        )}

        <div>
          <label htmlFor="weightGoal" className="block mb-1">Weight Goal (kg)</label>
          <input
            type="number"
            id="weightGoal"
            {...register('weightGoal', { valueAsNumber: true })}
            className="w-full px-3 py-2 border rounded"
          />
          {errors.weightGoal && <p className="text-red-500">{errors.weightGoal.message}</p>}
        </div>

        <div>
          <label htmlFor="mainGoal" className="block mb-1">Main Goal</label>
          <select
            id="mainGoal"
            {...register('mainGoal')}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="">Select main goal</option>
            <option value="weight gain">Weight Gain</option>
            <option value="weight loss">Weight Loss</option>
            <option value="muscle gain">Muscle Gain</option>
            <option value="strength training">Strength Training</option>
            <option value="general fitness">General Fitness</option>
          </select>
          {errors.mainGoal && <p className="text-red-500">{errors.mainGoal.message}</p>}
        </div>

        <div>
          <label htmlFor="fitnessLevel" className="block mb-1">Fitness Level</label>
          <select
            id="fitnessLevel"
            {...register('fitnessLevel')}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="">Select fitness level</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
          {errors.fitnessLevel && <p className="text-red-500">{errors.fitnessLevel.message}</p>}
        </div>

        <div>
          <label htmlFor="preferredWorkoutSplit" className="block mb-1">Preferred Workout Split</label>
          <select
            id="preferredWorkoutSplit"
            {...register('preferredWorkoutSplit')}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="">Select preferred workout split</option>
            <option value="full body">Full Body</option>
            <option value="upper/lower">Upper/Lower</option>
            <option value="push/pull/legs">Push/Pull/Legs</option>
            <option value="bro split">Bro Split</option>
            <option value="custom">Custom</option>
          </select>
          {errors.preferredWorkoutSplit && <p className="text-red-500">{errors.preferredWorkoutSplit.message}</p>}
        </div>

        <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Register
        </button>
      </form>
    </div>
  )
}

export default Register

