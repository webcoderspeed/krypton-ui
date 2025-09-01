'use client'

import { MDXComponents } from 'mdx/types'
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live'
import { themes } from 'prism-react-renderer'
import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import * as LucideIcons from 'lucide-react'

// Scope for live code blocks
const scope = {
  React,
  useState: React.useState,
  useEffect: React.useEffect,
  Button,
  Input,
  Label,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  // Add individual Lucide icons
  Eye: LucideIcons.Eye,
  EyeOff: LucideIcons.EyeOff,
  Search: LucideIcons.Search,
  Mail: LucideIcons.Mail,
  Lock: LucideIcons.Lock,
  User: LucideIcons.User,
}

interface CodeBlockProps {
  children: string
  className?: string
  live?: boolean
}

interface CodeProps extends React.HTMLAttributes<HTMLElement> {
  live?: boolean
}

function CodeBlock({ children, className, live, ...props }: CodeBlockProps) {
  const language = className?.replace(/language-/, '') || 'tsx'
  
  console.log('CodeBlock called with live:', live, 'className:', className)
  
  if (live) {
    console.log('Rendering live code block with code:', children.trim())
    return (
      <div className="my-6">
        <div className="mb-2 text-sm text-muted-foreground">Live Preview:</div>
        <LiveProvider
          code={children.trim()}
          scope={scope}
          theme={themes.vsLight}
        >
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-muted p-4">
              <LivePreview />
            </div>
            <div className="border-t">
              <LiveEditor className="font-mono text-sm" />
            </div>
            <LiveError className="bg-destructive/10 text-destructive p-4 text-sm" />
          </div>
        </LiveProvider>
      </div>
    )
  }

  return (
    <pre className={className} {...props}>
      <code>{children}</code>
    </pre>
  )
}

export const mdxComponents: MDXComponents = {
  pre: ({ children, ...props }) => {
    const child = React.Children.only(children) as React.ReactElement
    const { children: code, className } = child.props
    
    // Check if this is a live code block by looking at the className
    const isLive = className?.includes('language-tsx') && code?.includes('live')
    
    console.log('Pre component - className:', className, 'isLive:', isLive)
    
    if (isLive) {
      return (
        <CodeBlock className={className} live={true}>
          {code}
        </CodeBlock>
      )
    }
    
    return (
      <CodeBlock className={className}>
        {code}
      </CodeBlock>
    )
  },
  code: ({ className, children, live, ...props }: CodeProps) => {
    console.log('Code component - className:', className, 'live:', live, 'children:', children)
    
    // Check for live in the code content itself
    const isLive = className?.includes('language-tsx') && typeof children === 'string' && children.includes('live')
    
    if (live || isLive) {
      return (
        <CodeBlock className={className} live={true}>
          {children as string}
        </CodeBlock>
      )
    }
    
    return (
      <code className={className} {...props}>
        {children}
      </code>
    )
  },
}

export default mdxComponents