"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

// Simple auth context simulation for demo purposes
const useAuth = () => {
  const [user, setUser] = useState<null | { name: string }>(null)

  // Simulate checking for a logged-in user
  useEffect(() => {
    const checkAuth = () => {
      const savedUser = localStorage.getItem("invibe-user")
      if (savedUser) {
        setUser(JSON.parse(savedUser))
      }
    }

    checkAuth()
  }, [])

  return { user }
}

export default function Home() {
  const router = useRouter()
  const { user } = useAuth()

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b py-4 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-xl font-bold text-primary">
              InVibe
            </Link>

            {/* Navigation links removed */}

            <div className="flex items-center gap-4">
              {user ? (
                <Button onClick={() => router.push("/events")}>My Events</Button>
              ) : (
                <>
                  <Button variant="ghost" onClick={() => router.push("/auth/login")}>
                    Sign In
                  </Button>
                  <Button onClick={() => router.push("/auth/register")}>Sign Up</Button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 md:py-24 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  Create unforgettable events with <span className="text-primary">InVibe</span>
                </h1>
                <p className="text-xl text-muted-foreground">
                  The modern way to plan, organize, and share your events with friends, family, and colleagues.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  {user ? (
                    <Button size="lg" onClick={() => router.push("/events")}>
                      My Events
                    </Button>
                  ) : (
                    <>
                      <Button size="lg" onClick={() => router.push("/auth/register")}>
                        Get Started
                      </Button>
                      <Button size="lg" variant="outline" onClick={() => router.push("/auth/login")}>
                        Sign In
                      </Button>
                    </>
                  )}
                </div>
              </div>

              <div className="relative">
                <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto">
                  <div className="space-y-4">
                    <div className="h-64 bg-primary/10 rounded-lg pattern-dots animate-float" />
                    <div
                      className="h-40 bg-primary/20 rounded-lg pattern-wavy animate-float"
                      style={{ animationDelay: "0.5s" }}
                    />
                  </div>
                  <div className="space-y-4 pt-8">
                    <div
                      className="h-40 bg-primary/20 rounded-lg pattern-confetti animate-float"
                      style={{ animationDelay: "0.2s" }}
                    />
                    <div
                      className="h-64 bg-primary/10 rounded-lg pattern-grid animate-float"
                      style={{ animationDelay: "0.7s" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-muted/50 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Designed for modern events</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                InVibe helps you create beautiful event invitations, manage RSVPs, and collaborate with guests.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-background p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl">✨</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Beautiful Invitations</h3>
                <p className="text-muted-foreground">
                  Create stunning, customizable event pages with themes that reflect your style.
                </p>
              </div>

              <div className="bg-background p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl">📷</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Shared Photo Albums</h3>
                <p className="text-muted-foreground">
                  Let guests contribute to a collaborative photo album for your event.
                </p>
              </div>

              <div className="bg-background p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl">🎵</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Event Playlists</h3>
                <p className="text-muted-foreground">Share music playlists with your guests to set the perfect mood.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="bg-primary/10 p-12 rounded-2xl text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to host your next event?</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                Join InVibe today and create memorable experiences for your guests.
              </p>
              {user ? (
                <Button size="lg" onClick={() => router.push("/events/new")}>
                  Create an Event
                </Button>
              ) : (
                <Button size="lg" onClick={() => router.push("/auth/register")}>
                  Sign Up for Free
                </Button>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-muted/30 py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h2 className="text-xl font-bold text-primary">InVibe</h2>
              <p className="text-sm text-muted-foreground">Create unforgettable events</p>
            </div>

            <div className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} InVibe. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
