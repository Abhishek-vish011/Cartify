import React, { useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const Login = ({ setToken }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(backendUrl + '/api/user/adminLogin', { email, password })
      if (response.data.success) {
        setToken(response.data.token)
        toast.success("Login successful!")
      } else {
        toast.error(response.data.message)
      }
    } catch (err) {
      console.log(err)
      toast.error(err.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden">
        {/* Header */}
        <div className="bg-black text-white text-center py-6 px-4">
          <h1 className="text-3xl font-bold">Admin Panel</h1>
        </div>

        {/* Form */}
        <form onSubmit={onSubmitHandler} className="p-8 flex flex-col gap-5">
          {/* Email */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-2">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="rounded-xl border border-gray-300 px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
            />
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="rounded-xl border border-gray-300 px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="mt-4 py-3 w-full bg-black hover:bg-black text-white font-semibold rounded-xl shadow-md hover:shadow-lg transform transition-all hover:scale-105"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
