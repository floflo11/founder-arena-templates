"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Instagram, Linkedin, RefreshCw, CheckCircle2 } from "lucide-react"
import { XIcon } from "@/components/ui/x-icon"
import Image from "next/image"

const platformStyles = {
  x: {
    icon: XIcon,
    color: "text-gray-800",
    bgColor: "bg-gray-50",
    name: "X",
  },
  instagram: {
    icon: Instagram,
    color: "text-pink-500",
    bgColor: "bg-pink-50",
    name: "Instagram",
  },
  linkedin: {
    icon: Linkedin,
    color: "text-blue-700",
    bgColor: "bg-blue-50",
    name: "LinkedIn",
  },
}

export default function AdaptationDemo() {
  const [baseContent, setBaseContent] = useState(
    "We're excited to announce our new AI-powered analytics dashboard that helps businesses make better decisions.",
  )
  const [isGenerating, setIsGenerating] = useState(false)
  const [adaptedContent, setAdaptedContent] = useState({
    x: "",
    instagram: "",
    linkedin: "",
  })

  const handleGenerate = () => {
    setIsGenerating(true)

    // Simulate API call delay
    setTimeout(() => {
      setAdaptedContent({
        x: "🚀 Just launched! Our new #AI analytics dashboard is here to transform your business decisions. Check it out! #DataAnalytics #BusinessIntelligence",
        instagram:
          "✨ Introducing our new AI-powered analytics dashboard! ✨\n\nTransform how you make business decisions with real-time insights and beautiful visualizations.\n\n#AIAnalytics #DataVisualization #BusinessIntelligence #TechInnovation #DataDriven",
        linkedin:
          "Proud to announce the launch of our new AI-powered Analytics Dashboard!\n\nIn today's data-driven world, businesses need more than just numbers—they need actionable insights. Our new dashboard leverages cutting-edge AI to:\n\n✅ Identify patterns in complex datasets\n✅ Provide predictive analytics for informed decision-making\n✅ Deliver customized reports tailored to your business needs\n\nInterested in seeing how it can transform your business operations? Let's connect.",
      })
      setIsGenerating(false)
    }, 1500)
  }

  const handleReset = () => {
    setBaseContent(
      "We're excited to announce our new AI-powered analytics dashboard that helps businesses make better decisions.",
    )
    setAdaptedContent({
      x: "",
      instagram: "",
      linkedin: "",
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Content Adaptation</CardTitle>
          <CardDescription>
            Enter your base content and Wavelength will adapt it for different platforms
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Base Content</h3>
              <Textarea
                placeholder="Enter your content here..."
                value={baseContent}
                onChange={(e) => setBaseContent(e.target.value)}
                rows={4}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={handleReset}>
                Reset
              </Button>
              <Button
                onClick={handleGenerate}
                disabled={isGenerating || !baseContent.trim()}
                className="flex items-center gap-2"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    Adapting...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="h-4 w-4" />
                    Adapt Content
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="x">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="x" className="flex items-center gap-2">
            <XIcon className="h-4 w-4" />X
          </TabsTrigger>
          <TabsTrigger value="instagram" className="flex items-center gap-2">
            <Instagram className="h-4 w-4" />
            Instagram
          </TabsTrigger>
          <TabsTrigger value="linkedin" className="flex items-center gap-2">
            <Linkedin className="h-4 w-4" />
            LinkedIn
          </TabsTrigger>
        </TabsList>

        {Object.entries(platformStyles).map(([platform, style]) => {
          const Icon = style.icon
          return (
            <TabsContent key={platform} value={platform}>
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Icon className={`h-5 w-5 ${style.color}`} />
                      {style.name} Adaptation
                    </CardTitle>
                    <Badge className={`${style.bgColor} ${style.color}`}>Platform Optimized</Badge>
                  </div>
                  <CardDescription>
                    Content tailored specifically for {style.name}'s audience and format
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {adaptedContent[platform as keyof typeof adaptedContent] ? (
                    <div className="rounded-lg border p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                          <Icon className={`h-6 w-6 ${style.color}`} />
                        </div>
                        <div>
                          <p className="font-medium text-sm">Your Brand</p>
                          <p className="text-xs text-muted-foreground">Just now</p>
                        </div>
                      </div>
                      <p className="whitespace-pre-line">{adaptedContent[platform as keyof typeof adaptedContent]}</p>
                      {platform === "instagram" && (
                        <div className="mt-4 aspect-square max-h-[200px] rounded-lg bg-gray-100 flex items-center justify-center">
                          <Image
                            src="/placeholder.svg?height=200&width=200"
                            alt="Instagram post"
                            width={200}
                            height={200}
                            className="rounded-lg"
                          />
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
                      <Icon className={`h-12 w-12 ${style.color} mb-4 opacity-20`} />
                      <p>Enter your base content and click "Adapt Content" to see the {style.name} adaptation</p>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between text-xs text-muted-foreground">
                  <div>
                    {adaptedContent[platform as keyof typeof adaptedContent] && (
                      <p>AI optimized for {style.name}'s unique format and audience expectations</p>
                    )}
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
          )
        })}
      </Tabs>
    </div>
  )
}
