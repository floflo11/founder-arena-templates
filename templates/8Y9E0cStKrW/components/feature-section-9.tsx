"use client"

import { Rotate3d, ArrowLeftRight, Database, Combine } from "lucide-react"

const features = [
  {
    icon: Rotate3d,
    title: "Workflow automation",
    description: "Eliminate repetitive tasks and save time with customizable automation.",
  },
  {
    icon: ArrowLeftRight,
    title: "Real-time collaboration",
    description: "Keep your team in sync with shared boards and instant updates.",
  },
  {
    icon: Database,
    title: "Data-driven insights",
    description: "Track progress and measure success with advanced analytics.",
  },
  {
    icon: Combine,
    title: "Easy integration",
    description: "Connect seamlessly with tools like Slack, Google Workspace, and Trello.",
  },
]

export function FeatureSection9() {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="container mx-auto px-6 flex flex-col gap-12 md:gap-16">
        <div className="flex flex-col gap-4 md:gap-5 max-w-xl mx-auto text-center">
          <p className="text-sm md:text-base font-semibold text-muted-foreground">Features</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Why choose Flowly?</h2>
          <p className="text-base text-muted-foreground">
            Transform the way your team works with these powerful features:
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div key={index} className="flex flex-col gap-5 items-center text-center">
                <div className="flex justify-center items-center w-10 h-10 shrink-0 rounded-md bg-background border shadow-sm">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="font-semibold text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
