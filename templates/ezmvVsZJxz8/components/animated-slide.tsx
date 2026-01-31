"use client";

import { motion } from "framer-motion";
import type { Slide, SlideWithImage } from "@/lib/schemas"; // Corrected import for Slide type
import Image from "next/image";
import { EquationRenderer } from "./equation-renderer";

interface AnimatedSlideProps {
  slide: SlideWithImage;
  isActive: boolean;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
  exit: { opacity: 0 },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const titleVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export function AnimatedSlide({ slide, isActive }: AnimatedSlideProps) {
  if (!isActive) return null;

  const isTitleSlide = slide.slideType === "title";
  const isMultiPanelSlide = slide.slideType === "multi-panel";
  const isEquationSlide = slide.slideType === "equation";

  // Title slide - centered with image below
  if (isTitleSlide) {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="w-full h-full flex flex-col items-center justify-center text-center px-8 md:px-16 py-8 overflow-hidden"
      >
        <motion.h2
          variants={titleVariants}
          className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 text-balance flex-shrink-0"
        >
          {slide.title}
        </motion.h2>
        
        {slide.imageUrl && (
          <motion.div variants={itemVariants} className="flex-1 w-full max-w-2xl min-h-0">
            <div className="relative w-full h-full max-h-[50vh] rounded-[6px] overflow-hidden border border-border bg-card">
              <Image
                src={slide.imageUrl || "/placeholder.svg"}
                alt={slide.title}
                fill
                className="object-contain p-2"
                unoptimized
              />
            </div>
          </motion.div>
        )}
      </motion.div>
    );
  }

  // Multi-panel slide - information-dense layout like consulting slides
  if (isMultiPanelSlide && slide.sections && slide.sections.length > 0) {
    const sectionCount = slide.sections.length;
    const gridCols = sectionCount <= 2 ? "md:grid-cols-2" : sectionCount === 3 ? "md:grid-cols-3" : "md:grid-cols-2 lg:grid-cols-4";
    
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="w-full h-full flex flex-col px-6 md:px-10 py-6 overflow-hidden"
      >
        {/* Header */}
        <div className="flex-shrink-0 mb-4">
          <motion.h2
            variants={titleVariants}
            className="text-xl md:text-2xl lg:text-3xl font-bold text-balance"
          >
            {slide.title}
          </motion.h2>
          {slide.subtitle && (
            <motion.p
              variants={itemVariants}
              className="text-sm md:text-base text-accent mt-1 font-medium"
            >
              {slide.subtitle}
            </motion.p>
          )}
        </div>

        {/* Key Insight Callout */}
        {slide.keyInsight && (
          <motion.div
            variants={itemVariants}
            className="flex-shrink-0 mb-4 p-3 bg-accent/10 border-l-4 border-accent rounded-r-[6px]"
          >
            <p className="text-sm md:text-base font-medium text-foreground">{slide.keyInsight}</p>
          </motion.div>
        )}

        {/* Main content area: Panels + Image */}
        <div className="flex-1 flex flex-col lg:flex-row gap-4 min-h-0 overflow-hidden">
          {/* Panels Grid */}
          <div className={`flex-1 grid grid-cols-1 ${gridCols} gap-3 auto-rows-fr overflow-y-auto`}>
            {slide.sections.map((section, sIdx) => (
              <motion.div
                key={sIdx}
                variants={itemVariants}
                className="border border-border rounded-[6px] p-3 bg-card/50 flex flex-col"
              >
                <h4 className="font-semibold text-sm md:text-base mb-2 text-accent border-b border-border pb-2">
                  {section.heading}
                </h4>
                <ul className="space-y-1.5 flex-1">
                  {section.items.map((item, iIdx) => (
                    <li key={iIdx} className="flex items-start gap-2 text-xs md:text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Diagram */}
          {slide.imageUrl && (
            <motion.div
              variants={itemVariants}
              className="lg:w-2/5 flex items-center justify-center min-h-0"
            >
              <div className="relative w-full h-full max-h-[40vh] lg:max-h-full rounded-[6px] overflow-hidden border border-border bg-card">
                <Image
                  src={slide.imageUrl || "/placeholder.svg"}
                  alt={`Visualization for: ${slide.title}`}
                  fill
                  className="object-contain p-2"
                  unoptimized
                />
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    );
  }

  // Content/Equation/Summary slides - focused single-topic layout
  const hasNumberedSteps = slide.numberedSteps && slide.numberedSteps.length > 0;
  const hasBulletPoints = slide.bulletPoints && slide.bulletPoints.length > 0;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="w-full h-full flex flex-col lg:flex-row gap-6 px-6 md:px-10 py-6 overflow-hidden"
    >
      {/* Left: Text content */}
      <div className="flex-1 flex flex-col min-h-0 overflow-y-auto">
        <motion.h2
          variants={titleVariants}
          className="text-xl md:text-2xl lg:text-3xl font-bold mb-3 text-balance flex-shrink-0"
        >
          {slide.title}
        </motion.h2>

        {slide.subtitle && (
          <motion.p
            variants={itemVariants}
            className="text-sm md:text-base text-accent mb-3 font-medium"
          >
            {slide.subtitle}
          </motion.p>
        )}

        {/* Key Insight Callout */}
        {slide.keyInsight && (
          <motion.div
            variants={itemVariants}
            className="mb-4 p-3 bg-accent/10 border-l-4 border-accent rounded-r-[6px]"
          >
            <p className="text-sm md:text-base font-medium text-foreground">{slide.keyInsight}</p>
          </motion.div>
        )}

        {/* Numbered Steps - for processes */}
        {hasNumberedSteps && (
          <motion.ol className="space-y-2 mb-4">
            {slide.numberedSteps!.map((step, index) => (
              <motion.li
                key={index}
                variants={itemVariants}
                className="flex items-start gap-3"
              >
                <span className="w-6 h-6 rounded-full bg-accent/20 text-accent flex items-center justify-center flex-shrink-0 text-sm font-semibold">
                  {index + 1}
                </span>
                <span className="text-sm md:text-base text-muted-foreground leading-relaxed pt-0.5">{step}</span>
              </motion.li>
            ))}
          </motion.ol>
        )}

        {/* Bullet Points */}
        {hasBulletPoints && (
          <motion.ul className="space-y-2">
            {slide.bulletPoints!.map((point, index) => (
              <motion.li
                key={index}
                variants={itemVariants}
                className="flex items-start gap-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                <span className="text-sm md:text-base text-muted-foreground leading-relaxed">{point}</span>
              </motion.li>
            ))}
          </motion.ul>
        )}

        {/* Equation */}
        {isEquationSlide && slide.equation && (
          <motion.div
            variants={itemVariants}
            className="mt-4 p-3 bg-muted/50 rounded-[6px]"
          >
            <EquationRenderer equation={slide.equation} className="text-base md:text-lg" />
          </motion.div>
        )}
      </div>

      {/* Right: Image */}
      {slide.imageUrl && (
        <motion.div
          variants={itemVariants}
          className="flex-1 flex items-center justify-center min-h-0"
        >
          <div className="relative w-full h-full max-h-[55vh] rounded-[6px] overflow-hidden border border-border bg-card">
            <Image
              src={slide.imageUrl || "/placeholder.svg"}
              alt={`Visualization for: ${slide.title}`}
              fill
              className="object-contain p-2"
              unoptimized
            />
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
