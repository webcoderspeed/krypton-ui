import { buttonVariants } from "@/components/ui/button";
import { 
  ZapIcon, 
  ShieldCheckIcon, 
  PaletteIcon, 
  TypeIcon,
  TerminalIcon,
  ArrowRightIcon,
  GithubIcon
} from "lucide-react";
import Link from "next/link";
import GetStarted from "../components/get-started";
import { ButtonExample, DialogExample } from "@/components/code-example";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="flex min-h-[90vh] flex-col items-center justify-center text-center px-4 py-16">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-muted px-4 py-2 text-sm text-muted-foreground">
          <ZapIcon className="h-4 w-4" />
          Next-Generation Design System
        </div>
        
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl mb-6">
          Build with{" "}
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Nova-UI
          </span>
        </h1>
        
        <p className="text-lg sm:text-xl max-w-[700px] text-muted-foreground mb-8 leading-relaxed">
          A comprehensive design system for Next.js with built-in theming, 
          accessibility compliance, and type safety. Ship faster with confidence.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
          <GetStarted />
          <Link
            href="https://github.com/nova-ui/nova-ui"
            target="_blank"
            className={buttonVariants({
              variant: "outline",
              size: "lg",
              className: "gap-2"
            })}
          >
            <GithubIcon className="h-4 w-4" />
            View on GitHub
          </Link>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <TerminalIcon className="h-4 w-4" />
          <code className="bg-muted px-2 py-1 rounded text-xs font-mono">
            npm install nova-ui
          </code>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Nova-UI?</h2>
            <p className="text-lg text-muted-foreground max-w-[600px] mx-auto">
              Built for modern development workflows with performance and accessibility at its core.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="group p-6 rounded-lg border bg-card hover:shadow-md transition-all duration-200">
              <div className="mb-4 p-2 w-fit rounded-md bg-primary/10">
                <ZapIcon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Fast</h3>
              <p className="text-sm text-muted-foreground">
                Optimized for performance with minimal bundle size and efficient rendering.
              </p>
            </div>
            
            <div className="group p-6 rounded-lg border bg-card hover:shadow-md transition-all duration-200">
              <div className="mb-4 p-2 w-fit rounded-md bg-primary/10">
                <ShieldCheckIcon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Accessible</h3>
              <p className="text-sm text-muted-foreground">
                WCAG compliant components with keyboard navigation and screen reader support.
              </p>
            </div>
            
            <div className="group p-6 rounded-lg border bg-card hover:shadow-md transition-all duration-200">
              <div className="mb-4 p-2 w-fit rounded-md bg-primary/10">
                <PaletteIcon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Themable</h3>
              <p className="text-sm text-muted-foreground">
                Comprehensive theming system with CSS variables and dark mode support.
              </p>
            </div>
            
            <div className="group p-6 rounded-lg border bg-card hover:shadow-md transition-all duration-200">
              <div className="mb-4 p-2 w-fit rounded-md bg-primary/10">
                <TypeIcon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Typed</h3>
              <p className="text-sm text-muted-foreground">
                Full TypeScript support with comprehensive type definitions and IntelliSense.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
