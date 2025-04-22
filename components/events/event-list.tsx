"use client"

import { useState } from "react"
import Link from "next/link"
import { CalendarPlus, Clock, MapPin, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

type EventStatus = "attending" | "hosting" | "past"

interface Event {
  id: string
  title: string
  date: string
  time: string
  location: string
  status: EventStatus
  background: string
}

const MOCK_EVENTS: Event[] = [
  {
    id: "1",
    title: "Summer BBQ Party",
    date: "Jun 15, 2024",
    time: "4:00 PM",
    location: "Central Park, NY",
    status: "hosting",
    background: "bg-gradient-to-r from-orange-400 to-pink-500",
  },
  {
    id: "2",
    title: "Tech Conference",
    date: "Jul 22, 2024",
    time: "9:00 AM",
    location: "Convention Center",
    status: "attending",
    background: "bg-gradient-to-r from-blue-400 to-indigo-500",
  },
  {
    id: "3",
    title: "Birthday Celebration",
    date: "Aug 5, 2024",
    time: "7:00 PM",
    location: "Rooftop Bar",
    status: "hosting",
    background: "bg-gradient-to-r from-purple-400 to-pink-500",
  },
  {
    id: "4",
    title: "New Year Party",
    date: "Dec 31, 2023",
    time: "10:00 PM",
    location: "Downtown Hotel",
    status: "past",
    background: "bg-gradient-to-r from-blue-500 to-teal-400",
  },
]

export function EventList() {
  const [activeTab, setActiveTab] = useState<EventStatus>("attending")

  const filteredEvents = MOCK_EVENTS.filter((event) => event.status === activeTab)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Your Events</h1>
        <Link href="/events/create">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Event
          </Button>
        </Link>
      </div>

      <Tabs defaultValue="attending" onValueChange={(value) => setActiveTab(value as EventStatus)}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="attending">Attending</TabsTrigger>
          <TabsTrigger value="hosting">Hosting</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
        </TabsList>

        <TabsContent value="attending" className="mt-6">
          <EventGrid events={filteredEvents} emptyMessage="You're not attending any events yet." />
        </TabsContent>

        <TabsContent value="hosting" className="mt-6">
          <EventGrid events={filteredEvents} emptyMessage="You're not hosting any events yet." />
        </TabsContent>

        <TabsContent value="past" className="mt-6">
          <EventGrid events={filteredEvents} emptyMessage="You don't have any past events." />
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface EventGridProps {
  events: Event[]
  emptyMessage: string
}

function EventGrid({ events, emptyMessage }: EventGridProps) {
  if (events.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <CalendarPlus className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium">{emptyMessage}</h3>
        <p className="text-muted-foreground mt-2">Create a new event or wait for invitations.</p>
        <Link href="/events/create" className="mt-4">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Event
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <Link key={event.id} href={`/events/${event.id}`}>
          <Card className="overflow-hidden h-full transition-all hover:shadow-md">
            <div className={`h-32 ${event.background} p-6 flex items-end`}>
              <Badge variant={event.status === "hosting" ? "default" : "secondary"}>
                {event.status === "hosting" ? "Hosting" : event.status === "attending" ? "Attending" : "Past"}
              </Badge>
            </div>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2">{event.title}</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Clock className="mr-2 h-4 w-4" />
                  <span>
                    {event.date} at {event.time}
                  </span>
                </div>
                <div className="flex items-center">
                  <MapPin className="mr-2 h-4 w-4" />
                  <span>{event.location}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="px-6 py-4 border-t bg-muted/50">
              <Button variant="ghost" className="w-full" asChild>
                <span>View Details</span>
              </Button>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  )
}
