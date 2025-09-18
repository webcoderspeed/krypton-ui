"use client";

import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Truck, Zap, Package, Clock } from "lucide-react";

export default function RadioGroupShipping() {
  const [shippingOption, setShippingOption] = useState("standard");

  const shippingOptions = [
    {
      id: "standard",
      name: "Standard Shipping",
      description: "5-7 business days",
      price: "Free",
      icon: Package,
      estimatedDate: "Dec 15-17"
    },
    {
      id: "express",
      name: "Express Shipping",
      description: "2-3 business days",
      price: "$9.99",
      icon: Truck,
      estimatedDate: "Dec 12-13"
    },
    {
      id: "overnight",
      name: "Overnight Shipping",
      description: "Next business day",
      price: "$24.99",
      icon: Zap,
      estimatedDate: "Dec 11"
    },
    {
      id: "same-day",
      name: "Same Day Delivery",
      description: "Order by 2 PM",
      price: "$39.99",
      icon: Clock,
      estimatedDate: "Today by 8 PM",
      available: false
    }
  ];

  const selectedOption = shippingOptions.find(option => option.id === shippingOption);

  return (
    <div className="space-y-6">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Truck className="h-5 w-5" />
            Shipping Options
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup value={shippingOption} onValueChange={setShippingOption} className="space-y-3">
            {shippingOptions.map((option) => {
              const Icon = option.icon;
              const isDisabled = option.available === false;
              
              return (
                <div key={option.id} className="relative">
                  <div className={`flex items-center space-x-3 rounded-lg border p-4 transition-colors ${
                    isDisabled 
                      ? 'opacity-50 cursor-not-allowed' 
                      : 'hover:bg-accent/50 cursor-pointer'
                  }`}>
                    <RadioGroupItem 
                      value={option.id} 
                      id={option.id} 
                      disabled={isDisabled}
                    />
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center space-x-3">
                        <Icon className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <Label 
                            htmlFor={option.id} 
                            className={`font-medium ${isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                          >
                            {option.name}
                            {isDisabled && (
                              <span className="ml-2 text-xs text-muted-foreground">
                                (Not Available)
                              </span>
                            )}
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            {option.description} • Arrives {option.estimatedDate}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{option.price}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </RadioGroup>
        </CardContent>
      </Card>

      {selectedOption && (
        <Card className="w-full max-w-lg">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Selected Shipping</p>
                <p className="text-sm text-muted-foreground">
                  {selectedOption.name} - {selectedOption.description}
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold">{selectedOption.price}</p>
                <p className="text-sm text-muted-foreground">
                  Arrives {selectedOption.estimatedDate}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}