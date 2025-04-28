import { ThumbsUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { extractDecisions } from "@/lib/analysis"

interface DecisionsProps {
  transcriptData: any[]
}

export function Decisions({ transcriptData }: DecisionsProps) {
  const decisions = extractDecisions(transcriptData)

  return (
    <div className="space-y-4">
      {decisions.length === 0 ? (
        <p className="text-center text-slate-500 dark:text-slate-400 py-8">No decisions identified in this meeting.</p>
      ) : (
        decisions.map((decision, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <ThumbsUp className="h-4 w-4 text-green-600 dark:text-green-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-slate-900 dark:text-white">{decision.text}</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Badge variant="outline">{decision.category}</Badge>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Made at {decision.timestamp} by {decision.speaker}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  )
}
