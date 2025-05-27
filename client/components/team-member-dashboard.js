"use client"

import { useContext } from "react"
import { AppContext } from "@/lib/app-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, AlertCircle } from "lucide-react"
import NotificationPanel from "@/components/notification-panel"

export default function TeamMemberDashboard() {
  const { appData, userName } = useContext(AppContext)

  // For demo purposes, we'll assume the first team member is the logged-in user
  const currentUser = appData.teamMembers[0]

  // Get tasks assigned to the current user
  const userTasks = appData.tasks.filter((task) => task.assigneeId === currentUser.id && task.status === "approved")

  // Calculate task statistics
  const completedTasks = userTasks.filter((task) => task.progress === 100).length
  const inProgressTasks = userTasks.filter((task) => task.progress > 0 && task.progress < 100).length
  const notStartedTasks = userTasks.filter((task) => task.progress === 0).length

  // Calculate overall progress
  const totalProgress = userTasks.reduce((sum, task) => sum + task.progress, 0)
  const averageProgress = userTasks.length > 0 ? Math.round(totalProgress / userTasks.length) : 0

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Welcome back, {userName}</h1>
          <p className="text-muted-foreground">Here's your task progress for today.</p>
        </div>
        <NotificationPanel />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Assigned Tasks</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userTasks.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedTasks}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inProgressTasks}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageProgress}%</div>
            <Progress value={averageProgress} className="h-2 mt-2" />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Tasks</CardTitle>
          <CardDescription>Tasks assigned to you</CardDescription>
        </CardHeader>
        <CardContent>
          {userTasks.length === 0 ? (
            <p className="text-muted-foreground">No approved tasks assigned to you yet.</p>
          ) : (
            <div className="space-y-6">
              {userTasks.map((task) => {
                const project = appData.projects.find((p) => p.id === task.projectId)

                return (
                  <div key={task.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{task.title}</div>
                        <div className="text-sm text-muted-foreground">Project: {project?.name}</div>
                      </div>
                      <Badge variant={task.progress === 100 ? "success" : task.progress > 0 ? "outline" : "secondary"}>
                        {task.progress === 100 ? "Completed" : task.progress > 0 ? "In Progress" : "Not Started"}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress value={task.progress} className="h-2 flex-1" />
                      <span className="text-sm font-medium">{task.progress}%</span>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
