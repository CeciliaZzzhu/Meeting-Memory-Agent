"use client"

import { useState } from "react"
import { Bot, Brain, Check, Clock, Edit, Lightbulb, RotateCcw, Settings, Sparkles, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { useToast } from "@/hooks/use-toast"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface AIAutomationPanelProps {
  transcriptData?: any[]
}

export function AIAutomationPanel({ transcriptData = [] }: AIAutomationPanelProps) {
  const { toast } = useToast()
  const [isProcessing, setIsProcessing] = useState(false)
  const [processingProgress, setProcessingProgress] = useState(0)
  const [activeTab, setActiveTab] = useState("decisions")
  const [autoExtractEnabled, setAutoExtractEnabled] = useState(true)
  const [autoAssignEnabled, setAutoAssignEnabled] = useState(true)
  const [autoFollowUpEnabled, setAutoFollowUpEnabled] = useState(true)
  const [confidenceThreshold, setConfidenceThreshold] = useState(70)
  const [followUpFrequency, setFollowUpFrequency] = useState("weekly")
  const [extractedItems, setExtractedItems] = useState<any>({
    decisions: [],
    actionItems: [],
    followUps: [],
  })

  // Mock data for demonstration
  const mockParticipants = [
    { id: "1", name: "John Smith", email: "john.smith@example.com", role: "Product Manager" },
    { id: "2", name: "Sarah Lee", email: "sarah.lee@example.com", role: "Designer" },
    { id: "3", name: "Mike Chen", email: "mike.chen@example.com", role: "Engineer" },
    { id: "4", name: "Lisa Wong", email: "lisa.wong@example.com", role: "QA" },
  ]

  const mockDecisions = [
    {
      id: "d1",
      text: "Adopt new design system",
      confidence: 92,
      category: "Design",
      timestamp: "14:23",
      context:
        "After discussing several options, the team unanimously agreed to adopt the new design system to improve consistency and development efficiency.",
    },
    {
      id: "d2",
      text: "Postpone feature launch to Q4",
      confidence: 87,
      category: "Product",
      timestamp: "14:45",
      context:
        "Considering the current development progress and testing requirements, the team decided to postpone the feature launch from Q3 to early Q4.",
    },
    {
      id: "d3",
      text: "Increase testing resources to improve quality",
      confidence: 78,
      category: "Engineering",
      timestamp: "15:10",
      context:
        "To address recently discovered quality issues, the team decided to increase testing resources in the next sprint.",
    },
  ]

  const mockActionItems = [
    {
      id: "a1",
      text: "Update product roadmap",
      confidence: 95,
      assignedTo: "John Smith",
      dueDate: "Next Monday",
      priority: "high",
      status: "pending",
    },
    {
      id: "a2",
      text: "Review UI design mockups",
      confidence: 88,
      assignedTo: "Sarah Lee",
      dueDate: "Wednesday",
      priority: "medium",
      status: "pending",
    },
    {
      id: "a3",
      text: "Prepare Q3 quarterly report",
      confidence: 91,
      assignedTo: "Mike Chen",
      dueDate: "Friday",
      priority: "high",
      status: "pending",
    },
    {
      id: "a4",
      text: "Confirm requirement changes with client",
      confidence: 82,
      assignedTo: "Lisa Wong",
      dueDate: "This week",
      priority: "medium",
      status: "pending",
    },
  ]

  const mockFollowUps = [
    {
      id: "f1",
      actionItemId: "a1",
      text: "Update product roadmap",
      assignedTo: "John Smith",
      dueDate: "Next Monday",
      followUpDate: "Next Tuesday 10:00",
      method: "email",
      status: "scheduled",
    },
    {
      id: "f2",
      actionItemId: "a2",
      text: "Review UI design mockups",
      assignedTo: "Sarah Lee",
      dueDate: "Wednesday",
      followUpDate: "Thursday 10:00",
      method: "slack",
      status: "scheduled",
    },
    {
      id: "f3",
      actionItemId: "a3",
      text: "Prepare Q3 quarterly report",
      assignedTo: "Mike Chen",
      dueDate: "Friday",
      followUpDate: "Next Monday 10:00",
      method: "email",
      status: "scheduled",
    },
  ]

  const handleProcessTranscript = () => {
    setIsProcessing(true)
    setProcessingProgress(0)

    // Simulate processing with progress updates
    const interval = setInterval(() => {
      setProcessingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsProcessing(false)

          // Set the extracted items
          setExtractedItems({
            decisions: mockDecisions,
            actionItems: mockActionItems,
            followUps: mockFollowUps,
          })

          toast({
            title: "Automatic processing complete",
            description: `Extracted ${mockDecisions.length} decisions and ${mockActionItems.length} action items`,
            variant: "success",
          })
          return 100
        }
        return prev + 10
      })
    }, 300)
  }

  const handleApproveAll = () => {
    toast({
      title: "All items approved",
      description: "All automatically extracted items have been approved",
      variant: "success",
    })
  }

  const handleReprocess = () => {
    setExtractedItems({
      decisions: [],
      actionItems: [],
      followUps: [],
    })
    handleProcessTranscript()
  }

  const handleScheduleFollowUps = () => {
    toast({
      title: "Automatic follow-ups scheduled",
      description: `Scheduled automatic follow-ups for ${mockFollowUps.length} action items`,
      variant: "success",
    })
  }

  const getConfidenceBadge = (confidence: number) => {
    if (confidence >= 90) {
      return <Badge className="bg-green-500">High ({confidence}%)</Badge>
    } else if (confidence >= 75) {
      return <Badge className="bg-blue-500">Medium ({confidence}%)</Badge>
    } else {
      return <Badge className="bg-amber-500">Low ({confidence}%)</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    if (priority === "high") {
      return <Badge className="bg-red-500">High</Badge>
    } else if (priority === "medium") {
      return <Badge className="bg-amber-500">Medium</Badge>
    } else {
      return <Badge className="bg-blue-500">Low</Badge>
    }
  }

  return (
    <Card className="shadow-lg border-t-4 border-t-violet-500">
      <CardHeader className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-t-lg pb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-white/20 p-2 rounded-lg">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-xl">AI Automation Assistant</CardTitle>
              <CardDescription className="text-violet-100">
                Automatically extract decisions, assign action items, and follow up
              </CardDescription>
            </div>
          </div>
          <Button
            variant="outline"
            size="icon"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            onClick={() => {}}
          >
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-6">
        {isProcessing ? (
          <div className="space-y-4 py-8">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-violet-500 animate-pulse" />
                <span className="font-medium">Processing meeting transcript...</span>
              </div>
              <span className="text-sm text-gray-500">{processingProgress}%</span>
            </div>
            <Progress value={processingProgress} className="h-2" />
            <div className="text-sm text-gray-500 text-center mt-4">
              AI is analyzing the meeting content, extracting decisions and action items, and preparing automatic
              follow-up plans
            </div>
          </div>
        ) : extractedItems.decisions.length > 0 ? (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="space-y-1">
                <h3 className="text-lg font-medium">Automatic Extraction Results</h3>
                <p className="text-sm text-gray-500">
                  AI has extracted the following from the meeting transcript, please review and confirm
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleReprocess}
                  className="text-violet-600 border-violet-200"
                >
                  <RotateCcw className="h-4 w-4 mr-1" /> Reprocess
                </Button>
                <Button size="sm" onClick={handleApproveAll} className="bg-violet-600 hover:bg-violet-700">
                  <Check className="h-4 w-4 mr-1" /> Approve All
                </Button>
              </div>
            </div>

            <Tabs defaultValue="decisions" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="decisions">Decisions ({extractedItems.decisions.length})</TabsTrigger>
                <TabsTrigger value="actionItems">Action Items ({extractedItems.actionItems.length})</TabsTrigger>
                <TabsTrigger value="followUps">Auto Follow-ups ({extractedItems.followUps.length})</TabsTrigger>
              </TabsList>

              <TabsContent value="decisions" className="space-y-4">
                <ScrollArea className="h-[320px] pr-4">
                  {extractedItems.decisions.map((decision: any) => (
                    <div key={decision.id} className="p-4 border rounded-lg mb-3 bg-white dark:bg-slate-800 shadow-sm">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <Lightbulb className="h-4 w-4 text-amber-500" />
                            <h4 className="font-medium">{decision.text}</h4>
                          </div>
                          <div className="text-sm text-gray-500 mt-1">
                            {decision.timestamp} · {decision.category}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {getConfidenceBadge(decision.confidence)}
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-slate-700 p-2 rounded">
                        {decision.context}
                      </p>
                    </div>
                  ))}
                </ScrollArea>
              </TabsContent>

              <TabsContent value="actionItems" className="space-y-4">
                <ScrollArea className="h-[320px] pr-4">
                  {extractedItems.actionItems.map((item: any) => (
                    <div key={item.id} className="p-4 border rounded-lg mb-3 bg-white dark:bg-slate-800 shadow-sm">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <Zap className="h-4 w-4 text-blue-500" />
                            <h4 className="font-medium">{item.text}</h4>
                          </div>
                          <div className="flex items-center gap-3 mt-2">
                            <div className="flex items-center gap-1 text-sm">
                              <Avatar className="h-5 w-5">
                                <AvatarFallback className="text-xs bg-violet-100 text-violet-600">
                                  {item.assignedTo.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <span>{item.assignedTo}</span>
                            </div>
                            <div className="flex items-center gap-1 text-sm">
                              <Clock className="h-3 w-3 text-gray-500" />
                              <span>{item.dueDate}</span>
                            </div>
                            {getPriorityBadge(item.priority)}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {getConfidenceBadge(item.confidence)}
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </ScrollArea>
              </TabsContent>

              <TabsContent value="followUps" className="space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <div className="text-sm text-gray-500">
                    Automatic follow-ups scheduled for {extractedItems.followUps.length} action items
                  </div>
                  <Button size="sm" onClick={handleScheduleFollowUps} className="bg-violet-600 hover:bg-violet-700">
                    <Clock className="h-4 w-4 mr-1" /> Schedule Follow-ups
                  </Button>
                </div>
                <ScrollArea className="h-[280px] pr-4">
                  {extractedItems.followUps.map((followUp: any) => (
                    <div key={followUp.id} className="p-4 border rounded-lg mb-3 bg-white dark:bg-slate-800 shadow-sm">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-green-500" />
                            <h4 className="font-medium">{followUp.text}</h4>
                          </div>
                          <div className="flex items-center gap-3 mt-2">
                            <div className="flex items-center gap-1 text-sm">
                              <Avatar className="h-5 w-5">
                                <AvatarFallback className="text-xs bg-violet-100 text-violet-600">
                                  {followUp.assignedTo.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <span>{followUp.assignedTo}</span>
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {followUp.method === "email" ? "Email" : "Message"}
                            </Badge>
                            <div className="flex items-center gap-1 text-sm">
                              <Clock className="h-3 w-3 text-gray-500" />
                              <span>{followUp.followUpDate}</span>
                            </div>
                          </div>
                        </div>
                        <Select defaultValue={followUp.status}>
                          <SelectTrigger className="w-[120px] h-8 text-xs">
                            <SelectValue placeholder="Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="scheduled">Scheduled</SelectItem>
                            <SelectItem value="sent">Sent</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  ))}
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-start gap-4 mb-6">
              <div className="bg-violet-100 dark:bg-violet-900/30 p-3 rounded-lg">
                <Bot className="h-6 w-6 text-violet-600 dark:text-violet-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-medium mb-1">AI Automation Features</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Use artificial intelligence to automatically extract decisions, assign action items, and schedule
                  follow-ups from meeting transcripts, saving you time and effort.
                </p>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Auto-extract Decisions</Label>
                  <p className="text-sm text-gray-500">
                    Automatically identify and extract key decisions from meeting transcripts
                  </p>
                </div>
                <Switch checked={autoExtractEnabled} onCheckedChange={setAutoExtractEnabled} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Auto-assign Action Items</Label>
                  <p className="text-sm text-gray-500">
                    Automatically assign action items to relevant people based on content and context
                  </p>
                </div>
                <Switch checked={autoAssignEnabled} onCheckedChange={setAutoAssignEnabled} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Auto Follow-up Reminders</Label>
                  <p className="text-sm text-gray-500">
                    Automatically send follow-up reminders to ensure action items are completed on time
                  </p>
                </div>
                <Switch checked={autoFollowUpEnabled} onCheckedChange={setAutoFollowUpEnabled} />
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Confidence Threshold ({confidenceThreshold}%)</Label>
                  <span className="text-sm text-gray-500">
                    {confidenceThreshold < 50 ? "Low" : confidenceThreshold < 80 ? "Medium" : "High"}
                  </span>
                </div>
                <Slider
                  value={[confidenceThreshold]}
                  min={30}
                  max={95}
                  step={5}
                  onValueChange={(value) => setConfidenceThreshold(value[0])}
                />
                <p className="text-xs text-gray-500">
                  Adjust the confidence threshold for AI extractions. Higher thresholds reduce errors but may miss some
                  items.
                </p>
              </div>

              <div className="space-y-2">
                <Label>Follow-up Frequency</Label>
                <Select value={followUpFrequency} onValueChange={setFollowUpFrequency}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select follow-up frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="bg-gray-50 dark:bg-slate-800/50 p-6 flex justify-end">
        {!isProcessing && extractedItems.decisions.length === 0 && (
          <Button onClick={handleProcessTranscript} className="bg-violet-600 hover:bg-violet-700" size="lg">
            <Sparkles className="mr-2 h-5 w-5" /> Start Automatic Processing
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
