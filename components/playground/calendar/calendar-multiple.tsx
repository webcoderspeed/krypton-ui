"use client";

import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";

export default function CalendarMultiple() {
  const [dates, setDates] = useState<Date[] | undefined>([
    new Date(2024, 0, 15),
    new Date(2024, 0, 20),
    new Date(2024, 0, 25),
  ]);

  return (
    <div className="flex items-center justify-center p-6">
      <Calendar
        mode="multiple"
        selected={dates}
        onSelect={setDates}
        className="rounded-md border"
      />
    </div>
  );
}