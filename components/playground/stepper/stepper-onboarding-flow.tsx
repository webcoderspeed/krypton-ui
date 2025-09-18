import { Stepper, StepperItem } from "@/components/ui/stepper";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserPlus, Camera, Users, Bell, Trophy } from "lucide-react";

export default function StepperOnboardingFlow() {
  return (
    <div className="w-full max-w-2xl">
      <Stepper>
        <StepperItem title="Welcome to TaskFlow">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <UserPlus className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-medium">Getting started</span>
              <Badge variant="secondary">Step 1 of 5</Badge>
            </div>
            <div className="text-sm text-muted-foreground space-y-2">
              <p>Welcome to TaskFlow! We&apos;re excited to have you on board.</p>
              <p>This quick setup will help you get the most out of our platform.</p>
              <p>Estimated time: 3-5 minutes</p>
            </div>
            <Button size="sm">Let&apos;s Get Started</Button>
          </div>
        </StepperItem>
        
        <StepperItem title="Create Your Profile">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Camera className="h-4 w-4 text-orange-500" />
              <span className="text-sm font-medium">Personal information</span>
            </div>
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src="/placeholder-avatar.jpg" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="text-sm">
                <p className="font-medium">John Doe</p>
                <p className="text-muted-foreground">Product Manager</p>
                <p className="text-muted-foreground">San Francisco, CA</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline">Upload Photo</Button>
              <Button size="sm">Continue</Button>
            </div>
          </div>
        </StepperItem>
        
        <StepperItem title="Invite Team Members">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-purple-500" />
              <span className="text-sm font-medium">Build your team</span>
              <Badge variant="outline">Optional</Badge>
            </div>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>Invite colleagues to collaborate on projects</p>
              <p>• sarah@company.com (invited)</p>
              <p>• mike@company.com (invited)</p>
              <p>• alex@company.com (pending)</p>
            </div>
            <div className="flex gap-2">
              <Button size="sm">Invite More</Button>
              <Button size="sm" variant="outline">Skip for Now</Button>
            </div>
          </div>
        </StepperItem>
        
        <StepperItem title="Notification Preferences">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Bell className="h-4 w-4 text-green-500" />
              <span className="text-sm font-medium">Stay updated</span>
            </div>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>✓ Email notifications for mentions</p>
              <p>✓ Daily digest summary</p>
              <p>✓ Mobile push notifications</p>
              <p>✗ Marketing emails</p>
            </div>
            <Button size="sm" variant="outline">Customize Settings</Button>
          </div>
        </StepperItem>
        
        <StepperItem title="You&apos;re All Set!">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Trophy className="h-4 w-4 text-yellow-500" />
              <span className="text-sm font-medium text-green-600">Onboarding complete!</span>
            </div>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>🎉 Welcome to TaskFlow!</p>
              <p>Your workspace is ready to use</p>
              <p>Check out our getting started guide</p>
              <p>Need help? Contact our support team</p>
            </div>
            <div className="flex gap-2">
              <Button size="sm">Go to Dashboard</Button>
              <Button size="sm" variant="outline">View Guide</Button>
            </div>
          </div>
        </StepperItem>
      </Stepper>
    </div>
  );
}