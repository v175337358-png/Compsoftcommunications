"use client"

import { useEffect, useState } from "react"

interface AccessibilityAnnouncerProps {
  message: string
  priority?: "polite" | "assertive"
}

export function AccessibilityAnnouncer({ message, priority = "polite" }: AccessibilityAnnouncerProps) {
  const [announcement, setAnnouncement] = useState("")

  useEffect(() => {
    if (message) {
      setAnnouncement(message)
      // Clear after announcement to allow re-announcements of the same message
      const timer = setTimeout(() => setAnnouncement(""), 1000)
      return () => clearTimeout(timer)
    }
  }, [message])

  return (
    <div role="status" aria-live={priority} aria-atomic="true" className="sr-only">
      {announcement}
    </div>
  )
}
