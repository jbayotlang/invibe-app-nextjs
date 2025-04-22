"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Calendar, Check, ChevronLeft, Clock, MapPin, Sun, ThumbsUp, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { EventFormData } from "./event-creation-form"
import { cn } from "@/lib/utils"

interface ImmersiveEventPreviewProps {
  id?: string
  formData?: EventFormData
  isCreationPreview?: boolean
  onBack?: () => void
  onSave?: () => void
}

export function ImmersiveEventPreview({
  id,
  formData: propFormData,
  isCreationPreview = false,
  onBack,
  onSave,
}: ImmersiveEventPreviewProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<EventFormData | null>(propFormData || null)

  useEffect(() => {
    if (propFormData) {
      setFormData(propFormData)
    } else if (!formData && !id) {
      // Load form data from localStorage if not provided as prop
      const saved = localStorage.getItem("eventFormData")
      if (saved) {
        setFormData(JSON.parse(saved))
      } else if (isCreationPreview) {
        // If no data and we're in creation preview, redirect back to form
        router.push("/events/new")
      }
    }
  }, [router, id, propFormData, formData, isCreationPreview])

  const handleSave = () => {
    if (onSave) {
      onSave()
      return
    }

    setIsLoading(true)

    // Simulate saving event
    setTimeout(() => {
      setIsLoading(false)
      router.push("/events/new/success")
    }, 1500)
  }

  const handleBack = () => {
    if (onBack) {
      onBack()
      return
    }

    router.push("/events/new")
  }

  // Mock data for existing event view
  const eventData = id
    ? {
        id,
        title: "Summer BBQ Party",
        date: "Jun 15, 2024",
        time: "4:00 PM",
        location: "Central Park, NY",
        description:
          "Join us for a fun summer BBQ with friends and family. Bring your favorite drinks and enjoy the sunshine!",
        background: "bg-gradient-to-r from-orange-400 to-pink-500",
        host: {
          name: "Alex Johnson",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        weather: {
          temp: "75°F",
          condition: "Sunny",
        },
        guests: [
          { id: "1", name: "Sarah", status: "going" },
          { id: "2", name: "Mike", status: "going" },
          { id: "3", name: "Emma", status: "maybe" },
          { id: "4", name: "John", status: "invited" },
        ],
        isHost: true,
      }
    : null

  if (!formData && !eventData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading preview...</p>
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
  }

  // Use either form data or event data
  const title = formData?.title || eventData?.title || "Untitled Event"
  const date = formData?.date ? formatDate(formData.date) : eventData?.date || ""
  const time = formData?.time || eventData?.time || ""
  const location = formData?.location || eventData?.location || ""
  const description = formData?.description || eventData?.description || ""
  const background = formData?.background || eventData?.background || "bg-gradient-to-r from-blue-400 to-indigo-500"

  return (
    <div className="min-h-screen flex flex-col">
      {/* Full-screen background */}
      <div className={cn("fixed inset-0 w-full h-full z-0", background)} />

      {/* Header with navigation */}
      <header className="sticky top-0 z-10 py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="icon"
              className="bg-background/90 hover:bg-background border-0 shadow-md"
              onClick={handleBack}
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Back</span>
            </Button>

            {/* Save/Create button moved to top right */}
            {isCreationPreview && (
              <Button onClick={handleSave} disabled={isLoading} className="bg-primary/90 hover:bg-primary shadow-md">
                {isLoading ? (
                  "Creating..."
                ) : (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Create Event
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 relative z-1">
        <div className="flex flex-col min-h-[calc(100vh-5rem)]">
          {/* Event title and details - centered in the middle of the screen */}
          <div className="flex-1 flex flex-col justify-center items-center text-center px-4 py-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-md max-w-3xl">{title}</h1>

            <div className="mt-6 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 text-white/90">
              {date && (
                <div className="flex items-center bg-black/20 px-4 py-2 rounded-full">
                  <Calendar className="h-5 w-5 mr-2" />
                  <span>{date}</span>
                </div>
              )}

              {time && (
                <div className="flex items-center bg-black/20 px-4 py-2 rounded-full">
                  <Clock className="h-5 w-5 mr-2" />
                  <span>{time}</span>
                </div>
              )}

              {location && (
                <div className="flex items-center bg-black/20 px-4 py-2 rounded-full">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span>{location}</span>
                </div>
              )}
            </div>
          </div>

          {/* Structured content area with solid cards */}
          <div className="bg-background rounded-t-3xl pt-8 pb-20">
            <div className="container mx-auto max-w-2xl px-4">
              {/* RSVP options replacing the action buttons */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <Button size="lg" className="w-full bg-green-500 hover:bg-green-600 text-white">
                  <ThumbsUp className="mr-2 h-5 w-5" />
                  Going
                </Button>

                <Button size="lg" className="w-full bg-amber-500 hover:bg-amber-600 text-white">
                  Maybe
                </Button>

                <Button size="lg" className="w-full bg-red-500 hover:bg-red-600 text-white">
                  <X className="mr-2 h-5 w-5" />
                  Decline
                </Button>
              </div>

              {/* Host information card */}
              <Card className="mb-6">
                <CardContent className="p-6 flex items-center gap-4">
                  <Avatar className="h-14 w-14">
                    <AvatarImage src={eventData?.host?.avatar || "/placeholder.svg?height=40&width=40"} alt="Host" />
                    <AvatarFallback>{eventData?.host?.name?.charAt(0) || "H"}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm text-muted-foreground">Hosted by</p>
                    <p className="text-lg font-semibold">{eventData?.host?.name || "You"}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Weather card */}
              <Card className="mb-6">
                <CardHeader className="pb-0 pt-6">
                  <CardTitle className="flex items-center text-lg">
                    <Sun className="h-5 w-5 mr-2 text-yellow-500" />
                    Weather Forecast
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="text-3xl font-bold">{eventData?.weather?.temp || "75°F"}</div>
                    <div className="text-lg">{eventData?.weather?.condition || "Sunny"}</div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">Weather forecast for {date || "event day"}</p>
                </CardContent>
              </Card>

              {/* Directions/location card */}
              <Card className="mb-6">
                <CardHeader className="pb-0 pt-6">
                  <CardTitle className="flex items-center text-lg">
                    <MapPin className="h-5 w-5 mr-2 text-primary" />
                    Location
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="mb-2">{location || "Location details will appear here"}</p>
                  {location && (
                    <Button variant="outline" size="sm" className="mt-2">
                      Get directions
                    </Button>
                  )}
                </CardContent>
              </Card>

              {/* Description card */}
              {description && (
                <Card className="mb-6">
                  <CardHeader className="pb-0 pt-6">
                    <CardTitle className="text-lg">About this event</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <p>{description}</p>
                  </CardContent>
                </Card>
              )}

              {/* Back to Edit button (only shown in creation preview) */}
              {isCreationPreview && (
                <div className="flex justify-center mt-8">
                  <Button variant="outline" onClick={handleBack}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Edit
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Preview Banner at bottom of screen */}
      {isCreationPreview && (
        <div className="fixed bottom-0 left-0 right-0 bg-background border-t py-3 px-4 text-center z-10 shadow-lg">
          <p className="text-sm text-muted-foreground">
            This is a preview of what your guests will see when they receive your invitation.
          </p>
        </div>
      )}
    </div>
  )
}
