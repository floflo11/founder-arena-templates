import { type NextRequest, NextResponse } from "next/server"
import { fal } from '@ai-sdk/fal'
import { experimental_generateImage as generateImage } from 'ai'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const imageFile = formData.get("image") as File
    const prompt = (formData.get("prompt") as string) || "barco navegando en el mar"
    const seed = Number.parseInt((formData.get("seed") as string) || "0")
    const strength = Number.parseFloat((formData.get("strength") as string) || "0.8")

    if (!imageFile) {
      return NextResponse.json({ error: "Missing image" }, { status: 400 })
    }

    // Convert image file to base64
    const imageBuffer = await imageFile.arrayBuffer()
    const imageBase64 = Buffer.from(imageBuffer).toString("base64")
    const imageDataUrl = `data:${imageFile.type};base64,${imageBase64}`

    // Use AI SDK with fal provider
    const { image } = await generateImage({
      model: fal.image('fal-ai/lcm-sd15-i2i'),
      prompt: prompt,
      providerOptions: {
        fal: {
          image_url: imageDataUrl,
          strength: strength,
          num_inference_steps: 2,
          guidance_scale: 1.0,
          seed: seed,
        },
      },
    })

    // Convert the generated image to a data URL for response
    const imageUrl = `data:image/png;base64,${Buffer.from(image.uint8Array).toString('base64')}`

    return NextResponse.json({
      imageUrl: imageUrl,
    })
  } catch (error) {
    console.error("Error generating image:", error)
    return NextResponse.json({ error: "Failed to generate image" }, { status: 500 })
  }
}
