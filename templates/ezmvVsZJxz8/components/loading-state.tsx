"use client";

import { motion } from "framer-motion";
import { FileText, Brain, Presentation } from "lucide-react";

interface LoadingStateProps {
  step: "fetching" | "analyzing" | "generating";
}

const steps = [
  { id: "fetching", label: "Fetching paper", icon: FileText },
  { id: "analyzing", label: "Analyzing content", icon: Brain },
  { id: "generating", label: "Creating slides", icon: Presentation },
];

export function LoadingState({ step }: LoadingStateProps) {
  const currentIndex = steps.findIndex((s) => s.id === step);

  return (
    <div className="w-full max-w-md mx-auto py-12">
      <div className="flex flex-col items-center gap-8">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="w-16 h-16 rounded-full border-4 border-accent border-t-transparent"
        />

        <div className="flex items-center gap-4 w-full">
          {steps.map((s, i) => {
            const Icon = s.icon;
            const isActive = i === currentIndex;
            const isComplete = i < currentIndex;

            return (
              <div key={s.id} className="flex-1 flex flex-col items-center gap-2">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0.5 }}
                  animate={{
                    scale: isActive ? 1.1 : 1,
                    opacity: isActive || isComplete ? 1 : 0.5,
                  }}
                  transition={{ duration: 0.3 }}
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    isComplete
                      ? "bg-accent text-accent-foreground"
                      : isActive
                        ? "bg-accent/20 text-accent"
                        : "bg-muted text-muted-foreground"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </motion.div>
                <span
                  className={`text-sm text-center ${
                    isActive ? "text-foreground font-medium" : "text-muted-foreground"
                  }`}
                >
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>

        <p className="text-muted-foreground text-center">
          This may take a minute depending on the paper length...
        </p>
      </div>
    </div>
  );
}
