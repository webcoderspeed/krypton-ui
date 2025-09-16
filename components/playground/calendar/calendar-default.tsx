"use client";

import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";

export default function CalendarDefault() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="flex items-center justify-center p-6">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border"
      />
    </div>
  );
}