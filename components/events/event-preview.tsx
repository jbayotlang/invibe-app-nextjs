"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ImmersiveEventPreview } from "./immersive-event-preview"
import type { EventFormData } from "./event-creation-form"

export function EventPreview() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<EventFormData | null>(null)

  useEffect(() => {
    // Load form data from localStorage
    const saved = localStorage.getItem("eventFormData")
    if (saved) {
      setFormData(JSON.parse(saved))
    } else {
      // If no data, redirect back to form
      router.push("/events/new")
    }
  }, [router])

  const handleSave = () => {
    setIsLoading(true)

    // Simulate saving event
    setTimeout(() => {
      setIsLoading(false)
      router.push("/events/new/success")
    }, 1500)
  }

  const handleBack = () => {
    router.push("/events/new")
  }

  if (!formData) {
    return (
      <div className="flex justify-center items-center h-64">
        <p>Loading preview...</p>
      </div>
    )
  }

  return <ImmersiveEventPreview formData={formData} isCreationPreview={true} onBack={handleBack} onSave={handleSave} />
}
