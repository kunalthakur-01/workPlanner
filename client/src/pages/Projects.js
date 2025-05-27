"use client"

import { useState } from "react"
import Layout from "../components/Layout"
import { useAppContext } from "../context/AppContext"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../components/Card"
import Button from "../components/Button"
import Input from "../components/Input"
import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogContent, DialogFooter } from "../components/Dialog"
import Progress from "../components/Progress"
import Badge from "../components/Badge"
import { CalendarIcon, ClockIcon, UsersIcon, PlusIcon } from "../components/Icons"
import { format } from "date-fns"

function Projects() {
  const { appData, setAppData } = useAppContext()
  const [userRole, setUserRole] = useState(localStorage.getItem("userRole"))
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    startDate: format(new Date(), "yyyy-MM-dd"),
    endDate: format(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), "yyyy-MM-dd"),
  })

  const handleCreateProject = () => {
    if (!newProject.name) return

    const project = {
      id: Date.now().toString(),
      name: newProject.name,
      description: newProject.description,
      startDate: newProject.startDate,
      endDate: newProject.endDate,
      createdAt: new Date().toISOString(),
    }

    setAppData({
      ...appData,
      projects: [...appData.projects, project],
    })

    setNewProject({
      name: "",
      description: "",
      startDate: format(new Date(), "yyyy-MM-dd"),
      endDate: format(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), "yyyy-MM-dd"),
    })

    setIsDialogOpen(false)
  }

  return (
    <Layout>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Projects</h1>
          <p className="text-gray-500">Manage your projects and track their progress.</p>
        </div>

        {userRole === "manager" && (
          <Button onClick={() => setIsDialogOpen(true)} className="flex items-center">
            <PlusIcon className="h-4 w-4 mr-2" />
            New Project
          </Button>
        )}
      </div>

      {appData.projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 border rounded-lg bg-gray-50">
          <p className="text-gray-500 mb-4">No projects found</p>
          {userRole === "manager" && (
            <Button onClick={() => setIsDialogOpen(true)}>
              <PlusIcon className="h-4 w-4 mr-2" />
              Create Your First Project
            </Button>
          )}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {appData.projects.map((project) => {
            // Calculate project progress based on associated tasks
            const projectTasks = appData.tasks.filter((task) => task.projectId === project.id)
            const totalProgress = projectTasks.reduce((sum, task) => sum + task.progress, 0)
            const avgProgress = projectTasks.length > 0 ? Math.round(totalProgress / projectTasks.length) : 0

            // Count team members assigned to this project's tasks
            const teamMemberIds = new Set(projectTasks.map((task) => task.assigneeId).filter(Boolean))

            return (
              <Card key={project.id} className="overflow-hidden">
                <CardHeader>
                  <CardTitle>{project.name}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {project.description || "No description provided"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">Progress</span>
                      <span>{avgProgress}%</span>
                    </div>
                    <Progress value={avgProgress} />
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-gray-500">
                      <CalendarIcon className="h-4 w-4 mr-1" />
                      <span>
                        {new Date(project.startDate).toLocaleDateString()} -{" "}
                        {new Date(project.endDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <UsersIcon className="h-4 w-4 mr-1" />
                      <span>{teamMemberIds.size} team members</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <ClockIcon className="h-4 w-4 mr-1" />
                      <span>{projectTasks.length} tasks</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="bg-gray-50 px-6 py-3">
                  <div className="flex items-center justify-between w-full">
                    <Badge variant={avgProgress === 100 ? "success" : "default"}>
                      {avgProgress === 100 ? "Completed" : "In Progress"}
                    </Badge>
                    <Button variant="ghost" size="sm">
                      View Details
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            )
          })}
        </div>
      )}

      <Dialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
          <DialogDescription>Add a new project to your workspace.</DialogDescription>
        </DialogHeader>
        <DialogContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Project Name
              </label>
              <Input
                id="name"
                placeholder="Enter project name"
                value={newProject.name}
                onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">
                Description
              </label>
              <textarea
                id="description"
                placeholder="Enter project description"
                value={newProject.description}
                onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="startDate" className="text-sm font-medium">
                  Start Date
                </label>
                <Input
                  id="startDate"
                  type="date"
                  value={newProject.startDate}
                  onChange={(e) => setNewProject({ ...newProject, startDate: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="endDate" className="text-sm font-medium">
                  End Date
                </label>
                <Input
                  id="endDate"
                  type="date"
                  value={newProject.endDate}
                  onChange={(e) => setNewProject({ ...newProject, endDate: e.target.value })}
                />
              </div>
            </div>
          </div>
        </DialogContent>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleCreateProject}>Create Project</Button>
        </DialogFooter>
      </Dialog>
    </Layout>
  )
}

export default Projects
