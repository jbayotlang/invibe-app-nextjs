"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Calendar, Clock, Edit, MapPin, MessageSquare, Share2, Sun, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { ImmersiveEventPreview } from "./immersive-event-preview"

interface EventDetailProps {
  id: string
}

export function EventDetail({ id }: EventDetailProps) {
  const router = useRouter()
  const [viewMode, setViewMode] = useState<"standard" | "immersive">("standard")

  // Toggle between standard and immersive view
  const toggleViewMode = () => {
    setViewMode((prev) => (prev === "standard" ? "immersive" : "standard"))
  }

  // If in immersive mode, show the immersive preview
  if (viewMode === "immersive") {
    return <ImmersiveEventPreview id={id} onBack={() => setViewMode("standard")} />
  }

  // In a real app, we would fetch the event data based on the ID
  const event = {
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

  // Add a button to toggle to immersive view
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Event Details</h1>
        <Button onClick={toggleViewMode}>View Immersive Preview</Button>
      </div>

      {/* Rest of the standard event detail view */}
      <div className={`h-48 md:h-64 rounded-lg ${event.background} p-6 flex items-end relative`}>
        {event.isHost && (
          <Button size="icon" variant="secondary" className="absolute top-4 right-4" asChild>
            <Link href={`/events/${id}/edit`}>
              <Edit className="h-4 w-4" />
              <span className="sr-only">Edit event</span>
            </Link>
          </Button>
        )}
        <div>
          <Badge variant="secondary" className="mb-2">
            {event.isHost ? "You are hosting" : "You are attending"}
          </Badge>
          <h1 className="text-3xl font-bold text-white">{event.title}</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={event.host.avatar} alt={event.host.name} />
                  <AvatarFallback>{event.host.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm text-muted-foreground">Hosted by</p>
                  <p className="font-medium">{event.host.name}</p>
                </div>
              </div>

              <Separator className="my-6" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{event.date}</p>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="mr-1 h-3 w-3" />
                      <span>{event.time}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-primary/10 p-2">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{event.location}</p>
                    <p className="text-sm text-muted-foreground">
                      <Link href="#" className="text-primary hover:underline">
                        Get directions
                      </Link>
                    </p>
                  </div>
                </div>
              </div>

              {event.description && (
                <>
                  <Separator className="my-6" />
                  <div>
                    <h3 className="font-medium mb-2">About this event</h3>
                    <p className="text-muted-foreground">{event.description}</p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center">
                  <Users className="mr-2 h-5 w-5" />
                  Guest List
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {event.guests.map((guest) => (
                    <div key={guest.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>{guest.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span>{guest.name}</span>
                      </div>
                      <Badge
                        variant={
                          guest.status === "going" ? "default" : guest.status === "maybe" ? "secondary" : "outline"
                        }
                      >
                        {guest.status === "going" ? "Going" : guest.status === "maybe" ? "Maybe" : "Invited"}
                      </Badge>
                    </div>
                  ))}
                </div>

                <div className="mt-4">
                  <Button variant="outline" className="w-full" asChild>
                    <Link href={`/events/${id}/invite`}>
                      <Share2 className="mr-2 h-4 w-4" />
                      Invite More Guests
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center">
                  <Sun className="mr-2 h-5 w-5" />
                  Weather Forecast
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-4xl font-bold">{event.weather.temp}</div>
                  <div className="text-lg">{event.weather.condition}</div>
                </div>
                <p className="text-sm text-muted-foreground mt-2">Weather forecast for {event.date}</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <MessageSquare className="mr-2 h-5 w-5" />
                Announcements
              </CardTitle>
            </CardHeader>
            <CardContent>
              {event.isHost ? (
                <Button className="w-full">Send Announcement to Guests</Button>
              ) : (
                <div className="text-center py-6">
                  <p className="text-muted-foreground">No announcements yet</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Shared Album</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-square bg-muted rounded-md flex items-center justify-center">
                <Button variant="secondary">View Album</Button>
              </div>
              <p className="text-sm text-muted-foreground mt-4 text-center">Share photos with other guests</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Event Playlist</CardTitle>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                Add Songs
              </Button>
              <p className="text-sm text-muted-foreground mt-4 text-center">Collaborate on the event playlist</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
