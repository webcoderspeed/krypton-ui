"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight } from "lucide-react";

const step1Schema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
});

const step2Schema = z.object({
  company: z.string().min(2, "Company name must be at least 2 characters"),
  position: z.string().min(2, "Position must be at least 2 characters"),
  experience: z.string().min(1, "Please select your experience level"),
});

const step3Schema = z.object({
  bio: z.string().min(50, "Bio must be at least 50 characters"),
  website: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
});

const formSchema = step1Schema.merge(step2Schema).merge(step3Schema);

export default function FormWithSteps() {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      company: "",
      position: "",
      experience: "",
      bio: "",
      website: "",
    },
  });

  async function validateStep(step: number) {
    let schema;
    let fields;
    
    switch (step) {
      case 1:
        schema = step1Schema;
        fields = ["firstName", "lastName", "email"] as const;
        break;
      case 2:
        schema = step2Schema;
        fields = ["company", "position", "experience"] as const;
        break;
      case 3:
        schema = step3Schema;
        fields = ["bio", "website"] as const;
        break;
      default:
        return false;
    }

    const values = form.getValues();
    const stepData = Object.fromEntries(
      fields.map(field => [field, values[field]])
    );

    try {
      schema.parse(stepData);
      return true;
    } catch {
      await form.trigger(fields);
      return false;
    }
  }

  async function nextStep() {
    const isValid = await validateStep(currentStep);
    if (isValid && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  }

  function prevStep() {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Multi-Step Form</h3>
        <p className="text-sm text-muted-foreground">
          A form divided into multiple steps with validation at each step.
        </p>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {Array.from({ length: totalSteps }, (_, i) => (
            <Badge
              key={i + 1}
              variant={currentStep === i + 1 ? "default" : currentStep > i + 1 ? "secondary" : "outline"}
            >
              Step {i + 1}
            </Badge>
          ))}
        </div>
        <span className="text-sm text-muted-foreground">
          {currentStep} of {totalSteps}
        </span>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {currentStep === 1 && (
            <div className="space-y-4">
              <h4 className="text-md font-medium">Personal Information</h4>
              
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your first name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your last name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email" type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <h4 className="text-md font-medium">Professional Information</h4>
              
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your company name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="position"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Position</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your position" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="experience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Experience Level</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Junior, Senior, Lead" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-4">
              <h4 className="text-md font-medium">Additional Information</h4>
              
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Tell us about yourself..."
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Write a brief description about yourself (minimum 50 characters).
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="https://yourwebsite.com" {...field} />
                    </FormControl>
                    <FormDescription>
                      Your personal or company website.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
          
          <div className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            
            {currentStep < totalSteps ? (
              <Button type="button" onClick={nextStep}>
                Next
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button type="submit">
                Submit
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}