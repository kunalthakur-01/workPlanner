"use client"

export function Tabs({ children, className = "" }) {
  return <div className={`space-y-4 ${className}`}>{children}</div>
}

export function TabsList({ children, className = "" }) {
  return <div className={`flex space-x-1 border-b ${className}`}>{children}</div>
}

export function TabsTrigger({ children, isActive, onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`
        px-4 py-2 text-sm font-medium border-b-2 -mb-px
        ${
          isActive
            ? "border-blue-600 text-blue-600"
            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
        }
        ${className}
      `}
    >
      {children}
    </button>
  )
}

export function TabsContent({ children, isActive, className = "" }) {
  if (!isActive) return null

  return <div className={className}>{children}</div>
}
