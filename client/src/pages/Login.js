"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { BriefcaseIcon } from "../components/Icons"

function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    // Check if user is already logged in
    const userRole = localStorage.getItem("userRole")
    if (userRole) {
      navigate("/")
    }
  }, [navigate])

  const handleLogin = (e) => {
    e.preventDefault()

    if (!username || !password) {
      setError("Please enter both username and password")
      return
    }

    // Simple role-based login simulation
    if (username.toLowerCase().includes("manager")) {
      localStorage.setItem("userRole", "manager")
      localStorage.setItem("userName", username)
      navigate("/")
    } else if (username.toLowerCase().includes("team")) {
      localStorage.setItem("userRole", "team-member")
      localStorage.setItem("userName", username)
      navigate("/")
    } else {
      setError('Invalid credentials. Try "manager1" or "team1"')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6 space-y-6">
          <div className="text-center">
            <div className="flex justify-center mb-2">
              <BriefcaseIcon className="h-12 w-12 text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold">Work Planner</h1>
            <p className="text-sm text-gray-500">Sign in to manage your projects and tasks</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                id="username"
                type="text"
                placeholder="Try 'manager1' or 'team1'"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Any value works"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Sign In
            </button>
          </form>

          <div className="mt-4 text-center text-sm">
            <p className="text-gray-500">
              Demo credentials:
              <br />
              Manager: manager1 / any password
              <br />
              Team Member: team1 / any password
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
