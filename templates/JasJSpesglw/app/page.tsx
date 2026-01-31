import Link from "next/link"
import { ArrowRight, BarChart3, Repeat, Sparkles, TrendingUp } from "lucide-react"

import { Button } from "@/components/ui/button"
import DemoSection from "@/components/demo-section"
import { GradientBackground } from "@/components/ui/gradient-background"
import { GlassCard } from "@/components/ui/glass-card"
import { SoundWaveAnimation } from "@/components/ui/sound-wave-animation"
import { AudioWaveIcon } from "@/components/ui/audio-wave-icon"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <GradientBackground />
      <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/5 border-b border-white/10">
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <div className="flex gap-6 md:gap-10">
            <Link href="/" className="flex items-center space-x-2">
              <AudioWaveIcon className="h-6 w-6 text-primary" />
              <span className="inline-block font-bold">Wavelength</span>
            </Link>
            <nav className="hidden gap-6 md:flex">
              <Link
                href="#features"
                className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Features
              </Link>
              <Link
                href="#demo"
                className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Demo
              </Link>
              <Link
                href="#pricing"
                className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Pricing
              </Link>
            </nav>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <Button variant="outline" className="hidden sm:flex glass-button">
              Sign In
            </Button>
            <Button className="bg-primary/90 backdrop-blur-sm">Get Started</Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="relative space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32 overflow-hidden">
          <SoundWaveAnimation className="top-1/2 -translate-y-1/2" />
          <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center relative z-10">
            <div className="rounded-full bg-primary/10 backdrop-blur-sm px-4 py-1.5 text-sm font-medium text-primary border border-primary/20">
              Introducing Wavelength
            </div>
            <div className="hero-glow">
              <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl gradient-text">
                AI-Powered Social Media Intelligence
              </h1>
            </div>
            <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8 glass-effect p-4 rounded-lg">
              Get on the same wavelength as your audience with real-time sentiment analysis, platform-specific content
              adaptation, and predictive trend integration.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              <Button size="lg" className="bg-primary/90 backdrop-blur-sm" asChild>
                <Link href="#demo">
                  Try Interactive Demo <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="glass-button" asChild>
                <Link href="#features">Learn More</Link>
              </Button>
            </div>
          </div>
        </section>
        <section id="features" className="container space-y-6 py-8 md:py-12 lg:py-24">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl gradient-text">
              Intelligent Features
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Our AI-powered platform offers three revolutionary capabilities to transform your social media strategy.
            </p>
          </div>
          <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
            <GlassCard className="p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 backdrop-blur-sm">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <div className="space-y-2 pt-6">
                <h3 className="font-bold">Sentiment-Based Scheduling</h3>
                <p className="text-sm text-muted-foreground">
                  Analyze real-time sentiment to automatically adjust content timing and tone based on audience mood.
                </p>
              </div>
            </GlassCard>
            <GlassCard className="p-6" highlight>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 backdrop-blur-sm">
                <Repeat className="h-6 w-6 text-primary" />
              </div>
              <div className="space-y-2 pt-6">
                <h3 className="font-bold">Platform-Specific Adaptation</h3>
                <p className="text-sm text-muted-foreground">
                  Automatically tailor content for each platform's unique style, format, and audience expectations.
                </p>
              </div>
            </GlassCard>
            <GlassCard className="p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 backdrop-blur-sm">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <div className="space-y-2 pt-6">
                <h3 className="font-bold">Predictive Trend Integration</h3>
                <p className="text-sm text-muted-foreground">
                  Identify emerging trends before they peak and generate relevant content ideas to capitalize on them.
                </p>
              </div>
            </GlassCard>
          </div>
        </section>
        <section id="demo" className="container space-y-8 py-12 md:py-16 lg:py-24">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl gradient-text">
              Interactive Demo
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Experience the power of our AI platform with this interactive demonstration.
            </p>
          </div>
          <div className="glass-card p-1">
            <DemoSection />
          </div>
        </section>
        <section id="pricing" className="container space-y-6 py-8 md:py-12 lg:py-24">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl gradient-text">
              Simple, Transparent Pricing
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Choose the plan that's right for your business.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <GlassCard className="p-6">
              <div className="space-y-2">
                <h3 className="font-bold text-xl">Starter</h3>
                <p className="text-muted-foreground">Perfect for small businesses and creators</p>
              </div>
              <div className="mt-4 flex items-baseline text-3xl font-bold">
                $49<span className="ml-1 text-base font-medium text-muted-foreground">/month</span>
              </div>
              <ul className="mt-6 space-y-3">
                <li className="flex items-center">
                  <Sparkles className="mr-2 h-4 w-4 text-primary" />
                  <span>Basic sentiment analysis</span>
                </li>
                <li className="flex items-center">
                  <Sparkles className="mr-2 h-4 w-4 text-primary" />
                  <span>2 social media platforms</span>
                </li>
                <li className="flex items-center">
                  <Sparkles className="mr-2 h-4 w-4 text-primary" />
                  <span>Weekly trend reports</span>
                </li>
              </ul>
              <Button className="mt-8 bg-primary/90 backdrop-blur-sm w-full">Get Started</Button>
            </GlassCard>
            <GlassCard className="p-6 relative" highlight>
              <div className="absolute -top-4 left-0 right-0 mx-auto w-fit rounded-full bg-primary/80 backdrop-blur-sm px-3 py-1 text-xs font-semibold text-primary-foreground">
                Popular
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-xl">Professional</h3>
                <p className="text-muted-foreground">For growing businesses and marketing teams</p>
              </div>
              <div className="mt-4 flex items-baseline text-3xl font-bold">
                $99<span className="ml-1 text-base font-medium text-muted-foreground">/month</span>
              </div>
              <ul className="mt-6 space-y-3">
                <li className="flex items-center">
                  <Sparkles className="mr-2 h-4 w-4 text-primary" />
                  <span>Advanced sentiment analysis</span>
                </li>
                <li className="flex items-center">
                  <Sparkles className="mr-2 h-4 w-4 text-primary" />
                  <span>5 social media platforms</span>
                </li>
                <li className="flex items-center">
                  <Sparkles className="mr-2 h-4 w-4 text-primary" />
                  <span>Daily trend reports</span>
                </li>
                <li className="flex items-center">
                  <Sparkles className="mr-2 h-4 w-4 text-primary" />
                  <span>Content adaptation</span>
                </li>
              </ul>
              <Button className="mt-8 bg-primary/90 backdrop-blur-sm w-full">Get Started</Button>
            </GlassCard>
            <GlassCard className="p-6">
              <div className="space-y-2">
                <h3 className="font-bold text-xl">Enterprise</h3>
                <p className="text-muted-foreground">For large organizations and agencies</p>
              </div>
              <div className="mt-4 flex items-baseline text-3xl font-bold">
                $249<span className="ml-1 text-base font-medium text-muted-foreground">/month</span>
              </div>
              <ul className="mt-6 space-y-3">
                <li className="flex items-center">
                  <Sparkles className="mr-2 h-4 w-4 text-primary" />
                  <span>Real-time sentiment analysis</span>
                </li>
                <li className="flex items-center">
                  <Sparkles className="mr-2 h-4 w-4 text-primary" />
                  <span>Unlimited social platforms</span>
                </li>
                <li className="flex items-center">
                  <Sparkles className="mr-2 h-4 w-4 text-primary" />
                  <span>Real-time trend detection</span>
                </li>
                <li className="flex items-center">
                  <Sparkles className="mr-2 h-4 w-4 text-primary" />
                  <span>Advanced content adaptation</span>
                </li>
                <li className="flex items-center">
                  <Sparkles className="mr-2 h-4 w-4 text-primary" />
                  <span>Custom integrations</span>
                </li>
              </ul>
              <Button className="mt-8 bg-primary/90 backdrop-blur-sm w-full">Contact Sales</Button>
            </GlassCard>
          </div>
        </section>
        <section className="container py-8 md:py-12 lg:py-24">
          <GlassCard className="mx-auto max-w-[58rem] p-8" highlight>
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              <div className="max-w-[32rem] space-y-2">
                <h2 className="text-3xl font-bold tracking-tight gradient-text">
                  Ready to transform your social media strategy?
                </h2>
                <p className="text-muted-foreground">
                  Get started with Wavelength today and see the difference AI can make for your brand.
                </p>
              </div>
              <Button size="lg" className="shrink-0 bg-primary/90 backdrop-blur-sm">
                Get Started
              </Button>
            </div>
          </GlassCard>
        </section>
      </main>
      <footer className="border-t border-white/10 py-6 md:py-0 backdrop-blur-md bg-white/5">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
            <AudioWaveIcon className="h-6 w-6 text-primary" />
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
              &copy; {new Date().getFullYear()} Wavelength. All rights reserved.
            </p>
          </div>
          <div className="flex gap-4">
            <Link href="#" className="text-sm text-muted-foreground underline underline-offset-4">
              Terms
            </Link>
            <Link href="#" className="text-sm text-muted-foreground underline underline-offset-4">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
