"use client"

import { useState } from "react"
import { Calendar, Clock, Mail, MessageSquare, Plus, Send, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { FollowUpHeader } from "@/components/follow-up-header"

export default function FollowUpPage() {
  const { toast } = useToast()
  const router = useRouter()
  const [emailRecipients, setEmailRecipients] = useState("PM, Engineer_1, QA, Engineer_2, Designer")
  const [meetingTitle, setMeetingTitle] = useState("Sprint 19 Follow-up")
  const [meetingDate, setMeetingDate] = useState("")
  const [meetingAgenda, setMeetingAgenda] = useState(
    "1. Status update on action items\n2. Review progress on analytics migration\n3. Test coverage report update",
  )

  const handleSendEmail = () => {
    router.push("/follow-up/email")
  }

  const handlePostToSlack = () => {
    toast({
      title: "Posted to Slack",
      description: "Meeting summary posted to #team-general",
      variant: "success",
    })
  }

  const handleCreateCalendarEvents = () => {
    toast({
      title: "Calendar Events Created",
      description: "Deadlines added to Team Calendar",
      variant: "success",
    })
  }

  const handleScheduleMeeting = () => {
    toast({
      title: "Meeting Scheduled",
      description: `${meetingTitle} has been scheduled`,
      variant: "success",
    })
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-slate-950 dark:to-slate-900">
      <FollowUpHeader />

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="follow-up" className="w-full">
          <TabsList className="grid grid-cols-5 mb-8 bg-white dark:bg-slate-800 p-1 rounded-xl shadow-md">
            <TabsTrigger value="summary" onClick={() => router.push("/")}>
              Summary
            </TabsTrigger>
            <TabsTrigger value="action-items" onClick={() => router.push("/")}>
              Action Items
            </TabsTrigger>
            <TabsTrigger value="decisions" onClick={() => router.push("/")}>
              Decisions
            </TabsTrigger>
            <TabsTrigger value="issues" onClick={() => router.push("/")}>
              Issues
            </TabsTrigger>
            <TabsTrigger value="follow-up" className="bg-gradient-to-r from-violet-500 to-indigo-500 text-white">
              Follow-up
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <h1 className="text-2xl font-bold mb-6 text-slate-800 dark:text-white">Follow-up Options</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* Email Summary Card */}
          <Card className="border-t-4 border-t-blue-500 shadow-lg hover:shadow-xl transition-shadow bg-white dark:bg-slate-800">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-400 text-white rounded-t-lg pb-6">
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Email Summary
              </CardTitle>
              <CardDescription className="text-blue-50">Send a meeting summary to all participants</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="recipients">Recipients</Label>
                  <Input
                    id="recipients"
                    value={emailRecipients}
                    onChange={(e) => setEmailRecipients(e.target.value)}
                    className="border-blue-200 focus:border-blue-500"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSendEmail} className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                <Send className="mr-2 h-4 w-4" /> Send Email Summary
              </Button>
            </CardFooter>
          </Card>

          {/* Slack Notification Card */}
          <Card className="border-t-4 border-t-purple-500 shadow-lg hover:shadow-xl transition-shadow bg-white dark:bg-slate-800">
            <CardHeader className="bg-gradient-to-r from-purple-500 to-violet-400 text-white rounded-t-lg pb-6">
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Slack Notification
              </CardTitle>
              <CardDescription className="text-purple-50">Post a summary to a Slack channel</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="channel">Channel</Label>
                  <Select defaultValue="team-general">
                    <SelectTrigger className="border-purple-200 focus:border-purple-500">
                      <SelectValue placeholder="Select channel" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="team-general">#team-general</SelectItem>
                      <SelectItem value="project-updates">#project-updates</SelectItem>
                      <SelectItem value="engineering">#engineering</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handlePostToSlack} className="w-full bg-purple-500 hover:bg-purple-600 text-white">
                <MessageSquare className="mr-2 h-4 w-4" /> Post to Slack
              </Button>
            </CardFooter>
          </Card>

          {/* Calendar Reminders Card */}
          <Card className="border-t-4 border-t-green-500 shadow-lg hover:shadow-xl transition-shadow bg-white dark:bg-slate-800">
            <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-400 text-white rounded-t-lg pb-6">
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Calendar Reminders
              </CardTitle>
              <CardDescription className="text-green-50">Add deadlines to team calendar</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="calendar">Calendar</Label>
                  <Select defaultValue="team">
                    <SelectTrigger className="border-green-200 focus:border-green-500">
                      <SelectValue placeholder="Select calendar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="team">Team Calendar</SelectItem>
                      <SelectItem value="project">Project Calendar</SelectItem>
                      <SelectItem value="personal">Personal Calendar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={handleCreateCalendarEvents}
                className="w-full bg-green-500 hover:bg-green-600 text-white"
              >
                <Plus className="mr-2 h-4 w-4" /> Create Calendar Events
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Schedule Follow-up Meeting */}
        <Card className="border-t-4 border-t-amber-500 shadow-lg mb-8 bg-white dark:bg-slate-800">
          <CardHeader className="bg-gradient-to-r from-amber-500 to-orange-400 text-white">
            <CardTitle className="text-xl">Schedule Follow-up Meeting</CardTitle>
            <CardDescription className="text-amber-50">
              Plan your next meeting to follow up on action items
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="meeting-title" className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-amber-500" /> Meeting Title
                  </Label>
                  <Input
                    id="meeting-title"
                    value={meetingTitle}
                    onChange={(e) => setMeetingTitle(e.target.value)}
                    className="border-amber-200 focus:border-amber-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date-time" className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-amber-500" /> Date & Time
                  </Label>
                  <Input
                    id="date-time"
                    type="datetime-local"
                    value={meetingDate}
                    onChange={(e) => setMeetingDate(e.target.value)}
                    className="border-amber-200 focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="participants" className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-amber-500" /> Participants
                  </Label>
                  <Select defaultValue="all">
                    <SelectTrigger className="border-amber-200 focus:border-amber-500">
                      <SelectValue placeholder="Select participants" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All meeting participants</SelectItem>
                      <SelectItem value="engineers">Engineering team only</SelectItem>
                      <SelectItem value="custom">Custom selection</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="agenda" className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-amber-500" /> Agenda
                  </Label>
                  <Textarea
                    id="agenda"
                    value={meetingAgenda}
                    onChange={(e) => setMeetingAgenda(e.target.value)}
                    className="min-h-[120px] border-amber-200 focus:border-amber-500"
                  />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button
              onClick={handleScheduleMeeting}
              size="lg"
              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white"
            >
              <Calendar className="mr-2 h-5 w-5" /> Schedule Meeting
            </Button>
          </CardFooter>
        </Card>
      </main>
    </div>
  )
}
