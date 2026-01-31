import { z } from "zod";

// Phase 1: Planning schema - lightweight outline before full generation
export const slidePlanSchema = z.object({
  slideNumber: z.number(),
  slideType: z.enum(["title", "content", "multi-panel", "equation", "summary"]).describe("Prefer 'multi-panel' for complex topics, 'content' for focused explanations"),
  title: z.string().describe("Clear title that tells the viewer what they'll learn"),
  learningObjective: z.string().describe("Complete this: 'After this slide, the viewer will understand...'"),
  teachingApproach: z.string().describe("How will we teach this? (e.g., 'compare/contrast', 'show the process', 'explain cause and effect', 'build intuition through analogy')"),
  keyPoints: z.array(z.string()).describe("4-6 key points to cover on this slide"),
  diagramType: z.enum(["flowchart", "architecture", "comparison", "concept-map", "timeline", "data-viz", "illustration"]),
  imageDescription: z.string().describe("Specific diagram description: what elements to show, how they connect, what the viewer should see"),
});

export const presentationPlanSchema = z.object({
  paperTitle: z.string(),
  paperSummary: z.string().describe("2-3 sentence summary of the paper's main contribution"),
  targetAudience: z.string().describe("Brief description of who this presentation is for"),
  visualTheme: z.object({
    primaryColor: z.string().describe("Main color for diagrams (e.g., 'blue', 'teal', 'orange')"),
    style: z.enum(["technical", "scientific", "business", "creative"]),
  }),
  slides: z.array(slidePlanSchema).describe("Array of 8-12 slide plans"),
  narrativeFlow: z.string().describe("Brief description of how the slides tell a cohesive story"),
});

export type SlidePlan = z.infer<typeof slidePlanSchema>;
export type PresentationPlan = z.infer<typeof presentationPlanSchema>;

export const diagramTypes = [
  "flowchart",      // For processes, methods, pipelines
  "architecture",   // For system designs, model structures
  "comparison",     // For before/after, vs, trade-offs
  "concept-map",    // For relationships between ideas
  "timeline",       // For sequential events or evolution
  "data-viz",       // For results, metrics, performance
  "illustration",   // For conceptual/abstract ideas
] as const;

// Content section for richer slide layouts (like consulting slides with multiple panels)
export const contentSectionSchema = z.object({
  heading: z.string().describe("Section heading - be specific (e.g., 'Key Challenges', 'How It Works', 'Why This Matters')"),
  items: z.array(z.string()).describe("3-6 informative items that EXPLAIN rather than just list. Each item should teach something."),
  highlightColor: z.string().optional().describe("Optional accent color for key terms (e.g., 'blue', 'green')"),
});

export const slideSchema = z.object({
  slideType: z.enum(["title", "content", "multi-panel", "equation", "summary"]).describe("'multi-panel' for information-dense slides with 2-4 distinct sections; 'content' for focused single-topic slides"),
  title: z.string().describe("Clear, descriptive title that tells the viewer what they'll learn"),
  subtitle: z.string().optional().describe("Key insight or takeaway from this slide - helps guide understanding"),
  // For multi-panel slides (like the Market Analysis example)
  sections: z.array(contentSectionSchema).optional().describe("For multi-panel slides: 2-4 distinct sections covering different aspects. Each section should answer a specific question or cover a specific angle."),
  // For focused content slides
  bulletPoints: z.array(z.string()).optional().describe("For content slides: 4-8 educational points that EXPLAIN concepts, not just list facts. Use 'because', 'which means', 'this enables' to show relationships."),
  // Numbered steps for processes/methods
  numberedSteps: z.array(z.string()).optional().describe("For processes: step-by-step explanation with WHY each step matters"),
  // Key insight callout
  keyInsight: z.string().optional().describe("One sentence that captures the most important takeaway - displayed prominently"),
  speakerNotes: z.string().describe("Deeper explanation: the 'why', implications, and connections to other concepts"),
  equation: z.string().optional().describe("LaTeX equation if applicable"),
  diagramType: z.enum(diagramTypes).describe("The type of diagram that best illustrates this slide's content"),
  visualizationPrompt: z.string().describe("REQUIRED: Specific diagram description. Include: type, key elements, labels, layout, and how it relates to the text content."),
  imageRelationship: z.string().describe("Explicitly state how the image supports the content"),
});

// Extended slide type with generated image
export interface SlideWithImage extends z.infer<typeof slideSchema> {
  imageUrl?: string;
}

export const visualStyleSchema = z.object({
  primaryColor: z.string().describe("Main accent color for diagrams - e.g., 'blue', 'teal', 'orange'"),
  theme: z.enum(["technical", "scientific", "business", "creative"]).describe("Overall visual theme based on paper domain"),
  iconStyle: z.enum(["minimal-line", "filled", "outline"]).describe("Consistent icon style across all diagrams"),
});

export const presentationSchema = z.object({
  title: z.string().describe("The title of the paper"),
  authors: z.string().optional().describe("Authors of the paper"),
  abstract: z.string().describe("A brief summary of the paper in 2-3 sentences"),
  visualStyle: visualStyleSchema.describe("Consistent visual style for all diagrams"),
  slides: z.array(slideSchema).describe("Array of slides for the presentation"),
  keyTakeaways: z.array(z.string()).describe("3-5 key takeaways from the paper"),
});

export type Slide = z.infer<typeof slideSchema>;
export type Presentation = z.infer<typeof presentationSchema>;

export interface PresentationWithImages extends Omit<Presentation, 'slides'> {
  slides: SlideWithImage[];
}

export const audienceLevels = ["beginner", "intermediate", "expert"] as const;
export type AudienceLevel = (typeof audienceLevels)[number];
