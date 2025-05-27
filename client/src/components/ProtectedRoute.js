import { Navigate } from "react-router-dom"

function ProtectedRoute({ children }) {
  const userRole = localStorage.getItem("userRole")

  if (!userRole) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute
