"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";

export default function TasksView() {
  const [openDialog, setOpenDialog] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [allTasks, setAllTasks] = useState([]);
  const [team, setTeam] = useState()
  const[projects,setProjects] = useState()

  const inputs = [
    { name: "Title", type: "text" },
    { name: "Subtitle", type: "text" },
    { name: "Description", type: "text" },
    { name: "Due date", type: "date" },
  ];

  function getTasks() {
    fetch("http://localhost:8080/api/v1/task/all")
      .then((res) => res.json())
      .then((data) => {
        setAllTasks(data);
        setTasks(data);
      });
  }

  function  getProjects(){
    fetch("http://localhost:8080/api/v1/projects/all")
      .then((res) => res.json())
      .then((data) => {
        setProjects(data)
      });
  }

  function getTeamMembers() {
    fetch("http://localhost:8080/api/v1/people/all")
      .then((res) => res.json())
      .then((data) => {
        setTeam(data)
      });
  }

  useEffect(() => {
    getTasks();
    getTeamMembers()
    getProjects()
  }, []);

  const { register, handleSubmit } = useForm();

  const submitForm = (d) => {
    fetch("http://localhost:8080/api/v1/task/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        taskName: d.Title,
        summary: d.Subtitle,
        status: d.status,
        dueDate: d.Duedate,
        assignedTo: d.assignedTo,
        project:d.project
      }),
    }).then((res) => {
      if (res.ok) {
        setOpenDialog(false);
        getTasks();
      } else {
        alert("Something went wrong");
      }
    });
  };

  function filterTasks(tasktype) {
    if (tasktype === "all") {
      setTasks(allTasks);
    } else {
      setTasks(allTasks.filter((task) => task.status === tasktype));
    }
  }

  return (
    <div className="p-6 space-y-6">
      {openDialog && (
        <div className="inset-0 bg-black/10 absolute grid place-items-center z-[99]">
          <div className="bg-white p-4 rounded w-[500px]">
            <div className="mb-4 flex justify-between">
              Add a new task{" "}
              <span
                className="cursor-pointer"
                onClick={() => setOpenDialog(false)}
              >
                x
              </span>
            </div>
            <div className="grid gap-y-2">
              <form onSubmit={handleSubmit(submitForm)}>
                {inputs.map((item, key) => (
                  <div key={key}>
                    <label className="text-xs text-gray-500">{item.name}</label>
                    <input
                      placeholder={item.name}
                      type={item.type}
                      {...register(item.name.split(" ").join(""))}
                      className="text-sm border rounded py-2 w-full px-3"
                    />
                  </div>
                ))}
                <label className="text-xs text-gray-500">Assigned to</label>
                <select
                  {...register("assignedTo")}
                  className="w-full text-sm border px-3 py-2"
                >
                  {team.map((item, index) => {
                    return (
                      <option value={item.email} key={index}>
                        {item.name}
                      </option>
                    );
                  })}
                </select>
                <label className="text-xs text-gray-500">Project</label>

                <select
                  {...register("project")}
                  className="w-full text-sm border px-3 py-2"
                >
                  {projects.map((item, index) => {
                    return (
                      <option value={item.id} key={index}>
                        {item.title}
                      </option>
                    );
                  })}
                </select>

                <label className="text-xs text-gray-500">Status</label>
                <select
                  {...register("status")}
                  className="w-full text-sm border px-3 py-2"
                >
                  <option value={"approved"}>Approved</option>
                  <option value={"pending"}>Pending</option>
                  <option value={"in-progress"}>In progress</option>
                  <option value={"completed"}>Completed</option>
                </select>
                <button className="bg-primary text-white px-4 py-2 rounded text-sm mt-4 w-full">
                  Create project
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      <div className="p-6">
        <div className="text-3xl mb-4 flex items-center justify-between">
          Tasks{" "}
          <button
            className="bg-primary text-white px-4 py-2 rounded text-sm"
            onClick={() => setOpenDialog(true)}
          >
            + Create task
          </button>
        </div>

        <div className="flex text-sm gap-3 mb-3">
          <div
            className="border rounded p-2 hover:bg-gray-200 cursor-pointer"
            onClick={() => filterTasks("all")}
          >
            All
          </div>
          <div
            className="border rounded p-2 hover:bg-gray-200 cursor-pointer"
            onClick={() => filterTasks("pending")}
          >
            Pending
          </div>
          <div
            className="border rounded p-2 hover:bg-gray-200 cursor-pointer"
            onClick={() => filterTasks("in-progress")}
          >
            In progress
          </div>
          <div
            className="border rounded p-2 hover:bg-gray-200 cursor-pointer"
            onClick={() => filterTasks("completed")}
          >
            Completed
          </div>
        </div>

        {tasks?.map((item, index) => (
          <Card key={index} className="mb-3">
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>{item.taskName}</CardTitle>
                  <CardDescription>Task ID : {item.id}</CardDescription>
                  <CardDescription>
                    Assigned to : {item.assignedTo || "Unassigned"}
                  </CardDescription>
                </div>
                <Badge variant={"outline"}>{item.status}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm">{item.summary}</p>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center text-muted-foreground">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>Due: {item.dueDate?.split("T")[0]}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
