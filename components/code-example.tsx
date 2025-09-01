"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Copy, Check, Palette, Zap, Shield, Code } from "lucide-react";

interface CodeExampleProps {
  title: string;
  description: string;
  code: string;
  preview: React.ReactNode;
}

export function CodeExample({ title, description, code, preview }: CodeExampleProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="border rounded-lg overflow-hidden bg-card">
      <div className="p-4 border-b bg-muted/50">
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-center min-h-[120px] border rounded-md bg-background/50 backdrop-blur-sm">
          {preview}
        </div>
      </div>
      
      <div className="relative">
        <div className="flex items-center justify-between p-3 border-t bg-muted/30">
          <div className="flex items-center gap-2">
            <Code className="h-3 w-3" />
            <span className="text-xs font-medium text-muted-foreground">TypeScript</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={copyToClipboard}
            className="h-8 px-2 hover:bg-primary/10"
          >
            {copied ? (
              <Check className="h-3 w-3 text-green-500" />
            ) : (
              <Copy className="h-3 w-3" />
            )}
            <span className="ml-1 text-xs">{copied ? 'Copied!' : 'Copy'}</span>
          </Button>
        </div>
        <pre className="p-4 text-sm overflow-x-auto bg-muted/50 font-mono">
          <code className="text-foreground">{code}</code>
        </pre>
      </div>
    </div>
  );
}

// Enhanced examples for the landing page
export function ButtonExample() {
  return (
    <CodeExample
      title="Button Component"
      description="Versatile button with multiple variants and sizes"
      code={`import { Button } from "@/components/ui/button";

export function ButtonDemo() {
  return (
    <div className="flex gap-2">
      <Button variant="default">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
    </div>
  );
}`}
      preview={
        <div className="flex gap-2 flex-wrap">
          <Button variant="default">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
        </div>
      }
    />
  );
}

export function DialogExample() {
  const [name, setName] = useState("");
  
  return (
    <CodeExample
      title="Dialog Component"
      description="Accessible modal dialog with form integration"
      code={`import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input placeholder="Enter your name" />
          <Button className="w-full">Save Changes</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}`}
      preview={
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">Open Dialog</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Profile</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <Input 
                placeholder="Enter your name" 
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Button className="w-full">Save Changes</Button>
            </div>
          </DialogContent>
        </Dialog>
      }
    />
  );
}