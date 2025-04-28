import type { TranscriptItem } from "./data"

interface ActionItem {
  id: string
  text: string
  speaker: string
  timestamp: string
  assignee: string | null
  dueDate: string | null
  priority: "low" | "medium" | "high"
}

interface Decision {
  text: string
  speaker: string
  timestamp: string
  category: string
}

interface MeetingSummary {
  keyPoints: string[]
  topics: string[]
  executiveSummary: string
  nextSteps: string[]
}

export function analyzeActionItems(transcriptData: TranscriptItem[]): ActionItem[] {
  // In a real application, this would use NLP/AI to extract action items
  // This is a simplified implementation for demonstration purposes

  const actionItemPatterns = [
    { regex: /action item:?\s*(.*)/i, priority: "high" },
    { regex: /todo:?\s*(.*)/i, priority: "medium" },
    { regex: /need to\s*(.*)/i, priority: "medium" },
    { regex: /should\s*(.*)/i, priority: "low" },
    { regex: /will\s*(.*)/i, priority: "medium" },
    { regex: /going to\s*(.*)/i, priority: "medium" },
  ]

  const assigneePatterns = [
    /(\w+) will/i,
    /(\w+) should/i,
    /(\w+) needs to/i,
    /assign(?:ed)? to (\w+)/i,
    /(\w+)'s responsibility/i,
  ]

  const dueDatePatterns = [
    /by (tomorrow|monday|tuesday|wednesday|thursday|friday|saturday|sunday)/i,
    /by (next week|end of week|end of day|eod|eow)/i,
    /by (\d{1,2}(?:st|nd|rd|th)? (?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec))/i,
  ]

  const actionItems: ActionItem[] = []

  transcriptData.forEach((item, index) => {
    // Skip if item or item.text is undefined or null
    if (!item || !item.text) return

    for (const pattern of actionItemPatterns) {
      const match = item.text.match(pattern.regex)
      if (match && match[1]) {
        // Extract the action item text
        const actionText = match[1].trim()

        // Skip if it's a question
        if (actionText.endsWith("?")) continue

        // Try to find assignee
        let assignee = null
        for (const assigneePattern of assigneePatterns) {
          const assigneeMatch = item.text.match(assigneePattern)
          if (assigneeMatch && assigneeMatch[1]) {
            assignee = assigneeMatch[1]
            break
          }
        }

        // Try to find due date
        let dueDate = null
        for (const dueDatePattern of dueDatePatterns) {
          const dueDateMatch = item.text.match(dueDatePattern)
          if (dueDateMatch && dueDateMatch[1]) {
            dueDate = dueDateMatch[1]
            break
          }
        }

        actionItems.push({
          id: `action-${index}-${actionItems.length}`,
          text: actionText,
          speaker: item.speaker || "Unknown",
          timestamp: item.timestamp || "Unknown",
          assignee,
          dueDate,
          priority: pattern.priority as "low" | "medium" | "high",
        })
      }
    }
  })

  return actionItems
}

export function extractDecisions(transcriptData: TranscriptItem[]): Decision[] {
  // In a real application, this would use NLP/AI to extract decisions
  // This is a simplified implementation for demonstration purposes

  const decisionPatterns = [
    { regex: /(?:we|I) decided\s*(.*)/i, category: "Team Decision" },
    { regex: /decision:?\s*(.*)/i, category: "Formal Decision" },
    { regex: /(?:we|I) agreed\s*(.*)/i, category: "Agreement" },
    { regex: /(?:we|I) will go with\s*(.*)/i, category: "Selection" },
    { regex: /(?:we|I) chose\s*(.*)/i, category: "Selection" },
    { regex: /(?:we|I) approved\s*(.*)/i, category: "Approval" },
  ]

  const decisions: Decision[] = []

  transcriptData.forEach((item) => {
    // Skip if item or item.text is undefined or null
    if (!item || !item.text) return

    for (const pattern of decisionPatterns) {
      const match = item.text.match(pattern.regex)
      if (match && match[1]) {
        decisions.push({
          text: match[1].trim(),
          speaker: item.speaker || "Unknown",
          timestamp: item.timestamp || "Unknown",
          category: pattern.category,
        })
      }
    }
  })

  return decisions
}

export function generateMeetingSummary(transcriptData: TranscriptItem[]): MeetingSummary {
  // In a real application, this would use AI to generate a proper summary
  // This is a simplified implementation for demonstration purposes

  // Extract speakers
  const speakers = Array.from(new Set(transcriptData.map((item) => item.speaker)))

  // Combine all text for simple keyword extraction
  const allText = transcriptData.map((item) => item.text).join(" ")

  // Simple topic extraction based on word frequency
  const words = allText
    .toLowerCase()
    .split(/\W+/)
    .filter(
      (word) =>
        word.length > 3 &&
        ![
          "this",
          "that",
          "there",
          "their",
          "about",
          "would",
          "should",
          "could",
          "have",
          "were",
          "what",
          "when",
          "where",
          "which",
          "with",
        ].includes(word),
    )

  const wordFrequency: Record<string, number> = {}
  words.forEach((word) => {
    wordFrequency[word] = (wordFrequency[word] || 0) + 1
  })

  const topics = Object.entries(wordFrequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([word]) => word.charAt(0).toUpperCase() + word.slice(1))

  // Extract action items for next steps
  const actionItems = analyzeActionItems(transcriptData)
  const nextSteps = actionItems.slice(0, 3).map((item) => item.text)

  // Generate key points (simplified)
  const keyPoints = [
    `Meeting attended by ${speakers.length} participants: ${speakers.slice(0, 3).join(", ")}${speakers.length > 3 ? "..." : ""}`,
    `Discussed ${topics.length} main topics including ${topics.slice(0, 3).join(", ")}`,
    `Identified ${actionItems.length} action items to be completed`,
  ]

  // Generate executive summary
  const executiveSummary = `This meeting focused primarily on ${topics.slice(0, 2).join(" and ")}. 
The team discussed various aspects of the project and identified key action items that need to be addressed.
${actionItems.length > 0 ? `The most important action item is "${actionItems[0].text}" assigned to ${actionItems[0].assignee || "the team"}.` : ""}
${nextSteps.length > 0 ? "The team agreed on next steps to move the project forward." : ""}`

  return {
    keyPoints,
    topics,
    executiveSummary,
    nextSteps:
      nextSteps.length > 0
        ? nextSteps
        : ["Schedule follow-up meeting", "Review action items", "Share meeting notes with the team"],
  }
}
