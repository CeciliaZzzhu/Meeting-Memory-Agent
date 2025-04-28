"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import Papa from "papaparse"
import { useRouter } from "next/navigation"

export function FileUploader() {
  const [isDragging, setIsDragging] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()
  const router = useRouter()

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0])
    }
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0])
    }
  }

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  const processFile = (file: File) => {
    if (file.type !== "text/csv" && !file.name.endsWith(".csv")) {
      toast({
        title: "Invalid file type",
        description: "Please upload a CSV file",
        variant: "destructive",
      })
      return
    }

    setIsProcessing(true)

    Papa.parse(file, {
      header: true,
      complete: (results) => {
        if (results.data && results.data.length > 0) {
          // Check if the CSV has the required columns
          const firstRow = results.data[0] as any
          if (!firstRow.timestamp || !firstRow.speaker || !firstRow.text) {
            toast({
              title: "Invalid CSV format",
              description: "CSV must contain timestamp, speaker, and text columns",
              variant: "destructive",
            })
            setIsProcessing(false)
            return
          }

          // Store the parsed data in sessionStorage
          sessionStorage.setItem("meetingTranscript", JSON.stringify(results.data))

          toast({
            title: "File processed successfully",
            description: `Processed ${results.data.length} transcript entries`,
          })

          // Refresh the page to load the new data
          router.refresh()
        } else {
          toast({
            title: "Empty file",
            description: "The uploaded CSV file contains no data",
            variant: "destructive",
          })
        }
        setIsProcessing(false)
      },
      error: (error) => {
        toast({
          title: "Error processing file",
          description: error.message,
          variant: "destructive",
        })
        setIsProcessing(false)
      },
    })
  }

  return (
    <Card
      className={`mb-8 border-2 border-dashed ${isDragging ? "border-blue-500 bg-blue-50 dark:bg-blue-950/20" : "border-slate-300 dark:border-slate-700"} transition-colors`}
    >
      <div className="p-8 text-center" onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}>
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
          <Upload className="h-8 w-8 text-blue-600 dark:text-blue-400" />
        </div>

        <h2 className="mb-2 text-xl font-semibold text-slate-900 dark:text-white">Upload your meeting transcript</h2>

        <p className="mb-6 text-slate-600 dark:text-slate-400">Drag and drop your file here, or click to browse</p>

        <p className="mb-6 text-sm text-slate-500 dark:text-slate-500">
          Supports CSV files with timestamp, speaker, and text columns
        </p>

        <input type="file" ref={fileInputRef} onChange={handleFileInputChange} accept=".csv" className="hidden" />

        <Button
          onClick={handleButtonClick}
          disabled={isProcessing}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          {isProcessing ? "Processing..." : "Process Transcript"}
        </Button>
      </div>
    </Card>
  )
}
