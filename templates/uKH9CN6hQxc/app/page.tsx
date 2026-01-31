import Image from "next/image"
import Link from "next/link"
import { Github, Linkedin, Mail, ExternalLink, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ContactForm } from "@/components/contact-form"
import { Navbar } from "@/components/navbar"
import { ScrollIndicator } from "@/components/scroll-indicator"
import { SmoothScroll } from "@/components/smooth-scroll"
import { HeroSection } from "@/components/hero-section"
import { 
  AnimatedSection, 
  AnimatedCard, 
  ParticleBackground, 
  AnimatedGradientBackground 
} from "@/components/client-animations"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
      {/* Background Effects */}
      <AnimatedGradientBackground />
      <ParticleBackground />
      <ScrollIndicator />
      <SmoothScroll />

      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <HeroSection />

      {/* About Section */}
      <section id="about" className="py-16 px-4 bg-white dark:bg-gray-800 relative overflow-hidden">
        <div className="container mx-auto max-w-6xl relative z-10">
          <AnimatedSection>
            <h2 className="text-3xl font-bold mb-8 text-center">About Me</h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatedSection direction="left" delay={0.2}>
              <div className="space-y-4">
                <p className="text-lg text-gray-700 dark:text-gray-300">
                  I'm an AI Engineer with expertise in data science, machine learning, and deep learning. My passion
                  lies in building intelligent systems that solve real-world problems.
                </p>
                <p className="text-lg text-gray-700 dark:text-gray-300">
                  With a strong background in predictive modeling, classification, and data analysis, I specialize in
                  developing and deploying AI solutions that drive business value.
                </p>
                <p className="text-lg text-gray-700 dark:text-gray-300">
                  I'm proficient in Python and ML frameworks like TensorFlow, scikit-learn, and OpenCV, and have
                  experience integrating APIs like OpenAI, Gemini, and other LLMs for chatbot development and
                  automation.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={0.4}>
              <div>
                <h3 className="text-xl font-semibold mb-4">Key Expertise</h3>
                <ul className="space-y-2">
                  <li className="flex items-start group">
                    <ChevronRight className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0 transform group-hover:translate-x-1 transition-transform duration-300" />
                    <span className="text-gray-700 dark:text-gray-300">
                      Machine Learning & Deep Learning Model Development
                    </span>
                  </li>
                  <li className="flex items-start group">
                    <ChevronRight className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0 transform group-hover:translate-x-1 transition-transform duration-300" />
                    <span className="text-gray-700 dark:text-gray-300">LLM Integration & Fine-tuning</span>
                  </li>
                  <li className="flex items-start group">
                    <ChevronRight className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0 transform group-hover:translate-x-1 transition-transform duration-300" />
                    <span className="text-gray-700 dark:text-gray-300">Model Deployment & CI/CD Pipelines</span>
                  </li>
                  <li className="flex items-start group">
                    <ChevronRight className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0 transform group-hover:translate-x-1 transition-transform duration-300" />
                    <span className="text-gray-700 dark:text-gray-300">Computer Vision & NLP Applications</span>
                  </li>
                  <li className="flex items-start group">
                    <ChevronRight className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0 transform group-hover:translate-x-1 transition-transform duration-300" />
                    <span className="text-gray-700 dark:text-gray-300">Speech Recognition & TTS Systems</span>
                  </li>
                </ul>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-16 px-4 bg-gray-50 dark:bg-gray-900 relative">
        <div className="container mx-auto max-w-6xl relative z-10">
          <AnimatedSection>
            <h2 className="text-3xl font-bold mb-8 text-center">Professional Experience</h2>
          </AnimatedSection>

          <div className="space-y-8">
            <AnimatedSection delay={0.2}>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-purple-600 hover:-translate-y-1 transition-transform duration-300">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold">AI Engineer</h3>
                    <p className="text-purple-600 dark:text-purple-400 font-medium">ZettaMight</p>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mt-2 md:mt-0">Dec 2024 - Present</p>
                </div>
                <ul className="space-y-2 list-disc list-inside text-gray-700 dark:text-gray-300">
                  <li>
                    Designed and implemented ML/DL models for NLP and computer vision tasks in real-world client
                    projects, leveraging Python and GCP services.
                  </li>
                  <li>
                    Collaborated with cross-functional teams to deploy scalable AI solutions, integrating Gemini models
                    and APIs.
                  </li>
                </ul>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-purple-600 hover:-translate-y-1 transition-transform duration-300">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold">Notebook Expert</h3>
                    <p className="text-purple-600 dark:text-purple-400 font-medium">Kaggle</p>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mt-2 md:mt-0">Dec 2023 - Present</p>
                </div>
                <ul className="space-y-2 list-disc list-inside text-gray-700 dark:text-gray-300">
                  <li>Demonstrated machine learning and deep learning skills by creating notebooks.</li>
                  <li>Participated in four competitions, published 19 notebooks with 139 upvotes and 59 forks.</li>
                </ul>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.4}>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-purple-600 hover:-translate-y-1 transition-transform duration-300">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold">Co-Head Automation</h3>
                    <p className="text-purple-600 dark:text-purple-400 font-medium">Procom'24</p>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mt-2 md:mt-0">October 2023 - March 2024</p>
                </div>
                <ul className="space-y-2 list-disc list-inside text-gray-700 dark:text-gray-300">
                  <li>Led seamless team collaboration and designed a cutting-edge chatbot.</li>
                </ul>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.5}>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-purple-600 hover:-translate-y-1 transition-transform duration-300">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold">Coordinator, Data Science Team</h3>
                    <p className="text-purple-600 dark:text-purple-400 font-medium">Google Developer Student Club</p>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mt-2 md:mt-0">Nov 2022 - Nov 2023</p>
                </div>
                <ul className="space-y-2 list-disc list-inside text-gray-700 dark:text-gray-300">
                  <li>Facilitated learning in ML and data science basics, mentoring team members effectively.</li>
                  <li>Dedicated to advancing data science education and innovation.</li>
                </ul>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 px-4 bg-white dark:bg-gray-800 relative">
        <div className="container mx-auto max-w-6xl relative z-10">
          <AnimatedSection>
            <h2 className="text-3xl font-bold mb-8 text-center">Featured Projects</h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatedCard delay={0.2}>
              <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <CardTitle>EarthRenewal AI Farmer Assistant Chatbot</CardTitle>
                  <CardDescription>AI-driven agricultural assistant</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video relative rounded-md overflow-hidden mb-4 bg-gray-100 dark:bg-gray-700 transform transition-transform duration-500 hover:scale-[1.02]">
                    <Image
                      src="/placeholder.svg?height=240&width=400"
                      alt="EarthRenewal AI"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/20 to-blue-600/20 opacity-0 hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    Built an AI-driven chatbot to assist farmers with agricultural recommendations, integrating
                    multilingual support and real-time query resolution.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    <Badge
                      variant="outline"
                      className="bg-purple-100/50 dark:bg-purple-900/50 hover:bg-purple-200 transition-colors duration-300"
                    >
                      NLP
                    </Badge>
                    <Badge
                      variant="outline"
                      className="bg-purple-100/50 dark:bg-purple-900/50 hover:bg-purple-200 transition-colors duration-300"
                    >
                      LLM
                    </Badge>
                    <Badge
                      variant="outline"
                      className="bg-purple-100/50 dark:bg-purple-900/50 hover:bg-purple-200 transition-colors duration-300"
                    >
                      Python
                    </Badge>
                    <Badge
                      variant="outline"
                      className="bg-purple-100/50 dark:bg-purple-900/50 hover:bg-purple-200 transition-colors duration-300"
                    >
                      Multilingual
                    </Badge>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full relative overflow-hidden group" disabled>
                    <ExternalLink className="w-4 h-4 mr-2" />
                    <span className="relative z-10">View Project</span>
                    <span className="absolute inset-0 bg-purple-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
                  </Button>
                </CardFooter>
              </Card>
            </AnimatedCard>

            <AnimatedCard delay={0.3}>
              <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <CardTitle>Authentrix - Profile Verification</CardTitle>
                  <CardDescription>AI-based trust scoring system</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video relative rounded-md overflow-hidden mb-4 bg-gray-100 dark:bg-gray-700 transform transition-transform duration-500 hover:scale-[1.02]">
                    <Image src="/placeholder.svg?height=240&width=400" alt="Authentrix" fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/20 to-blue-600/20 opacity-0 hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    Developed an AI-based trust scoring system for user profile verification, incorporating CI/CD
                    pipelines and model monitoring for deployment.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    <Badge
                      variant="outline"
                      className="bg-purple-100/50 dark:bg-purple-900/50 hover:bg-purple-200 transition-colors duration-300"
                    >
                      Machine Learning
                    </Badge>
                    <Badge
                      variant="outline"
                      className="bg-purple-100/50 dark:bg-purple-900/50 hover:bg-purple-200 transition-colors duration-300"
                    >
                      CI/CD
                    </Badge>
                    <Badge
                      variant="outline"
                      className="bg-purple-100/50 dark:bg-purple-900/50 hover:bg-purple-200 transition-colors duration-300"
                    >
                      Model Monitoring
                    </Badge>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full relative overflow-hidden group" disabled>
                    <ExternalLink className="w-4 h-4 mr-2" />
                    <span className="relative z-10">View Project</span>
                    <span className="absolute inset-0 bg-purple-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
                  </Button>
                </CardFooter>
              </Card>
            </AnimatedCard>

            <AnimatedCard delay={0.4}>
              <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <CardTitle>Customer Bank Churn Prediction</CardTitle>
                  <CardDescription>Classification model for customer retention</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video relative rounded-md overflow-hidden mb-4 bg-gray-100 dark:bg-gray-700 transform transition-transform duration-500 hover:scale-[1.02]">
                    <Image
                      src="/placeholder.svg?height=240&width=400"
                      alt="Churn Prediction"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/20 to-blue-600/20 opacity-0 hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    Developed a classification model to predict customer churn using Random Forest, Logistic Regression,
                    SVM, and LightGBM, achieving 90% accuracy.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    <Badge
                      variant="outline"
                      className="bg-purple-100/50 dark:bg-purple-900/50 hover:bg-purple-200 transition-colors duration-300"
                    >
                      Random Forest
                    </Badge>
                    <Badge
                      variant="outline"
                      className="bg-purple-100/50 dark:bg-purple-900/50 hover:bg-purple-200 transition-colors duration-300"
                    >
                      SVM
                    </Badge>
                    <Badge
                      variant="outline"
                      className="bg-purple-100/50 dark:bg-purple-900/50 hover:bg-purple-200 transition-colors duration-300"
                    >
                      LightGBM
                    </Badge>
                    <Badge
                      variant="outline"
                      className="bg-purple-100/50 dark:bg-purple-900/50 hover:bg-purple-200 transition-colors duration-300"
                    >
                      Classification
                    </Badge>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full relative overflow-hidden group" disabled>
                    <ExternalLink className="w-4 h-4 mr-2" />
                    <span className="relative z-10">View Project</span>
                    <span className="absolute inset-0 bg-purple-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
                  </Button>
                </CardFooter>
              </Card>
            </AnimatedCard>

            <AnimatedCard delay={0.5}>
              <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <CardTitle>Fastly</CardTitle>
                  <CardDescription>University admission chatbot</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video relative rounded-md overflow-hidden mb-4 bg-gray-100 dark:bg-gray-700 transform transition-transform duration-500 hover:scale-[1.02]">
                    <Image
                      src="/placeholder.svg?height=240&width=400"
                      alt="Fastly Chatbot"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/20 to-blue-600/20 opacity-0 hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    Designed a chatbot for university admission queries using NLP and LSTM, providing automated
                    assistance to prospective students.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    <Badge
                      variant="outline"
                      className="bg-purple-100/50 dark:bg-purple-900/50 hover:bg-purple-200 transition-colors duration-300"
                    >
                      NLP
                    </Badge>
                    <Badge
                      variant="outline"
                      className="bg-purple-100/50 dark:bg-purple-900/50 hover:bg-purple-200 transition-colors duration-300"
                    >
                      LSTM
                    </Badge>
                    <Badge
                      variant="outline"
                      className="bg-purple-100/50 dark:bg-purple-900/50 hover:bg-purple-200 transition-colors duration-300"
                    >
                      Chatbot
                    </Badge>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full relative overflow-hidden group" disabled>
                    <ExternalLink className="w-4 h-4 mr-2" />
                    <span className="relative z-10">View Project</span>
                    <span className="absolute inset-0 bg-purple-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
                  </Button>
                </CardFooter>
              </Card>
            </AnimatedCard>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-16 px-4 bg-gray-50 dark:bg-gray-900 relative">
        <div className="container mx-auto max-w-6xl relative z-10">
          <AnimatedSection>
            <h2 className="text-3xl font-bold mb-8 text-center">Technical Skills</h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <AnimatedSection direction="up" delay={0.2}>
              <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <span className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center mr-2">
                      <span className="text-purple-600 dark:text-purple-300 text-sm font-bold">AI</span>
                    </span>
                    AI & Machine Learning
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    <Badge variant="secondary" className="justify-center py-2 hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-colors">
                      Machine Learning
                    </Badge>
                    <Badge variant="secondary" className="justify-center py-2 hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-colors">
                      Deep Learning
                    </Badge>
                    <Badge variant="secondary" className="justify-center py-2 hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-colors">
                      Neural Networks
                    </Badge>
                    <Badge variant="secondary" className="justify-center py-2 hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-colors">
                      Computer Vision
                    </Badge>
                    <Badge variant="secondary" className="justify-center py-2 hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-colors">
                      NLP
                    </Badge>
                    <Badge variant="secondary" className="justify-center py-2 hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-colors">
                      Model Fine-Tuning
                    </Badge>
                    <Badge variant="secondary" className="justify-center py-2 hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-colors">
                      Feature Engineering
                    </Badge>
                    <Badge variant="secondary" className="justify-center py-2 hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-colors">
                      Pretrained Models
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={0.3}>
              <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <span className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-2">
                      <span className="text-blue-600 dark:text-blue-300 text-sm font-bold">DEV</span>
                    </span>
                    Programming & Frameworks
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    <Badge variant="secondary" className="justify-center py-2 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors">
                      Python
                    </Badge>
                    <Badge variant="secondary" className="justify-center py-2 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors">
                      TensorFlow
                    </Badge>
                    <Badge variant="secondary" className="justify-center py-2 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors">
                      PyTorch
                    </Badge>
                    <Badge variant="secondary" className="justify-center py-2 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors">
                      Scikit-learn
                    </Badge>
                    <Badge variant="secondary" className="justify-center py-2 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors">
                      OpenCV
                    </Badge>
                    <Badge variant="secondary" className="justify-center py-2 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors">
                      Flask/FastAPI
                    </Badge>
                    <Badge variant="secondary" className="justify-center py-2 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors">
                      Java
                    </Badge>
                    <Badge variant="secondary" className="justify-center py-2 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors">
                      C++/C
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <AnimatedSection direction="up" delay={0.4}>
              <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <span className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mr-2">
                      <span className="text-green-600 dark:text-green-300 text-sm font-bold">DATA</span>
                    </span>
                    Data Science & Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    <Badge variant="secondary" className="justify-center py-2 hover:bg-green-100 dark:hover:bg-green-900/50 transition-colors">
                      Data Analysis
                    </Badge>
                    <Badge variant="secondary" className="justify-center py-2 hover:bg-green-100 dark:hover:bg-green-900/50 transition-colors">
                      Pandas & NumPy
                    </Badge>
                    <Badge variant="secondary" className="justify-center py-2 hover:bg-green-100 dark:hover:bg-green-900/50 transition-colors">
                      Data Visualization
                    </Badge>
                    <Badge variant="secondary" className="justify-center py-2 hover:bg-green-100 dark:hover:bg-green-900/50 transition-colors">
                      Statistical Analysis
                    </Badge>
                    <Badge variant="secondary" className="justify-center py-2 hover:bg-green-100 dark:hover:bg-green-900/50 transition-colors">
                      SQL
                    </Badge>
                    <Badge variant="secondary" className="justify-center py-2 hover:bg-green-100 dark:hover:bg-green-900/50 transition-colors">
                      Jupyter Notebooks
                    </Badge>
                    <Badge variant="secondary" className="justify-center py-2 hover:bg-green-100 dark:hover:bg-green-900/50 transition-colors">
                      Matplotlib/Seaborn
                    </Badge>
                    <Badge variant="secondary" className="justify-center py-2 hover:bg-green-100 dark:hover:bg-green-900/50 transition-colors">
                      Data Preprocessing
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={0.5}>
              <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <span className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900 flex items-center justify-center mr-2">
                      <span className="text-orange-600 dark:text-orange-300 text-sm font-bold">OPS</span>
                    </span>
                    MLOps & Integration
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    <Badge variant="secondary" className="justify-center py-2 hover:bg-orange-100 dark:hover:bg-orange-900/50 transition-colors">
                      Model Deployment
                    </Badge>
                    <Badge variant="secondary" className="justify-center py-2 hover:bg-orange-100 dark:hover:bg-orange-900/50 transition-colors">
                      API Integration
                    </Badge>
                    <Badge variant="secondary" className="justify-center py-2 hover:bg-orange-100 dark:hover:bg-orange-900/50 transition-colors">
                      LLM APIs
                    </Badge>
                    <Badge variant="secondary" className="justify-center py-2 hover:bg-orange-100 dark:hover:bg-orange-900/50 transition-colors">
                      CI/CD Pipelines
                    </Badge>
                    <Badge variant="secondary" className="justify-center py-2 hover:bg-orange-100 dark:hover:bg-orange-900/50 transition-colors">
                      Model Monitoring
                    </Badge>
                    <Badge variant="secondary" className="justify-center py-2 hover:bg-orange-100 dark:hover:bg-orange-900/50 transition-colors">
                      Docker
                    </Badge>
                    <Badge variant="secondary" className="justify-center py-2 hover:bg-orange-100 dark:hover:bg-orange-900/50 transition-colors">
                      Git/GitHub
                    </Badge>
                    <Badge variant="secondary" className="justify-center py-2 hover:bg-orange-100 dark:hover:bg-orange-900/50 transition-colors">
                      Cloud Platforms
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>

          {/* Additional Skills Tags */}
          <AnimatedSection delay={0.6}>
            <div className="mt-12 text-center">
              <h3 className="text-xl font-semibold mb-6">Additional Technologies</h3>
              <div className="flex flex-wrap justify-center gap-3">
                <Badge variant="outline" className="px-4 py-2 text-sm bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800 hover:bg-purple-100 dark:hover:bg-purple-900/40 transition-colors">
                  Hugging Face
                </Badge>
                <Badge variant="outline" className="px-4 py-2 text-sm bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors">
                  Transformers
                </Badge>
                <Badge variant="outline" className="px-4 py-2 text-sm bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 hover:bg-green-100 dark:hover:bg-green-900/40 transition-colors">
                  NLTK
                </Badge>
                <Badge variant="outline" className="px-4 py-2 text-sm bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800 hover:bg-yellow-100 dark:hover:bg-yellow-900/40 transition-colors">
                  spaCy
                </Badge>
                <Badge variant="outline" className="px-4 py-2 text-sm bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors">
                  Streamlit
                </Badge>
                <Badge variant="outline" className="px-4 py-2 text-sm bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 dark:hover:bg-indigo-900/40 transition-colors">
                  Gradio
                </Badge>
                <Badge variant="outline" className="px-4 py-2 text-sm bg-pink-50 dark:bg-pink-900/20 border-pink-200 dark:border-pink-800 hover:bg-pink-100 dark:hover:bg-pink-900/40 transition-colors">
                  Whisper
                </Badge>
                <Badge variant="outline" className="px-4 py-2 text-sm bg-teal-50 dark:bg-teal-900/20 border-teal-200 dark:border-teal-800 hover:bg-teal-100 dark:hover:bg-teal-900/40 transition-colors">
                  LangChain
                </Badge>
                <Badge variant="outline" className="px-4 py-2 text-sm bg-cyan-50 dark:bg-cyan-900/20 border-cyan-200 dark:border-cyan-800 hover:bg-cyan-100 dark:hover:bg-cyan-900/40 transition-colors">
                  MongoDB
                </Badge>
                <Badge variant="outline" className="px-4 py-2 text-sm bg-violet-50 dark:bg-violet-900/20 border-violet-200 dark:border-violet-800 hover:bg-violet-100 dark:hover:bg-violet-900/40 transition-colors">
                  PostgreSQL
                </Badge>
                <Badge variant="outline" className="px-4 py-2 text-sm bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 transition-colors">
                  REST APIs
                </Badge>
                <Badge variant="outline" className="px-4 py-2 text-sm bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800 hover:bg-amber-100 dark:hover:bg-amber-900/40 transition-colors">
                  Postman
                </Badge>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Education & Certifications */}
      <section id="education" className="py-16 px-4 bg-white dark:bg-gray-800 relative">
        <div className="container mx-auto max-w-6xl relative z-10">
          <AnimatedSection>
            <h2 className="text-3xl font-bold mb-8 text-center">Education & Certifications</h2>
          </AnimatedSection>

          <div className="mb-12">
            <AnimatedSection direction="left" delay={0.2}>
              <h3 className="text-2xl font-bold mb-6">Education</h3>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300 hover:-translate-y-1 transition-transform duration-300">
                <div className="flex flex-col md:flex-row justify-between mb-4">
                  <div>
                    <h4 className="text-xl font-semibold">BS, Artificial Intelligence</h4>
                    <p className="text-purple-600 dark:text-purple-400">
                      National University of Computer and Emerging Sciences FAST Karachi
                    </p>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mt-2 md:mt-0">2025</p>
                </div>
                <div>
                  <h5 className="font-medium mb-2">Relevant Courses:</h5>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="animate-pulse">
                      Algorithms Design and Analysis
                    </Badge>
                    <Badge variant="secondary">Object-Oriented Programming</Badge>
                    <Badge variant="secondary" className="animate-pulse">
                      Linear Algebra
                    </Badge>
                    <Badge variant="secondary">Probability and Statistics</Badge>
                    <Badge variant="secondary" className="animate-pulse">
                      Machine Learning
                    </Badge>
                    <Badge variant="secondary">Artificial Neural Networks</Badge>
                    <Badge variant="secondary" className="animate-pulse">
                      Database Systems
                    </Badge>
                    <Badge variant="secondary">Information Retrieval</Badge>
                    <Badge variant="secondary">Fundamentals of Software Engineering</Badge>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>

          <div>
            <AnimatedSection direction="right" delay={0.3}>
              <h3 className="text-2xl font-bold mb-6">Certifications & Awards</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300 hover:-translate-y-1 transition-transform duration-300">
                  <h4 className="font-semibold">Large Language Models Concept - DataCamp</h4>
                  <p className="text-gray-600 dark:text-gray-400">Basics of LLMs, Zero, Few, Multiple Shots Learning</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300 hover:-translate-y-1 transition-transform duration-300">
                  <h4 className="font-semibold">Supervised Machine Learning - DataCamp</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Classification, regression, types of error, evaluation metrics
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300 hover:-translate-y-1 transition-transform duration-300">
                  <h4 className="font-semibold">Data Science - DataCamp</h4>
                  <p className="text-gray-600 dark:text-gray-400">Pandas, numpy, machine learning, Python libraries</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300 hover:-translate-y-1 transition-transform duration-300">
                  <h4 className="font-semibold">Exploratory Data Analysis - GoodLearnings</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Insightful visualization, stats, statistical queries
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 md:col-span-2 shadow-md hover:shadow-lg transition-shadow duration-300 hover:-translate-y-1 transition-transform duration-300">
                  <h4 className="font-semibold">Winner ML Competition - ACM-AI</h4>
                  <p className="text-gray-600 dark:text-gray-400">Secured victory in a machine learning competition</p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-4 bg-gray-50 dark:bg-gray-900 relative">
        <div className="container mx-auto max-w-6xl relative z-10">
          <AnimatedSection>
            <h2 className="text-3xl font-bold mb-8 text-center">Get In Touch</h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatedSection direction="left" delay={0.2}>
              <div className="space-y-6">
                <h3 className="text-xl font-semibold">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center hover:translate-x-1 transition-transform duration-300">
                    <Mail className="w-5 h-5 text-purple-600 mr-3" />
                    <a
                      href="mailto:pitafimurad99@gmail.com"
                      className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                    >
                      pitafimurad99@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center hover:translate-x-1 transition-transform duration-300">
                    <Linkedin className="w-5 h-5 text-purple-600 mr-3" />
                    <a
                      href="https://linkedin.com/in/murad-pitafi"
                      target="_blank"
                      className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                      rel="noreferrer"
                    >
                      LinkedIn Profile
                    </a>
                  </div>
                  <div className="flex items-center hover:translate-x-1 transition-transform duration-300">
                    <Github className="w-5 h-5 text-purple-600 mr-3" />
                    <a
                      href="https://github.com/murad-pitafi"
                      target="_blank"
                      className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                      rel="noreferrer"
                    >
                      GitHub Profile
                    </a>
                  </div>
                  <div className="flex items-center hover:translate-x-1 transition-transform duration-300">
                    <ExternalLink className="w-5 h-5 text-purple-600 mr-3" />
                    <a
                      href="https://kaggle.com/muradpitafi"
                      target="_blank"
                      className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                      rel="noreferrer"
                    >
                      Kaggle Profile
                    </a>
                  </div>
                </div>
                <div className="pt-4">
                  <p className="text-gray-700 dark:text-gray-300">
                    I'm always open to discussing new projects, opportunities, or partnerships. Feel free to reach out!
                  </p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={0.3}>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
                <ContactForm />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-gray-800 dark:bg-gray-950 text-white relative">
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h2 className="text-xl font-bold">Muhammad Murad</h2>
              <p className="text-gray-400">AI Engineer</p>
            </div>
            <div className="flex space-x-4">
              <Link
                href="https://linkedin.com/in/murad-pitafi"
                target="_blank"
                className="text-gray-400 hover:text-white transition-colors transform hover:scale-110 duration-300"
              >
                <Linkedin className="w-5 h-5" />
              </Link>
              <Link
                href="https://github.com/murad-pitafi"
                target="_blank"
                className="text-gray-400 hover:text-white transition-colors transform hover:scale-110 duration-300"
              >
                <Github className="w-5 h-5" />
              </Link>
              <Link
                href="https://kaggle.com/muradpitafi"
                target="_blank"
                className="text-gray-400 hover:text-white transition-colors transform hover:scale-110 duration-300"
              >
                <ExternalLink className="w-5 h-5" />
              </Link>
              <Link
                href="mailto:pitafimurad99@gmail.com"
                className="text-gray-400 hover:text-white transition-colors transform hover:scale-110 duration-300"
              >
                <Mail className="w-5 h-5" />
              </Link>
            </div>
          </div>
          <div className="mt-6 text-center text-gray-400 text-sm">
            <p>© {new Date().getFullYear()} Muhammad Murad. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
