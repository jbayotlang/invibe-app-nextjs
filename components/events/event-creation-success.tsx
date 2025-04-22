"use client"

import { useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Check, Copy, Share2, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/hooks/use-toast"

export function EventCreationSuccess() {
  const router = useRouter()

  // Clear form data from localStorage on success page load
  useEffect(() => {
    localStorage.removeItem("eventFormData")
  }, [])

  const copyLink = () => {
    navigator.clipboard.writeText("https://gather.app/events/new-event-id")
    toast({
      title: "Link copied",
      description: "Event link copied to clipboard",
    })
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center rounded-full bg-primary/10 p-6 mb-4">
          <Check className="h-12 w-12 text-primary" />
        </div>
        <h1 className="text-2xl font-bold">Event Created!</h1>
        <p className="text-muted-foreground mt-2">Your event has been successfully created</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Next Steps</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button className="w-full justify-start" variant="outline" onClick={copyLink}>
            <Copy className="mr-2 h-4 w-4" />
            Copy Event Link
          </Button>
          <Button className="w-full justify-start" variant="outline" asChild>
            <Link href="/events/new-event-id/invite">
              <Share2 className="mr-2 h-4 w-4" />
              Share with Guests
            </Link>
          </Button>
          <Button className="w-full justify-start" variant="outline" asChild>
            <Link href="/events/new-event-id">
              <Users className="mr-2 h-4 w-4" />
              Manage Guest List
            </Link>
          </Button>
        </CardContent>
        <CardFooter>
          <Button className="w-full" asChild>
            <Link href="/events">View All Events</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
