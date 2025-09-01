"use client";

import * as React from "react";
import { Moon, Sun, Monitor, Check } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

interface ThemeOption {
  value: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

const themeOptions: ThemeOption[] = [
  {
    value: "light",
    label: "Light",
    icon: Sun,
    description: "Light theme with bright colors"
  },
  {
    value: "dark",
    label: "Dark",
    icon: Moon,
    description: "Dark theme with muted colors"
  },
  {
    value: "system",
    label: "System",
    icon: Monitor,
    description: "Follow system preference"
  }
];

export interface EnhancedThemeToggleProps {
  /**
   * Size variant for the toggle button
   * @default "default"
   */
  size?: "default" | "sm" | "lg" | "icon";
  /**
   * Button variant for the toggle
   * @default "ghost"
   */
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  /**
   * Whether to show theme descriptions in the dropdown
   * @default true
   */
  showDescriptions?: boolean;
  /**
   * Custom class name for the trigger button
   */
  className?: string;
  /**
   * Whether to show the current theme indicator
   * @default true
   */
  showCurrentTheme?: boolean;
}

/**
 * Enhanced theme toggle component with comprehensive theming support.
 * 
 * Features:
 * - Accessible keyboard navigation
 * - Visual theme indicators
 * - Smooth transitions
 * - WCAG compliant contrast
 * - System theme detection
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <EnhancedThemeToggle />
 * 
 * // With custom styling
 * <EnhancedThemeToggle 
 *   size="lg" 
 *   variant="outline" 
 *   showDescriptions={false}
 * />
 * ```
 */
export function EnhancedThemeToggle({
  size = "icon",
  variant = "ghost",
  showDescriptions = true,
  className,
  showCurrentTheme = true
}: EnhancedThemeToggleProps) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Prevent hydration mismatch
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant={variant} size={size} className={className} disabled>
        <Sun className="h-[1.1rem] w-[1.1rem]" />
        <span className="sr-only">Loading theme toggle</span>
      </Button>
    );
  }

  const currentTheme = theme || "system";
  const currentOption = themeOptions.find(option => option.value === currentTheme);
  const CurrentIcon = currentOption?.icon || Sun;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant={variant} 
          size={size} 
          className={className}
          aria-label={`Current theme: ${currentOption?.label || 'Unknown'}. Click to change theme`}
        >
          {/* Animated theme icons */}
          <Sun className="h-[1.1rem] w-[1.1rem] rotate-0 scale-100 transition-all duration-200 dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.1rem] w-[1.1rem] rotate-90 scale-0 transition-all duration-200 dark:rotate-0 dark:scale-100" />
          <span className="sr-only">
            Toggle theme. Current theme: {currentOption?.label || 'Unknown'}
          </span>
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent 
        align="end" 
        className="w-56"
        sideOffset={4}
      >
        {showCurrentTheme && (
          <>
            <div className="px-2 py-1.5 text-sm font-medium text-muted-foreground">
              Current: {resolvedTheme === 'dark' ? 'Dark' : 'Light'} 
              {theme === 'system' && ' (System)'}
            </div>
            <DropdownMenuSeparator />
          </>
        )}
        
        {themeOptions.map((option) => {
          const Icon = option.icon;
          const isSelected = currentTheme === option.value;
          
          return (
            <DropdownMenuItem
              key={option.value}
              onClick={() => setTheme(option.value)}
              className="flex items-center gap-3 cursor-pointer"
              aria-label={`Switch to ${option.label} theme. ${option.description}`}
            >
              <Icon className="h-4 w-4" />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{option.label}</span>
                  {isSelected && (
                    <Check className="h-3 w-3 text-primary" aria-hidden="true" />
                  )}
                </div>
                {showDescriptions && (
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {option.description}
                  </p>
                )}
              </div>
            </DropdownMenuItem>
          );
        })}
        
        <DropdownMenuSeparator />
        <div className="px-2 py-1.5 text-xs text-muted-foreground">
          Themes automatically adapt to your system preferences
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/**
 * Simple theme toggle button without dropdown - for minimal interfaces
 */
export function SimpleThemeToggle({ 
  className,
  size = "icon",
  variant = "ghost"
}: Pick<EnhancedThemeToggleProps, 'className' | 'size' | 'variant'>) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant={variant} size={size} className={className} disabled>
        <Sun className="h-[1.1rem] w-[1.1rem]" />
      </Button>
    );
  }

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <Button 
      variant={variant} 
      size={size} 
      className={className}
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
    >
      <Sun className="h-[1.1rem] w-[1.1rem] rotate-0 scale-100 transition-all duration-200 dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.1rem] w-[1.1rem] rotate-90 scale-0 transition-all duration-200 dark:rotate-0 dark:scale-100" />
      <span className="sr-only">
        Toggle theme. Current: {theme === 'dark' ? 'Dark' : 'Light'}
      </span>
    </Button>
  );
}

// Export the original component for backward compatibility
export { ModeToggle } from "./theme-toggle";