"use client";

import { useEffect, useRef } from "react";
import katex from "katex";
import "katex/dist/katex.min.css";

interface EquationRendererProps {
  equation: string;
  displayMode?: boolean;
  className?: string;
}

export function EquationRenderer({
  equation,
  displayMode = true,
  className = "",
}: EquationRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      try {
        katex.render(equation, containerRef.current, {
          displayMode,
          throwOnError: false,
          trust: true,
        });
      } catch {
        containerRef.current.textContent = equation;
      }
    }
  }, [equation, displayMode]);

  return <div ref={containerRef} className={className} />;
}
