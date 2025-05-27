"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase } from "lucide-react"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

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
      router.push("/dashboard")
    } else if (username.toLowerCase().includes("team")) {
      localStorage.setItem("userRole", "team-member")
      localStorage.setItem("userName", username)
      router.push("/dashboard")
    } else {
      setError("Invalid credentials. Try 'manager1' or 'team1'")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-2">
            <Briefcase className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">Work Planner</CardTitle>
          <p className="text-sm text-muted-foreground">Sign in to manage your projects and tasks</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="text"
                placeholder="Username (try 'manager1' or 'team1')"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Password (any value works)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            <p className="text-muted-foreground">
              Demo credentials:
              <br />
              Manager: manager1 / any password
              <br />
              Team Member: team1 / any password
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
