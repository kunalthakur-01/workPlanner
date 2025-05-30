"use client"

import { useState, useEffect } from "react"
import Layout from "../components/Layout"
import { useAppContext } from "../context/AppContext"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../components/Card"
import Progress from "../components/Progress"
import Badge from "../components/Badge"
import {
  CheckCircleIcon,
  ClockIcon,
  AlertCircleIcon,
  UsersIcon,
  BriefcaseIcon,
  CheckSquareIcon,
} from "../components/Icons"

function Dashboard() {
  const { appData } = useAppContext()
  const [userRole, setUserRole] = useState(null)
  const [userName, setUserName] = useState("")
  
  const [dashboardTab, setDashboardTab] = useState("overview")
  const [tasks, setTasks] = useState(0);
  const [team, setTeam] = useState(0);

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/task/all")
      .then((res) => res.json)
      .then((data) => setTasks(data.length));
  });


  useEffect(() => {
    const role = localStorage.getItem("userRole")
    const name = localStorage.getItem("userName")

    setUserRole(role)
    setUserName(name || "User")
  }, [])

  if (!userRole) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }

  if (userRole === "manager") {
    return <ManagerDashboard appData={appData} userName={userName} />
  } else {
    return <TeamMemberDashboard appData={appData} userName={userName} />
  }
}

function ManagerDashboard({ appData, userName }) {
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

  return (
    <Layout>
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Projects</p>
                  <p className="text-2xl font-bold">{totalProjects}</p>
                </div>
                <div className="p-2 bg-blue-100 rounded-full">
                  <BriefcaseIcon className="h-5 w-5 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Team Members</p>
                  <p className="text-2xl font-bold">{totalTeamMembers}</p>
                </div>
                <div className="p-2 bg-green-100 rounded-full">
                  <UsersIcon className="h-5 w-5 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Tasks</p>
                  <p className="text-2xl font-bold">{totalTasks}</p>
                </div>
                <div className="p-2 bg-purple-100 rounded-full">
                  <CheckSquareIcon className="h-5 w-5 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Completion Rate</p>
                  <p className="text-2xl font-bold">{completionRate}%</p>
                </div>
                <div className="p-2 bg-yellow-100 rounded-full">
                  <CheckCircleIcon className="h-5 w-5 text-yellow-600" />
                </div>
              </div>
              <Progress value={completionRate} className="mt-2" />
            </CardContent>
          </Card>
        </div>

        <div className="flex border-b">
          <button
            onClick={() => setDashboardTab("overview")}
            className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px ${
              dashboardTab === "overview"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setDashboardTab("tasks")}
            className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px ${
              dashboardTab === "tasks"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Recent Tasks
          </button>
        </div>

        {dashboardTab === "overview" ? (
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
                      <ClockIcon className="h-4 w-4 text-yellow-500 mr-2" />
                      <span>Pending</span>
                    </div>
                    <Badge variant="warning">{pendingTasks}</Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2" />
                      <span>Approved</span>
                    </div>
                    <Badge variant="success">{approvedTasks}</Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <AlertCircleIcon className="h-4 w-4 text-red-500 mr-2" />
                      <span>Rejected</span>
                    </div>
                    <Badge variant="danger">{rejectedTasks}</Badge>
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
                          <span className="text-sm text-gray-500">{avgProgress}%</span>
                        </div>
                        <Progress value={avgProgress} />
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
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
                        <div className="text-sm text-gray-500">
                          {project?.name} • Assigned to: {assignee?.name || "Unassigned"}
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Badge
                          variant={
                            task.status === "approved" ? "success" : task.status === "rejected" ? "danger" : "warning"
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
        )}
      </div>
    </Layout>
  )
}

function TeamMemberDashboard({ appData, userName }) {
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
    <Layout>
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Assigned Tasks</p>
                  <p className="text-2xl font-bold">{userTasks.length}</p>
                </div>
                <div className="p-2 bg-blue-100 rounded-full">
                  <CheckSquareIcon className="h-5 w-5 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Completed</p>
                  <p className="text-2xl font-bold">{completedTasks}</p>
                </div>
                <div className="p-2 bg-green-100 rounded-full">
                  <CheckCircleIcon className="h-5 w-5 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">In Progress</p>
                  <p className="text-2xl font-bold">{inProgressTasks}</p>
                </div>
                <div className="p-2 bg-yellow-100 rounded-full">
                  <ClockIcon className="h-5 w-5 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Overall Progress</p>
                  <p className="text-2xl font-bold">{averageProgress}%</p>
                </div>
                <div className="p-2 bg-purple-100 rounded-full">
                  <CheckCircleIcon className="h-5 w-5 text-purple-600" />
                </div>
              </div>
              <Progress value={averageProgress} className="mt-2" />
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
              <p className="text-gray-500">No approved tasks assigned to you yet.</p>
            ) : (
              <div className="space-y-6">
                {userTasks.map((task) => {
                  const project = appData.projects.find((p) => p.id === task.projectId)

                  return (
                    <div key={task.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">{task.title}</div>
                          <div className="text-sm text-gray-500">Project: {project?.name}</div>
                        </div>
                        <Badge variant={task.progress === 100 ? "success" : task.progress > 0 ? "warning" : "default"}>
                          {task.progress === 100 ? "Completed" : task.progress > 0 ? "In Progress" : "Not Started"}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Progress value={task.progress} className="flex-1" />
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
    </Layout>
  )
}

export default Dashboard
