import { Stepper, StepperItem } from "@/components/ui/stepper";
import { CheckCircle, Mail, User, Zap } from "lucide-react";

export default function StepperWithIcons() {
  return (
    <div className="w-full max-w-lg">
      <Stepper>
        <StepperItem title="Account Setup">
          <div className="flex items-center gap-2 mb-2">
            <User className="h-4 w-4 text-blue-500" />
            <span className="text-sm font-medium">Create your account</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Provide your basic information to get started.
          </p>
        </StepperItem>
        
        <StepperItem title="Email Verification">
          <div className="flex items-center gap-2 mb-2">
            <Mail className="h-4 w-4 text-orange-500" />
            <span className="text-sm font-medium">Verify your email</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Click the link we sent to your email address.
          </p>
        </StepperItem>
        
        <StepperItem title="Profile Complete">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span className="text-sm font-medium">Complete your profile</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Add additional details to personalize your experience.
          </p>
        </StepperItem>
        
        <StepperItem title="Ready to Go">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="h-4 w-4 text-purple-500" />
            <span className="text-sm font-medium">Start exploring</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Everything is set up! Begin your journey.
          </p>
        </StepperItem>
      </Stepper>
    </div>
  );
}