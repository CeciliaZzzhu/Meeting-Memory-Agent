import Papa from "papaparse"

export interface TranscriptItem {
  timestamp: string
  speaker: string
  text: string
}

export async function fetchTranscriptData(): Promise<TranscriptItem[]> {
  // Check if we have data in sessionStorage from a file upload
  const sessionData = typeof window !== "undefined" ? sessionStorage.getItem("meetingTranscript") : null

  if (sessionData) {
    try {
      return JSON.parse(sessionData) as TranscriptItem[]
    } catch (error) {
      console.error("Error parsing session data:", error)
      // Fall back to fetching from URL if session data is invalid
    }
  }

  // If no session data, fetch from the default URL
  try {
    const response = await fetch(
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Week1%20-%20Problem_3_-_Messy_Meeting_Transcript-ZVnaaFveYmSH5WlIvEoyU31UdSZQpy.csv",
    )

    if (!response.ok) {
      throw new Error(`Failed to fetch transcript: ${response.status}`)
    }

    const csvText = await response.text()

    return new Promise((resolve, reject) => {
      Papa.parse(csvText, {
        header: true,
        complete: (results) => {
          resolve(results.data as TranscriptItem[])
        },
        error: (error) => {
          reject(error)
        },
      })
    })
  } catch (error) {
    console.error("Error fetching transcript data:", error)
    return []
  }
}
