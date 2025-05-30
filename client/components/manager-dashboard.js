"use client"

import { useContext, useEffect, useState } from "react"
import { AppContext } from "@/lib/app-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, AlertCircle, Users, Briefcase, CheckSquare } from "lucide-react"
import NotificationPanel from "@/components/notification-panel"

export default function ManagerDashboard() {
  const { appData, userName } = useContext(AppContext)
  const [dashboardTab, setDashboardTab] = useState("overview")

  // Calculate dashboard stats
  const totalProjects = appData.projects.length
  const totalTeamMembers = appData.teamMembers.length
  const totalTasks = appData.tasks.length

  const pendingTasks = appData.tasks.filter((task) => task.status === "pending").length
  const approvedTasks = appData.tasks.filter((task) => task.status === "approved").length
  const rejectedTasks = appData.tasks.filter((task) => task.status === "rejected").length

  const completedTasks = appData.tasks.filter((task) => task.progress === 100).length
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

  // Get recent tasks
  const recentTasks = [...appData.tasks].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5)


  const [tasks, setTasks] = useState(0);
  const [team, setTeam] = useState(0);

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/task/all")
      .then((res) => res.json())
      .then((data) => setTasks(data.length));
    
    fetch("http://localhost:8080/api/v1/people/all")
      .then((res) => res.json())
      .then((data) => setTeam(data.length));
  });





  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Welcome back, {userName}</h1>
          <p className="text-muted-foreground">Here's what's happening with your projects today.</p>
        </div>
        <NotificationPanel />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProjects}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{team}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
            <CheckSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tasks}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completionRate}%</div>
            <Progress value={completionRate} className="h-2 mt-2" />
          </CardContent>
        </Card>
      </div>

      <Tabs value={dashboardTab} onValueChange={setDashboardTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tasks">Recent Tasks</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Task Status</CardTitle>
                <CardDescription>Distribution of tasks by status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-amber-500 mr-2" />
                      <span>Pending</span>
                    </div>
                    <Badge variant="outline">{pendingTasks}</Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span>Approved</span>
                    </div>
                    <Badge variant="outline">{approvedTasks}</Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <AlertCircle className="h-4 w-4 text-red-500 mr-2" />
                      <span>Rejected</span>
                    </div>
                    <Badge variant="outline">{rejectedTasks}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="col-span-1 lg:col-span-2">
              <CardHeader>
                <CardTitle>Project Progress</CardTitle>
                <CardDescription>Overall progress of active projects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {appData.projects.map((project) => {
                    // Calculate project progress based on associated tasks
                    const projectTasks = appData.tasks.filter((task) => task.projectId === project.id)
                    const totalProgress = projectTasks.reduce((sum, task) => sum + task.progress, 0)
                    const avgProgress = projectTasks.length > 0 ? Math.round(totalProgress / projectTasks.length) : 0

                    return (
                      <div key={project.id} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{project.name}</span>
                          <span className="text-sm text-muted-foreground">{avgProgress}%</span>
                        </div>
                        <Progress value={avgProgress} className="h-2" />
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tasks">
          <Card>
            <CardHeader>
              <CardTitle>Recent Tasks</CardTitle>
              <CardDescription>Latest tasks across all projects</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTasks.map((task) => {
                  const project = appData.projects.find((p) => p.id === task.projectId)
                  const assignee = appData.teamMembers.find((m) => m.id === task.assigneeId)

                  return (
                    <div
                      key={task.id}
                      className="flex items-start justify-between border-b pb-4 last:border-0 last:pb-0"
                    >
                      <div>
                        <div className="font-medium">{task.title}</div>
                        <div className="text-sm text-muted-foreground">
                          {project?.name} • Assigned to: {assignee?.name || "Unassigned"}
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Badge
                          variant={
                            task.status === "approved"
                              ? "success"
                              : task.status === "rejected"
                                ? "destructive"
                                : "outline"
                          }
                        >
                          {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                        </Badge>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
