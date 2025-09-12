"use client"

import * as React from "react"
import { Calendar } from "@/components/ui/calendar"

export default function CalendarMultiple() {
  const [dates, setDates] = React.useState<Date[] | undefined>([
    new Date(2024, 0, 15),
    new Date(2024, 0, 20),
    new Date(2024, 0, 25),
  ])

  return (
    <div className="space-y-4">
      <Calendar
        mode="multiple"
        selected={dates}
        onSelect={setDates}
        className="rounded-md border"
      />
      {dates && dates.length > 0 && (
        <div className="text-sm text-muted-foreground">
          Selected {dates.length} date{dates.length > 1 ? 's' : ''}
        </div>
      )}
    </div>
  )
}