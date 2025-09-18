"use client"

import { useState, useEffect } from "react"
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
import { Progress } from "@/components/ui/progress"
import { 
  Mail, 
  CheckCircle, 
  Clock,
  AlertTriangle,
  ArrowRight,
  Shield,
  User,
  Settings
} from "lucide-react"

export default function InputOTPEmailVerification() {
  const [otp, setOtp] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const [error, setError] = useState("")
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutes
  const [resendCount, setResendCount] = useState(0)
  const [canResend, setCanResend] = useState(false)

  const userEmail = "john.doe@example.com"
  const maskedEmail = userEmail.replace(/(.{2})(.*)(@.*)/, "$1***$3")

  // Countdown timer
  useEffect(() => {
    if (timeLeft > 0 && !isVerified) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0) {
      setCanResend(true)
    }
  }, [timeLeft, isVerified])

  // Enable resend after 30 seconds
  useEffect(() => {
    if (resendCount > 0) {
      const timer = setTimeout(() => setCanResend(true), 30000)
      return () => clearTimeout(timer)
    }
  }, [resendCount])

  const handleVerifyEmail = async () => {
    if (otp.length !== 6) {
      setError("Please enter the complete 6-digit verification code")
      return
    }

    setIsVerifying(true)
    setError("")

    // Simulate email verification
    setTimeout(() => {
      if (otp === "123456") {
        setIsVerified(true)
      } else {
        setError("Invalid verification code. Please check your email and try again.")
      }
      setIsVerifying(false)
    }, 2000)
  }

  const handleResendCode = () => {
    setResendCount(resendCount + 1)
    setCanResend(false)
    setTimeLeft(300) // Reset timer
    setOtp("")
    setError("")
  }

  if (isVerified) {
    return (
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-green-600">Email Verified!</CardTitle>
            <CardDescription>
              Your email address has been successfully verified
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <Mail className="h-5 w-5 text-green-600" />
                <span className="font-medium text-green-800">Verified Email</span>
              </div>
              <p className="text-green-700">{userEmail}</p>
            </div>

            {/* Account Setup Progress */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Account Setup Progress</span>
                <span className="text-sm text-muted-foreground">2 of 3 completed</span>
              </div>
              <Progress value={66} className="h-2" />
              
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Create account</span>
                  <Badge variant="secondary" className="ml-auto">Completed</Badge>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Verify email address</span>
                  <Badge variant="secondary" className="ml-auto">Completed</Badge>
                </div>
                <div className="flex items-center gap-3">
                  <Settings className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Complete profile setup</span>
                  <Badge variant="outline" className="ml-auto">Pending</Badge>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Button className="w-full" size="lg">
                <ArrowRight className="mr-2 h-4 w-4" />
                Continue Profile Setup
              </Button>
              
              <Button variant="outline" className="w-full">
                <User className="mr-2 h-4 w-4" />
                Go to Dashboard
              </Button>
            </div>

            <div className="text-center">
              <p className="text-xs text-muted-foreground">
                🎉 Welcome to our platform! Your journey starts here.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="max-w-md mx-auto">
      <Card>
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <Mail className="h-6 w-6 text-blue-600" />
          </div>
          <CardTitle>Verify Your Email</CardTitle>
          <CardDescription>
            We&apos;ve sent a verification code to {maskedEmail}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Email Info */}
          <div className="bg-muted p-4 rounded-lg">
            <div className="flex items-center gap-3 mb-3">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <span className="font-medium">Check your inbox</span>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              We sent a 6-digit verification code to your email address. 
              The code will expire in {formatTime(timeLeft)}.
            </p>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">
                Expires in {formatTime(timeLeft)}
              </span>
            </div>
          </div>

          {/* Security Notice */}
          <Alert>
            <Shield className="h-4 w-4" />
            <AlertDescription>
              This step helps us ensure the security of your account and that you have access to this email address.
            </AlertDescription>
          </Alert>

          {/* OTP Input */}
          <div className="space-y-4">
            <div className="text-center">
              <p className="text-sm font-medium mb-3">Enter Verification Code</p>
              <InputOTP 
                maxLength={6} 
                value={otp} 
                onChange={setOtp}
                disabled={isVerifying || timeLeft === 0}
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

            {timeLeft === 0 && (
              <Alert variant="destructive">
                <Clock className="h-4 w-4" />
                <AlertDescription>
                  The verification code has expired. Please request a new code.
                </AlertDescription>
              </Alert>
            )}

            <div className="space-y-3">
              <Button 
                onClick={handleVerifyEmail}
                disabled={otp.length !== 6 || isVerifying || timeLeft === 0}
                className="w-full"
                size="lg"
              >
                {isVerifying ? (
                  <>
                    <Clock className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Verify Email Address"
                )}
              </Button>
            </div>

            <div className="text-center space-y-3">
              <p className="text-sm text-muted-foreground">
                Didn&apos;t receive the email?
              </p>
              
              <div className="space-y-2">
                <Button 
                  variant="link" 
                  size="sm"
                  onClick={handleResendCode}
                  disabled={!canResend && timeLeft > 0}
                >
                  {canResend || timeLeft === 0 ? "Resend Code" : `Resend in ${formatTime(timeLeft)}`}
                </Button>
                
                {resendCount > 0 && (
                  <p className="text-xs text-muted-foreground">
                    Code resent {resendCount} time{resendCount > 1 ? 's' : ''}
                  </p>
                )}
              </div>
            </div>

            <div className="text-center space-y-2">
              <Button variant="link" size="sm">
                Change Email Address
              </Button>
              <p className="text-xs text-muted-foreground">
                Check your spam folder if you don&apos;t see the email
              </p>
            </div>

            <div className="text-center">
              <p className="text-xs text-muted-foreground">
                🔒 This verification helps protect your account
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}