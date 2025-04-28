"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface TranscriptItem {
  timestamp: string
  speaker: string
  text: string
}

interface TranscriptViewerProps {
  transcriptData: TranscriptItem[]
}

export function TranscriptViewer({ transcriptData }: TranscriptViewerProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredData = transcriptData.filter(
    (item) =>
      item &&
      item.text &&
      item.speaker &&
      (item.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.speaker.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const getInitials = (name: string) => {
    return name
      .split("_")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
  }

  const getSpeakerColor = (speaker: string) => {
    const colors = [
      "bg-red-500",
      "bg-blue-500",
      "bg-green-500",
      "bg-yellow-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-indigo-500",
      "bg-teal-500",
    ]

    // Simple hash function to consistently assign colors
    const hash = speaker.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
    return colors[hash % colors.length]
  }

  return (
    <div className="space-y-4">
      <Input
        placeholder="Search transcript..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4"
      />

      <ScrollArea className="h-[500px] rounded-md border">
        <div className="p-4 space-y-6">
          {filteredData.map((item, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="flex-shrink-0 pt-1">
                <Avatar className={`h-8 w-8 ${getSpeakerColor(item.speaker)}`}>
                  <AvatarFallback>{getInitials(item.speaker)}</AvatarFallback>
                </Avatar>
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center">
                  <span className="font-medium text-slate-900 dark:text-white">{item.speaker.replace(/_/g, " ")}</span>
                  <span className="ml-2 text-xs text-slate-500 dark:text-slate-400">{item.timestamp}</span>
                </div>
                <p className="text-slate-700 dark:text-slate-300">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
