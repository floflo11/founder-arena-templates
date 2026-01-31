"use client";

import React from "react";
import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import type { AudienceLevel } from "@/lib/schemas";
import { Upload, FileText, Loader2 } from "lucide-react";

interface UploadFormProps {
  onSubmit: (data: {
    file: File;
    audienceLevel: AudienceLevel;
  }) => void;
  isLoading: boolean;
}

export function UploadForm({ onSubmit, isLoading }: UploadFormProps) {
  const [file, setFile] = useState<File | null>(null);
  const [audienceLevel, setAudienceLevel] = useState<AudienceLevel>("intermediate");
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type === "application/pdf") {
        setFile(droppedFile);
      }
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    if (file) {
      onSubmit({ file, audienceLevel });
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <div
        className={cn(
          "relative border-2 border-dashed rounded-[6px] p-10 text-center transition-colors cursor-pointer",
          dragActive ? "border-accent bg-accent/10" : "border-border hover:border-muted-foreground/50",
          file && "border-accent bg-accent/5"
        )}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        {file ? (
          <div className="flex flex-col items-center gap-3">
            <FileText className="h-12 w-12 text-accent" />
            <p className="font-medium text-lg">{file.name}</p>
            <p className="text-sm text-muted-foreground">
              {(file.size / 1024 / 1024).toFixed(2)} MB
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                setFile(null);
              }}
            >
              Remove
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <Upload className="h-12 w-12 text-muted-foreground" />
            <p className="font-medium text-lg">Drop your PDF here</p>
            <p className="text-sm text-muted-foreground">or click to browse</p>
          </div>
        )}
        <input
          type="file"
          accept=".pdf,application/pdf"
          onChange={handleFileChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
      </div>

      <div className="mt-8 space-y-4">
        <div className="space-y-3">
          <Label>Audience Level</Label>
          <div className="flex gap-2">
            {(["beginner", "intermediate", "expert"] as const).map((level) => (
              <Button
                key={level}
                type="button"
                variant={audienceLevel === level ? "default" : "outline"}
                onClick={() => setAudienceLevel(level)}
                className="flex-1 capitalize"
              >
                {level}
              </Button>
            ))}
          </div>
          <p className="text-sm text-muted-foreground">
            {audienceLevel === "beginner" &&
              "Simple explanations with analogies, minimal jargon"}
            {audienceLevel === "intermediate" &&
              "Balanced technical detail with clear explanations"}
            {audienceLevel === "expert" &&
              "Concise technical content, assumes domain knowledge"}
          </p>
        </div>

        <Button
          onClick={handleSubmit}
          disabled={!file || isLoading}
          className="w-full h-12 text-base"
          size="lg"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Generating Presentation...
            </>
          ) : (
            "Transform into Learning Content"
          )}
        </Button>
      </div>
    </div>
  );
}
