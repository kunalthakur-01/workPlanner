"use client"

import { createContext } from "react"

export const AppContext = createContext({
  appData: {
    projects: [],
    teamMembers: [],
    tasks: [],
  },
  setAppData: () => {},
  addNotification: () => {},
  userRole: null,
  userName: "",
})
