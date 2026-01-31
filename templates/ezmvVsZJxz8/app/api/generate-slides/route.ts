import { generateObject, streamText, experimental_generateImage as generateImage } from "ai";
import { 
  presentationPlanSchema, 
  presentationSchema, 
  type AudienceLevel, 
  type SlideWithImage, 
  type PresentationWithImages,
  type PresentationPlan 
} from "@/lib/schemas";

export const maxDuration = 60;

const audiencePrompts: Record<AudienceLevel, string> = {
  beginner: `Target audience: Complete beginners with no prior knowledge.
    - Use simple analogies and real-world examples
    - Avoid jargon; explain any technical terms
    - Focus on the "why" and intuition behind concepts`,
  intermediate: `Target audience: People with some background knowledge.
    - Balance technical accuracy with accessibility
    - Use appropriate terminology with brief explanations
    - Connect new concepts to familiar ones`,
  expert: `Target audience: Domain experts familiar with the field.
    - Be concise and technically precise
    - Focus on novel contributions and key technical insights
    - Include relevant equations and methodological details`,
};

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const audienceLevel = (formData.get("audienceLevel") as AudienceLevel) || "intermediate";

    if (!file) {
      return Response.json({ error: "Please upload a PDF file" }, { status: 400 });
    }

    const pdfData = await file.arrayBuffer();
    const base64Pdf = Buffer.from(pdfData).toString("base64");

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          // Phase 1: Stream reasoning tokens with extended thinking
          controller.enqueue(encoder.encode(JSON.stringify({ 
            phase: "thinking", 
            message: "Analyzing paper with extended thinking..." 
          }) + "\n"));

          let fullReasoning = "";
          
          // Use streamText with thinking enabled to stream reasoning tokens
          const thinkingStream = streamText({
            model: "anthropic/claude-sonnet-4",
            messages: [
              {
                role: "user",
                content: [
                  {
                    type: "file",
                    data: base64Pdf,
                    mediaType: "application/pdf",
                    filename: file.name,
                  },
                  {
                    type: "text",
                    text: `You are an expert educator who transforms academic papers into LEARNING EXPERIENCES, not just summaries.

${audiencePrompts[audienceLevel]}

TASK: Deeply analyze this paper to create an educational presentation. Your goal is to help the viewer truly UNDERSTAND the concepts, not just know facts about them.

1. PAPER ANALYSIS
   - What is the core contribution/innovation?
   - What problem does it solve and WHY does this problem matter?
   - What are the key technical components?
   - What are the results and their IMPLICATIONS?

2. EDUCATIONAL STRATEGY
   - What prior knowledge does this audience need activated?
   - What misconceptions might they have that we should address?
   - What's the best SEQUENCE to build understanding (simple to complex)?
   - What analogies, examples, or comparisons would make this click?
   - Where are the "aha moments" - the insights that make everything else make sense?

3. TEACHING APPROACH FOR EACH CONCEPT
   - Don't just state facts - EXPLAIN why things work the way they do
   - Use "because", "which means", "this enables" to show causality
   - Compare/contrast with familiar concepts when possible
   - Show the PROCESS of how things work, not just what they are

4. VISUAL PLANNING
   - Each diagram should TEACH something, not just decorate
   - For complex topics: use multi-panel layouts with distinct sections
   - Diagrams should show relationships, processes, or comparisons
   - Avoid generic illustrations - be specific about what to visualize

Think through this carefully. How can we make this paper truly educational?

Source: ${file.name}`,
                  },
                ],
              },
            ],
            providerOptions: {
              anthropic: {
                thinking: { type: "enabled", budgetTokens: 10000 },
              },
            },
            maxTokens: 16000,
          });

          // Stream reasoning tokens incrementally
          for await (const part of thinkingStream.fullStream) {
            if (part.type === "reasoning") {
              // Stream each reasoning token as it arrives
              controller.enqueue(encoder.encode(JSON.stringify({ 
                phase: "reasoning_delta", 
                delta: part.textDelta 
              }) + "\n"));
              fullReasoning += part.textDelta;
            }
          }

          // Get the final text (analysis output)
          const analysisText = await thinkingStream.text;

          // Signal reasoning is complete, now generate plan
          controller.enqueue(encoder.encode(JSON.stringify({ 
            phase: "planning", 
            message: "Creating presentation plan..." 
          }) + "\n"));

          // Generate structured plan based on the thinking
          const { object: plan } = await generateObject({
            model: "anthropic/claude-sonnet-4",
            schema: presentationPlanSchema,
            messages: [
              {
                role: "user",
                content: [
                  {
                    type: "file",
                    data: base64Pdf,
                    mediaType: "application/pdf",
                    filename: file.name,
                  },
                  {
                    type: "text",
                    text: `Based on your analysis, create an EDUCATIONAL presentation plan.

YOUR ANALYSIS:
${analysisText}

Create a structured plan with 8-12 slides that TEACH, not just inform.

SLIDE TYPES:
- "title": Opening slide with paper title
- "content": Focused explanation of ONE concept (4-8 bullet points that EXPLAIN)
- "multi-panel": Information-dense slide with 2-4 distinct sections for complex topics (like a consulting slide)
- "equation": For key mathematical formulas with explanation
- "summary": Closing slide with key takeaways

PREFER "multi-panel" for complex topics - it allows showing multiple aspects at once.
AVOID empty slides with just images. Every slide should be information-rich.

For each slide:
- slideNumber: Sequential number
- slideType: Choose based on content complexity
- title: Clear title that tells viewer what they'll LEARN
- learningObjective: "After this slide, the viewer will understand..."
- teachingApproach: How will we teach this? (compare/contrast, show process, explain causality, build intuition)
- keyPoints: 4-6 educational points that EXPLAIN, not just list
- diagramType: Best visualization type
- imageDescription: SPECIFIC diagram showing relationships/processes (not generic illustrations)

Source: ${file.name}`,
                  },
                ],
              },
            ],
            maxTokens: 8000,
          });

          controller.enqueue(encoder.encode(JSON.stringify({ 
            phase: "plan_complete", 
            plan,
            reasoning: fullReasoning || analysisText
          }) + "\n"));

          // Phase 2: Generate slides from plan
          controller.enqueue(encoder.encode(JSON.stringify({ 
            phase: "generating", 
            message: "Creating detailed slide content..." 
          }) + "\n"));

          const { object: presentation } = await generateObject({
            model: "anthropic/claude-sonnet-4",
            schema: presentationSchema,
            messages: [
              {
                role: "user",
                content: [
                  {
                    type: "file",
                    data: base64Pdf,
                    mediaType: "application/pdf",
                    filename: file.name,
                  },
                  {
                    type: "text",
                    text: `Generate a complete EDUCATIONAL presentation following this plan.

${audiencePrompts[audienceLevel]}

PRESENTATION PLAN:
Title: ${plan.paperTitle}
Summary: ${plan.paperSummary}
Visual Theme: ${plan.visualTheme.primaryColor} color, ${plan.visualTheme.style} style

SLIDE-BY-SLIDE PLAN:
${plan.slides.map((slide, i) => `
SLIDE ${i + 1}: ${slide.title}
- Type: ${slide.slideType}
- Learning Objective: ${slide.learningObjective}
- Teaching Approach: ${slide.teachingApproach}
- Key Points: ${slide.keyPoints.join("; ")}
- Diagram Type: ${slide.diagramType}
- Image Description: ${slide.imageDescription}
`).join("\n")}

CONTENT STYLE - TEACH, DON'T JUST INFORM:
- Use "because" to explain causality: "X works because Y"
- Use "which means" to show implications: "This means that..."
- Use "this enables" to show benefits: "This enables Z"
- Compare with familiar concepts: "Unlike X, this approach..."
- Show the process: "First... then... finally..."

SLIDE TYPE GUIDELINES:
- "multi-panel": Use 2-4 sections, each covering a different angle/question
  - Example sections: "The Problem", "The Solution", "How It Works", "Why It Matters"
- "content": 4-8 bullet points that EXPLAIN, each 15-25 words
- "numberedSteps": For processes, each step should say WHY it matters

VISUALIZATION PROMPT GUIDELINES:
- Every diagram should TEACH something
- For "multi-panel" slides: diagram should complement the sections, showing relationships or process
- Be SPECIFIC: "Flowchart with 4 boxes labeled X, Y, Z, W, connected by arrows showing data flow"
- Use ${plan.visualTheme.primaryColor} as accent color
- NO generic illustrations - show specific concepts from the paper

Source: ${file.name}`,
                  },
                ],
              },
            ],
            maxTokens: 12000,
          });

          controller.enqueue(encoder.encode(JSON.stringify({ 
            phase: "slides_complete", 
            message: "Generating visualizations..." 
          }) + "\n"));

          // Phase 3: Generate images
          const styleDirective = `Color scheme: ${plan.visualTheme.primaryColor} as primary accent. Theme: ${plan.visualTheme.style}.`;

          const diagramStyles: Record<string, string> = {
            flowchart: "Use clear directional arrows, numbered steps, rectangular boxes for processes.",
            architecture: "Use layered blocks, clear component boundaries, connecting lines showing data flow.",
            comparison: "Side-by-side layout with clear visual distinction, use contrasting shades.",
            "concept-map": "Central concept with radiating connections, consistent node shapes.",
            timeline: "Horizontal or vertical progression, clear markers for each stage.",
            "data-viz": "Simplified chart style, highlight key data points.",
            illustration: "Conceptual metaphor, clean symbolic representation.",
          };

          const slidesWithImages: SlideWithImage[] = await Promise.all(
            presentation.slides.map(async (slide) => {
              const isPosterSlide = slide.slideType === "poster";
              const basePrompt = slide.visualizationPrompt || `Educational illustration for: ${slide.title}`;
              const diagramStyle = diagramStyles[slide.diagramType] || diagramStyles.illustration;
              
              const fullPrompt = isPosterSlide
                ? `${basePrompt}. Style: Striking, high-impact conceptual illustration. Bold, modern, visually impressive. ${styleDirective} No text or labels.`
                : `${basePrompt}. ${diagramStyle} ${styleDirective} Clean white background, professional educational style. No text overlays.`;
              
              try {
                const imageResult = await generateImage({
                  model: "google/imagen-4.0-generate-001",
                  prompt: fullPrompt,
                  aspectRatio: "16:9",
                });

                if (imageResult.images && imageResult.images.length > 0) {
                  const image = imageResult.images[0];
                  return {
                    ...slide,
                    imageUrl: `data:${image.mediaType || "image/png"};base64,${image.base64}`,
                  };
                }
              } catch (imgError) {
                console.error("Error generating image for slide:", slide.title, imgError);
              }

              return slide;
            })
          );

          const presentationWithImages: PresentationWithImages = {
            ...presentation,
            slides: slidesWithImages,
          };

          controller.enqueue(encoder.encode(JSON.stringify({ 
            phase: "complete", 
            presentation: presentationWithImages 
          }) + "\n"));

          controller.close();
        } catch (error) {
          console.error("Error in generation pipeline:", error);
          controller.enqueue(encoder.encode(JSON.stringify({ 
            phase: "error", 
            error: "Failed to generate presentation. Please try again." 
          }) + "\n"));
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
      },
    });
  } catch (error) {
    console.error("Error generating slides:", error);
    return Response.json(
      { error: "Failed to generate presentation. Please try again." },
      { status: 500 }
    );
  }
}
