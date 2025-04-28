"use client"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AIAutomationPanel } from "@/components/ai-automation-panel"
import Link from "next/link"

export default function AutomationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-indigo-50 dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/">
            <Button variant="ghost" className="text-violet-600 hover:bg-violet-50 -ml-4">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white">AI Automation Assistant</h1>
          <p className="mt-2 text-slate-600 dark:text-slate-300">
            Automatically extract decisions, assign action items, and follow up to make your meetings more efficient
          </p>
        </div>

        <AIAutomationPanel />

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-medium mb-2">Automatic Decision Extraction</h3>
            <p className="text-gray-600 dark:text-gray-300">
              AI automatically analyzes meeting transcripts, identifies and extracts key decisions without manual
              effort. The system recognizes decision points based on context and language patterns, categorizing them by
              type.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-medium mb-2">Intelligent Action Item Assignment</h3>
            <p className="text-gray-600 dark:text-gray-300">
              The system automatically assigns action items to the most appropriate team members based on meeting
              content, participant roles, and historical data, setting reasonable deadlines and priorities.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-medium mb-2">Automatic Follow-up Reminders</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Based on action item deadlines and priorities, the system automatically schedules follow-up reminders,
              notifying relevant team members via email or message to ensure all tasks are completed on time.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
