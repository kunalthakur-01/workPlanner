"use client";
import DialogBox from "./DialogBox";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "@/lib/app-context";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Plus, Mail, Phone, User } from "lucide-react";
import { useForm } from "react-hook-form";

export default function TeamView() {
  const [openDialog, setOpenDialog] = useState(false);

  const inputs = [
    {
      name: "Name",
      type: "text",
    },
    {
      name: "Designation",
      type: "text",
    },
    {
      name: "Email",
      type: "email",
    },
    {
      name: "Phone number",
      type: "phone",
    },
    // {
    //   name: "Task Assigned",
    //   type: "number",
    // },
    // {
    //   name: "Task Completed",
    //   type: "number",
    // },
  ];

  const [data, setData] = useState();
  const [tasks, setTasks] = useState();
  function getData() {
    fetch("http://localhost:8080/api/v1/people/all")
      .then((res) => res.json())
      .then((data) => setData(data));
  }
  function getTasks() {
    fetch("http://localhost:8080/api/v1/task/all")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setTasks(data);
      });
  }

  useEffect(() => {
    getData();
    getTasks();
  }, []);

  const { register, handleSubmit } = useForm();
  const submitForm = (d) => {
    fetch("http://localhost:8080/api/v1/people/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: d.Name,
        designation: d.Designation,
        email: d.Email,
        phoneNumber: d.Phonenumber,
      }),
    }).then((res) => {
      if (res.ok) {
        setOpenDialog(false);
        getData();
      } else {
        alert("Something went wrong!");
      }
    });
  };

  const [details, setDetails] = useState(false);
  const [current, setCurrent] = useState();
  function handleOpen(item) {
    console.log(item);
    setCurrent(item.email);
    setDetails(true);
  }
  return (
    <div className="p-6 space-y-6">
      {details && (
        <div className="absolute inset-8 rounded shadow-2xl bg-white z-[90]">
          <div className="p-4 border-b flex justify-between items-center">
            Tasks assigned{" "}
            <span onClick={() => setDetails(false)} className="cursor-pointer">
              x
            </span>
          </div>
          <div className="grid gap-y-2 p-4">
            {tasks?.map((item, index) => {
              if (item.assignedTo == current) {
                return (
                  <div className="border rounded p-4" key={index}>
                    <div className="text-xl">{item.taskName}</div>
                    <div className="text-sm text-gray-500">{item?.summary}</div>
                    <div className="text-sm text-gray-500">
                      Due date : {item?.dueDate?.split("T")[0]}
                    </div>
                    <div className="text-sm text-gray-500">
                      Assigned to : {item?.assignedTo}
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>
      )}

      {openDialog && (
        <div className="inset-0 bg-black/10 absolute grid place-items-center z-[99]">
          <div className="bg-white p-4 rounded w-[500px]">
            <div className="mb-4 flex justify-between">
              Add a new team member
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
                  Add
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      <div>
        <div className="flex flex-row-reverse justify-between">
          <button
            className="bg-primary text-white px-4 py-3 rounded text-sm my-3"
            onClick={() => setOpenDialog(true)}
          >
            + Add Team Member
          </button>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data?.map((item, index) => {
            return (
              <Card
                key={index}
                className="cursor-pointer"
                onClick={() => handleOpen(item)}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-start space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback>
                        {item?.name?.split(" ").length > 1
                          ? item?.name?.split(" ")[0][0].toUpperCase() +
                            " " +
                            item?.name?.split(" ")[1][0].toUpperCase()
                          : item?.name?.split(" ")[0][0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle>{item?.name}</CardTitle>
                      <CardDescription>{item?.designation}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{item?.email}</span>
                    </div>

                    <div className="flex items-center text-sm">
                      <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{item?.phoneNumber}</span>
                    </div>
                  </div>

                  <div className="text-xs border px-2 py-1 rounded-full w-max">
                    See assigned tasks 
                 </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
