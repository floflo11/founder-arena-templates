"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, Brain, Lightbulb, Layers, ImageIcon, Sparkles } from "lucide-react";
import { useState, useMemo } from "react";
import type { PresentationPlan } from "@/lib/schemas";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";

interface PlanningDisplayProps {
  plan: PresentationPlan | null;
  reasoning: string | null;
  currentPhase: "thinking" | "reasoning_complete" | "generating" | "slides_complete" | "complete" | "error";
  message?: string;
}

export function PlanningDisplay({ plan, reasoning, currentPhase, message }: PlanningDisplayProps) {
  const [isPlanExpanded, setIsPlanExpanded] = useState(true);
  const [isReasoningExpanded, setIsReasoningExpanded] = useState(true);
  
  // Determine if reasoning is currently streaming
  const isReasoningStreaming = currentPhase === "thinking" && reasoning;

  const phases = [
    { id: "thinking", label: "Thinking", icon: Brain },
    { id: "reasoning_complete", label: "Plan Ready", icon: Layers },
    { id: "generating", label: "Creating Slides", icon: Sparkles },
    { id: "slides_complete", label: "Generating Images", icon: ImageIcon },
    { id: "complete", label: "Complete", icon: Sparkles },
  ];

  const currentPhaseIndex = phases.findIndex(p => p.id === currentPhase);

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-8 px-4">
        {phases.slice(0, 4).map((phase, index) => {
          const Icon = phase.icon;
          const isActive = index === currentPhaseIndex;
          const isComplete = index < currentPhaseIndex;
          
          return (
            <div key={phase.id} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300",
                    isComplete && "bg-accent text-accent-foreground",
                    isActive && "bg-accent/20 text-accent ring-2 ring-accent ring-offset-2 ring-offset-background",
                    !isComplete && !isActive && "bg-muted text-muted-foreground"
                  )}
                >
                  {isActive ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      <Icon className="h-5 w-5" />
                    </motion.div>
                  ) : (
                    <Icon className="h-5 w-5" />
                  )}
                </div>
                <span className={cn(
                  "text-xs mt-2 font-medium",
                  isActive && "text-accent",
                  isComplete && "text-foreground",
                  !isComplete && !isActive && "text-muted-foreground"
                )}>
                  {phase.label}
                </span>
              </div>
              {index < 3 && (
                <div className={cn(
                  "w-16 h-0.5 mx-2 mt-[-1rem]",
                  index < currentPhaseIndex ? "bg-accent" : "bg-border"
                )} />
              )}
            </div>
          );
        })}
      </div>

      {/* Current Status Message */}
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-muted-foreground mb-6"
        >
          {message}
        </motion.div>
      )}

      {/* Reasoning Display - Shows AI's thinking process (streams live) */}
      <AnimatePresence>
        {reasoning && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-card border border-border rounded-[6px] overflow-hidden mb-4"
          >
            <button
              onClick={() => setIsReasoningExpanded(!isReasoningExpanded)}
              className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center",
                  isReasoningStreaming ? "bg-accent/20" : "bg-accent/10"
                )}>
                  {isReasoningStreaming ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      <Brain className="h-4 w-4 text-accent" />
                    </motion.div>
                  ) : (
                    <Brain className="h-4 w-4 text-accent" />
                  )}
                </div>
                <div className="text-left">
                  <h3 className="font-semibold flex items-center gap-2">
                    AI Thinking Process
                    {isReasoningStreaming && (
                      <span className="text-xs text-accent font-normal">streaming...</span>
                    )}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {isReasoningStreaming ? "Watch the AI analyze your paper in real-time" : "See how the AI analyzed your paper"}
                  </p>
                </div>
              </div>
              {isReasoningExpanded ? (
                <ChevronUp className="h-5 w-5 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-5 w-5 text-muted-foreground" />
              )}
            </button>

            <AnimatePresence>
              {isReasoningExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="border-t border-border"
                >
                  <div className="p-4 max-h-[40vh] overflow-y-auto">
                    <div className="prose prose-sm prose-invert max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-li:text-muted-foreground">
                      <ReactMarkdown>{reasoning}</ReactMarkdown>
                      {isReasoningStreaming && (
                        <span className="inline-block w-2 h-4 bg-accent animate-pulse ml-0.5" />
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Plan Display */}
      <AnimatePresence>
        {plan && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-card border border-border rounded-[6px] overflow-hidden"
          >
            {/* Header */}
            <button
              onClick={() => setIsPlanExpanded(!isPlanExpanded)}
              className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                  <Lightbulb className="h-4 w-4 text-accent" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold">Presentation Plan</h3>
                  <p className="text-sm text-muted-foreground">
                    {plan.slides.length} slides planned
                  </p>
                </div>
              </div>
              {isPlanExpanded ? (
                <ChevronUp className="h-5 w-5 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-5 w-5 text-muted-foreground" />
              )}
            </button>

            {/* Expanded Content */}
            <AnimatePresence>
              {isPlanExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="border-t border-border"
                >
                  <div className="p-4 space-y-4 max-h-[50vh] overflow-y-auto">
                    {/* Paper Summary */}
                    <div className="bg-muted/30 rounded-[6px] p-3">
                      <h4 className="font-medium text-sm mb-1">{plan.paperTitle}</h4>
                      <p className="text-sm text-muted-foreground">{plan.paperSummary}</p>
                    </div>

                    {/* Visual Theme */}
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-muted-foreground">Theme:</span>
                      <span className="capitalize">{plan.visualTheme.style}</span>
                      <span className="text-muted-foreground">|</span>
                      <span className="text-muted-foreground">Color:</span>
                      <div className="flex items-center gap-1.5">
                        <div 
                          className="w-4 h-4 rounded-full border border-border"
                          style={{ backgroundColor: plan.visualTheme.primaryColor }}
                        />
                        <span className="capitalize">{plan.visualTheme.primaryColor}</span>
                      </div>
                    </div>

                    {/* Narrative Flow */}
                    <div className="text-sm">
                      <span className="text-muted-foreground">Narrative: </span>
                      <span>{plan.narrativeFlow}</span>
                    </div>

                    {/* Slide Plans */}
                    <div className="space-y-3">
                      <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
                        Slide Outline
                      </h4>
                      {plan.slides.map((slide, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="border border-border rounded-[6px] p-3"
                        >
                          <div className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 text-xs font-medium text-accent">
                              {index + 1}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <h5 className="font-medium text-sm truncate">{slide.title}</h5>
                                <span className="text-xs px-1.5 py-0.5 rounded bg-muted text-muted-foreground capitalize">
                                  {slide.slideType}
                                </span>
                              </div>
                              <p className="text-xs text-muted-foreground mb-2">{slide.purpose}</p>
                              <div className="flex flex-wrap gap-1.5">
                                {slide.keyPoints.slice(0, 4).map((point, i) => (
                                  <span
                                    key={i}
                                    className="text-xs bg-muted/50 px-2 py-0.5 rounded-full truncate max-w-[200px]"
                                  >
                                    {point}
                                  </span>
                                ))}
                                {slide.keyPoints.length > 4 && (
                                  <span className="text-xs text-muted-foreground">
                                    +{slide.keyPoints.length - 4} more
                                  </span>
                                )}
                              </div>
                              <div className="mt-2 pt-2 border-t border-border/50">
                                <p className="text-xs text-muted-foreground">
                                  <span className="font-medium">Visual: </span>
                                  {slide.imageDescription.substring(0, 100)}...
                                </p>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
