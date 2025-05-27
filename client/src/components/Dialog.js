"use client"

import { useEffect } from "react"

export function Dialog({ isOpen, onClose, children }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose} />
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-auto">{children}</div>
      </div>
    </>
  )
}

export function DialogHeader({ children, className = "" }) {
  return <div className={`px-6 py-4 border-b ${className}`}>{children}</div>
}

export function DialogTitle({ children, className = "" }) {
  return <h3 className={`text-lg font-medium ${className}`}>{children}</h3>
}

export function DialogDescription({ children, className = "" }) {
  return <p className={`text-sm text-gray-500 mt-1 ${className}`}>{children}</p>
}

export function DialogContent({ children, className = "" }) {
  return <div className={`px-6 py-4 ${className}`}>{children}</div>
}

export function DialogFooter({ children, className = "" }) {
  return <div className={`px-6 py-4 border-t bg-gray-50 flex justify-end space-x-2 ${className}`}>{children}</div>
}
