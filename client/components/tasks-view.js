"use client"
import DialogBox from "./DialogBox"
import { useContext, useState, useEffect } from "react"
import { AppContext } from "@/lib/app-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Plus, Clock } from "lucide-react"
import { format } from "date-fns"

export default function TasksView() {
  const { appData, setAppData, userRole, userName, addNotification } = useContext(AppContext)
  const [activeTab, setActiveTab] = useState("all")
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    projectId: "",
    assigneeId: "",
    dueDate: format(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), "yyyy-MM-dd"),
  })
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [filteredTasks, setFilteredTasks] = useState([])

  // For team member to update task progress
  const [progressDialogOpen, setProgressDialogOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState(null)
  const [taskProgress, setTaskProgress] = useState(0)

  // For manager to approve/reject tasks
  const [approvalDialogOpen, setApprovalDialogOpen] = useState(false)
  const [taskToApprove, setTaskToApprove] = useState(null)

  useEffect(() => {
    filterTasks(activeTab)
  }, [activeTab, appData.tasks])

  const filterTasks = (filter) => {
    let tasks = [...appData.tasks]

    if (userRole === "team-member") {
      // For team members, only show tasks assigned to them or suggested by them
      const teamMember = appData.teamMembers[0] // For demo, using first team member
      tasks = tasks.filter(
        (task) =>
          task.assigneeId === teamMember.id || (task.createdBy === "team-member" && task.suggestedBy === teamMember.id),
      )
    }

    switch (filter) {
      case "pending":
        tasks = tasks.filter((task) => task.status === "pending")
        break
      case "approved":
        tasks = tasks.filter((task) => task.status === "approved")
        break
      case "rejected":
        tasks = tasks.filter((task) => task.status === "rejected")
        break
      case "completed":
        tasks = tasks.filter((task) => task.progress === 100)
        break
      case "in-progress":
        tasks = tasks.filter((task) => task.progress > 0 && task.progress < 100)
        break
      // "all" shows everything
    }

    setFilteredTasks(tasks)
  }

  const handleCreateTask = () => {
    if (!newTask.title || !newTask.projectId) return

    const task = {
      id: Date.now().toString(),
      title: newTask.title,
      description: newTask.description,
      projectId: newTask.projectId,
      assigneeId: userRole === "manager" ? newTask.assigneeId : null,
      suggestedBy: userRole === "team-member" ? appData.teamMembers[0].id : null,
      dueDate: newTask.dueDate,
      status: userRole === "manager" ? "approved" : "pending",
      progress: 0,
      createdBy: userRole,
      createdAt: new Date().toISOString(),
    }

    const updatedTasks = [...appData.tasks, task]

    setAppData({
      ...appData,
      tasks: updatedTasks,
    })

    // Simulate email notification when manager assigns task
    if (userRole === "manager" && task.assigneeId) {
      const assignee = appData.teamMembers.find((member) => member.id === task.assigneeId)
      const project = appData.projects.find((project) => project.id === task.projectId)

      addNotification(`Email sent to ${assignee.name} about new task "${task.title}" in project "${project.name}"`)
    }

    setNewTask({
      title: "",
      description: "",
      projectId: "",
      assigneeId: "",
      dueDate: format(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), "yyyy-MM-dd"),
    })

    setIsDialogOpen(false)
  }

  const handleUpdateProgress = () => {
    if (!selectedTask) return

    const updatedTasks = appData.tasks.map((task) =>
      task.id === selectedTask.id ? { ...task, progress: taskProgress } : task,
    )

    setAppData({
      ...appData,
      tasks: updatedTasks,
    })

    setProgressDialogOpen(false)
  }

  const handleTaskApproval = (approved) => {
    if (!taskToApprove) return

    const updatedTasks = appData.tasks.map((task) =>
      task.id === taskToApprove.id
        ? {
            ...task,
            status: approved ? "approved" : "rejected",
            // If approved and no assignee yet, assign to the team member who suggested it
            assigneeId: approved && !task.assigneeId && task.suggestedBy ? task.suggestedBy : task.assigneeId,
          }
        : task,
    )

    setAppData({
      ...appData,
      tasks: updatedTasks,
    })

    // Simulate email notification
    if (approved) {
      const suggestedBy = taskToApprove.suggestedBy
      if (suggestedBy) {
        const teamMember = appData.teamMembers.find((member) => member.id === suggestedBy)
        const project = appData.projects.find((project) => project.id === taskToApprove.projectId)

        addNotification(
          `Email sent to ${teamMember.name} about task approval: "${taskToApprove.title}" in project "${project.name}"`,
        )
      }
    }

    setApprovalDialogOpen(false)
  }

  const openProgressDialog = (task) => {
    setSelectedTask(task)
    setTaskProgress(task.progress)
    setProgressDialogOpen(true)
  }

  const openApprovalDialog = (task) => {
    setTaskToApprove(task)
    setApprovalDialogOpen(true)
  }
  const[openDialog,setOpenDialog] = useState(false)

  const inputs=[
    {
      name:"Title",
      type:"text"
    },
    {
      name:"Subtitle",
      type:"text"
    },
    {
      name:"Assigned to",
      type:"text"
    },
    {
      name:"Description",
      type:"text"
    },
    {
      name:"Status",
      type:"text"
    },
    {
      name:"Due date",
      type:"date"
    },
  ]

  return (
    <div className="p-6 space-y-6">
      {/* <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Tasks</h1>
          <p className="text-muted-foreground">
            {userRole === "manager" ? "Manage tasks and track team progress." : "View your tasks and update progress."}
          </p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              {userRole === "manager" ? "Assign Task" : "Suggest Task"}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{userRole === "manager" ? "Assign New Task" : "Suggest New Task"}</DialogTitle>
              <DialogDescription>
                {userRole === "manager"
                  ? "Create a new task and assign it to a team member."
                  : "Suggest a new task for approval."}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium">
                  Task Title
                </label>
                <Input
                  id="title"
                  placeholder="Enter task title"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium">
                  Description
                </label>
                <Textarea
                  id="description"
                  placeholder="Enter task description"
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="project" className="text-sm font-medium">
                  Project
                </label>
                <Select
                  value={newTask.projectId}
                  onValueChange={(value) => setNewTask({ ...newTask, projectId: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a project" />
                  </SelectTrigger>
                  <SelectContent>
                    {appData.projects.map((project) => (
                      <SelectItem key={project.id} value={project.id}>
                        {project.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {userRole === "manager" && (
                <div className="space-y-2">
                  <label htmlFor="assignee" className="text-sm font-medium">
                    Assignee
                  </label>
                  <Select
                    value={newTask.assigneeId}
                    onValueChange={(value) => setNewTask({ ...newTask, assigneeId: value })}
                  >
                    <SelectTrigger>
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
                </div>
              )}
              <div className="space-y-2">
                <label htmlFor="dueDate" className="text-sm font-medium">
                  Due Date
                </label>
                <Input
                  id="dueDate"
                  type="date"
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateTask}>{userRole === "manager" ? "Create Task" : "Suggest Task"}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div> */}
      {
      openDialog &&
    <DialogBox inputs={inputs} title={"Create new project"} handler={setOpenDialog}/>
     }

      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value)}>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-5 lg:w-[600px]">
          <TabsTrigger value="all">All Tasks</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
          <button className="bg-primary text-white px-4 py-2 rounded text-sm" onClick={()=>setOpenDialog(true)}>+ Create task</button>
        </div>
        <TabsContent value={activeTab} className="mt-6">
          {filteredTasks.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 border rounded-lg bg-muted/50">
              <p className="text-muted-foreground mb-4">No tasks found</p>
              <Button onClick={() => setIsDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                {userRole === "manager" ? "Create Task" : "Suggest Task"}
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredTasks.map((task) => {
                const project = appData.projects.find((p) => p.id === task.projectId)
                const assignee = appData.teamMembers.find((m) => m.id === task.assigneeId)
                const suggestedBy = appData.teamMembers.find((m) => m.id === task.suggestedBy)

                return (
                  <Card key={task.id}>
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle>{task.title}</CardTitle>
                          <CardDescription>
                            Project: {project?.name || "Unknown"}
                            {assignee && ` • Assigned to: ${assignee.name}`}
                            {suggestedBy && ` • Suggested by: ${suggestedBy.name}`}
                          </CardDescription>
                        </div>
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
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm">{task.description || "No description provided"}</p>

                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center text-muted-foreground">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                        </div>

                        {task.status === "approved" && (
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">{task.progress}%</span>
                            <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                              <div className="h-full bg-primary" style={{ width: `${task.progress}%` }} />
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex justify-end gap-2">
                        {userRole === "manager" && task.status === "pending" && (
                          <Button size="sm" onClick={() => openApprovalDialog(task)}>
                            Review Task
                          </Button>
                        )}

                        {userRole === "team-member" &&
                          task.status === "approved" &&
                          task.assigneeId === appData.teamMembers[0].id && (
                            <Button size="sm" onClick={() => openProgressDialog(task)}>
                              Update Progress
                            </Button>
                          )}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Progress Update Dialog */}
      <Dialog open={progressDialogOpen} onOpenChange={setProgressDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Task Progress</DialogTitle>
            <DialogDescription>{selectedTask?.title}</DialogDescription>
          </DialogHeader>
          <div className="py-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">Progress: {taskProgress}%</span>
              </div>
              <Slider
                value={[taskProgress]}
                min={0}
                max={100}
                step={5}
                onValueChange={(value) => setTaskProgress(value[0])}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setProgressDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateProgress}>Update Progress</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Task Approval Dialog */}
      <Dialog open={approvalDialogOpen} onOpenChange={setApprovalDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Review Suggested Task</DialogTitle>
            <DialogDescription>{taskToApprove?.title}</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium">Description</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  {taskToApprove?.description || "No description provided"}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-medium">Project</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  {appData.projects.find((p) => p.id === taskToApprove?.projectId)?.name || "Unknown"}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-medium">Suggested By</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  {appData.teamMembers.find((m) => m.id === taskToApprove?.suggestedBy)?.name || "Unknown"}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-medium">Due Date</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  {taskToApprove?.dueDate ? new Date(taskToApprove.dueDate).toLocaleDateString() : "Not set"}
                </p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="destructive" onClick={() => handleTaskApproval(false)}>
              Reject
            </Button>
            <Button onClick={() => handleTaskApproval(true)}>Approve</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
