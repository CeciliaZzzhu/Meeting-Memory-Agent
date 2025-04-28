"use client"

import { useState } from "react"
import { Clock, User } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { analyzeActionItems } from "@/lib/analysis"

interface ActionItemsProps {
  transcriptData: any[]
}

export function ActionItems({ transcriptData }: ActionItemsProps) {
  const actionItems = analyzeActionItems(transcriptData)
  const [completedItems, setCompletedItems] = useState<string[]>([])

  const toggleComplete = (id: string) => {
    setCompletedItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  return (
    <div className="space-y-4">
      {actionItems.length === 0 ? (
        <p className="text-center text-slate-500 dark:text-slate-400 py-8">
          No action items identified in this meeting.
        </p>
      ) : (
        actionItems.map((item, index) => (
          <Card key={index} className={`${completedItems.includes(item.id) ? "bg-slate-50 dark:bg-slate-900/50" : ""}`}>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Checkbox
                  id={item.id}
                  checked={completedItems.includes(item.id)}
                  onCheckedChange={() => toggleComplete(item.id)}
                  className="mt-1"
                />
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                    <label
                      htmlFor={item.id}
                      className={`font-medium ${completedItems.includes(item.id) ? "line-through text-slate-500 dark:text-slate-400" : "text-slate-900 dark:text-white"}`}
                    >
                      {item.text}
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {item.assignee && (
                        <Badge variant="outline" className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {item.assignee}
                        </Badge>
                      )}
                      {item.dueDate && (
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {item.dueDate}
                        </Badge>
                      )}
                      <Badge
                        variant={
                          item.priority === "high"
                            ? "destructive"
                            : item.priority === "medium"
                              ? "default"
                              : "secondary"
                        }
                      >
                        {item.priority} priority
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    From {item.speaker} at {item.timestamp}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  )
}
