"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import SentimentDemo from "@/components/demos/sentiment-demo"
import AdaptationDemo from "@/components/demos/adaptation-demo"
import TrendDemo from "@/components/demos/trend-demo"

export default function DemoSection() {
  return (
    <div className="w-full max-w-5xl mx-auto border rounded-lg shadow-sm overflow-hidden">
      <Tabs defaultValue="sentiment" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="sentiment">Sentiment Analysis</TabsTrigger>
          <TabsTrigger value="adaptation">Content Adaptation</TabsTrigger>
          <TabsTrigger value="trends">Trend Prediction</TabsTrigger>
        </TabsList>
        <TabsContent value="sentiment" className="p-4">
          <SentimentDemo />
        </TabsContent>
        <TabsContent value="adaptation" className="p-4">
          <AdaptationDemo />
        </TabsContent>
        <TabsContent value="trends" className="p-4">
          <TrendDemo />
        </TabsContent>
      </Tabs>
    </div>
  )
}
