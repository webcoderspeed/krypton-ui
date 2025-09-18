import { Stepper, StepperItem } from "@/components/ui/stepper";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FolderPlus, Download, Settings, Rocket, Code } from "lucide-react";

export default function StepperProjectSetup() {
  return (
    <div className="w-full max-w-2xl">
      <Stepper>
        <StepperItem title="Create Repository">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <FolderPlus className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-medium">Initialize new project</span>
              <Badge variant="secondary">Git</Badge>
            </div>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>Repository: my-awesome-app</p>
              <p>Visibility: Private</p>
              <p>Template: React + TypeScript</p>
              <p>License: MIT</p>
            </div>
            <div className="flex gap-2">
              <Button size="sm">Create Repository</Button>
              <Button size="sm" variant="outline">Use Template</Button>
            </div>
          </div>
        </StepperItem>
        
        <StepperItem title="Install Dependencies">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Download className="h-4 w-4 text-orange-500" />
              <span className="text-sm font-medium">Package installation</span>
              <Badge variant="secondary">npm</Badge>
            </div>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>• React 18.2.0</p>
              <p>• TypeScript 5.0.0</p>
              <p>• Tailwind CSS 3.3.0</p>
              <p>• Vite 4.4.0</p>
            </div>
            <div className="bg-muted p-2 rounded text-xs font-mono">
              npm install --save react typescript tailwindcss vite
            </div>
          </div>
        </StepperItem>
        
        <StepperItem title="Configure Environment">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Settings className="h-4 w-4 text-purple-500" />
              <span className="text-sm font-medium">Environment setup</span>
            </div>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>✓ ESLint configuration</p>
              <p>✓ Prettier setup</p>
              <p>✓ TypeScript config</p>
              <p>✓ Environment variables</p>
            </div>
            <Button size="sm" variant="outline">Edit Config</Button>
          </div>
        </StepperItem>
        
        <StepperItem title="Write Code">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Code className="h-4 w-4 text-green-500" />
              <span className="text-sm font-medium">Development phase</span>
            </div>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>Components: 12 created</p>
              <p>Pages: 5 implemented</p>
              <p>Tests: 85% coverage</p>
              <p>Last commit: 2 hours ago</p>
            </div>
            <div className="flex gap-2">
              <Button size="sm">Open VS Code</Button>
              <Button size="sm" variant="outline">Run Tests</Button>
            </div>
          </div>
        </StepperItem>
        
        <StepperItem title="Deploy Application">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Rocket className="h-4 w-4 text-red-500" />
              <span className="text-sm font-medium">Production deployment</span>
              <Badge variant="secondary">Vercel</Badge>
            </div>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>Build status: ✓ Successful</p>
              <p>Deploy time: 2m 34s</p>
              <p>URL: https://my-awesome-app.vercel.app</p>
              <p>Performance score: 98/100</p>
            </div>
            <div className="flex gap-2">
              <Button size="sm">View Live Site</Button>
              <Button size="sm" variant="outline">Analytics</Button>
            </div>
          </div>
        </StepperItem>
      </Stepper>
    </div>
  );
}