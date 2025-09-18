"use client";

import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star, ThumbsUp, ThumbsDown, Meh } from "lucide-react";

export default function RadioGroupSurvey() {
  const [satisfaction, setSatisfaction] = useState("");
  const [recommendation, setRecommendation] = useState("");
  const [feedback, setFeedback] = useState("");

  const satisfactionOptions = [
    { value: "very-satisfied", label: "Very Satisfied", icon: "😊", color: "text-green-600" },
    { value: "satisfied", label: "Satisfied", icon: "🙂", color: "text-blue-600" },
    { value: "neutral", label: "Neutral", icon: "😐", color: "text-yellow-600" },
    { value: "dissatisfied", label: "Dissatisfied", icon: "🙁", color: "text-orange-600" },
    { value: "very-dissatisfied", label: "Very Dissatisfied", icon: "😞", color: "text-red-600" }
  ];

  const recommendationOptions = [
    { value: "definitely", label: "Definitely", icon: ThumbsUp, color: "text-green-600" },
    { value: "probably", label: "Probably", icon: ThumbsUp, color: "text-blue-600" },
    { value: "maybe", label: "Maybe", icon: Meh, color: "text-yellow-600" },
    { value: "probably-not", label: "Probably Not", icon: ThumbsDown, color: "text-orange-600" },
    { value: "definitely-not", label: "Definitely Not", icon: ThumbsDown, color: "text-red-600" }
  ];

  const handleSubmit = () => {
    const surveyData = {
      satisfaction,
      recommendation,
      feedback
    };
    alert(`Survey submitted:\n${JSON.stringify(surveyData, null, 2)}`);
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Star className="h-5 w-5" />
          Customer Feedback Survey
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="space-y-4">
          <div>
            <Label className="text-base font-medium">
              How satisfied are you with our service?
            </Label>
            <p className="text-sm text-muted-foreground mt-1">
              Please rate your overall experience
            </p>
          </div>
          <RadioGroup value={satisfaction} onValueChange={setSatisfaction} className="space-y-3">
            {satisfactionOptions.map((option) => (
              <div key={option.value} className="flex items-center space-x-3">
                <RadioGroupItem value={option.value} id={`satisfaction-${option.value}`} />
                <Label 
                  htmlFor={`satisfaction-${option.value}`} 
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <span className="text-lg">{option.icon}</span>
                  <span>{option.label}</span>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className="space-y-4">
          <div>
            <Label className="text-base font-medium">
              Would you recommend us to others?
            </Label>
            <p className="text-sm text-muted-foreground mt-1">
              How likely are you to recommend our service?
            </p>
          </div>
          <RadioGroup value={recommendation} onValueChange={setRecommendation} className="space-y-3">
            {recommendationOptions.map((option) => {
              const Icon = option.icon;
              return (
                <div key={option.value} className="flex items-center space-x-3">
                  <RadioGroupItem value={option.value} id={`recommendation-${option.value}`} />
                  <Label 
                    htmlFor={`recommendation-${option.value}`} 
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <Icon className={`h-4 w-4 ${option.color}`} />
                    <span>{option.label}</span>
                  </Label>
                </div>
              );
            })}
          </RadioGroup>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="feedback" className="text-base font-medium">
              Additional Comments (Optional)
            </Label>
            <p className="text-sm text-muted-foreground mt-1">
              Please share any additional feedback or suggestions
            </p>
          </div>
          <Textarea
            id="feedback"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Your feedback helps us improve..."
            className="min-h-[100px]"
          />
        </div>

        <div className="flex justify-between items-center pt-4 border-t">
          <p className="text-sm text-muted-foreground">
            Thank you for taking the time to provide feedback!
          </p>
          <Button 
            onClick={handleSubmit}
            disabled={!satisfaction || !recommendation}
          >
            Submit Survey
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}