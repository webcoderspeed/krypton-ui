"use client"

import { useState, useEffect } from "react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, Globe } from "lucide-react"

const timezones = [
  // Americas
  { value: "America/New_York", label: "Eastern Time (ET)", offset: "-05:00", region: "Americas" },
  { value: "America/Chicago", label: "Central Time (CT)", offset: "-06:00", region: "Americas" },
  { value: "America/Denver", label: "Mountain Time (MT)", offset: "-07:00", region: "Americas" },
  { value: "America/Los_Angeles", label: "Pacific Time (PT)", offset: "-08:00", region: "Americas" },
  { value: "America/Toronto", label: "Toronto", offset: "-05:00", region: "Americas" },
  { value: "America/Sao_Paulo", label: "São Paulo", offset: "-03:00", region: "Americas" },
  
  // Europe
  { value: "Europe/London", label: "London (GMT)", offset: "+00:00", region: "Europe" },
  { value: "Europe/Paris", label: "Paris (CET)", offset: "+01:00", region: "Europe" },
  { value: "Europe/Berlin", label: "Berlin (CET)", offset: "+01:00", region: "Europe" },
  { value: "Europe/Rome", label: "Rome (CET)", offset: "+01:00", region: "Europe" },
  { value: "Europe/Moscow", label: "Moscow (MSK)", offset: "+03:00", region: "Europe" },
  
  // Asia
  { value: "Asia/Tokyo", label: "Tokyo (JST)", offset: "+09:00", region: "Asia" },
  { value: "Asia/Shanghai", label: "Shanghai (CST)", offset: "+08:00", region: "Asia" },
  { value: "Asia/Kolkata", label: "Mumbai (IST)", offset: "+05:30", region: "Asia" },
  { value: "Asia/Dubai", label: "Dubai (GST)", offset: "+04:00", region: "Asia" },
  { value: "Asia/Singapore", label: "Singapore (SGT)", offset: "+08:00", region: "Asia" },
  
  // Oceania
  { value: "Australia/Sydney", label: "Sydney (AEDT)", offset: "+11:00", region: "Oceania" },
  { value: "Australia/Melbourne", label: "Melbourne (AEDT)", offset: "+11:00", region: "Oceania" },
  { value: "Pacific/Auckland", label: "Auckland (NZDT)", offset: "+13:00", region: "Oceania" },
]

export default function SelectTimezone() {
  const [selectedTimezone, setSelectedTimezone] = useState<string>("")
  const [currentTime, setCurrentTime] = useState<string>("")
  const [localTime, setLocalTime] = useState<string>("")
  
  useEffect(() => {
    const updateTimes = () => {
      const now = new Date()
      setLocalTime(now.toLocaleTimeString())
      
      if (selectedTimezone) {
        try {
          const timeInTimezone = new Intl.DateTimeFormat('en-US', {
            timeZone: selectedTimezone,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
          }).format(now)
          setCurrentTime(timeInTimezone)
        } catch (error) {
          setCurrentTime("Invalid timezone")
        }
      }
    }
    
    updateTimes()
    const interval = setInterval(updateTimes, 1000)
    
    return () => clearInterval(interval)
  }, [selectedTimezone])
  
  const getTimezoneInfo = (value: string) => {
    return timezones.find(tz => tz.value === value)
  }
  
  const groupedTimezones = timezones.reduce((acc, timezone) => {
    if (!acc[timezone.region]) {
      acc[timezone.region] = []
    }
    acc[timezone.region].push(timezone)
    return acc
  }, {} as Record<string, typeof timezones>)

  return (
    <div className="w-[450px]">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Timezone Selector
          </CardTitle>
          <CardDescription>
            Select your timezone for accurate time display and scheduling
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Select value={selectedTimezone} onValueChange={setSelectedTimezone}>
            <SelectTrigger>
              <SelectValue placeholder="Select your timezone" />
            </SelectTrigger>
            <SelectContent className="max-h-[300px]">
              {Object.entries(groupedTimezones).map(([region, timezones]) => (
                <div key={region}>
                  <SelectGroup>
                    <SelectLabel>{region}</SelectLabel>
                    {timezones.map((timezone) => (
                      <SelectItem key={timezone.value} value={timezone.value}>
                        <div className="flex items-center justify-between w-full">
                          <span>{timezone.label}</span>
                          <span className="text-xs text-muted-foreground ml-2">
                            UTC{timezone.offset}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectGroup>
                  <SelectSeparator />
                </div>
              ))}
            </SelectContent>
          </Select>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-muted rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-4 w-4" />
                <span className="text-sm font-medium">Your Local Time</span>
              </div>
              <div className="text-lg font-mono">{localTime}</div>
              <div className="text-xs text-muted-foreground mt-1">
                {Intl.DateTimeFormat().resolvedOptions().timeZone}
              </div>
            </div>
            
            {selectedTimezone && (
              <div className="p-3 bg-primary/10 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm font-medium">Selected Timezone</span>
                </div>
                <div className="text-lg font-mono">{currentTime}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  {getTimezoneInfo(selectedTimezone)?.label}
                </div>
              </div>
            )}
          </div>
          
          {selectedTimezone && (
            <div className="space-y-3">
              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-medium mb-2">Timezone Details</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Region:</span>
                    <span>{getTimezoneInfo(selectedTimezone)?.region}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">UTC Offset:</span>
                    <span>{getTimezoneInfo(selectedTimezone)?.offset}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Timezone ID:</span>
                    <span className="font-mono text-xs">{selectedTimezone}</span>
                  </div>
                </div>
              </div>
              
              <div className="p-3 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg">
                <p className="text-xs text-green-800 dark:text-green-200">
                  ✅ Timezone saved! All dates and times will be displayed in your selected timezone.
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}