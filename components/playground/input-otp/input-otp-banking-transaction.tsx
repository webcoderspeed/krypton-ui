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
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { 
  Banknote, 
  ArrowRight, 
  Shield, 
  Clock,
  CheckCircle,
  AlertTriangle,
  User,
  Building
} from "lucide-react"

export default function InputOTPBankingTransaction() {
  const [otp, setOtp] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [error, setError] = useState("")
  const [timeLeft, setTimeLeft] = useState(120) // 2 minutes

  const transactionDetails = {
    amount: "$2,500.00",
    fromAccount: "Checking Account ****1234",
    toAccount: "John Smith - ****5678",
    reference: "Monthly rent payment",
    fee: "$0.00",
    transactionId: "TXN-2024-789012"
  }

  const handleConfirmTransaction = async () => {
    if (otp.length !== 6) {
      setError("Please enter the complete 6-digit authorization code")
      return
    }

    setIsProcessing(true)
    setError("")

    // Simulate transaction processing
    setTimeout(() => {
      if (otp === "123456") {
        setIsCompleted(true)
      } else {
        setError("Invalid authorization code. Transaction cancelled for security.")
      }
      setIsProcessing(false)
    }, 2500)
  }

  if (isCompleted) {
    return (
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <CardTitle className="text-green-600">Transaction Successful!</CardTitle>
            <CardDescription>
              Your transfer has been processed successfully
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="bg-green-50 border border-green-200 p-4 rounded-lg space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-green-700">Amount Transferred</span>
                <span className="font-semibold text-green-800">{transactionDetails.amount}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-green-700">Transaction ID</span>
                <span className="font-mono text-sm text-green-800">{transactionDetails.transactionId}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-green-700">Status</span>
                <Badge className="bg-green-100 text-green-800">Completed</Badge>
              </div>
            </div>
            
            <div className="space-y-2">
              <Button className="w-full">
                Download Receipt
              </Button>
              <Button variant="outline" className="w-full">
                View Transaction History
              </Button>
            </div>
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
          <CardTitle>Authorize Transaction</CardTitle>
          <CardDescription>
            Enter the 6-digit code sent to your registered mobile number ending in ****7890
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Transaction Summary */}
          <div className="bg-muted p-4 rounded-lg space-y-4">
            <div className="flex items-center gap-2 mb-3">
              <Banknote className="h-4 w-4" />
              <span className="font-medium">Transfer Details</span>
            </div>
            
            <div className="space-y-3">
              {/* Amount */}
              <div className="text-center py-2">
                <p className="text-2xl font-bold text-primary">{transactionDetails.amount}</p>
                <p className="text-sm text-muted-foreground">Transfer Amount</p>
              </div>

              <Separator />

              {/* From Account */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">From</p>
                  <p className="text-sm text-muted-foreground">{transactionDetails.fromAccount}</p>
                </div>
              </div>

              {/* Arrow */}
              <div className="flex justify-center">
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </div>

              {/* To Account */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <Building className="h-4 w-4 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">To</p>
                  <p className="text-sm text-muted-foreground">{transactionDetails.toAccount}</p>
                </div>
              </div>

              <Separator />

              {/* Additional Details */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Reference</span>
                  <span className="text-sm font-medium">{transactionDetails.reference}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Transfer Fee</span>
                  <span className="text-sm font-medium">{transactionDetails.fee}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Security Notice */}
          <Alert>
            <Shield className="h-4 w-4" />
            <AlertDescription>
              For your security, this transaction requires SMS verification. The code will expire in {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}.
            </AlertDescription>
          </Alert>

          {/* OTP Input */}
          <div className="space-y-4">
            <div className="text-center">
              <p className="text-sm font-medium mb-3">Enter Authorization Code</p>
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
                onClick={handleConfirmTransaction}
                disabled={otp.length !== 6 || isProcessing}
                className="w-full"
                size="lg"
              >
                {isProcessing ? (
                  <>
                    <Clock className="mr-2 h-4 w-4 animate-spin" />
                    Processing Transaction...
                  </>
                ) : (
                  `Authorize Transfer ${transactionDetails.amount}`
                )}
              </Button>
              
              <Button variant="outline" className="w-full">
                Cancel Transaction
              </Button>
            </div>

            <div className="text-center space-y-2">
              <p className="text-xs text-muted-foreground">
                Didn&apos;t receive the code?
              </p>
              <Button variant="link" size="sm">
                Resend Code
              </Button>
            </div>

            <div className="text-center">
              <p className="text-xs text-muted-foreground">
                🔒 Your transaction is protected by 256-bit encryption
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}