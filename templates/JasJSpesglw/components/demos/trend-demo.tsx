"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { ArrowUpRight, Lightbulb, RefreshCw, TrendingUp } from "lucide-react"
import { XIcon } from "@/components/ui/x-icon"

// Mock trend data
const initialTrendData = [
  { name: "Jan 1", "AI Ethics": 10, "Sustainable Tech": 20, "Remote Work": 30 },
  { name: "Jan 2", "AI Ethics": 15, "Sustainable Tech": 25, "Remote Work": 35 },
  { name: "Jan 3", "AI Ethics": 20, "Sustainable Tech": 30, "Remote Work": 40 },
  { name: "Jan 4", "AI Ethics": 25, "Sustainable Tech": 35, "Remote Work": 45 },
  { name: "Jan 5", "AI Ethics": 30, "Sustainable Tech": 40, "Remote Work": 50 },
  { name: "Jan 6", "AI Ethics": 35, "Sustainable Tech": 45, "Remote Work": 55 },
  { name: "Jan 7", "AI Ethics": 40, "Sustainable Tech": 50, "Remote Work": 60 },
]

// Mock content ideas
const contentIdeas = [
  {
    trend: "AI Ethics",
    title: "5 Ethical Considerations for AI Implementation",
    description: "Explore the key ethical considerations businesses should make when implementing AI solutions.",
    engagement: "High",
    platforms: ["LinkedIn", "X"],
  },
  {
    trend: "Sustainable Tech",
    title: "How Green Technology is Reshaping Business Operations",
    description:
      "Discover how sustainable technology is helping businesses reduce their carbon footprint while improving efficiency.",
    engagement: "Medium",
    platforms: ["LinkedIn", "Instagram"],
  },
  {
    trend: "Remote Work",
    title: "The Future of Remote Work: Trends to Watch in 2023",
    description: "Analyze the evolving landscape of remote work and what it means for businesses and employees.",
    engagement: "Very High",
    platforms: ["X", "LinkedIn", "Instagram"],
  },
]

export default function TrendDemo() {
  const [trendData, setTrendData] = useState(initialTrendData)
  const [selectedTrend, setSelectedTrend] = useState("AI Ethics")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showPrediction, setShowPrediction] = useState(false)
  const [ideas, setIdeas] = useState<typeof contentIdeas>([])

  const handleAnalyzeTrends = () => {
    setIsAnalyzing(true)

    // Simulate API call delay
    setTimeout(() => {
      // Add prediction data points
      const extendedData = [...trendData]
      const lastEntry = trendData[trendData.length - 1]

      // Add predicted data points
      extendedData.push({
        name: "Jan 8 (Predicted)",
        "AI Ethics": 50,
        "Sustainable Tech": 55,
        "Remote Work": 65,
      })
      extendedData.push({
        name: "Jan 9 (Predicted)",
        "AI Ethics": 65,
        "Sustainable Tech": 60,
        "Remote Work": 70,
      })
      extendedData.push({
        name: "Jan 10 (Predicted)",
        "AI Ethics": 85,
        "Sustainable Tech": 65,
        "Remote Work": 75,
      })

      setTrendData(extendedData)
      setShowPrediction(true)
      setIdeas(contentIdeas)
      setIsAnalyzing(false)
    }, 2000)
  }

  const handleReset = () => {
    setTrendData(initialTrendData)
    setShowPrediction(false)
    setIdeas([])
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Trend Analysis & Prediction</CardTitle>
          <CardDescription>Identify emerging trends and predict their trajectory</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="AI Ethics" stroke="#8884d8" strokeWidth={2} activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="Sustainable Tech" stroke="#82ca9d" strokeWidth={2} />
                <Line type="monotone" dataKey="Remote Work" stroke="#ffc658" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <Button variant="outline" onClick={handleReset} disabled={isAnalyzing}>
              Reset
            </Button>
            <Button onClick={handleAnalyzeTrends} disabled={isAnalyzing} className="flex items-center gap-2">
              {isAnalyzing ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <TrendingUp className="h-4 w-4" />
                  {showPrediction ? "Refresh Analysis" : "Predict Trends"}
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Trending Topics</CardTitle>
            <CardDescription>Topics gaining momentum across social platforms</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div
                className={`cursor-pointer rounded-lg border p-4 ${selectedTrend === "AI Ethics" ? "border-primary bg-primary/5" : ""}`}
                onClick={() => setSelectedTrend("AI Ethics")}
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">AI Ethics</h3>
                  <Badge className="bg-purple-100 text-purple-800">
                    <ArrowUpRight className="mr-1 h-3 w-3" />
                    +112%
                  </Badge>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  Discussions about ethical implications of AI in business
                </p>
              </div>

              <div
                className={`cursor-pointer rounded-lg border p-4 ${selectedTrend === "Sustainable Tech" ? "border-primary bg-primary/5" : ""}`}
                onClick={() => setSelectedTrend("Sustainable Tech")}
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Sustainable Tech</h3>
                  <Badge className="bg-green-100 text-green-800">
                    <ArrowUpRight className="mr-1 h-3 w-3" />
                    +87%
                  </Badge>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  Green technology and sustainable business practices
                </p>
              </div>

              <div
                className={`cursor-pointer rounded-lg border p-4 ${selectedTrend === "Remote Work" ? "border-primary bg-primary/5" : ""}`}
                onClick={() => setSelectedTrend("Remote Work")}
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Remote Work</h3>
                  <Badge className="bg-yellow-100 text-yellow-800">
                    <ArrowUpRight className="mr-1 h-3 w-3" />
                    +150%
                  </Badge>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">Future of work and remote collaboration tools</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Content Ideas</CardTitle>
            <CardDescription>AI-generated content suggestions based on trending topics</CardDescription>
          </CardHeader>
          <CardContent>
            {ideas.length > 0 ? (
              <div className="space-y-4">
                {ideas
                  .filter((idea) => idea.trend === selectedTrend)
                  .map((idea, index) => (
                    <div key={index} className="rounded-lg border p-4">
                      <div className="flex items-center gap-2">
                        <Lightbulb className="h-5 w-5 text-yellow-500" />
                        <h3 className="font-medium">{idea.title}</h3>
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">{idea.description}</p>
                      <div className="mt-3 flex flex-wrap items-center gap-2">
                        <Badge variant="outline" className="bg-blue-50">
                          Predicted Engagement: {idea.engagement}
                        </Badge>
                        {idea.platforms.map((platform) => (
                          <Badge key={platform} variant="outline" className="bg-gray-50">
                            {platform === "X" ? <XIcon className="h-3 w-3" /> : platform}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
                <Lightbulb className="h-12 w-12 text-yellow-500 mb-4 opacity-20" />
                <p>Click "Predict Trends" to see how Wavelength generates content ideas based on emerging trends</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
