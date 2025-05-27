"use client"
import { Link, useNavigate } from "react-router-dom"
import {
  LayoutDashboardIcon,
  BriefcaseIcon,
  CheckSquareIcon,
  UsersIcon,
  BarChartIcon,
  LogOutIcon,
  XIcon,
} from "./Icons"

function Sidebar({ userRole, isMobile, sidebarOpen, setSidebarOpen, currentPath }) {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("userRole")
    localStorage.removeItem("userName")
    navigate("/login")
  }

  const navItems = [
    {
      name: "Dashboard",
      icon: <LayoutDashboardIcon className="h-5 w-5" />,
      path: "/",
      show: true,
    },
    {
      name: "Projects",
      icon: <BriefcaseIcon className="h-5 w-5" />,
      path: "/projects",
      show: true,
    },
    {
      name: "Tasks",
      icon: <CheckSquareIcon className="h-5 w-5" />,
      path: "/tasks",
      show: true,
    },
    {
      name: "Team",
      icon: <UsersIcon className="h-5 w-5" />,
      path: "/team",
      show: userRole === "manager",
    },
    {
      name: "Reports",
      icon: <BarChartIcon className="h-5 w-5" />,
      path: "/reports",
      show: userRole === "manager",
    },
  ]

  const sidebarClasses = `
    bg-white border-r h-screen transition-all duration-300 z-40
    ${isMobile ? "fixed top-0 left-0 w-64 pt-16" : "w-64"}
    ${isMobile && !sidebarOpen ? "-translate-x-full" : "translate-x-0"}
  `

  return (
    <>
      <div className={sidebarClasses}>
        <div className="flex flex-col h-full">
          {!isMobile && (
            <div className="p-6 border-b">
              <div className="flex items-center">
                <BriefcaseIcon className="h-6 w-6 text-blue-600 mr-2" />
                <span className="font-bold">Work Planner</span>
              </div>
            </div>
          )}

          {isMobile && (
            <div className="absolute top-4 right-4">
              <button
                onClick={() => setSidebarOpen(false)}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <XIcon className="h-6 w-6" />
              </button>
            </div>
          )}

          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {navItems.map(
                (item) =>
                  item.show && (
                    <li key={item.path}>
                      <Link
                        to={item.path}
                        className={`
                          flex items-center px-4 py-2 text-sm font-medium rounded-md
                          ${currentPath === item.path ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-100"}
                        `}
                      >
                        {item.icon}
                        <span className="ml-2">{item.name}</span>
                      </Link>
                    </li>
                  ),
              )}
            </ul>
          </nav>

          <div className="p-4 border-t mt-auto">
            <button
              onClick={handleLogout}
              className="flex items-center px-4 py-2 text-sm font-medium text-red-500 hover:bg-red-50 hover:text-red-600 rounded-md w-full"
            >
              <LogOutIcon className="h-5 w-5 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {isMobile && sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-30" onClick={() => setSidebarOpen(false)} />
      )}
    </>
  )
}

export default Sidebar
