function Progress({ value = 0, max = 100, className = "" }) {
  return (
    <div className={`w-full bg-gray-200 rounded-full h-2 overflow-hidden ${className}`}>
      <div className="bg-blue-600 h-full" style={{ width: `${Math.min(Math.max(value, 0), max)}%` }} />
    </div>
  )
}

export default Progress
