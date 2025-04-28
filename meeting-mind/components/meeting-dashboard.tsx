import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TranscriptViewer } from "@/components/transcript-viewer"
import { ActionItems } from "@/components/action-items"
import { Decisions } from "@/components/decisions"
import { MeetingSummary } from "@/components/meeting-summary"
import { AIAutomationPanel } from "@/components/ai-automation-panel"
import { fetchTranscriptData } from "@/lib/data"

export async function MeetingDashboard() {
  const transcriptData = await fetchTranscriptData()

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Meeting Overview</CardTitle>
          <CardDescription>Weekly Team Sync - {new Date().toLocaleDateString()}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
              <h3 className="font-medium text-slate-900 dark:text-white">Participants</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                {Array.from(new Set(transcriptData.map((item) => item.speaker))).length} team members
              </p>
            </div>
            <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
              <h3 className="font-medium text-slate-900 dark:text-white">Duration</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                {transcriptData.length > 0
                  ? `${transcriptData[0].timestamp} - ${transcriptData[transcriptData.length - 1].timestamp}`
                  : "N/A"}
              </p>
            </div>
            <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
              <h3 className="font-medium text-slate-900 dark:text-white">Action Items</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                {extractActionItems(transcriptData).length} identified
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <AIAutomationPanel transcriptData={transcriptData} />

      <Tabs defaultValue="summary" className="w-full">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="transcript">Transcript</TabsTrigger>
          <TabsTrigger value="action-items">Action Items</TabsTrigger>
          <TabsTrigger value="decisions">Decisions</TabsTrigger>
        </TabsList>

        <TabsContent value="summary">
          <Card>
            <CardHeader>
              <CardTitle>Meeting Summary</CardTitle>
              <CardDescription>AI-generated summary of key points discussed</CardDescription>
            </CardHeader>
            <CardContent>
              <MeetingSummary transcriptData={transcriptData} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transcript">
          <Card>
            <CardHeader>
              <CardTitle>Meeting Transcript</CardTitle>
              <CardDescription>Complete transcript of the meeting</CardDescription>
            </CardHeader>
            <CardContent>
              <TranscriptViewer transcriptData={transcriptData} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="action-items">
          <Card>
            <CardHeader>
              <CardTitle>Action Items</CardTitle>
              <CardDescription>Tasks assigned during the meeting</CardDescription>
            </CardHeader>
            <CardContent>
              <ActionItems transcriptData={transcriptData} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="decisions">
          <Card>
            <CardHeader>
              <CardTitle>Decisions Made</CardTitle>
              <CardDescription>Key decisions from the meeting</CardDescription>
            </CardHeader>
            <CardContent>
              <Decisions transcriptData={transcriptData} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function extractActionItems(transcriptData: any[]) {
  // This is a simple implementation - in a real app, you'd use NLP
  return transcriptData.filter((item) => {
    // Check if item and item.text exist before calling toLowerCase()
    if (!item || !item.text) return false

    const text = item.text.toLowerCase()
    return (
      (text.includes("action item") ||
        text.includes("todo") ||
        text.includes("to do") ||
        text.includes("will") ||
        text.includes("should") ||
        text.includes("need to") ||
        text.includes("going to")) &&
      !text.includes("?")
    )
  })
}
