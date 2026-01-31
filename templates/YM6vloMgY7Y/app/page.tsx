import { Header } from '@/components/header'
import { Hero } from '@/components/hero'
import { Portfolio } from '@/components/portfolio'
import { Expertise } from '@/components/expertise'
import { Team } from '@/components/team'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Portfolio />
      <Expertise />
      <Team />
      <Footer />
    </main>
  )
}
