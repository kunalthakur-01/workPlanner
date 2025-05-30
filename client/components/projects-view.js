"use client";

import { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "@/lib/app-context";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Plus, Users } from "lucide-react";

import DialogBox from "./DialogBox";
import { useForm } from "react-hook-form";
export default function ProjectsView() {
  const { appData, userRole } = useContext(AppContext);

  const [openDialog, setOpenDialog] = useState(false);

  const inputs = [
    {
      name: "Title",
      type: "text",
    },
    {
      name: "Description",
      type: "text",
    },
    {
      name: "Start date",
      type: "date",
    },
    {
      name: "End date",
      type: "date",
    },
    {
      name: "Status",
      type: "text",
    },
  ];
  const { register, handleSubmit } = useForm();
  const submitForm = (d) => {
    fetch("http://localhost:8080/api/v1/projects/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: d.Title,
        subtitle: d.Description,
        startDate: d.Startdate,
        endDate: d.Enddate,
        status: d.Status,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to create project");
        }
        return response.json();
      })
      .then((data) => {
        setOpenDialog(false);
        getData();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const [data, setData] = useState();
  function getData() {
    fetch("http://localhost:8080/api/v1/projects/all")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        console.log(data);
      });
  }

  const[tasks,setTasks] = useState()

  function getTasks() {
    fetch("http://localhost:8080/api/v1/task/all")
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
        console.log(data);
      });
  }
  const[current,setCurrent] = useState()
  function handleSelectTask(project) {
    console.log(project)
    setCurrent(project.id)
    setDetails(true)
  }
  useEffect(() => {
    getData();
    getTasks()
  }, []);

  const[details,setDetails] = useState(false)
  return (
    <div className="p-6 space-y-6">
      {details && (
        <div className="absolute inset-8 rounded shadow-2xl bg-white z-[90]">
          <div className="p-4 border-b flex justify-between items-center">
            Project tasks{" "}
            <span onClick={() => setDetails(false)} className="cursor-pointer">
              x
            </span>
          </div>
          <div className="p-4 gap-y-3 grid">
            <div className="grid gap-y-2">
              {tasks.map((item, index) => {
                if (item?.project == current) {
                  return (
                    <div className="border rounded p-4" key={index}>
                      <div className="text-xl">{item.taskName}</div>
                      <div className="text-sm text-gray-500">
                        {item?.summary}
                      </div>
                      <div className="text-sm text-gray-500">
                        Due date : {item?.dueDate?.split("T")[0]}
                      </div>
                      <div className="text-sm text-gray-500">
                        Assigned to : {item?.assignedTo}
                      </div>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>
        </div>
      )}

      {openDialog && (
        <div className="inset-0 bg-black/10 absolute grid place-items-center z-[99]">
          <div className="bg-white p-4 rounded w-[500px]">
            <div className="mb-4 flex justify-between">
              Create a new project
              <span
                className="cursor-pointer"
                onClick={() => setOpenDialog(false)}
              >
                x
              </span>
            </div>
            <div className="grid gap-y-2">
              <form onSubmit={handleSubmit(submitForm)}>
                {inputs.map((item, key) => {
                  return (
                    <div key={key}>
                      <label className="text-xs text-gray-500">
                        {item.name}
                      </label>
                      <input
                        placeholder={item.name}
                        type={item.type}
                        {...register(item.name.split(" ").join(""))}
                        className="text-sm border rounded py-2 w-full px-3"
                      />
                    </div>
                  );
                })}
                <button className="bg-primary text-white px-4 py-2 rounded text-sm mt-4 w-full">
                  Create project
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground">
            Manage your projects and track their progress.
          </p>
        </div>

        <button
          className="bg-primary text-white px-4 py-2 rounded text-sm"
          onClick={() => setOpenDialog(true)}
        >
          + Create project
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {data?.map((item, index) => {
          return (
            <Card
              key={index}
              className="overflow-hidden cursor-pointer"
              onClick={() => handleSelectTask(item)}
            >
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
                <CardDescription className="line-clamp-2">
                  {item.subtitle}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>
                      {item.startDate} - {item.endDate}
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="bg-muted/50 px-6 py-3">
                <div className="flex items-center justify-between w-full">
                  <Badge variant={"outline"}>{item.status || "Pending"}</Badge>
                </div>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
