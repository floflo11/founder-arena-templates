"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import type { PresentationWithImages } from "@/lib/schemas";
import { AnimatedSlide } from "./animated-slide";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  RotateCcw,
  MessageSquare,
  X,
  Home,
} from "lucide-react";

interface SlideViewerProps {
  presentation: PresentationWithImages;
  onReset: () => void;
}

export function SlideViewer({ presentation, onReset }: SlideViewerProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showNotes, setShowNotes] = useState(false);

  const totalSlides = presentation.slides.length;
  const progress = ((currentSlide + 1) / totalSlides) * 100;

  const goToNext = useCallback(() => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide((prev) => prev + 1);
    } else {
      setIsPlaying(false);
    }
  }, [currentSlide, totalSlides]);

  const goToPrev = useCallback(() => {
    if (currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1);
    }
  }, [currentSlide]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsPlaying(false);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        goToNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goToPrev();
      } else if (e.key === "Escape") {
        setShowNotes(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToNext, goToPrev]);

  // Auto-play
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      goToNext();
    }, 8000);

    return () => clearInterval(interval);
  }, [isPlaying, goToNext]);

  const currentSlideData = presentation.slides[currentSlide];

  return (
    <div className="fixed inset-0 bg-background flex flex-col">
      {/* Top Bar */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-border bg-card">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={onReset}>
            <Home className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">New Paper</span>
          </Button>
          <div className="hidden md:block">
            <h1 className="font-semibold text-sm truncate max-w-md">
              {presentation.title}
            </h1>
            {presentation.authors && (
              <p className="text-xs text-muted-foreground truncate max-w-md">
                {presentation.authors}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {currentSlide + 1} / {totalSlides}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowNotes(!showNotes)}
            className={showNotes ? "bg-accent/20" : ""}
          >
            <MessageSquare className="h-4 w-4" />
            <span className="hidden sm:inline ml-2">Notes</span>
          </Button>
        </div>
      </header>

      {/* Progress Bar */}
      <Progress value={progress} className="h-1 rounded-none" />

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Slide Area */}
        <div className="flex-1 relative">
          <AnimatePresence mode="wait">
            <AnimatedSlide
              key={currentSlide}
              slide={currentSlideData}
              isActive={true}
            />
          </AnimatePresence>

          {/* Navigation Arrows */}
          <button
            onClick={goToPrev}
            disabled={currentSlide === 0}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/80 border border-border flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-accent/20 transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={goToNext}
            disabled={currentSlide === totalSlides - 1}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/80 border border-border flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-accent/20 transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        {/* Notes Panel */}
        <AnimatePresence>
          {showNotes && (
            <motion.aside
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 320, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="border-l border-border bg-card overflow-hidden"
            >
              <div className="p-4 h-full overflow-y-auto">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Speaker Notes</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowNotes(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {currentSlideData.speakerNotes}
                </p>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Controls */}
      <footer className="px-4 py-3 border-t border-border bg-card">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          {/* Slide Thumbnails */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 flex-1 max-w-lg">
            {presentation.slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-8 h-1.5 rounded-full transition-colors flex-shrink-0 ${
                  index === currentSlide
                    ? "bg-accent"
                    : index < currentSlide
                      ? "bg-accent/40"
                      : "bg-muted"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Playback Controls */}
          <div className="flex items-center gap-2 ml-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setCurrentSlide(0);
                setIsPlaying(false);
              }}
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-24"
            >
              {isPlaying ? (
                <>
                  <Pause className="h-4 w-4 mr-2" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 mr-2" />
                  Play
                </>
              )}
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
}
