"use client"

import { useLanguage } from "@/contexts/language-context"
import Image from "next/image"
import { useEffect, useState } from "react"

interface PortfolioItem {
  id: string
  title: string
  image: string
  link: string
  delay: number
}

const productDesignItems: PortfolioItem[] = [
  {
    id: "trebly",
    title: "Trebly",
    image: "/images/portfolio/treblyportada.png",
    link: "https://medium.com/@infoarturogrande/trebly-redefining-lotteries-with-no-losses-27bfad6506ec",
    delay: 0,
  },
  {
    id: "ownomad",
    title: "OwnNomad",
    image: "/images/portfolio/ownomad-portada.png",
    link: "https://medium.com/@infoarturogrande/building-the-future-of-real-estate-through-tokenization-c50823f2fe01",
    delay: 100,
  },
  {
    id: "betrusty",
    title: "BeTrusty",
    image: "/images/portfolio/betrustyportada.png",
    link: "https://medium.com/@infoarturogrande/how-betrusty-transforms-property-rentals-3503ddcb8e9c",
    delay: 200,
  },
  {
    id: "refillit",
    title: "Refill It",
    image: "/images/portfolio/refillitportada.png",
    link: "https://medium.com/@infoarturogrande/refill-it-fighting-plastic-waste-with-blockchain-and-incentives-f2b4fd16170d",
    delay: 300,
  },
  {
    id: "siwa",
    title: "SIWA",
    image: "/images/portfolio/siwaportada.png",
    link: "https://medium.com/@infoarturogrande/bridging-education-and-web3-siwas-gamified-path-to-growth-29defd9ec79e",
    delay: 150,
  },
  {
    id: "wodpay",
    title: "WodPay",
    image: "/images/portfolio/wordpayportada.png",
    link: "https://medium.com/@infoarturogrande/wodpay-simplifying-finances-for-fitness-coaches-747a434db841",
    delay: 250,
  },
  {
    id: "yellowcash",
    title: "YellowCash",
    image: "/images/portfolio/yellowcashportada.png",
    link: "https://medium.com/@infoarturogrande/yellowcash-empowering-international-students-with-easy-transfers-3dee01ab8206",
    delay: 350,
  },
  {
    id: "eluter",
    title: "Eluter",
    image: "/images/portfolio/eluterportada.png",
    link: "https://medium.com/@infoarturogrande/eluter-powering-global-payments-for-latin-american-businesses-405c32462b8e",
    delay: 400,
  },
  {
    id: "provacy",
    title: "Provacy",
    image: "/images/portfolio/provacyportada.png",
    link: "https://medium.com/@infoarturogrande/provacy-reinventing-insurance-with-blockchain-and-ai-aab41a3ee81c",
    delay: 450,
  },
  {
    id: "petfundme",
    title: "PetFundMe",
    image: "/images/portfolio/petfundmeportada.png",
    link: "https://medium.com/@infoarturogrande/how-petfundme-supports-ngos-and-pets-in-need-df501357ea86",
    delay: 500,
  },
  {
    id: "prutopia",
    title: "Prutopia",
    image: "/images/portfolio/prutopiaportada.png",
    link: "https://medium.com/@infoarturogrande/prutopia-building-the-new-internet-cv-310620e21198",
    delay: 550,
  },
  {
    id: "glocal",
    title: "Glocal",
    image: "/images/portfolio/glocalportada.png",
    link: "https://medium.com/@infoarturogrande/from-complexity-to-clarity-how-glocal-transforms-grant-access-89c74589e172",
    delay: 600,
  },
  {
    id: "baia",
    title: "BAIA",
    image: "/images/portfolio/baiaportada.png",
    link: "https://medium.com/@infoarturogrande/about-baia-is-a-decentralized-platform-designed-to-provide-fast-transparent-and-direct-5c2738a394e7",
    delay: 650,
  },
  {
    id: "juntadas",
    title: "Juntadas",
    image: "/images/portfolio/juntadas.png",
    link: "https://medium.com/@infoarturogrande/from-strangers-to-community-on-chain-dinners-for-real-connections-db61a85a12b0",
    delay: 700,
  },
]

