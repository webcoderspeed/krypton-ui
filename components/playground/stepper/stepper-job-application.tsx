import { Stepper, StepperItem } from "@/components/ui/stepper";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Upload, Video, Users, CheckCircle } from "lucide-react";

export default function StepperJobApplication() {
  return (
    <div className="w-full max-w-2xl">
      <div className="mb-6 p-4 bg-muted rounded-lg">
        <h3 className="font-semibold mb-2">Senior Frontend Developer</h3>
        <div className="flex gap-4 text-sm text-muted-foreground">
          <span>TechCorp Inc.</span>
          <span>•</span>
          <span>Remote</span>
          <span>•</span>
          <span>$120k - $150k</span>
        </div>
      </div>
      
      <Stepper>
        <StepperItem title="Submit Application">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-medium">Basic information</span>
              <Badge variant="secondary">Completed</Badge>
            </div>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>✓ Personal details submitted</p>
              <p>✓ Cover letter uploaded</p>
              <p>✓ Resume attached (PDF)</p>
              <p>✓ Portfolio links provided</p>
            </div>
            <div className="text-xs text-green-600 bg-green-50 p-2 rounded">
              Application submitted on March 15, 2024
            </div>
          </div>
        </StepperItem>
        
        <StepperItem title="Resume Screening">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Upload className="h-4 w-4 text-orange-500" />
              <span className="text-sm font-medium">Initial review</span>
              <Badge variant="secondary">In Progress</Badge>
            </div>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>HR team is reviewing your application</p>
              <p>Expected timeline: 3-5 business days</p>
              <p>Status: Under review</p>
              <p>You&apos;ll be notified via email once complete</p>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="bg-orange-500 h-2 rounded-full w-3/4"></div>
            </div>
          </div>
        </StepperItem>
        
        <StepperItem title="Technical Assessment">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-purple-500" />
              <span className="text-sm font-medium">Coding challenge</span>
              <Badge variant="outline">Pending</Badge>
            </div>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>Online coding assessment</p>
              <p>Duration: 2 hours</p>
              <p>Topics: React, TypeScript, Algorithms</p>
              <p>Available once resume is approved</p>
            </div>
            <Button size="sm" disabled>
              Start Assessment
            </Button>
          </div>
        </StepperItem>
        
        <StepperItem title="Video Interview">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Video className="h-4 w-4 text-green-500" />
              <span className="text-sm font-medium">Technical interview</span>
              <Badge variant="outline">Pending</Badge>
            </div>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>1-hour technical discussion</p>
              <p>With: Senior Engineering Team</p>
              <p>Format: Video call (Google Meet)</p>
              <p>Schedule after assessment completion</p>
            </div>
            <Button size="sm" disabled>
              Schedule Interview
            </Button>
          </div>
        </StepperItem>
        
        <StepperItem title="Team Interview">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-medium">Cultural fit</span>
              <Badge variant="outline">Pending</Badge>
            </div>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>45-minute team discussion</p>
              <p>With: Product Manager & Designer</p>
              <p>Focus: Collaboration & communication</p>
              <p>Final step before decision</p>
            </div>
          </div>
        </StepperItem>
        
        <StepperItem title="Final Decision">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-gray-400" />
              <span className="text-sm font-medium">Offer decision</span>
              <Badge variant="outline">Pending</Badge>
            </div>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>Internal team discussion</p>
              <p>Reference checks (if needed)</p>
              <p>Final decision within 2 business days</p>
              <p>Notification via email and phone</p>
            </div>
          </div>
        </StepperItem>
      </Stepper>
    </div>
  );
}