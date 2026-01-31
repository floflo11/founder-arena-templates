"use client";

import { useState } from "react";
import { UploadForm } from "@/components/upload-form";
import { PlanningDisplay } from "@/components/planning-display";
import { SlideViewer } from "@/components/slide-viewer";
import type { PresentationWithImages, PresentationPlan, AudienceLevel } from "@/lib/schemas";
import { Sparkles, BookOpen, Clock, Users } from "lucide-react";

type AppState = "upload" | "processing" | "viewing";
type ProcessingPhase = "thinking" | "reasoning_complete" | "generating" | "slides_complete" | "complete" | "error";

export default function Home() {
  const [appState, setAppState] = useState<AppState>("upload");
  const [processingPhase, setProcessingPhase] = useState<ProcessingPhase>("thinking");
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [reasoning, setReasoning] = useState<string | null>(null);
  const [plan, setPlan] = useState<PresentationPlan | null>(null);
  const [presentation, setPresentation] = useState<PresentationWithImages | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: {
    file: File;
    audienceLevel: AudienceLevel;
  }) => {
    setAppState("processing");
    setProcessingPhase("thinking");
    setStatusMessage("Analyzing paper with extended thinking...");
    setReasoning(null);
    setPlan(null);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("audienceLevel", data.audienceLevel);
      formData.append("file", data.file);

      const response = await fetch("/api/generate-slides", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to generate presentation");
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error("No response body");

      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (!line.trim()) continue;
          
          try {
            const update = JSON.parse(line);
            
            switch (update.phase) {
              case "thinking":
                setProcessingPhase("thinking");
                setStatusMessage(update.message);
                break;
              case "reasoning_delta":
                // Stream reasoning tokens incrementally
                setReasoning(prev => (prev || "") + update.delta);
                break;
              case "planning":
                setStatusMessage(update.message);
                break;
              case "plan_complete":
                setProcessingPhase("reasoning_complete");
                if (update.reasoning) {
                  setReasoning(update.reasoning);
                }
                setPlan(update.plan);
                setStatusMessage("Plan created! Now generating slides...");
                break;
              case "generating":
                setProcessingPhase("generating");
                setStatusMessage(update.message);
                break;
              case "slides_complete":
                setProcessingPhase("slides_complete");
                setStatusMessage(update.message);
                break;
              case "complete":
                setProcessingPhase("complete");
                setPresentation(update.presentation);
                setAppState("viewing");
                break;
              case "error":
                setProcessingPhase("error");
                setError(update.error);
                setAppState("upload");
                break;
            }
          } catch {
            // Skip invalid JSON lines
          }
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setAppState("upload");
    }
  };

  const handleReset = () => {
    setAppState("upload");
    setPresentation(null);
    setReasoning(null);
    setPlan(null);
    setError(null);
  };

  if (appState === "viewing" && presentation) {
    return <SlideViewer presentation={presentation} onReset={handleReset} />;
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 md:py-20">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-accent/20 text-accent-foreground px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            <Sparkles className="h-4 w-4" />
            AI-Powered Learning
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-balance mb-4">
            Transform papers into
            <span className="block text-accent">visual learning</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Turn complex academic papers into digestible animated presentations. 
            Just upload a PDF and let AI do the rest.
          </p>
        </div>

        {/* Features Grid - Only show on upload state */}
        {appState === "upload" && (
          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-12">
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center mb-3">
                <BookOpen className="h-5 w-5 text-accent" />
              </div>
              <h3 className="font-medium mb-1">Easy to Understand</h3>
              <p className="text-sm text-muted-foreground">
                Complex concepts broken into clear slides
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center mb-3">
                <Clock className="h-5 w-5 text-accent" />
              </div>
              <h3 className="font-medium mb-1">Save Time</h3>
              <p className="text-sm text-muted-foreground">
                Grasp key insights in minutes, not hours
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center mb-3">
                <Users className="h-5 w-5 text-accent" />
              </div>
              <h3 className="font-medium mb-1">Adaptive Content</h3>
              <p className="text-sm text-muted-foreground">
                Choose your expertise level
              </p>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="max-w-xl mx-auto mb-8 p-4 bg-destructive/10 border border-destructive/20 rounded-[6px] text-center">
            <p className="text-destructive">{error}</p>
          </div>
        )}

        {/* Processing State with Planning Display */}
        {appState === "processing" ? (
          <PlanningDisplay 
            plan={plan}
            reasoning={reasoning}
            currentPhase={processingPhase} 
            message={statusMessage}
          />
        ) : (
          <UploadForm onSubmit={handleSubmit} isLoading={false} />
        )}
      </div>
    </main>
  );
}
