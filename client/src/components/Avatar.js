function Avatar({ src, alt, initials, className = "" }) {
  return (
    <div className={`relative inline-block rounded-full overflow-hidden bg-gray-200 ${className}`}>
      {src ? (
        <img src={src || "/placeholder.svg"} alt={alt || "Avatar"} className="w-full h-full object-cover" />
      ) : (
        <div className="flex items-center justify-center w-full h-full bg-gray-200 text-gray-600 font-medium">
          {initials}
        </div>
      )}
    </div>
  )
}

export default Avatar
