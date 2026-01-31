"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "en" | "es"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations = {
  en: {
    // Navbar
    "nav.home": "Home",
    "nav.about": "Bio",
    "nav.portfolio": "Portfolio",
    "nav.podcast": "Podcast",
    "nav.articles": "Articles",
    "nav.talks": "Talks",
    "nav.streaming": "Streaming",
    "nav.celo": "Celo",
    "nav.contact": "Contact",

    // Hero Section
    "hero.greeting": "Welcome to my **personal portfolio**",
    "hero.title": "I vibecode and scale products people love",
    "hero.card1": "Expert in scalable product design & marketing.",
    "hero.card2": "Passionate about Web3, AI, and sustainability.",
    "hero.card3": "Remote work across 15+ countries as a digital nomad.",
    "hero.card4": "Helped 40+ companies with impactful solutions.",

    // Trusted By Section
    "trustedBy.title": "Trusted by",
    "trustedBy.subtitle":
      "Companies and organizations that have trusted my expertise to drive their digital transformation and growth strategies.",

    // Portfolio Section
    "portfolio.title": "Portfolio",
    "portfolio.subtitle": "Case studies and design projects showcasing user-centered solutions for digital products",

    // About Section
    "about.title": "ABOUT ME",
    "about.bio1":
      "Arturo Grande (Salta, 1995) is a *multimedia designer*, *entrepreneur*, and *technology enthusiast*. He previously served as *National Marketing Director* at *AIESEC* in Argentina and Spain, and is the founder and instructor of *[DESAFIA]*, a program that supports entrepreneurs in building and scaling *digital products* with global impact.",
    "about.bio2":
      "He has spoken at *UX and technology events*, co-organized *SAIAConf*, and teaches in the postgraduate programs of *Digital Business (UCEMA)* and *Cryptoeconomics (UNCUYO)*. Currently, he is *Head of Product & Marketing* at *[Eluter]*, leading *growth strategies* and *digital product design*.",
    "about.bio3":
      "He is a *v0* and *Celo Argentina Ambassador*, promoting the adoption of developer tools and *Web3 technologies* in the region. He graduated from the *[Polkadot Blockchain Academy X]* and was selected as a *Scholar* in the *Ethereum Argentina Community Organizers* track at *[Devconnect]* 2025.",
    "about.links.title": "Links",
    "about.cta": "GET IN TOUCH",

    // Companies Section
    "companies.eluter.title": "More about Eluter",
    "companies.eluter.description":
      "**Eluter** is a **fintech platform** that simplifies **global payments** and **currency exchange** for companies in Argentina. It enables businesses to send, receive, and convert **ARS, USD, EUR, and stablecoins** with **speed, transparency, and compliance**, helping **importers, exporters, and e-commerce companies** grow internationally.",
    "companies.eluter.button": "More info",
    "companies.desafia.title": "More about DESAFIA",
    "companies.desafia.description":
      "**DESAFIA** is an **education platform** founded by **Arturo Grande** that helps **entrepreneurs and professionals** create and scale **digital products**. With a practical approach to **strategy, design, product, marketing, and finance**, DESAFIA trains the next generation of **builders in LATAM** to launch and grow their **startups globally**.",
    "companies.desafia.button": "More info",

    // Talks Section
    "talks.title": "Talks & Workshops",
    "talks.description":
      "I am an **international speaker**, delivering practical talks and workshops on **UX Design, Marketing, Sustainability**, and **exponential technologies** such as **crypto, blockchain, and Artificial Intelligence**. My approach combines **theory and practical experience** to empower **entrepreneurs and professionals** in the **digital era**.",
    "talks.cta": "REQUEST A TALK/WORKSHOP",
    "talks.argentina": "Argentina",
    "talks.international": "International",

    // Blog Section
    "blog.title": "Articles & Case Studies",
    "blog.subtitle": "Insights on design, technology, and business strategy from real projects and client work",
    "blog.readMore": "Read on Medium",
    "blog.noArticles": "No articles found. Check back soon!",
    "blog.viewAll": "View Latest 10 Articles",

    // Footer
    "footer.portfolio": "PORTFOLIO",
    "footer.portfolio.design": "Product Design",
    "footer.about": "ABOUT ME",
    "footer.about.bio": "Short Biography",
    "footer.about.talks": "Talks and Workshops",
    "footer.about.articles": "Articles",
    "footer.connect": "LET'S CONNECT",
    "footer.connect.project": "Have a project in mind?",
    "footer.connect.touch": "Get in touch",
    "footer.made": "MADE BY",

    // Podcast Section
    "podcast.title": "Artu Grande Podcast",
    "podcast.description1":
      "A space for **authentic conversations** with the minds shaping the future of **technology, AI, blockchain**, and **digital culture**.",
    "podcast.description2":
      "From **Salta, Argentina**, Artu Grande shares **deep and personal conversations** with **founders, creators, and innovators** building **global products** from anywhere.",
    "podcast.description3":
      "With the warmth of a **mate** and a focus on what's next, this podcast aims to **inspire, educate**, and **open opportunities** for **emerging communities**.",
    "podcast.stats": "The podcast has over **275,000 plays** and is available on **X, YouTube, and Spotify**.",
    "podcast.latestEpisodes": "Latest Episodes",

    // Streaming Section
    "streaming.title": "Live Streaming",
    "streaming.backHome": "Back to Home",
    "streaming.description":
      "Join me live for discussions about design, technology, and entrepreneurship. Follow along as I share insights, work on projects, and connect with the community.",
    "streaming.joinWhatsApp": "Join WhatsApp Group",

    // Celo Section
    "celo.backHome": "Back to Home",
  },
  es: {
    // Navbar
    "nav.home": "Inicio",
    "nav.about": "Bio",
    "nav.portfolio": "Portafolio",
    "nav.podcast": "Podcast",
    "nav.articles": "Artículos",
    "nav.talks": "Charlas",
    "nav.streaming": "Streaming",
    "nav.celo": "Celo",
    "nav.contact": "Contacto",

    // Hero Section
    "hero.greeting": "Bienvenido a mi **portfolio personal**",
    "hero.title": "Programo con IA y hago crecer productos que la gente ama",
    "hero.card1": "Experto en diseño de productos escalables y marketing.",
    "hero.card2": "Apasionado por Web3, IA y sostenibilidad.",
    "hero.card3": "Trabajo remoto en más de 15 países como nómada digital.",
    "hero.card4": "Ayudé a más de 40 empresas con soluciones impactantes.",

    // Trusted By Section
    "trustedBy.title": "Confían en mí",
    "trustedBy.subtitle":
      "Empresas y organizaciones que han confiado en mi experiencia para impulsar su transformación digital y estrategias de crecimiento.",

    // Portfolio Section
    "portfolio.title": "Portfolio",
    "portfolio.subtitle":
      "Casos de estudio y proyectos de diseño que muestran soluciones centradas en el usuario para productos digitales",

    // About Section
    "about.title": "ACERCA DE MÍ",
    "about.bio1":
      "Arturo Grande (Salta, 1995) es *diseñador multimedia*, *emprendedor* y *entusiasta de la tecnología*. Se desempeñó como *Director Nacional de Marketing* en *AIESEC* en Argentina y España, y es fundador y profesor en *[DESAFIA]*, un programa que acompaña a emprendedores en la creación y escalado de *productos digitales* con proyección global.",
    "about.bio2":
      "Ha participado como orador en *eventos de UX y tecnología*, co-organizó *SAIAConf*, y dicta clases en los programas de posgrado en *Negocios Digitales (UCEMA)* y *CriptoEconomía (UNCUYO)*. Actualmente, es *Head of Product & Marketing* en *[Eluter]*, liderando *estrategias de crecimiento* y *diseño de productos digitales*.",
    "about.bio3":
      "Es *Embajador de v0* y *Celo Argentina*, impulsando la adopción de herramientas de desarrollo y *tecnologías Web3* en la región. Es graduado de la *[Polkadot Blockchain Academy X]* y fue seleccionado como *Scholar* en el track de *Organizadores de la Comunidad Ethereum ARG* de *[Devconnect]* 2025.",
    "about.links.title": "Enlaces",
    "about.cta": "CONTACTAR",

    // Companies Section
    "companies.eluter.title": "Más sobre Eluter",
    "companies.eluter.description":
      "**Eluter** es una **plataforma fintech** que simplifica los **pagos globales** y el **intercambio de divisas** para empresas en Argentina. Permite a las empresas enviar, recibir y convertir **ARS, USD, EUR y stablecoins** con **velocidad, transparencia y cumplimiento**, ayudando a **importadores, exportadores y empresas de e-commerce** a crecer internacionalmente.",
    "companies.eluter.button": "Más información",
    "companies.desafia.title": "Más sobre DESAFIA",
    "companies.desafia.description":
      "**DESAFIA** es una **plataforma educativa** fundada por **Arturo Grande** que ayuda a **emprendedores y profesionales** a crear y escalar **productos digitales**. Con un enfoque práctico en **estrategia, diseño, producto, marketing y finanzas**, DESAFIA entrena a la próxima generación de **builders en LATAM** para lanzar y hacer crecer sus **startups globalmente**.",
    "companies.desafia.button": "Más información",

    // Talks Section
    "talks.title": "Charlas y Talleres",
    "talks.description":
      "Soy un **speaker internacional**, brindando charlas prácticas y talleres sobre **Diseño UX, Marketing, Sostenibilidad**, y **tecnologías exponenciales** como **crypto, blockchain e Inteligencia Artificial**. Mi enfoque combina **teoría y experiencia práctica** para empoderar **emprendedores y profesionales** en la **era digital**.",
    "talks.cta": "SOLICITAR CHARLA/TALLER",
    "talks.argentina": "Argentina",
    "talks.international": "Internacional",

    // Blog Section
    "blog.title": "Artículos y Casos de Estudio",
    "blog.subtitle":
      "Insights sobre diseño, tecnología y estrategia de negocio desde proyectos reales y trabajo con clientes",
    "blog.readMore": "Leer en Medium",
    "blog.noArticles": "No se encontraron artículos. ¡Vuelve pronto!",
    "blog.viewAll": "Ver Últimos 10 Artículos",

    // Footer
    "footer.portfolio": "PORTAFOLIO",
    "footer.portfolio.design": "Diseño de Productos",
    "footer.about": "ACERCA DE MÍ",
    "footer.about.bio": "Biografía Corta",
    "footer.about.talks": "Charlas y Talleres",
    "footer.about.articles": "Artículos",
    "footer.connect": "CONECTEMOS",
    "footer.connect.project": "¿Tienes un proyecto en mente?",
    "footer.connect.touch": "Ponte en contacto",
    "footer.made": "HECHO POR",

    // Podcast Section
    "podcast.title": "Artu Grande Podcast",
    "podcast.description1":
      "Un espacio de **charlas auténticas** con las mentes que están moldeando el futuro de la **tecnología, la IA, blockchain** y la **cultura digital**.",
    "podcast.description2":
      "Desde **Salta, Argentina**, Artu Grande comparte **conversaciones profundas y cercanas** con **fundadores, creadores e innovadores** que construyen **productos globales** desde cualquier lugar.",
    "podcast.description3":
      "Con la calidez de un **mate** y la mirada puesta en lo que viene, este podcast busca **inspirar, educar** y **abrir oportunidades** para **comunidades emergentes**.",
    "podcast.stats": "El podcast cuenta con más de **275.000 reproducciones** y está disponible en **X, YouTube y Spotify**.",
    "podcast.latestEpisodes": "Últimos Episodios",

    // Streaming Section
    "streaming.title": "Transmisión en Vivo",
    "streaming.backHome": "Volver al Inicio",
    "streaming.description":
      "Acompáñame en vivo para discusiones sobre diseño, tecnología y emprendimiento. Sígueme mientras comparto insights, trabajo en proyectos y me conecto con la comunidad.",
    "streaming.joinWhatsApp": "Únete al Grupo de WhatsApp",

    // Celo Section
    "celo.backHome": "Volver al Inicio",
  },
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "es")) {
      setLanguage(savedLanguage)
    }
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("language", lang)
  }

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
