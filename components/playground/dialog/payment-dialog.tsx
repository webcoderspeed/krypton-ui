"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CreditCard, Smartphone, Wallet, Shield } from "lucide-react"

export default function PaymentDialog() {
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [isProcessing, setIsProcessing] = useState(false)

  const handlePayment = async () => {
    setIsProcessing(true)
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsProcessing(false)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Proceed to Payment</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Complete Your Payment</DialogTitle>
          <DialogDescription>
            Choose your payment method and complete the transaction securely.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-6 py-4">
          {/* Order Summary */}
          <div className="space-y-3">
            <h4 className="font-medium">Order Summary</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Wireless Headphones</span>
                <span>$199.99</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>$9.99</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>$16.80</span>
              </div>
              <Separator />
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>$226.78</span>
              </div>
            </div>
          </div>
          
          <Separator />
          
          {/* Payment Methods */}
          <div className="space-y-4">
            <h4 className="font-medium">Payment Method</h4>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
              <div className="flex items-center space-x-3 border rounded-lg p-3">
                <RadioGroupItem value="card" id="card" />
                <CreditCard className="h-5 w-5" />
                <Label htmlFor="card" className="flex-1 cursor-pointer">
                  Credit/Debit Card
                </Label>
                <div className="flex gap-1">
                  <Badge variant="outline">Visa</Badge>
                  <Badge variant="outline">MC</Badge>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 border rounded-lg p-3">
                <RadioGroupItem value="paypal" id="paypal" />
                <Wallet className="h-5 w-5" />
                <Label htmlFor="paypal" className="flex-1 cursor-pointer">
                  PayPal
                </Label>
                <Badge variant="secondary">Fast</Badge>
              </div>
              
              <div className="flex items-center space-x-3 border rounded-lg p-3">
                <RadioGroupItem value="apple" id="apple" />
                <Smartphone className="h-5 w-5" />
                <Label htmlFor="apple" className="flex-1 cursor-pointer">
                  Apple Pay
                </Label>
                <Badge variant="secondary">Touch ID</Badge>
              </div>
            </RadioGroup>
          </div>
          
          {/* Card Details (shown when card is selected) */}
          {paymentMethod === "card" && (
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input 
                  id="cardNumber" 
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <Input id="expiry" placeholder="MM/YY" maxLength={5} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input id="cvv" placeholder="123" maxLength={4} />
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="cardName">Cardholder Name</Label>
                <Input id="cardName" placeholder="John Doe" />
              </div>
            </div>
          )}
          
          {/* Security Notice */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
            <Shield className="h-4 w-4" />
            <span>Your payment information is encrypted and secure</span>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline">Cancel</Button>
          <Button onClick={handlePayment} disabled={isProcessing}>
            {isProcessing ? "Processing..." : `Pay $226.78`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}