import { Suspense } from "react"
import { MeetingDashboard } from "@/components/meeting-dashboard"
import { LoadingDashboard } from "@/components/loading-dashboard"
import { FileUploader } from "@/components/file-uploader"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white">MeetingMind</h1>
          <p className="mt-2 text-lg text-slate-600 dark:text-slate-300">
            Never lose track of decisions and action items from your meetings
          </p>
        </header>

        <FileUploader />

        <Suspense fallback={<LoadingDashboard />}>
          <MeetingDashboard />
        </Suspense>
      </div>
    </main>
  )
}
