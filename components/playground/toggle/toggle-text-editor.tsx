"use client"

import { useState } from "react"
import { Toggle } from "@/components/ui/toggle"
import { Separator } from "@/components/ui/separator"
import { 
  Bold, 
  Italic, 
  Underline, 
  Strikethrough, 
  AlignLeft, 
  AlignCenter, 
  AlignRight,
  List,
  ListOrdered
} from "lucide-react"

export default function ToggleTextEditor() {
  const [formatting, setFormatting] = useState({
    bold: false,
    italic: false,
    underline: false,
    strikethrough: false,
    alignLeft: true,
    alignCenter: false,
    alignRight: false,
    bulletList: false,
    numberedList: false
  })

  const handleToggle = (key: keyof typeof formatting) => {
    if (key === 'alignLeft' || key === 'alignCenter' || key === 'alignRight') {
      setFormatting(prev => ({
        ...prev,
        alignLeft: key === 'alignLeft',
        alignCenter: key === 'alignCenter',
        alignRight: key === 'alignRight'
      }))
    } else if (key === 'bulletList' || key === 'numberedList') {
      setFormatting(prev => ({
        ...prev,
        bulletList: key === 'bulletList' ? !prev.bulletList : false,
        numberedList: key === 'numberedList' ? !prev.numberedList : false
      }))
    } else {
      setFormatting(prev => ({
        ...prev,
        [key]: !prev[key]
      }))
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-6 space-y-4">
      <h3 className="text-lg font-semibold">Rich Text Editor Toolbar</h3>
      
      {/* Toolbar */}
      <div className="flex items-center gap-1 p-2 border rounded-lg bg-background">
        {/* Text Formatting */}
        <div className="flex items-center gap-1">
          <Toggle 
            pressed={formatting.bold}
            onPressedChange={() => handleToggle('bold')}
            size="sm"
            aria-label="Toggle bold"
          >
            <Bold className="h-4 w-4" />
          </Toggle>
          
          <Toggle 
            pressed={formatting.italic}
            onPressedChange={() => handleToggle('italic')}
            size="sm"
            aria-label="Toggle italic"
          >
            <Italic className="h-4 w-4" />
          </Toggle>
          
          <Toggle 
            pressed={formatting.underline}
            onPressedChange={() => handleToggle('underline')}
            size="sm"
            aria-label="Toggle underline"
          >
            <Underline className="h-4 w-4" />
          </Toggle>
          
          <Toggle 
            pressed={formatting.strikethrough}
            onPressedChange={() => handleToggle('strikethrough')}
            size="sm"
            aria-label="Toggle strikethrough"
          >
            <Strikethrough className="h-4 w-4" />
          </Toggle>
        </div>

        <Separator orientation="vertical" className="h-6" />

        {/* Alignment */}
        <div className="flex items-center gap-1">
          <Toggle 
            pressed={formatting.alignLeft}
            onPressedChange={() => handleToggle('alignLeft')}
            size="sm"
            aria-label="Align left"
          >
            <AlignLeft className="h-4 w-4" />
          </Toggle>
          
          <Toggle 
            pressed={formatting.alignCenter}
            onPressedChange={() => handleToggle('alignCenter')}
            size="sm"
            aria-label="Align center"
          >
            <AlignCenter className="h-4 w-4" />
          </Toggle>
          
          <Toggle 
            pressed={formatting.alignRight}
            onPressedChange={() => handleToggle('alignRight')}
            size="sm"
            aria-label="Align right"
          >
            <AlignRight className="h-4 w-4" />
          </Toggle>
        </div>

        <Separator orientation="vertical" className="h-6" />

        {/* Lists */}
        <div className="flex items-center gap-1">
          <Toggle 
            pressed={formatting.bulletList}
            onPressedChange={() => handleToggle('bulletList')}
            size="sm"
            aria-label="Bullet list"
          >
            <List className="h-4 w-4" />
          </Toggle>
          
          <Toggle 
            pressed={formatting.numberedList}
            onPressedChange={() => handleToggle('numberedList')}
            size="sm"
            aria-label="Numbered list"
          >
            <ListOrdered className="h-4 w-4" />
          </Toggle>
        </div>
      </div>

      {/* Preview Area */}
      <div className="border rounded-lg p-4 min-h-32 bg-muted/20">
        <div 
          className={`
            ${formatting.bold ? 'font-bold' : ''}
            ${formatting.italic ? 'italic' : ''}
            ${formatting.underline ? 'underline' : ''}
            ${formatting.strikethrough ? 'line-through' : ''}
            ${formatting.alignLeft ? 'text-left' : ''}
            ${formatting.alignCenter ? 'text-center' : ''}
            ${formatting.alignRight ? 'text-right' : ''}
          `}
        >
          {formatting.bulletList && '• '}
          {formatting.numberedList && '1. '}
          This is a sample text that shows the formatting applied by the toolbar above.
        </div>
      </div>
    </div>
  )
}