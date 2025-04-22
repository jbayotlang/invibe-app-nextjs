"use client"

import type React from "react"

import { useState, useRef } from "react"
import Image from "next/image"
import { Camera, Check, ChevronLeft, Clock, Crop, FileImage, Palette, Sparkles, Upload, Wand2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { cn } from "@/lib/utils"

// Updated background templates with new pattern classes
const BACKGROUND_TEMPLATES = [
  { id: "bg1", name: "Gradient Blue", value: "bg-gradient-to-r from-blue-400 to-indigo-500 animate-gradient" },
  { id: "bg2", name: "Gradient Pink", value: "bg-gradient-to-r from-pink-400 to-purple-500 animate-gradient" },
  { id: "bg3", name: "Gradient Orange", value: "bg-gradient-to-r from-orange-400 to-pink-500 animate-gradient" },
  { id: "bg4", name: "Gradient Green", value: "bg-gradient-to-r from-green-400 to-teal-500 animate-gradient" },
  { id: "bg5", name: "Dots Pattern", value: "bg-blue-50 pattern-dots text-blue-300" },
  { id: "bg6", name: "Grid Pattern", value: "bg-indigo-50 pattern-grid" },
  { id: "bg7", name: "Wavy Pattern", value: "bg-pink-50 pattern-wavy" },
  { id: "bg8", name: "Confetti Pattern", value: "bg-yellow-50 pattern-confetti" },
]

const RECENT_BACKGROUNDS = [
  { id: "recent1", name: "Recent 1", value: "bg-gradient-to-r from-rose-400 to-orange-500 animate-gradient" },
  { id: "recent2", name: "Recent 2", value: "bg-indigo-50 pattern-grid" },
]

const DESIGN_PROMPTS = [
  { id: "prompt1", name: "Summer celebration", category: "occasion" },
  { id: "prompt2", name: "Elegant dinner", category: "occasion" },
  { id: "prompt3", name: "Birthday party", category: "occasion" },
  { id: "prompt4", name: "Minimalist", category: "style" },
  { id: "prompt5", name: "Vibrant patterns", category: "style" },
  { id: "prompt6", name: "Retro", category: "style" },
  { id: "prompt7", name: "Nature", category: "theme" },
  { id: "prompt8", name: "Urban", category: "theme" },
  { id: "prompt9", name: "Abstract", category: "theme" },
]

interface BackgroundSelectorProps {
  value: string
  onChange: (value: string) => void
  eventTitle?: string
}

export function BackgroundSelector({ value, onChange, eventTitle = "Your Event Title" }: BackgroundSelectorProps) {
  const [activeTab, setActiveTab] = useState("templates")
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedBackground, setGeneratedBackground] = useState<string | null>(null)
  const [promptInput, setPromptInput] = useState("")
  const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          setUploadedImage(event.target.result as string)
          // In a real app, we would upload this to a server and get a URL back
          // For now, we'll just use the data URL
          onChange(`url(${event.target.result})`)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const generateAIBackground = (prompt: string) => {
    setIsGenerating(true)
    setSelectedPrompt(prompt)

    // Simulate AI generation with a timeout
    setTimeout(() => {
      // In a real app, this would call an API to generate an image
      // For now, we'll just use a random gradient or pattern
      const randomIndex = Math.floor(Math.random() * BACKGROUND_TEMPLATES.length)
      const generatedBg = BACKGROUND_TEMPLATES[randomIndex].value
      setGeneratedBackground(generatedBg)
      onChange(generatedBg)
      setIsGenerating(false)
    }, 1500)
  }

  return (
    <div className="space-y-6">
      {/* Background Preview */}
      <div className="relative">
        <div
          className={cn(
            "h-48 rounded-lg flex items-center justify-center",
            value.startsWith("url") ? "bg-cover bg-center" : value,
          )}
          style={value.startsWith("url") ? { backgroundImage: value } : {}}
        >
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white drop-shadow-md">{eventTitle}</h3>
            <p className="text-white/80 drop-shadow-sm">Preview with your event title</p>
          </div>
        </div>
      </div>

      {/* Background Selection Tabs */}
      <Tabs defaultValue="templates" onValueChange={setActiveTab} value={activeTab}>
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="photos">Your Photos</TabsTrigger>
          <TabsTrigger value="studio">Design Studio</TabsTrigger>
        </TabsList>

        {/* Templates Tab */}
        <TabsContent value="templates" className="space-y-6">
          {RECENT_BACKGROUNDS.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                <h3 className="text-sm font-medium">Recently Used</h3>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {RECENT_BACKGROUNDS.map((bg) => (
                  <div key={bg.id} className="relative">
                    <button
                      type="button"
                      className={cn(
                        "w-full aspect-square rounded-md overflow-hidden",
                        bg.value,
                        value === bg.value && "ring-2 ring-primary ring-offset-2",
                      )}
                      onClick={() => onChange(bg.value)}
                      aria-label={bg.name}
                    >
                      {value === bg.value && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                          <Check className="h-4 w-4 text-white" />
                        </div>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Template Gallery</h3>
            <RadioGroup value={value} onValueChange={onChange} className="grid grid-cols-4 gap-2">
              {BACKGROUND_TEMPLATES.map((bg) => (
                <div key={bg.id} className="relative">
                  <RadioGroupItem value={bg.value} id={bg.id} className="sr-only" />
                  <Label
                    htmlFor={bg.id}
                    className={cn(
                      "block w-full aspect-square rounded-md overflow-hidden cursor-pointer",
                      bg.value,
                      value === bg.value && "ring-2 ring-primary ring-offset-2",
                    )}
                  >
                    {value === bg.value && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <Check className="h-4 w-4 text-white" />
                      </div>
                    )}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </TabsContent>

        {/* Your Photos Tab */}
        <TabsContent value="photos" className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <button
                  type="button"
                  className="w-full h-32 flex flex-col items-center justify-center gap-2 bg-muted/50 hover:bg-muted transition-colors"
                  onClick={triggerFileInput}
                >
                  <Upload className="h-6 w-6 text-muted-foreground" />
                  <span className="text-sm font-medium">Upload Photo</span>
                </button>
                <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileUpload} />
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <button
                  type="button"
                  className="w-full h-32 flex flex-col items-center justify-center gap-2 bg-muted/50 hover:bg-muted transition-colors"
                >
                  <Camera className="h-6 w-6 text-muted-foreground" />
                  <span className="text-sm font-medium">Take Photo</span>
                </button>
              </CardContent>
            </Card>
          </div>

          {uploadedImage && (
            <div className="space-y-4">
              <div className="relative">
                <Image
                  src={uploadedImage || "/placeholder.svg"}
                  alt="Uploaded image"
                  width={400}
                  height={200}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <div className="absolute bottom-2 right-2 flex gap-2">
                  <Button size="sm" variant="secondary" className="h-8 px-2">
                    <Crop className="h-4 w-4 mr-1" />
                    Crop
                  </Button>
                  <Button size="sm" variant="secondary" className="h-8 px-2">
                    <Palette className="h-4 w-4 mr-1" />
                    Adjust
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="brightness" className="text-sm">
                  Brightness
                </Label>
                <Slider id="brightness" defaultValue={[50]} max={100} step={1} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contrast" className="text-sm">
                  Contrast
                </Label>
                <Slider id="contrast" defaultValue={[50]} max={100} step={1} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="blur" className="text-sm">
                  Text Background Blur
                </Label>
                <Slider id="blur" defaultValue={[30]} max={100} step={1} />
              </div>
            </div>
          )}

          {!uploadedImage && (
            <div className="text-center py-8">
              <FileImage className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-1">No photos yet</h3>
              <p className="text-sm text-muted-foreground mb-4">Upload a photo to use as your event background</p>
              <Button onClick={triggerFileInput}>Upload Photo</Button>
            </div>
          )}
        </TabsContent>

        {/* Design Studio Tab */}
        <TabsContent value="studio" className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center">
              <Wand2 className="h-5 w-5 mr-2 text-primary" />
              <h3 className="font-medium">Magic Background Creator</h3>
            </div>

            <div className="flex gap-2">
              <Input
                placeholder="Describe your perfect background..."
                value={promptInput}
                onChange={(e) => setPromptInput(e.target.value)}
                className="flex-1"
              />
              <Button onClick={() => generateAIBackground(promptInput)} disabled={isGenerating || !promptInput.trim()}>
                {isGenerating ? "Generating..." : "Generate"}
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {DESIGN_PROMPTS.map((prompt) => (
                <Button
                  key={prompt.id}
                  variant="outline"
                  size="sm"
                  className={cn("h-auto py-2 justify-start", selectedPrompt === prompt.name && "border-primary")}
                  onClick={() => {
                    setPromptInput(prompt.name)
                    generateAIBackground(prompt.name)
                  }}
                  disabled={isGenerating}
                >
                  <Sparkles className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                  {prompt.name}
                </Button>
              ))}
            </div>
          </div>

          {isGenerating && (
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center rounded-full bg-primary/10 p-3 mb-4">
                <Sparkles className="h-6 w-6 text-primary animate-pulse" />
              </div>
              <h3 className="text-lg font-medium mb-1">Creating your background</h3>
              <p className="text-sm text-muted-foreground">
                Our AI is designing a unique background based on "{selectedPrompt}"
              </p>
            </div>
          )}

          {generatedBackground && !isGenerating && (
            <div className="space-y-4">
              <div className="relative">
                <div className={cn("h-48 rounded-lg flex items-center justify-center", generatedBackground)}>
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-white drop-shadow-md">{eventTitle}</h3>
                    <p className="text-white/80 drop-shadow-sm">Generated background preview</p>
                  </div>
                </div>

                <div className="absolute bottom-2 right-2 flex gap-2">
                  <Button size="sm" variant="secondary" className="h-8 px-2">
                    <Palette className="h-4 w-4 mr-1" />
                    Customize
                  </Button>
                </div>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => generateAIBackground(selectedPrompt || promptInput)}>
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Try Again
                </Button>
                <Button
                  variant="default"
                  onClick={() => {
                    onChange(generatedBackground)
                    setActiveTab("templates")
                  }}
                >
                  <Check className="h-4 w-4 mr-1" />
                  Use This Background
                </Button>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">More Like This</h3>
                <div className="grid grid-cols-4 gap-2">
                  {BACKGROUND_TEMPLATES.slice(0, 4).map((bg) => (
                    <button
                      key={bg.id}
                      type="button"
                      className={cn("w-full aspect-square rounded-md overflow-hidden", bg.value)}
                      onClick={() => {
                        setGeneratedBackground(bg.value)
                        onChange(bg.value)
                      }}
                      aria-label={bg.name}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
