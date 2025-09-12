import { Separator } from '@/components/ui/separator'

export default function SeparatorDemo() {
  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-medium leading-none">Horizontal Separator</h4>
        <p className="text-sm text-muted-foreground mt-2">
          A horizontal line to separate content sections.
        </p>
        <Separator className="my-4" />
        <div className="flex h-5 items-center space-x-4 text-sm">
          <div>Blog</div>
          <Separator orientation="vertical" />
          <div>Docs</div>
          <Separator orientation="vertical" />
          <div>Source</div>
        </div>
      </div>
      
      <div>
        <h4 className="text-sm font-medium leading-none">Vertical Separator</h4>
        <p className="text-sm text-muted-foreground mt-2">
          A vertical line to separate inline content.
        </p>
        <div className="flex h-20 items-center justify-center space-x-4 text-sm">
          <div className="flex flex-col items-center space-y-2">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-xs font-medium">A</span>
            </div>
            <span>Section A</span>
          </div>
          <Separator orientation="vertical" className="h-16" />
          <div className="flex flex-col items-center space-y-2">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-xs font-medium">B</span>
            </div>
            <span>Section B</span>
          </div>
          <Separator orientation="vertical" className="h-16" />
          <div className="flex flex-col items-center space-y-2">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-xs font-medium">C</span>
            </div>
            <span>Section C</span>
          </div>
        </div>
      </div>
    </div>
  )
}