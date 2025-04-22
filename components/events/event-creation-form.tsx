"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Calendar, MapPin, Music, ImagesIcon as Photos } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { BackgroundSelector } from "./background-selector"

export interface EventFormData {
  title: string
  date: string
  time: string
  location: string
  description: string
  background: string
  enableAlbum: boolean
  enablePlaylist: boolean
  playlistLink: string
}

export function EventCreationForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<EventFormData>(() => {
    // Try to load from localStorage if available
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("eventFormData")
      if (saved) {
        return JSON.parse(saved)
      }
    }

    // Default values
    return {
      title: "",
      date: "",
      time: "",
      location: "",
      description: "",
      background: "bg-gradient-to-r from-blue-400 to-indigo-500",
      enableAlbum: true,
      enablePlaylist: false,
      playlistLink: "",
    }
  })

  // Save form data to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("eventFormData", JSON.stringify(formData))
  }, [formData])

  const updateFormData = (key: keyof EventFormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
  }

  const handlePreview = () => {
    router.push("/events/new/preview")
  }

  const handleCancel = () => {
    if (confirm("Are you sure you want to cancel? Your changes will be lost.")) {
      localStorage.removeItem("eventFormData")
      router.push("/events")
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Create New Event</h1>
        <p className="text-muted-foreground mt-2">Fill in the details to create your event</p>
      </div>

      <form className="space-y-8">
        {/* Background Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Event Background</CardTitle>
          </CardHeader>
          <CardContent>
            <BackgroundSelector
              value={formData.background}
              onChange={(value) => updateFormData("background", value)}
              eventTitle={formData.title || "Your Event Title"}
            />
          </CardContent>
        </Card>

        {/* Event Details */}
        <Card>
          <CardHeader>
            <CardTitle>Event Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Event Title</Label>
                <Input
                  id="title"
                  placeholder="Summer BBQ Party"
                  value={formData.title}
                  onChange={(e) => updateFormData("title", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Tell your guests what to expect..."
                  value={formData.description}
                  onChange={(e) => updateFormData("description", e.target.value)}
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <div className="relative">
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => updateFormData("date", e.target.value)}
                      required
                    />
                    <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={formData.time}
                    onChange={(e) => updateFormData("time", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <div className="relative">
                  <Input
                    id="location"
                    placeholder="Central Park, New York"
                    value={formData.location}
                    onChange={(e) => updateFormData("location", e.target.value)}
                    required
                  />
                  <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Collaboration Options */}
        <Card>
          <CardHeader>
            <CardTitle>Collaboration Options</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="shared-album">Shared Photo Album</Label>
                  <p className="text-sm text-muted-foreground">Allow guests to upload and view photos</p>
                </div>
                <Switch
                  id="shared-album"
                  checked={formData.enableAlbum}
                  onCheckedChange={(checked) => updateFormData("enableAlbum", checked)}
                />
              </div>

              {formData.enableAlbum && (
                <div className="pl-6 border-l-2 border-muted">
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Photos className="h-4 w-4" />
                    <span className="text-sm">Guests can upload photos to a shared album</span>
                  </div>
                </div>
              )}

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="playlist">Event Playlist</Label>
                  <p className="text-sm text-muted-foreground">Add a playlist for your event</p>
                </div>
                <Switch
                  id="playlist"
                  checked={formData.enablePlaylist}
                  onCheckedChange={(checked) => updateFormData("enablePlaylist", checked)}
                />
              </div>

              {formData.enablePlaylist && (
                <div className="pl-6 border-l-2 border-muted space-y-4">
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Music className="h-4 w-4" />
                    <span className="text-sm">Add a Spotify, Apple Music, or other playlist link</span>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="playlist-link">Playlist Link</Label>
                    <Input
                      id="playlist-link"
                      placeholder="https://open.spotify.com/playlist/..."
                      value={formData.playlistLink}
                      onChange={(e) => updateFormData("playlistLink", e.target.value)}
                    />
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-between">
          <Button variant="outline" onClick={handleCancel} type="button">
            Cancel
          </Button>
          <Button onClick={handlePreview} type="button">
            Preview Event
          </Button>
        </div>
      </form>
    </div>
  )
}
