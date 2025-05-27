export function Card({ children, className = "" }) {
  return <div className={`bg-white rounded-lg border shadow-sm overflow-hidden ${className}`}>{children}</div>
}

export function CardHeader({ children, className = "" }) {
  return <div className={`p-4 border-b ${className}`}>{children}</div>
}

export function CardTitle({ children, className = "" }) {
  return <h3 className={`text-lg font-medium ${className}`}>{children}</h3>
}

export function CardDescription({ children, className = "" }) {
  return <p className={`text-sm text-gray-500 ${className}`}>{children}</p>
}

export function CardContent({ children, className = "" }) {
  return <div className={`p-4 ${className}`}>{children}</div>
}

export function CardFooter({ children, className = "" }) {
  return <div className={`p-4 bg-gray-50 border-t ${className}`}>{children}</div>
}
