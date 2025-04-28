"use client"

import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { EmailSender } from "@/components/email-sender"
import Link from "next/link"

export default function EmailPage() {
  const [meetingData] = useState({
    meetingTitle: "Product Development Weekly",
    participants: ["john.smith@example.com", "sarah.lee@example.com", "mike.chen@example.com", "lisa.wong@example.com"],
    actionItems: [
      { id: "1", text: "Update product roadmap", assignee: "John Smith", dueDate: "Next Monday", priority: "high" },
      { id: "2", text: "Review UI design mockups", assignee: "Sarah Lee", dueDate: "Wednesday", priority: "medium" },
      { id: "3", text: "Prepare Q3 quarterly report", assignee: "Mike Chen", dueDate: "Friday", priority: "high" },
      {
        id: "4",
        text: "Confirm requirement changes with client",
        assignee: "Lisa Wong",
        dueDate: "This week",
        priority: "medium",
      },
    ],
    decisions: [
      { text: "Adopt new design system", category: "Design", speaker: "Sarah Lee" },
      { text: "Postpone feature launch to Q4", category: "Product", speaker: "John Smith" },
      { text: "Increase testing resources to improve quality", category: "Engineering", speaker: "Mike Chen" },
    ],
    summary: {
      keyPoints: [
        "Team is on track for Q3 goals",
        "New design system will be implemented next sprint",
        "Customer feedback has been positive on recent changes",
      ],
      topics: ["Design System", "Q3 Goals", "Customer Feedback", "Feature Launch"],
      nextSteps: ["Schedule design system training", "Prepare for Q4 planning", "Follow up with key customers"],
    },
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/follow-up">
            <Button variant="ghost" className="text-blue-600 hover:bg-blue-50 -ml-4">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Follow-up Page
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Send Meeting Summary Email</h1>
          <p className="mt-2 text-slate-600 dark:text-slate-300">
            Create and send meeting summary emails to all participants
          </p>
        </div>

        <EmailSender
          meetingTitle={meetingData.meetingTitle}
          participants={meetingData.participants}
          actionItems={meetingData.actionItems}
          decisions={meetingData.decisions}
          summary={meetingData.summary}
        />
      </div>
    </div>
  )
}
