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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  age: z.string().min(1, "Please select your age group"),
  satisfaction: z.array(z.number()).min(1, "Please rate your satisfaction"),
  experience: z.string().min(1, "Please select your experience"),
  features: z.array(z.string()).min(1, "Please select at least one feature"),
  recommendation: z.string().min(1, "Please select a recommendation score"),
  feedback: z.string().min(10, "Feedback must be at least 10 characters"),
  improvements: z.string().optional(),
  newsletter: z.boolean().optional(),
});

const features = [
  { id: "ui", label: "User Interface" },
  { id: "performance", label: "Performance" },
  { id: "documentation", label: "Documentation" },
  { id: "support", label: "Customer Support" },
  { id: "pricing", label: "Pricing" },
  { id: "features", label: "Feature Set" },
];

export default function SurveyForm() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      age: "",
      satisfaction: [7],
      experience: "",
      features: [],
      recommendation: "",
      feedback: "",
      improvements: "",
      newsletter: false,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log(values);
    setIsLoading(false);
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Customer Satisfaction Survey</h3>
        <p className="text-sm text-muted-foreground">
          Help us improve our product by sharing your feedback and experience.
        </p>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your full name" {...field} />
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
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Age Group</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your age group" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="18-24">18-24 years</SelectItem>
                    <SelectItem value="25-34">25-34 years</SelectItem>
                    <SelectItem value="35-44">35-44 years</SelectItem>
                    <SelectItem value="45-54">45-54 years</SelectItem>
                    <SelectItem value="55-64">55-64 years</SelectItem>
                    <SelectItem value="65+">65+ years</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="satisfaction"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Overall Satisfaction (1-10)</FormLabel>
                <FormControl>
                  <div className="space-y-3">
                    <Slider
                      min={1}
                      max={10}
                      step={1}
                      value={field.value}
                      onValueChange={field.onChange}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Very Dissatisfied</span>
                      <span className="font-medium">Score: {field.value[0]}</span>
                      <span>Very Satisfied</span>
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="experience"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>How would you describe your experience?</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="excellent" id="excellent" />
                      <Label htmlFor="excellent">Excellent</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="good" id="good" />
                      <Label htmlFor="good">Good</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="average" id="average" />
                      <Label htmlFor="average">Average</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="poor" id="poor" />
                      <Label htmlFor="poor">Poor</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="terrible" id="terrible" />
                      <Label htmlFor="terrible">Terrible</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="features"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel className="text-base">
                    Which features do you find most valuable?
                  </FormLabel>
                  <FormDescription>
                    Select all that apply
                  </FormDescription>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {features.map((item) => (
                    <FormField
                      key={item.id}
                      control={form.control}
                      name="features"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={item.id}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, item.id])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== item.id
                                        )
                                      )
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {item.label}
                            </FormLabel>
                          </FormItem>
                        )
                      }}
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="recommendation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>How likely are you to recommend us to others? (0-10)</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a score" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Array.from({ length: 11 }, (_, i) => (
                      <SelectItem key={i} value={i.toString()}>
                        {i} - {i <= 6 ? "Detractor" : i <= 8 ? "Passive" : "Promoter"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  0 = Not at all likely, 10 = Extremely likely
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="feedback"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Additional Feedback</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Please share your thoughts, suggestions, or any specific feedback..." 
                    className="resize-none"
                    rows={4}
                    {...field} 
                  />
                </FormControl>
                <FormDescription>
                  Tell us what you liked or what could be improved
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="improvements"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Suggested Improvements (Optional)</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="What specific improvements would you like to see?" 
                    className="resize-none"
                    rows={3}
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="newsletter"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    Subscribe to our newsletter
                  </FormLabel>
                  <FormDescription>
                    Get updates about new features and product improvements
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
          
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? "Submitting Survey..." : "Submit Survey"}
          </Button>
          
          <p className="text-xs text-muted-foreground text-center">
            Thank you for taking the time to provide your feedback. Your responses help us improve our product.
          </p>
        </form>
      </Form>
    </div>
  );
}