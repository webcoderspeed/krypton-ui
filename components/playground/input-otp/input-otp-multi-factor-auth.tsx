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
  Shield, 
  Smartphone, 
  Mail, 
  CheckCircle, 
  AlertTriangle,
  QrCode,
  Copy,
  Check
} from "lucide-react"

export default function InputOTPMultiFactorAuth() {
  const [step, setStep] = useState(1) // 1: setup, 2: verify app, 3: backup codes, 4: complete
  const [appOtp, setAppOtp] = useState("")
  const [smsOtp, setSmsOtp] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)
  const [error, setError] = useState("")
  const [copiedCode, setCopiedCode] = useState("")

  const backupCodes = [
    "8A9B-2C3D", "4E5F-6G7H", "9I0J-1K2L", 
    "3M4N-5O6P", "7Q8R-9S0T", "1U2V-3W4X"
  ]

  const handleVerifyApp = async () => {
    if (appOtp.length !== 6) {
      setError("Please enter the complete 6-digit code from your authenticator app")
      return
    }

    setIsVerifying(true)
    setError("")

    setTimeout(() => {
      if (appOtp === "123456") {
        setStep(3)
      } else {
        setError("Invalid code. Please check your authenticator app and try again.")
      }
      setIsVerifying(false)
    }, 1000)
  }

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(code)
    setTimeout(() => setCopiedCode(""), 2000)
  }

  const handleComplete = () => {
    setStep(4)
  }

  if (step === 4) {
    return (
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <CardTitle className="text-green-600">MFA Setup Complete!</CardTitle>
            <CardDescription>
              Your account is now protected with multi-factor authentication
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-medium text-green-800 mb-2">Security Enhanced</h4>
              <p className="text-sm text-green-700">
                Your account now requires both your password and a second factor for sign-in.
              </p>
            </div>
            
            <Button className="w-full" size="lg">
              Continue to Dashboard
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
          <CardTitle>
            {step === 1 && "Setup Multi-Factor Authentication"}
            {step === 2 && "Verify Authenticator App"}
            {step === 3 && "Save Backup Codes"}
          </CardTitle>
          <CardDescription>
            {step === 1 && "Add an extra layer of security to your account"}
            {step === 2 && "Enter the code from your authenticator app to verify setup"}
            {step === 3 && "Store these backup codes in a safe place"}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Step 1: Setup Options */}
          {step === 1 && (
            <>
              <div className="space-y-4">
                <div className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Smartphone className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">Authenticator App</h4>
                      <p className="text-sm text-muted-foreground">
                        Use Google Authenticator, Authy, or similar apps
                      </p>
                    </div>
                    <Badge variant="secondary">Recommended</Badge>
                  </div>
                </div>

                <div className="border rounded-lg p-4 space-y-3 opacity-60">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      <Mail className="h-4 w-4 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">SMS Messages</h4>
                      <p className="text-sm text-muted-foreground">
                        Receive codes via text message
                      </p>
                    </div>
                    <Badge variant="outline">Coming Soon</Badge>
                  </div>
                </div>
              </div>

              <div className="bg-muted p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <QrCode className="h-5 w-5 mt-0.5" />
                  <div className="space-y-2">
                    <h4 className="font-medium">Setup Instructions</h4>
                    <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                      <li>Install an authenticator app on your phone</li>
                      <li>Scan the QR code or enter the setup key</li>
                      <li>Enter the 6-digit code to verify</li>
                    </ol>
                  </div>
                </div>
              </div>

              <Button 
                onClick={() => setStep(2)}
                className="w-full"
                size="lg"
              >
                Setup Authenticator App
              </Button>
            </>
          )}

          {/* Step 2: Verify App */}
          {step === 2 && (
            <>
              <div className="text-center space-y-4">
                <div className="bg-muted p-6 rounded-lg">
                  <div className="w-32 h-32 bg-white border-2 border-dashed border-gray-300 rounded-lg mx-auto flex items-center justify-center mb-4">
                    <QrCode className="h-12 w-12 text-gray-400" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Scan this QR code with your authenticator app
                  </p>
                </div>

                <div className="text-center">
                  <p className="text-sm font-medium mb-2">Or enter this key manually:</p>
                  <div className="bg-muted p-2 rounded font-mono text-sm">
                    JBSWY3DPEHPK3PXP
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="text-center">
                  <p className="text-sm font-medium mb-3">Enter the 6-digit code from your app:</p>
                  <InputOTP 
                    maxLength={6} 
                    value={appOtp} 
                    onChange={setAppOtp}
                    disabled={isVerifying}
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

                <Button 
                  onClick={handleVerifyApp}
                  disabled={appOtp.length !== 6 || isVerifying}
                  className="w-full"
                  size="lg"
                >
                  {isVerifying ? "Verifying..." : "Verify & Continue"}
                </Button>
              </div>
            </>
          )}

          {/* Step 3: Backup Codes */}
          {step === 3 && (
            <>
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  Save these backup codes in a secure location. You can use them to access your account if you lose your authenticator device.
                </AlertDescription>
              </Alert>

              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-medium mb-3">Backup Recovery Codes</h4>
                <div className="grid grid-cols-2 gap-2">
                  {backupCodes.map((code, index) => (
                    <div 
                      key={index}
                      className="flex items-center justify-between bg-white p-2 rounded border"
                    >
                      <span className="font-mono text-sm">{code}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCopyCode(code)}
                        className="h-6 w-6 p-0"
                      >
                        {copiedCode === code ? (
                          <Check className="h-3 w-3 text-green-600" />
                        ) : (
                          <Copy className="h-3 w-3" />
                        )}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-xs text-muted-foreground space-y-1">
                <p>• Each code can only be used once</p>
                <p>• Store them in a password manager or print them out</p>
                <p>• Do not share these codes with anyone</p>
              </div>

              <Button 
                onClick={handleComplete}
                className="w-full"
                size="lg"
              >
                I&apos;ve Saved My Backup Codes
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}