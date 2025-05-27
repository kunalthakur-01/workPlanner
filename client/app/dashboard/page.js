"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import Sidebar from "@/components/sidebar"
import ManagerDashboard from "@/components/manager-dashboard"
import TeamMemberDashboard from "@/components/team-member-dashboard"
import ProjectsView from "@/components/projects-view"
import TasksView from "@/components/tasks-view"
import TeamView from "@/components/team-view"
import ReportsView from "@/components/reports-view"
import { AppContext } from "@/lib/app-context"
import { initialData } from "@/lib/initial-data"

export default function Dashboard() {
  const router = useRouter()
  const [userRole, setUserRole] = useState(null)
  const [userName, setUserName] = useState("")
  const [activeTab, setActiveTab] = useState("dashboard")
  const [appData, setAppData] = useState(initialData)
  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    // Check if user is logged in
    const role = localStorage.getItem("userRole")
    const name = localStorage.getItem("userName")

    if (!role) {
      router.push("/")
      return
    }

    setUserRole(role)
    setUserName(name || "User")
  }, [router])

  const addNotification = (message) => {
    const newNotification = {
      id: Date.now(),
      message,
      timestamp: new Date().toISOString(),
    }
    setNotifications([newNotification, ...notifications])
  }

  if (!userRole) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }

  return (
    <AppContext.Provider value={{ appData, setAppData, addNotification, userRole, userName }}>
      <div className="flex h-screen bg-slate-50">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} userRole={userRole} />

        <main className="flex-1 overflow-y-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsContent value="dashboard" className="m-0">
              {userRole === "manager" ? <ManagerDashboard /> : <TeamMemberDashboard />}
            </TabsContent>

            <TabsContent value="projects" className="m-0">
              <ProjectsView />
            </TabsContent>

            <TabsContent value="tasks" className="m-0">
              <TasksView />
            </TabsContent>

            {userRole === "manager" && (
              <TabsContent value="team" className="m-0">
                <TeamView />
              </TabsContent>
            )}

            {userRole === "manager" && (
              <TabsContent value="reports" className="m-0">
                <ReportsView />
              </TabsContent>
            )}
          </Tabs>
        </main>
      </div>
    </AppContext.Provider>
  )
}
