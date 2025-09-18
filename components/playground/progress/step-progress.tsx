"use client";

import React, { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Circle, ArrowRight, ArrowLeft } from "lucide-react";

interface Step {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

export function StepProgress() {
  const [currentStep, setCurrentStep] = useState(1);
  const [steps, setSteps] = useState<Step[]>([
    {
      id: 1,
      title: "Account Information",
      description: "Enter your basic details",
      completed: false
    },
    {
      id: 2,
      title: "Verification",
      description: "Verify your email and phone",
      completed: false
    },
    {
      id: 3,
      title: "Preferences",
      description: "Set your preferences",
      completed: false
    },
    {
      id: 4,
      title: "Payment",
      description: "Add payment method",
      completed: false
    },
    {
      id: 5,
      title: "Confirmation",
      description: "Review and confirm",
      completed: false
    }
  ]);

  const totalSteps = steps.length;
  const completedSteps = steps.filter(step => step.completed).length;
  const progressPercentage = (completedSteps / totalSteps) * 100;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setSteps(prevSteps =>
        prevSteps.map(step =>
          step.id === currentStep ? { ...step, completed: true } : step
        )
      );
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setSteps(prevSteps =>
        prevSteps.map(step =>
          step.id === currentStep - 1 ? { ...step, completed: false } : step
        )
      );
    }
  };

  const handleStepClick = (stepId: number) => {
    if (stepId <= currentStep) {
      setCurrentStep(stepId);
    }
  };

  const getStepStatus = (step: Step) => {
    if (step.completed) return "completed";
    if (step.id === currentStep) return "current";
    if (step.id < currentStep) return "available";
    return "upcoming";
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Setup Wizard</CardTitle>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span>{completedSteps} of {totalSteps} completed</span>
          </div>
          <Progress 
            value={progressPercentage} 
            className="w-full [&>div]:bg-blue-500"
          />
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="space-y-4">
          {steps.map((step, index) => {
            const status = getStepStatus(step);
            
            return (
              <div
                key={step.id}
                className={`flex items-center gap-4 p-3 rounded-lg border cursor-pointer transition-colors ${
                  status === "current" 
                    ? "border-blue-500 bg-blue-50" 
                    : status === "completed"
                    ? "border-green-500 bg-green-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => handleStepClick(step.id)}
              >
                <div className="flex-shrink-0">
                  {status === "completed" ? (
                    <CheckCircle className="h-6 w-6 text-green-500" />
                  ) : (
                    <div className={`h-6 w-6 rounded-full border-2 flex items-center justify-center text-sm font-medium ${
                      status === "current"
                        ? "border-blue-500 bg-blue-500 text-white"
                        : status === "available"
                        ? "border-blue-500 text-blue-500"
                        : "border-gray-300 text-gray-400"
                    }`}>
                      {step.id}
                    </div>
                  )}
                </div>
                
                <div className="flex-1">
                  <h4 className={`font-medium ${
                    status === "upcoming" ? "text-gray-400" : "text-gray-900"
                  }`}>
                    {step.title}
                  </h4>
                  <p className={`text-sm ${
                    status === "upcoming" ? "text-gray-400" : "text-gray-600"
                  }`}>
                    {step.description}
                  </p>
                </div>
                
                {status === "current" && (
                  <div className="text-blue-500 text-sm font-medium">
                    Current
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        <div className="flex justify-between pt-4 border-t">
          <Button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            variant="outline"
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Previous
          </Button>
          
          <Button
            onClick={handleNext}
            disabled={currentStep > totalSteps}
            className="flex items-center gap-2"
          >
            {currentStep === totalSteps ? "Complete" : "Next"}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}