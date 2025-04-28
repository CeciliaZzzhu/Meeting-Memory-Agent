"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Calendar, CheckCircle, Clock, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function FollowUpHeader() {
  const [progress] = useState(75)

  return (
    <div className="bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 text-white">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <Link href="/">
              <Button variant="ghost" className="text-white hover:bg-white/10 -ml-4 mb-2">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
              </Button>
            </Link>
            <h1 className="text-3xl font-bold">Meeting Follow-up</h1>
            <p className="text-indigo-100 mt-1">Ensure nothing falls through the cracks after your meeting</p>
          </div>

          <div className="flex flex-col items-end">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-indigo-100">Follow-up completion</span>
              <span className="font-bold">{progress}%</span>
            </div>
            <Progress value={progress} className="w-48 h-2 bg-white/20" indicatorClassName="bg-white" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <Card className="bg-white/10 border-none shadow-lg backdrop-blur-sm">
            <div className="p-4 flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-lg">
                <CheckCircle className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-indigo-100">Action Items</p>
                <p className="font-bold">8 items (5 assigned)</p>
              </div>
            </div>
          </Card>

          <Card className="bg-white/10 border-none shadow-lg backdrop-blur-sm">
            <div className="p-4 flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-lg">
                <MessageSquare className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-indigo-100">Decisions Made</p>
                <p className="font-bold">3 key decisions</p>
              </div>
            </div>
          </Card>

          <Card className="bg-white/10 border-none shadow-lg backdrop-blur-sm">
            <div className="p-4 flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-lg">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-indigo-100">Meeting Duration</p>
                <p className="font-bold">45 minutes</p>
              </div>
            </div>
          </Card>

          <Card className="bg-white/10 border-none shadow-lg backdrop-blur-sm">
            <div className="p-4 flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-lg">
                <Calendar className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-indigo-100">Next Meeting</p>
                <p className="font-bold">Not scheduled</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
