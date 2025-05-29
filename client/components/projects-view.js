"use client"

import { useContext, useEffect, useRef, useState } from "react"
import { AppContext } from "@/lib/app-context"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Plus, Users } from "lucide-react"

import DialogBox from "./DialogBox"
export default function ProjectsView() {
  const { appData, userRole } = useContext(AppContext)

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
      name:"Start date",
      type:"date"
    },
    {
      name:"End date",
      type:"date"
    },
  ]
  return (
    <div className="p-6 space-y-6">
     {
      openDialog &&
    <DialogBox inputs={inputs} title={"Create new project"} handler={setOpenDialog}/>
     } 

      

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground">Manage your projects and track their progress.</p>
        </div>
        

        <button className="bg-primary text-white px-4 py-2 rounded text-sm" onClick={()=>setOpenDialog(true)}>+ Create project</button>
    
      </div>

      {appData.projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 border rounded-lg bg-muted/50">
          <p className="text-muted-foreground mb-4">No projects found</p>
          {userRole === "manager" && (
            <Button onClick={() => setIsDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
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
                    <Progress value={avgProgress} className="h-2" />
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>
                        {new Date(project.startDate).toLocaleDateString()} -{" "}
                        {new Date(project.endDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

          
                </CardContent>
                <CardFooter className="bg-muted/50 px-6 py-3">
                  <div className="flex items-center justify-between w-full">
                    <Badge variant={avgProgress === 100 ? "success" : "outline"}>
                      {avgProgress === 100 ? "Completed" : "In Progress"}
                    </Badge>
             
                  </div>
                </CardFooter>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
