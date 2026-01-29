"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Check, Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"

const pricingData = {
  plans: [
    {
      name: "Starter",
      description: "For individuals or small teams getting started.",
      features: [
        {
          name: "Basic task management",
          tooltip: "Essential task management features to get you started",
        },
        {
          name: "1 automation per workflow",
          tooltip: "Automate one repetitive task in each workflow",
        },
        {
          name: "5GB storage",
          tooltip: "Store your files and documents securely",
        },
      ],
      pricing: {
        monthly: 0,
        annually: 0,
      },
      variant: "secondary",
    },
    {
      name: "Pro",
      description: "For growing teams ready to scale their business.",
      badge: "Most popular",
      features: [
        {
          name: "Unlimited boards",
          tooltip: "Create as many boards as you need",
        },
        {
          name: "Advanced automation",
          tooltip: "Powerful automation capabilities for complex workflows",
        },
        {
          name: "50GB storage",
          tooltip: "Expanded storage for growing teams",
        },
        {
          name: "Integrations",
          tooltip: "Connect with your favorite tools",
        },
      ],
      pricing: {
        monthly: 29,
        annually: 290,
      },
      variant: "default",
    },
    {
      name: "Enterprise",
      description: "For large organizations with custom needs.",
      features: [
        {
          name: "Dedicated support",
          tooltip: "Priority support with dedicated account manager",
        },
        {
          name: "Custom workflows",
          tooltip: "Build custom workflows tailored to your needs",
        },
        {
          name: "150GB storage",
          tooltip: "Enterprise-grade storage solution",
        },
        {
          name: "Advanced security",
          tooltip: "Enhanced security features and controls",
        },
      ],
      pricing: {
        monthly: 129,
        annually: 1290,
      },
      variant: "secondary",
    },
  ],
}

export function PricingSection4() {
  const [billingPeriod, setBillingPeriod] = React.useState("monthly")

  return (
    <section className="py-16 md:py-24 pattern-1 bg-muted" aria-labelledby="pricing-section-title-4">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center gap-8">
          <div className="flex flex-col items-center gap-4 md:gap-5 max-w-xl text-center">
            <p className="text-base font-semibold text-muted-foreground">Pricing</p>
            <h2 id="pricing-section-title-4" className="text-3xl md:text-4xl font-bold">
              Simple, transparent pricing
            </h2>
            <p className="text-base text-muted-foreground">Choose a plan that fits your team's needs.</p>
          </div>

          <Tabs value={billingPeriod} onValueChange={setBillingPeriod} className="w-fit">
            <TabsList className="bg-black/30 h-10 p-1 rounded-[40px]">
              <TabsTrigger
                value="monthly"
                className="rounded-full px-3 py-1.5 data-[state=active]:bg-background data-[state=active]:shadow-sm"
              >
                Monthly
              </TabsTrigger>
              <TabsTrigger
                value="annually"
                className="rounded-full px-3 py-1.5 data-[state=active]:bg-background data-[state=active]:shadow-sm"
              >
                Annually
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex flex-col lg:flex-row gap-6 lg:max-w-5xl w-full mx-auto">
            {pricingData.plans.map((plan, index) => (
              <Card key={plan.name} className={`p-8 space-y-8 ${index === 2 ? "bg-foreground text-background" : ""}`}>
                <div className="space-y-6">
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold leading-7">{plan.name}</h3>
                    <p className={`text-sm leading-5 ${index === 2 ? "opacity-70" : "text-muted-foreground"}`}>
                      {plan.description}
                    </p>
                  </div>

                  <div className="flex items-end gap-0.5">
                    <span className="text-4xl font-semibold leading-10">
                      ${billingPeriod === "monthly" ? plan.pricing.monthly : plan.pricing.annually}
                    </span>
                    <span className={`text-base leading-6 ${index === 2 ? "opacity-70" : "text-muted-foreground"}`}>
                      {plan.pricing.monthly === 0 ? "" : `/${billingPeriod === "monthly" ? "month" : "year"}`}
                    </span>
                  </div>

                  <Button variant={index === 2 ? "secondary" : "default"} className="w-full">
                    {plan.pricing.monthly === 0 ? "Start for free" : "Get started"}
                  </Button>
                </div>

                <div className="space-y-4">
                  <p className="text-sm font-medium">
                    {index === 0 ? "What's included:" : `Everything in ${pricingData.plans[index - 1].name}, plus:`}
                  </p>
                  <div className="flex flex-col gap-4">
                    {plan.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <Check className={`h-5 w-5 ${index === 2 ? "" : "text-primary"}`} />
                        <span className={`text-sm flex-1 ${index === 2 ? "opacity-70" : "text-muted-foreground"}`}>
                          {feature.name}
                        </span>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <Info
                                className={`h-4 w-4 ${index === 2 ? "opacity-40" : "text-muted-foreground opacity-70"}`}
                              />
                            </TooltipTrigger>
                            <TooltipContent className="max-w-xs">
                              <p>{feature.tooltip}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
