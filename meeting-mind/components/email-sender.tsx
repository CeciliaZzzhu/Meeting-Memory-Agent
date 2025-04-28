"use client"

import { useState } from "react"
import { Check, ChevronDown, Copy, Mail, Paperclip, Send, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

interface EmailSenderProps {
  meetingTitle?: string
  participants?: string[]
  actionItems?: any[]
  decisions?: any[]
  summary?: any
}

export function EmailSender({
  meetingTitle = "Weekly Team Sync",
  participants = ["john@example.com", "sarah@example.com", "mike@example.com", "lisa@example.com"],
  actionItems = [
    { id: "1", text: "Update project timeline", assignee: "John", dueDate: "Next Monday", priority: "high" },
    { id: "2", text: "Review design mockups", assignee: "Sarah", dueDate: "Wednesday", priority: "medium" },
    { id: "3", text: "Prepare Q3 report", assignee: "Mike", dueDate: "Friday", priority: "high" },
  ],
  decisions = [
    { text: "Adopt new design system", category: "Design", speaker: "Sarah" },
    { text: "Postpone feature launch to Q4", category: "Product", speaker: "John" },
  ],
  summary = {
    keyPoints: [
      "Team is on track for Q3 goals",
      "New design system will be implemented next sprint",
      "Customer feedback has been positive on recent changes",
    ],
    topics: ["Design System", "Q3 Goals", "Customer Feedback", "Feature Launch"],
    nextSteps: ["Schedule design system training", "Prepare for Q4 planning", "Follow up with key customers"],
  },
}: EmailSenderProps) {
  const { toast } = useToast()
  const [recipients, setRecipients] = useState(participants.join(", "))
  const [subject, setSubject] = useState(`Meeting Summary: ${meetingTitle} - ${new Date().toLocaleDateString()}`)
  const [emailContent, setEmailContent] = useState("")
  const [selectedTemplate, setSelectedTemplate] = useState("summary")
  const [includeActionItems, setIncludeActionItems] = useState(true)
  const [includeDecisions, setIncludeDecisions] = useState(true)
  const [includeNextSteps, setIncludeNextSteps] = useState(true)
  const [includeSummary, setIncludeSummary] = useState(true)
  const [showPreview, setShowPreview] = useState(false)
  const [isSending, setIsSending] = useState(false)

  const templates = [
    { id: "summary", name: "Meeting Summary", description: "Concise summary with key points and decisions" },
    {
      id: "detailed",
      name: "Detailed Report",
      description: "Complete report with all discussion points and action items",
    },
    { id: "action-items", name: "Action Items", description: "Only includes assigned action items and owners" },
    { id: "follow-up", name: "Follow-up", description: "Focus on next steps and timeline" },
  ]

  const generateEmailContent = (templateId: string) => {
    let content = ""

    // Email greeting
    content += `Hello,\n\n`
    content += `Here's a summary of the "${meetingTitle}" meeting.\n\n`

    // Summary section
    if (includeSummary) {
      content += `## Meeting Overview\n\n`
      if (summary.keyPoints && summary.keyPoints.length > 0) {
        content += `Key Points:\n`
        summary.keyPoints.forEach((point: string, index: number) => {
          content += `- ${point}\n`
        })
        content += `\n`
      }
    }

    // Decisions section
    if (includeDecisions && decisions.length > 0) {
      content += `## Decisions\n\n`
      decisions.forEach((decision: any, index: number) => {
        content += `${index + 1}. ${decision.text} (${decision.category})\n`
      })
      content += `\n`
    }

    // Action items section
    if (includeActionItems && actionItems.length > 0) {
      content += `## Action Items\n\n`
      actionItems.forEach((item: any, index: number) => {
        content += `${index + 1}. ${item.text}\n`
        if (item.assignee) content += `   Owner: ${item.assignee}\n`
        if (item.dueDate) content += `   Due Date: ${item.dueDate}\n`
        if (item.priority) content += `   Priority: ${item.priority}\n`
        content += `\n`
      })
    }

    // Next steps
    if (includeNextSteps && summary.nextSteps && summary.nextSteps.length > 0) {
      content += `## Next Steps\n\n`
      summary.nextSteps.forEach((step: string, index: number) => {
        content += `- ${step}\n`
      })
      content += `\n`
    }

    // Email closing
    content += `Please let me know if you have any questions.\n\n`
    content += `Thanks,\n`
    content += `MeetingMind Auto-generated`

    return content
  }

  const handleTemplateChange = (templateId: string) => {
    setSelectedTemplate(templateId)
    setEmailContent(generateEmailContent(templateId))
  }

  const handleGenerateEmail = () => {
    setEmailContent(generateEmailContent(selectedTemplate))
  }

  const handleSendEmail = () => {
    setIsSending(true)

    // Simulate sending email
    setTimeout(() => {
      setIsSending(false)
      toast({
        title: "Email Sent",
        description: `Successfully sent to ${recipients.split(",").length} recipients`,
        variant: "success",
      })
      setShowPreview(false)
    }, 1500)
  }

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(emailContent)
    toast({
      title: "Copied to clipboard",
      description: "Email content has been copied to clipboard",
      variant: "success",
    })
  }

  return (
    <Card className="border-t-4 border-t-blue-500 shadow-lg bg-white dark:bg-slate-800">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg pb-6">
        <CardTitle className="flex items-center gap-2 text-xl">
          <Mail className="h-5 w-5" />
          Send Meeting Summary Email
        </CardTitle>
        <CardDescription className="text-blue-100">
          Send meeting summaries to all participants or specific recipients
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-6 space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="recipients">Recipients</Label>
            <div className="flex gap-2">
              <Input
                id="recipients"
                value={recipients}
                onChange={(e) => setRecipients(e.target.value)}
                className="flex-1 border-blue-200 focus:border-blue-500"
                placeholder="Enter email addresses, separated by commas"
              />
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px] border-blue-200 focus:border-blue-500">
                  <SelectValue placeholder="Select recipients" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Participants</SelectItem>
                  <SelectItem value="team">Team Members</SelectItem>
                  <SelectItem value="stakeholders">Stakeholders</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">Email Subject</Label>
            <Input
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="border-blue-200 focus:border-blue-500"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label>Email Template</Label>
              <Button
                variant="outline"
                size="sm"
                onClick={handleGenerateEmail}
                className="text-blue-600 border-blue-200 hover:bg-blue-50"
              >
                Generate Email
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {templates.map((template) => (
                <div
                  key={template.id}
                  className={`flex items-start p-3 rounded-md border-2 cursor-pointer transition-all ${
                    selectedTemplate === template.id
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                      : "border-gray-200 hover:border-blue-300 dark:border-gray-700"
                  }`}
                  onClick={() => handleTemplateChange(template.id)}
                >
                  <div className="flex-1">
                    <p className="font-medium">{template.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{template.description}</p>
                  </div>
                  {selectedTemplate === template.id && (
                    <div className="h-5 w-5 rounded-full bg-blue-500 flex items-center justify-center">
                      <Check className="h-3 w-3 text-white" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="options">
              <AccordionTrigger className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                Email Content Options
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="include-summary"
                      checked={includeSummary}
                      onCheckedChange={(checked) => setIncludeSummary(checked as boolean)}
                    />
                    <Label htmlFor="include-summary" className="cursor-pointer">
                      Include Meeting Overview
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="include-decisions"
                      checked={includeDecisions}
                      onCheckedChange={(checked) => setIncludeDecisions(checked as boolean)}
                    />
                    <Label htmlFor="include-decisions" className="cursor-pointer">
                      Include Decisions
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="include-action-items"
                      checked={includeActionItems}
                      onCheckedChange={(checked) => setIncludeActionItems(checked as boolean)}
                    />
                    <Label htmlFor="include-action-items" className="cursor-pointer">
                      Include Action Items
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="include-next-steps"
                      checked={includeNextSteps}
                      onCheckedChange={(checked) => setIncludeNextSteps(checked as boolean)}
                    />
                    <Label htmlFor="include-next-steps" className="cursor-pointer">
                      Include Next Steps
                    </Label>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="space-y-2">
            <Label htmlFor="email-content">Email Content</Label>
            <Textarea
              id="email-content"
              value={emailContent}
              onChange={(e) => setEmailContent(e.target.value)}
              className="min-h-[300px] border-blue-200 focus:border-blue-500 font-mono text-sm"
              placeholder="Enter email content here, or select a template to auto-generate"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge
              variant="outline"
              className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300"
            >
              <Paperclip className="h-3 w-3 mr-1" /> meeting-notes.pdf
            </Badge>
            <Badge
              variant="outline"
              className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300"
            >
              <Paperclip className="h-3 w-3 mr-1" /> action-items.xlsx
            </Badge>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between flex-wrap gap-4">
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleCopyToClipboard} className="flex items-center gap-1">
            <Copy className="h-4 w-4 mr-1" /> Copy Content
          </Button>

          <Dialog open={showPreview} onOpenChange={setShowPreview}>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex items-center gap-1">
                <ChevronDown className="h-4 w-4 mr-1" /> Preview
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Email Preview</DialogTitle>
                <DialogDescription>
                  Preview of email to be sent to {recipients.split(",").length} recipients
                </DialogDescription>
              </DialogHeader>

              <Tabs defaultValue="preview" className="w-full mt-4">
                <TabsList className="grid grid-cols-2 mb-4">
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                  <TabsTrigger value="code">Source</TabsTrigger>
                </TabsList>
                <TabsContent value="preview" className="border rounded-md p-4 bg-white">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500">To:</p>
                      <p>{recipients}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Subject:</p>
                      <p className="font-medium">{subject}</p>
                    </div>
                    <hr />
                    <div className="whitespace-pre-line">{emailContent}</div>
                  </div>
                </TabsContent>
                <TabsContent
                  value="code"
                  className="border rounded-md p-4 bg-gray-50 font-mono text-sm overflow-x-auto"
                >
                  <pre>{emailContent}</pre>
                </TabsContent>
              </Tabs>

              <DialogFooter className="mt-4">
                <Button variant="outline" onClick={() => setShowPreview(false)}>
                  <X className="h-4 w-4 mr-1" /> Close
                </Button>
                <Button onClick={handleSendEmail} disabled={isSending}>
                  {isSending ? (
                    <>Sending...</>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-1" /> Send Email
                    </>
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <Button
          onClick={() => setShowPreview(true)}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
          size="lg"
        >
          <Send className="h-5 w-5 mr-2" /> Send Meeting Summary
        </Button>
      </CardFooter>
    </Card>
  )
}
