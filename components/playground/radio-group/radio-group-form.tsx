"use client";

import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function RadioGroupForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    plan: "basic",
    billing: "monthly"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Form submitted:\n${JSON.stringify(formData, null, 2)}`);
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Subscription Form</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Enter your name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              placeholder="Enter your email"
            />
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-medium">Choose Plan</Label>
            <RadioGroup
              value={formData.plan}
              onValueChange={(value) => setFormData(prev => ({ ...prev, plan: value }))}
              className="space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="basic" id="plan-basic" />
                <Label htmlFor="plan-basic" className="flex-1">
                  <div className="flex justify-between">
                    <span>Basic</span>
                    <span className="text-muted-foreground">$9/month</span>
                  </div>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="pro" id="plan-pro" />
                <Label htmlFor="plan-pro" className="flex-1">
                  <div className="flex justify-between">
                    <span>Pro</span>
                    <span className="text-muted-foreground">$19/month</span>
                  </div>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="enterprise" id="plan-enterprise" />
                <Label htmlFor="plan-enterprise" className="flex-1">
                  <div className="flex justify-between">
                    <span>Enterprise</span>
                    <span className="text-muted-foreground">$49/month</span>
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-medium">Billing Cycle</Label>
            <RadioGroup
              value={formData.billing}
              onValueChange={(value) => setFormData(prev => ({ ...prev, billing: value }))}
              className="flex space-x-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="monthly" id="billing-monthly" />
                <Label htmlFor="billing-monthly">Monthly</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yearly" id="billing-yearly" />
                <Label htmlFor="billing-yearly">Yearly (20% off)</Label>
              </div>
            </RadioGroup>
          </div>

          <Button type="submit" className="w-full">
            Subscribe Now
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}