"use client";

import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, BellOff, Volume2, VolumeX, Smartphone } from "lucide-react";

export default function RadioGroupNotifications() {
  const [emailFrequency, setEmailFrequency] = useState("weekly");
  const [pushNotifications, setPushNotifications] = useState("important");
  const [marketingEmails, setMarketingEmails] = useState("monthly");

  const emailOptions = [
    { value: "daily", label: "Daily", description: "Get updates every day" },
    { value: "weekly", label: "Weekly", description: "Get a weekly summary" },
    { value: "monthly", label: "Monthly", description: "Get a monthly digest" },
    { value: "never", label: "Never", description: "No email notifications" }
  ];

  const pushOptions = [
    { 
      value: "all", 
      label: "All Notifications", 
      description: "Get notified about everything",
      icon: Bell 
    },
    { 
      value: "important", 
      label: "Important Only", 
      description: "Only critical updates",
      icon: Volume2 
    },
    { 
      value: "mentions", 
      label: "Mentions & Messages", 
      description: "When someone mentions you",
      icon: Smartphone 
    },
    { 
      value: "none", 
      label: "No Push Notifications", 
      description: "Turn off all push notifications",
      icon: BellOff 
    }
  ];

  const marketingOptions = [
    { value: "weekly", label: "Weekly", description: "Product updates and tips" },
    { value: "monthly", label: "Monthly", description: "Monthly newsletter only" },
    { value: "quarterly", label: "Quarterly", description: "Major updates only" },
    { value: "never", label: "Never", description: "No marketing emails" }
  ];

  const handleSave = () => {
    const preferences = {
      emailFrequency,
      pushNotifications,
      marketingEmails
    };
    alert(`Notification preferences saved:\n${JSON.stringify(preferences, null, 2)}`);
  };

  return (
    <div className="space-y-6 w-full max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notification Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="space-y-4">
            <div>
              <Label className="text-base font-medium">Email Notifications</Label>
              <p className="text-sm text-muted-foreground mt-1">
                How often would you like to receive email updates?
              </p>
            </div>
            <RadioGroup value={emailFrequency} onValueChange={setEmailFrequency} className="space-y-3">
              {emailOptions.map((option) => (
                <div key={option.value} className="flex items-center space-x-3">
                  <RadioGroupItem value={option.value} id={`email-${option.value}`} />
                  <div className="flex-1">
                    <Label htmlFor={`email-${option.value}`} className="cursor-pointer">
                      <div className="font-medium">{option.label}</div>
                      <div className="text-sm text-muted-foreground">{option.description}</div>
                    </Label>
                  </div>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="space-y-4">
            <div>
              <Label className="text-base font-medium">Push Notifications</Label>
              <p className="text-sm text-muted-foreground mt-1">
                Choose what push notifications you want to receive
              </p>
            </div>
            <RadioGroup value={pushNotifications} onValueChange={setPushNotifications} className="space-y-3">
              {pushOptions.map((option) => {
                const Icon = option.icon;
                return (
                  <div key={option.value} className="flex items-center space-x-3">
                    <RadioGroupItem value={option.value} id={`push-${option.value}`} />
                    <div className="flex items-center space-x-3 flex-1">
                      <Icon className="h-4 w-4 text-muted-foreground" />
                      <div className="flex-1">
                        <Label htmlFor={`push-${option.value}`} className="cursor-pointer">
                          <div className="font-medium">{option.label}</div>
                          <div className="text-sm text-muted-foreground">{option.description}</div>
                        </Label>
                      </div>
                    </div>
                  </div>
                );
              })}
            </RadioGroup>
          </div>

          <div className="space-y-4">
            <div>
              <Label className="text-base font-medium">Marketing Emails</Label>
              <p className="text-sm text-muted-foreground mt-1">
                How often would you like to receive promotional content?
              </p>
            </div>
            <RadioGroup value={marketingEmails} onValueChange={setMarketingEmails} className="space-y-3">
              {marketingOptions.map((option) => (
                <div key={option.value} className="flex items-center space-x-3">
                  <RadioGroupItem value={option.value} id={`marketing-${option.value}`} />
                  <div className="flex-1">
                    <Label htmlFor={`marketing-${option.value}`} className="cursor-pointer">
                      <div className="font-medium">{option.label}</div>
                      <div className="text-sm text-muted-foreground">{option.description}</div>
                    </Label>
                  </div>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="flex justify-end pt-4 border-t">
            <Button onClick={handleSave}>
              Save Preferences
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}