const marketingItems: PortfolioItem[] = [
  {
    id: "c2t",
    title: "Car2token",
    image: "/images/portfolio/c2tportada.png",
    link: "https://medium.com/@infoarturogrande/car2token-turning-cars-into-collateral-with-blockchain-1ad339c1ca3a",
    delay: 0,
  },
  {
    id: "snet",
    title: "SingularityNET",
    image: "/images/portfolio/snetportada.png",
    link: "https://medium.com/@infoarturogrande/singularitynet-is-a-groundbreaking-decentralized-platform-that-democratizes-access-to-artificial-33661b414796",
    delay: 100,
  },
  {
    id: "blockhouse",
    title: "Blockhouse",
    image: "/images/portfolio/blockhouseportada.png",
    link: "https://medium.com/@infoarturogrande/refi-day-bringing-regenerative-finance-to-argentina-cc872a767e87",
    delay: 200,
  },
  {
    id: "saiaconf",
    title: "SAIAConf",
    image: "/images/portfolio/saiaconfportada.png",
    link: "https://medium.com/@infoarturogrande/from-meetups-to-saiaconf-the-rise-of-argentinas-ai-community-ef8b93e4a66f",
    delay: 300,
  },
  {
    id: "nerdconf",
    title: "NerdConf",
    image: "/images/portfolio/nerdconfportada.png",
    link: "https://medium.com/@infoarturogrande/nerdconf-building-a-cross-disciplinary-tech-community-in-latam-d250f70cf177",
    delay: 400,
  },
  {
    id: "web3makers",
    title: "Web3Makers",
    image: "/images/portfolio/web3makersportada.png",
    link: "https://medium.com/@infoarturogrande/decentralizing-tech-communities-beyond-capital-cities-7da98d168847",
    delay: 500,
  },
]

export default function PortfolioSection() {
  const { t } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)
  const [activeCategory, setActiveCategory] = useState<"product" | "marketing">("product")

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const currentItems = activeCategory === "product" ? productDesignItems : marketingItems

  return (
    <section
      id="portfolio"
      className="py-16 md:py-24 bg-gradient-to-b from-black to-gray-900/80 relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 animate-fadeInUp">Portfolio</h2>
          <p
            className="text-lg md:text-xl text-white/75 max-w-3xl mx-auto animate-fadeInUp mb-8"
            style={{ animationDelay: "0.2s" }}
          >
            {t("portfolio.subtitle")}
          </p>

          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={() => setActiveCategory("product")}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                activeCategory === "product"
                  ? "bg-blue-500 text-white shadow-lg shadow-blue-500/25"
                  : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
              }`}
            >
              🎨 Product Design
            </button>
            <button
              onClick={() => setActiveCategory("marketing")}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                activeCategory === "marketing"
                  ? "bg-blue-500 text-white shadow-lg shadow-blue-500/25"
                  : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
              }`}
            >
              🤝 Marketing & Community Building
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto">
          {currentItems.map((item, index) => (
            <a
              key={item.id}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`group block relative overflow-hidden rounded-xl transform transition-all duration-700 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{
                transitionDelay: `${item.delay}ms`,
              }}
            >
              <div className="glass relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/30 aspect-[4/3] rounded-xl">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={`${item.title} case study - Artu Grande UX design portfolio Web3 fintech`}
                  fill
                  className="object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />

                <div className="absolute inset-0 flex flex-col justify-end p-3 md:p-4 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <h3 className="text-white font-bold text-sm md:text-base mb-1">{item.title}</h3>
                  <p className="text-white/90 text-xs md:text-sm font-medium">View Case Study →</p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
