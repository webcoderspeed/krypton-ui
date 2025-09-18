"use client"

import { useState } from "react"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { Button } from "@/components/ui/button"

export default function InputOTPControlled() {
  const [value, setValue] = useState("")

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Controlled OTP Input</h3>
        <p className="text-sm text-muted-foreground">
          OTP input with controlled state and value display
        </p>
      </div>
      
      <div className="space-y-4">
        <InputOTP 
          maxLength={6} 
          value={value} 
          onChange={(value) => setValue(value)}
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
        
        <div className="space-y-2">
          <p className="text-sm">
            Current value: <code className="bg-muted px-1 py-0.5 rounded text-xs">{value || "empty"}</code>
          </p>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setValue("")}
            >
              Clear
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setValue("123456")}
            >
              Fill Demo
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}