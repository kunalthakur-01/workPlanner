"use client"

import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import Sidebar from "./Sidebar"
import NotificationPanel from "./NotificationPanel"

function Layout({ children }) {
  const [userRole, setUserRole] = useState(null)
  const [userName, setUserName] = useState("")
  const navigate = useNavigate()
  const location = useLocation()
  const [isMobile, setIsMobile] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    // Check if user is logged in
    const role = localStorage.getItem("userRole")
    const name = localStorage.getItem("userName")

    if (!role) {
      navigate("/login")
      return
    }

    setUserRole(role)
    setUserName(name || "User")

    // Check if mobile
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)

    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [navigate])

  if (!userRole) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }

  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar
        userRole={userRole}
        isMobile={isMobile}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        currentPath={location.pathname}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        {isMobile && (
          <header className="bg-white border-b px-4 py-3 flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="text-gray-500 focus:outline-none focus:text-gray-700"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <h1 className="ml-2 text-lg font-medium">Work Planner</h1>
            </div>
            <NotificationPanel />
          </header>
        )}

        <main className="flex-1 overflow-y-auto p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Welcome back, {userName}</h1>
              <p className="text-gray-500">
                {userRole === "manager"
                  ? "Here's what's happening with your projects today."
                  : "Here's your task progress for today."}
              </p>
            </div>
            {!isMobile && <NotificationPanel />}
          </div>

          {children}
        </main>
      </div>
    </div>
  )
}

export default Layout
