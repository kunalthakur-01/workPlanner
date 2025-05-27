"use client"

import { useContext, useState, useEffect } from "react"
import { AppContext } from "@/lib/app-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Download, CheckSquare } from "lucide-react"

export default function ReportsView() {
  const { appData } = useContext(AppContext)
  const [activeTab, setActiveTab] = useState("team-member")
  const [selectedTeamMember, setSelectedTeamMember] = useState("")
  const [selectedProject, setSelectedProject] = useState("")
  const [selectedDate, setSelectedDate] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [filteredTasks, setFilteredTasks] = useState([])

  useEffect(() => {
    if (appData.teamMembers.length > 0 && !selectedTeamMember) {
      setSelectedTeamMember(appData.teamMembers[0].id)
    }

    if (appData.projects.length > 0 && !selectedProject) {
      setSelectedProject(appData.projects[0].id)
    }
  }, [appData.teamMembers, appData.projects])

  useEffect(() => {
    filterTasks()
  }, [activeTab, selectedTeamMember, selectedProject, selectedDate, selectedStatus, appData.tasks])

  const filterTasks = () => {
    let tasks = [...appData.tasks]

    // Filter by tab type
    if (activeTab === "team-member" && selectedTeamMember) {
      tasks = tasks.filter((task) => task.assigneeId === selectedTeamMember)
    } else if (activeTab === "project" && selectedProject) {
      tasks = tasks.filter((task) => task.projectId === selectedProject)
    }

    // Filter by date
    if (selectedDate === "today") {
      const today = new Date().toISOString().split("T")[0]
      tasks = tasks.filter((task) => {
        const taskDate = new Date(task.createdAt).toISOString().split("T")[0]
        return taskDate === today
      })
    } else if (selectedDate === "week") {
      const weekAgo = new Date()
      weekAgo.setDate(weekAgo.getDate() - 7)
      tasks = tasks.filter((task) => new Date(task.createdAt) >= weekAgo)
    } else if (selectedDate === "month") {
      const monthAgo = new Date()
      monthAgo.setMonth(monthAgo.getMonth() - 1)
      tasks = tasks.filter((task) => new Date(task.createdAt) >= monthAgo)
    }

    // Filter by status
    if (selectedStatus !== "all") {
      tasks = tasks.filter((task) => task.status === selectedStatus)
    }

    setFilteredTasks(tasks)
  }

  const generateReport = () => {
    // In a real app, this would generate a PDF or CSV
    alert("Report generated! In a real app, this would download a PDF or CSV file.")
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Reports</h1>
        <p className="text-muted-foreground">Generate reports based on team members, projects, and task status.</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="team-member">By Team Member</TabsTrigger>
          <TabsTrigger value="project">By Project</TabsTrigger>
          <TabsTrigger value="status">By Status</TabsTrigger>
        </TabsList>

        <div className="flex flex-col md:flex-row gap-4">
          {activeTab === "team-member" && (
            <Select value={selectedTeamMember} onValueChange={setSelectedTeamMember}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Select team member" />
              </SelectTrigger>
              <SelectContent>
                {appData.teamMembers.map((member) => (
                  <SelectItem key={member.id} value={member.id}>
                    {member.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          {activeTab === "project" && (
            <Select value={selectedProject} onValueChange={setSelectedProject}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Select project" />
              </SelectTrigger>
              <SelectContent>
                {appData.projects.map((project) => (
                  <SelectItem key={project.id} value={project.id}>
                    {project.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          <Select value={selectedDate} onValueChange={setSelectedDate}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Time period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">Last 7 Days</SelectItem>
              <SelectItem value="month">Last 30 Days</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Task status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>

          <Button className="ml-auto" onClick={generateReport}>
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>

        <TabsContent value={activeTab} className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>
                {activeTab === "team-member"
                  ? `Tasks for ${appData.teamMembers.find((m) => m.id === selectedTeamMember)?.name || "Team Member"}`
                  : activeTab === "project"
                    ? `Tasks in ${appData.projects.find((p) => p.id === selectedProject)?.name || "Project"}`
                    : "Tasks by Status"}
              </CardTitle>
              <CardDescription>
                {selectedDate === "all"
                  ? "All time"
                  : selectedDate === "today"
                    ? "Today"
                    : selectedDate === "week"
                      ? "Last 7 days"
                      : "Last 30 days"}
                {selectedStatus !== "all" &&
                  ` • ${selectedStatus.charAt(0).toUpperCase() + selectedStatus.slice(1)} tasks`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {filteredTasks.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No tasks found matching the selected criteria
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Summary Stats */}
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckSquare className="h-5 w-5 text-muted-foreground" />
                        <span className="font-medium">Total Tasks</span>
                      </div>
                      <div className="text-2xl font-bold">{filteredTasks.length}</div>
                    </div>

                    <div className="bg-muted/50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckSquare className="h-5 w-5 text-green-500" />
                        <span className="font-medium">Completed</span>
                      </div>
                      <div className="text-2xl font-bold">
                        {filteredTasks.filter((task) => task.progress === 100).length}
                      </div>
                    </div>

                    <div className="bg-muted/50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckSquare className="h-5 w-5 text-amber-500" />
                        <span className="font-medium">In Progress</span>
                      </div>
                      <div className="text-2xl font-bold">
                        {filteredTasks.filter((task) => task.progress > 0 && task.progress < 100).length}
                      </div>
                    </div>
                  </div>

                  {/* Task List */}
                  <div className="border rounded-lg divide-y">
                    <div className="grid grid-cols-12 gap-4 p-4 font-medium bg-muted/50">
                      <div className="col-span-5">Task</div>
                      <div className="col-span-2">Status</div>
                      <div className="col-span-3">{activeTab === "team-member" ? "Project" : "Assignee"}</div>
                      <div className="col-span-2">Progress</div>
                    </div>

                    {filteredTasks.map((task) => {
                      const project = appData.projects.find((p) => p.id === task.projectId)
                      const assignee = appData.teamMembers.find((m) => m.id === task.assigneeId)

                      return (
                        <div key={task.id} className="grid grid-cols-12 gap-4 p-4 items-center">
                          <div className="col-span-5">
                            <div className="font-medium">{task.title}</div>
                            <div className="text-sm text-muted-foreground">
                              Due: {new Date(task.dueDate).toLocaleDateString()}
                            </div>
                          </div>
                          <div className="col-span-2">
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
                          <div className="col-span-3">
                            {activeTab === "team-member" ? project?.name || "Unknown" : assignee?.name || "Unassigned"}
                          </div>
                          <div className="col-span-2 flex items-center gap-2">
                            <Progress value={task.progress} className="h-2 flex-1" />
                            <span className="text-sm font-medium w-8">{task.progress}%</span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
