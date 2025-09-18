"use client"

import { useState } from "react"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { CreditCard, Shield, CheckCircle, AlertTriangle } from "lucide-react"

export default function InputOTPPaymentConfirmation() {
  const [otp, setOtp] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [error, setError] = useState("")

  const paymentDetails = {
    amount: "$1,299.99",
    merchant: "Apple Store",
    card: "**** 1234",
    date: new Date().toLocaleDateString()
  }

  const handleConfirmPayment = async () => {
    if (otp.length !== 6) {
      setError("Please enter the complete 6-digit verification code")
      return
    }

    setIsProcessing(true)
    setError("")

    // Simulate payment processing
    setTimeout(() => {
      if (otp === "123456") {
        setIsCompleted(true)
      } else {
        setError("Invalid verification code. Payment cancelled for security.")
      }
      setIsProcessing(false)
    }, 2000)
  }

  if (isCompleted) {
    return (
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <CardTitle className="text-green-600">Payment Successful!</CardTitle>
            <CardDescription>
              Your payment has been processed successfully
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="bg-muted p-4 rounded-lg space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Amount</span>
                <span className="font-medium">{paymentDetails.amount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Merchant</span>
                <span className="font-medium">{paymentDetails.merchant}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Transaction ID</span>
                <span className="font-mono text-sm">TXN-2024-001234</span>
              </div>
            </div>
            
            <Button className="w-full">
              View Receipt
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto">
      <Card>
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <Shield className="h-6 w-6 text-blue-600" />
          </div>
          <CardTitle>Confirm Your Payment</CardTitle>
          <CardDescription>
            Enter the 6-digit code sent to your registered mobile number
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Payment Summary */}
          <div className="bg-muted p-4 rounded-lg space-y-3">
            <div className="flex items-center gap-2 mb-2">
              <CreditCard className="h-4 w-4" />
              <span className="font-medium">Payment Details</span>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Amount</span>
                <span className="font-semibold text-lg">{paymentDetails.amount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Merchant</span>
                <span className="font-medium">{paymentDetails.merchant}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Card</span>
                <span className="font-medium">{paymentDetails.card}</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* OTP Input */}
          <div className="space-y-4">
            <div className="text-center">
              <p className="text-sm font-medium mb-2">Enter Verification Code</p>
              <InputOTP 
                maxLength={6} 
                value={otp} 
                onChange={setOtp}
                disabled={isProcessing}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-3">
              <Button 
                onClick={handleConfirmPayment}
                disabled={otp.length !== 6 || isProcessing}
                className="w-full"
                size="lg"
              >
                {isProcessing ? "Processing Payment..." : `Confirm Payment ${paymentDetails.amount}`}
              </Button>
              
              <Button variant="outline" className="w-full">
                Cancel Payment
              </Button>
            </div>

            <div className="text-center">
              <p className="text-xs text-muted-foreground">
                Your payment is secured with 256-bit SSL encryption
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}