import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { generateMeetingSummary } from "@/lib/analysis"

interface MeetingSummaryProps {
  transcriptData: any[]
}

export function MeetingSummary({ transcriptData }: MeetingSummaryProps) {
  const summary = generateMeetingSummary(transcriptData)

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">Key Points</h3>
        <ul className="space-y-2">
          {summary.keyPoints.map((point, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="flex-shrink-0 h-5 w-5 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xs">
                {index + 1}
              </span>
              <span className="text-slate-700 dark:text-slate-300">{point}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">Topics Discussed</h3>
        <div className="flex flex-wrap gap-2">
          {summary.topics.map((topic, index) => (
            <Badge key={index} variant="secondary">
              {topic}
            </Badge>
          ))}
        </div>
      </div>

      <Card>
        <CardContent className="p-4">
          <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">Executive Summary</h3>
          <p className="text-slate-700 dark:text-slate-300 whitespace-pre-line">{summary.executiveSummary}</p>
        </CardContent>
      </Card>

      <div>
        <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">Next Steps</h3>
        <ul className="space-y-2">
          {summary.nextSteps.map((step, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="flex-shrink-0 h-5 w-5 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xs">
                →
              </span>
              <span className="text-slate-700 dark:text-slate-300">{step}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
