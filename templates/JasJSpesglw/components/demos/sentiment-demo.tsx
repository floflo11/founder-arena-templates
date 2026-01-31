"use client"

import { useState, useEffect } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { AlertCircle, CheckCircle, Clock, PauseCircle, PlayCircle } from "lucide-react"
import { XIcon } from "@/components/ui/x-icon"
import { Badge } from "@/components/ui/badge"

// Mock data for sentiment analysis
const initialSentimentData = [
  { time: "9:00 AM", positive: 65, neutral: 25, negative: 10 },
  { time: "10:00 AM", positive: 60, neutral: 30, negative: 10 },
  { time: "11:00 AM", positive: 55, neutral: 30, negative: 15 },
  { time: "12:00 PM", positive: 50, neutral: 30, negative: 20 },
  { time: "1:00 PM", positive: 45, neutral: 30, negative: 25 },
  { time: "2:00 PM", positive: 40, neutral: 30, negative: 30 },
]

// Mock scheduled posts
const initialScheduledPosts = [
  {
    id: 1,
    time: "2:30 PM",
    content: "Excited to announce our new product line! #innovation",
    status: "scheduled",
    platform: "x",
  },
  {
    id: 2,
    time: "3:15 PM",
    content: "Check out our latest blog post on industry trends",
    status: "scheduled",
    platform: "linkedin",
  },
  {
    id: 3,
    time: "4:00 PM",
    content: "Flash sale! 24 hours only - 30% off everything",
    status: "scheduled",
    platform: "instagram",
  },
]

export default function SentimentDemo() {
  const [sentimentData, setSentimentData] = useState(initialSentimentData)
  const [scheduledPosts, setScheduledPosts] = useState(initialScheduledPosts)
  const [autoAdjust, setAutoAdjust] = useState(true)
  const [sentimentThreshold, setSentimentThreshold] = useState(25)
  const [isSimulating, setIsSimulating] = useState(false)
  const [currentTime, setCurrentTime] = useState("2:00 PM")

  // Simulate sentiment change
  useEffect(() => {
    if (!isSimulating) return

    const interval = setInterval(() => {
      // Update current time
      setCurrentTime((prevTime) => {
        const hour = Number.parseInt(prevTime.split(":")[0])
        const isPM = prevTime.includes("PM")
        let newHour = hour

        if (hour === 12 && !isPM) {
          return "1:00 PM"
        } else if (hour === 12 && isPM) {
          return "1:00 AM"
        } else if (hour === 11 && isPM) {
          return "12:00 AM"
        } else if (hour === 11 && !isPM) {
          return "12:00 PM"
        } else {
          newHour = hour + 1
          return `${newHour}:00 ${isPM ? "PM" : "AM"}`
        }
      })

      // Update sentiment data
      setSentimentData((prevData) => {
        const newData = [...prevData]
        const lastEntry = newData[newData.length - 1]

        // Simulate a negative sentiment spike
        const newEntry = {
          time: currentTime,
          positive: Math.max(30, lastEntry.positive - 10),
          neutral: lastEntry.neutral,
          negative: Math.min(60, lastEntry.negative + 10),
        }

        return [...newData.slice(1), newEntry]
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [isSimulating, currentTime])

  // Auto-adjust scheduled posts based on sentiment
  useEffect(() => {
    if (!autoAdjust) return

    const latestSentiment = sentimentData[sentimentData.length - 1]

    if (latestSentiment.negative > sentimentThreshold) {
      setScheduledPosts((prevPosts) => {
        return prevPosts.map((post) => {
          // Pause promotional posts
          if (post.content.includes("sale") || post.content.includes("announce")) {
            return { ...post, status: "paused", reason: "High negative sentiment detected" }
          }
          return post
        })
      })
    }
  }, [sentimentData, autoAdjust, sentimentThreshold])

  const toggleSimulation = () => {
    setIsSimulating(!isSimulating)
  }

  const resetDemo = () => {
    setSentimentData(initialSentimentData)
    setScheduledPosts(initialScheduledPosts)
    setCurrentTime("2:00 PM")
    setIsSimulating(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Sentiment Analysis Dashboard</CardTitle>
            <CardDescription>Real-time sentiment tracking across social platforms</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sentimentData} stackOffset="expand" barSize={20}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis tickFormatter={(tick) => `${tick}%`} />
                  <Tooltip formatter={(value) => `${value}%`} />
                  <Bar dataKey="positive" name="Positive" fill="#10b981" />
                  <Bar dataKey="neutral" name="Neutral" fill="#6b7280" />
                  <Bar dataKey="negative" name="Negative" fill="#ef4444" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>Current Time: {currentTime}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={toggleSimulation} className="flex items-center gap-1">
                  {isSimulating ? (
                    <>
                      <PauseCircle className="h-4 w-4" /> Pause
                    </>
                  ) : (
                    <>
                      <PlayCircle className="h-4 w-4" /> Simulate
                    </>
                  )}
                </Button>
                <Button variant="outline" size="sm" onClick={resetDemo}>
                  Reset
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Scheduled Content</CardTitle>
            <CardDescription>Posts scheduled for publication</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {scheduledPosts.map((post) => (
                <div key={post.id} className="rounded-lg border p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={
                          post.platform === "x" ? "default" : post.platform === "linkedin" ? "secondary" : "outline"
                        }
                      >
                        {post.platform === "x" ? <XIcon className="h-3 w-3" /> : post.platform}
                      </Badge>
                      <span className="text-sm font-medium">{post.time}</span>
                    </div>
                    <Badge variant={post.status === "scheduled" ? "success" : "destructive"}>
                      {post.status === "scheduled" ? (
                        <div className="flex items-center gap-1">
                          <CheckCircle className="h-3 w-3" />
                          <span>Scheduled</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1">
                          <PauseCircle className="h-3 w-3" />
                          <span>Paused</span>
                        </div>
                      )}
                    </Badge>
                  </div>
                  <p className="mt-2 text-sm">{post.content}</p>
                  {post.reason && (
                    <div className="mt-2 flex items-center gap-1 text-xs text-red-500">
                      <AlertCircle className="h-3 w-3" />
                      <span>{post.reason}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Settings</CardTitle>
            <CardDescription>Configure sentiment-based adjustments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="auto-adjust">Auto-adjust content</Label>
                  <Switch id="auto-adjust" checked={autoAdjust} onCheckedChange={setAutoAdjust} />
                </div>
                <p className="text-xs text-muted-foreground">
                  Automatically adjust scheduled content based on sentiment analysis
                </p>
              </div>

              <div className="space-y-2">
                <Label>Negative sentiment threshold ({sentimentThreshold}%)</Label>
                <Slider
                  value={[sentimentThreshold]}
                  min={10}
                  max={50}
                  step={5}
                  onValueChange={(value) => setSentimentThreshold(value[0])}
                />
                <p className="text-xs text-muted-foreground">
                  Pause promotional content when negative sentiment exceeds this threshold
                </p>
              </div>

              <div className="rounded-md bg-muted p-3">
                <h4 className="font-medium">How it works</h4>
                <p className="mt-1 text-xs text-muted-foreground">
                  The system monitors sentiment in real-time and automatically adjusts your content schedule when
                  negative sentiment rises above your threshold. Wavelength keeps you in tune with your audience.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
