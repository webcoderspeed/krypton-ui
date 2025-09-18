"use client";

import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, Smartphone, Wallet, Building2 } from "lucide-react";

export default function RadioGroupPayment() {
  const [paymentMethod, setPaymentMethod] = useState("card");

  const paymentOptions = [
    {
      id: "card",
      label: "Credit/Debit Card",
      description: "Pay with Visa, Mastercard, or American Express",
      icon: CreditCard,
      popular: true
    },
    {
      id: "upi",
      label: "UPI",
      description: "Pay using Google Pay, PhonePe, or Paytm",
      icon: Smartphone,
      popular: false
    },
    {
      id: "wallet",
      label: "Digital Wallet",
      description: "Pay using PayPal, Apple Pay, or Google Pay",
      icon: Wallet,
      popular: false
    },
    {
      id: "netbanking",
      label: "Net Banking",
      description: "Pay directly from your bank account",
      icon: Building2,
      popular: false
    }
  ];

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Payment Method
        </CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
          {paymentOptions.map((option) => {
            const Icon = option.icon;
            return (
              <div key={option.id} className="relative">
                <div className="flex items-center space-x-3 rounded-lg border p-4 hover:bg-accent/50 transition-colors">
                  <RadioGroupItem value={option.id} id={option.id} />
                  <div className="flex items-center space-x-3 flex-1">
                    <Icon className="h-5 w-5 text-muted-foreground" />
                    <div className="flex-1">
                      <Label htmlFor={option.id} className="flex items-center gap-2 cursor-pointer">
                        <span className="font-medium">{option.label}</span>
                        {option.popular && (
                          <span className="bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
                            Popular
                          </span>
                        )}
                      </Label>
                      <p className="text-sm text-muted-foreground mt-1">
                        {option.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </RadioGroup>

        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <p className="text-sm">
            <span className="font-medium">Selected:</span> {
              paymentOptions.find(option => option.id === paymentMethod)?.label
            }
          </p>
        </div>
      </CardContent>
    </Card>
  );
}