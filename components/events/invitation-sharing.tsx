"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Check, Copy, Mail, Share2, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/hooks/use-toast"

interface InvitationSharingProps {
  id: string
}

export function InvitationSharing({ id }: InvitationSharingProps) {
  const [copied, setCopied] = useState(false)
  const [requireApproval, setRequireApproval] = useState(false)
  const [email, setEmail] = useState("")

  // In a real app, we would fetch the event data based on the ID
  const event = {
    id,
    title: "Summer BBQ Party",
    date: "Jun 15, 2024",
    time: "4:00 PM",
    location: "Central Park, NY",
    background: "bg-gradient-to-r from-orange-400 to-pink-500",
    guests: [
      { id: "1", name: "Sarah", email: "sarah@example.com", status: "going" },
      { id: "2", name: "Mike", email: "mike@example.com", status: "going" },
      { id: "3", name: "Emma", email: "emma@example.com", status: "maybe" },
      { id: "4", name: "John", email: "john@example.com", status: "invited" },
    ],
  }

  const inviteLink = `https://gather.app/invite/${id}`

  const copyLink = () => {
    navigator.clipboard.writeText(inviteLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    toast({
      title: "Link copied",
      description: "Invitation link copied to clipboard",
    })
  }

  const sendInvite = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Invitation sent",
      description: `Invitation sent to ${email}`,
    })
    setEmail("")
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Invite Guests</h1>
        <Button variant="outline" asChild>
          <Link href={`/events/${id}`}>Back to Event</Link>
        </Button>
      </div>

      <Card>
        <CardHeader className={`${event.background} text-white rounded-t-lg`}>
          <CardTitle className="text-xl">{event.title}</CardTitle>
          <p className="text-white/80 text-sm">
            {event.date} at {event.time} • {event.location}
          </p>
        </CardHeader>
        <CardContent className="p-6">
          <Tabs defaultValue="link">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="link">Share Link</TabsTrigger>
              <TabsTrigger value="email">Email Invite</TabsTrigger>
            </TabsList>

            <TabsContent value="link" className="mt-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="invite-link">Invitation Link</Label>
                <div className="flex">
                  <Input id="invite-link" value={inviteLink} readOnly className="rounded-r-none" />
                  <Button onClick={copyLink} variant="secondary" className="rounded-l-none">
                    {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                    {copied ? "Copied" : "Copy"}
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="approval">Require Approval</Label>
                  <p className="text-sm text-muted-foreground">Approve guests before they can join</p>
                </div>
                <Switch id="approval" checked={requireApproval} onCheckedChange={setRequireApproval} />
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Share via</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" className="justify-start">
                    <Mail className="mr-2 h-4 w-4" />
                    Email
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <Share2 className="mr-2 h-4 w-4" />
                    Messages
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="email" className="mt-6">
              <form onSubmit={sendInvite} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Send Invitation
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Guest List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {event.guests.map((guest) => (
              <div key={guest.id} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>{guest.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{guest.name}</p>
                    <p className="text-sm text-muted-foreground">{guest.email}</p>
                  </div>
                </div>
                <Badge
                  variant={guest.status === "going" ? "default" : guest.status === "maybe" ? "secondary" : "outline"}
                >
                  {guest.status === "going" ? "Going" : guest.status === "maybe" ? "Maybe" : "Invited"}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="border-t bg-muted/50 flex justify-between">
          <p className="text-sm text-muted-foreground">{event.guests.length} guests</p>
          <Button variant="ghost" size="sm">
            <X className="h-4 w-4 mr-2" />
            Remove All
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
