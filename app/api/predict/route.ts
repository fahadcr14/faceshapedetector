import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
   console.log("Sending request to Hugging Face API...")
    // Get the form data from the request
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 })
    }

    // Create a new FormData to send to the external API
    const externalFormData = new FormData()
    externalFormData.append("file", file, "image.jpg")

    // Log the request for debugging
   

    // Call the external API (Hugging Face) with direct fetch instead of axios
    const response = await fetch("https://fahd9999-faceshapedetector.hf.space/predict", {
      method: "POST",
      body: externalFormData,
      // Add longer timeout
      signal: AbortSignal.timeout(60000), // 60 second timeout
    })

    // Check if the response is OK
    if (!response.ok) {
      const errorText = await response.text()
      console.error("Error response from API:", errorText)
      return NextResponse.json(
        { error: `API Error: ${response.status} ${response.statusText}` },
        { status: response.status },
      )
    }

    // Try to parse the response as JSON
    try {
      const data = await response.json()
      return NextResponse.json(data)
    } catch (parseError) {
      console.error("Error parsing JSON response:", parseError)
      return NextResponse.json({ error: "Invalid response format from API" }, { status: 500 })
    }
  } catch (error) {
    console.error("Error processing image:", error)

    // Handle different types of errors
    if (error instanceof Error) {
      return NextResponse.json({ error: `Error: ${error.message}` }, { status: 500 })
    }

    return NextResponse.json({ error: "Error processing image" }, { status: 500 })
  }
}

// This is a fallback implementation in case the external API is not available
export async function GET() {
  // Return a mock response for testing
  return NextResponse.json({
    oval: 75.2,
    round: 12.5,
    square: 5.8,
    heart: 3.2,
    diamond: 2.1,
    rectangular: 1.2,
  })
}

export const config = {
  api: {
    bodyParser: false,
  },
}

