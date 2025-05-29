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
  const [email,setEmail] = useState("")
  const [phone,setPhone] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()


  const [signup, setSignup] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault()
    console.log(email, password);
    fetch("http://localhost:8080/api/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        email,
        password,
      })
    })
      .then(res => {
        if (res.ok) {
          localStorage.setItem("userRole", "manager")
          localStorage.setItem("userName", email)
          router.push("/dashboard")
        }
        else {
          alert("Invalid credentials")
        }
      })
      .catch(err=>alert("Error"))

    // Simple role-based login simulation
    // if (username.toLowerCase().includes("manager")) {
    //   localStorage.setItem("userRole", "manager")
    //   localStorage.setItem("userName", username)
    //   router.push("/dashboard")
    // } else if (username.toLowerCase().includes("team")) {
    //   localStorage.setItem("userRole", "team-member")
    //   localStorage.setItem("userName", username)
    //   router.push("/dashboard")
    // } else {
    //   setError("Invalid credentials. Try 'manager1' or 'team1'")
    // }
  }

  const handleSignup = (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/api/v1/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        user_name:username,
        email,
        password,
        phone,
        role:"MANAGER"
      })
    })
      .then(res => {
        if (!res.ok) {
          alert("Somethign went wrong")
        }
        else {
          alert("Signup successful!")
          setSignup(false);
        }
      })
      .catch(err=>alert("Error"))
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">

      {
        signup?
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-2">
            <Briefcase className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">Work Planner</CardTitle>
          <p className="text-sm text-muted-foreground">Create a new manager account</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
             <div className="space-y-2">
              <Input
                type="text"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <Button type="submit" className="w-full">
              Sign Up
            </Button>
          </form>
          <div className="mt-4 text-center text-sm cursor-pointer" onClick={()=>setSignup(false)}>
            Go to login
          </div>
        </CardContent>
          </Card>
          :
          <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-2">
            <Briefcase className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">Work Planner</CardTitle>
          <p className="text-sm text-muted-foreground">Sign in to manage your  and tasks</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </form>
          <div className="mt-4 text-center text-sm cursor-pointer" onClick={()=>setSignup(true)}>
            Go to signup
          </div>
        </CardContent>
      </Card>
      }
      


    </div>
  )
}
