"use client";

import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";

export default function CalendarDisabled() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  // Disable weekends and past dates
  const disabledDays = [
    { dayOfWeek: [0, 6] }, // Disable Sundays (0) and Saturdays (6)
    { before: new Date() }, // Disable past dates
  ];

  return (
    <div className="flex items-center justify-center p-6">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        disabled={disabledDays}
        className="rounded-md border"
      />
    </div>
  );
}