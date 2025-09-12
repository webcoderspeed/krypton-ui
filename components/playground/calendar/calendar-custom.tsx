"use client"

import * as React from "react"
import { Calendar } from "@/components/ui/calendar"

export default function CalendarCustom() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  // Disable weekends
  const disabledDays = [
    { dayOfWeek: [0, 6] }, // Sunday and Saturday
    { before: new Date() }, // Past dates
  ]

  return (
    <div className="space-y-4">
      <div className="text-sm text-muted-foreground">
        Weekends and past dates are disabled
      </div>
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        disabled={disabledDays}
        buttonVariant="outline"
        captionLayout="dropdown"
        className="rounded-md border"
        fromYear={2020}
        toYear={2030}
      />
    </div>
  )
}