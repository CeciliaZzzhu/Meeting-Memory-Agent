import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Follow-up | MeetingMind",
  description: "Follow up on your meeting action items and decisions",
}

export default function FollowUpLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
