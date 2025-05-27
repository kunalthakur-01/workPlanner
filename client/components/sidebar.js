"use client"

import { useRouter } from "next/navigation"
import { LayoutDashboard, Briefcase, CheckSquare, Users, BarChart, LogOut, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"

export default function Sidebar({ activeTab, setActiveTab, userRole }) {
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const isMobile = useMediaQuery("(max-width: 768px)")

  const handleLogout = () => {
    localStorage.removeItem("userRole")
    localStorage.removeItem("userName")
    router.push("/")
  }

  const handleTabChange = (tab) => {
    setActiveTab(tab)
    if (isMobile) {
      setSidebarOpen(false)
    }
  }

  const navItems = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
      value: "dashboard",
      show: true,
    },
    {
      name: "Projects",
      icon: <Briefcase className="h-5 w-5" />,
      value: "projects",
      show: true,
    },
    {
      name: "Tasks",
      icon: <CheckSquare className="h-5 w-5" />,
      value: "tasks",
      show: true,
    },
    {
      name: "Team",
      icon: <Users className="h-5 w-5" />,
      value: "team",
      show: userRole === "manager",
    },
    {
      name: "Reports",
      icon: <BarChart className="h-5 w-5" />,
      value: "reports",
      show: userRole === "manager",
    },
  ]

  return (
    <>
      {isMobile && (
        <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 bg-white border-b">
          <div className="flex items-center">
            <Briefcase className="h-6 w-6 text-primary mr-2" />
            <span className="font-bold">Work Planner</span>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      )}

      <div
        className={cn(
          "bg-white border-r h-screen transition-all duration-300 z-40",
          isMobile ? "fixed top-0 left-0 w-64 pt-16" : "w-64",
          isMobile && !sidebarOpen ? "-translate-x-full" : "translate-x-0",
        )}
      >
        <div className="flex flex-col h-full">
          {!isMobile && (
            <div className="p-6 border-b">
              <div className="flex items-center">
                <Briefcase className="h-6 w-6 text-primary mr-2" />
                <span className="font-bold">Work Planner</span>
              </div>
            </div>
          )}

          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {navItems.map(
                (item) =>
                  item.show && (
                    <li key={item.value}>
                      <Button
                        variant={activeTab === item.value ? "default" : "ghost"}
                        className={cn(
                          "w-full justify-start",
                          activeTab === item.value ? "bg-primary text-primary-foreground" : "",
                        )}
                        onClick={() => handleTabChange(item.value)}
                      >
                        {item.icon}
                        <span className="ml-2">{item.name}</span>
                      </Button>
                    </li>
                  ),
              )}
            </ul>
          </nav>

          <div className="p-4 border-t mt-auto">
            <Button
              variant="outline"
              className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {isMobile && sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-30" onClick={() => setSidebarOpen(false)} />
      )}
    </>
  )
}
