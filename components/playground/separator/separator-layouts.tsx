import { Separator } from '@/components/ui/separator'
import { Avatar } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export default function SeparatorLayouts() {
  return (
    <div className="space-y-8">
      <div>
        <h4 className="text-sm font-medium leading-none mb-4">Article Layout</h4>
        <article className="max-w-2xl">
          <header className="mb-6">
            <h1 className="text-2xl font-bold mb-2">Understanding Design Systems</h1>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>By John Doe</span>
              <Separator orientation="vertical" className="h-3" />
              <span>March 15, 2024</span>
              <Separator orientation="vertical" className="h-3" />
              <span>8 min read</span>
            </div>
          </header>
          <Separator className="mb-6" />
          <div className="prose prose-sm">
            <p className="text-muted-foreground mb-4">
              Design systems are comprehensive collections of reusable components, 
              guided by clear standards, that can be assembled together to build 
              any number of applications.
            </p>
            <p className="text-muted-foreground">
              They serve as the single source of truth for design and development 
              teams, ensuring consistency across products and platforms.
            </p>
          </div>
          <Separator className="my-6" />
          <footer>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Badge variant="secondary">Design</Badge>
                <Badge variant="secondary">Development</Badge>
                <Badge variant="secondary">UI/UX</Badge>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">Share</Button>
                <Separator orientation="vertical" className="h-4" />
                <Button variant="outline" size="sm">Bookmark</Button>
              </div>
            </div>
          </footer>
        </article>
      </div>

      <div>
        <h4 className="text-sm font-medium leading-none mb-4">Comment Thread</h4>
        <div className="space-y-4 max-w-2xl">
          <div className="flex space-x-3">
            <Avatar className="h-8 w-8" />
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-sm font-medium">Alice Johnson</span>
                <Separator orientation="vertical" className="h-3" />
                <span className="text-xs text-muted-foreground">2 hours ago</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Great article! This really helped me understand the importance 
                of design systems in modern development workflows.
              </p>
            </div>
          </div>
          <Separator className="ml-11" />
          <div className="flex space-x-3">
            <Avatar className="h-8 w-8" />
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-sm font-medium">Bob Smith</span>
                <Separator orientation="vertical" className="h-3" />
                <span className="text-xs text-muted-foreground">1 hour ago</span>
              </div>
              <p className="text-sm text-muted-foreground">
                I agree! We&apos;ve been implementing a design system at our company 
                and it&apos;s made a huge difference in consistency.
              </p>
            </div>
          </div>
          <Separator className="ml-11" />
          <div className="flex space-x-3">
            <Avatar className="h-8 w-8" />
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-sm font-medium">Carol Davis</span>
                <Separator orientation="vertical" className="h-3" />
                <span className="text-xs text-muted-foreground">30 minutes ago</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Would love to see a follow-up article about implementing 
                design tokens specifically!
              </p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium leading-none mb-4">Dashboard Stats</h4>
        <div className="grid grid-cols-4 gap-4">
          <div className="border rounded-lg p-4">
            <div className="text-2xl font-bold">1,234</div>
            <div className="text-sm text-muted-foreground">Total Users</div>
            <Separator className="my-2" />
            <div className="text-xs text-green-600">+12% from last month</div>
          </div>
          <div className="border rounded-lg p-4">
            <div className="text-2xl font-bold">567</div>
            <div className="text-sm text-muted-foreground">Active Sessions</div>
            <Separator className="my-2" />
            <div className="text-xs text-green-600">+8% from last month</div>
          </div>
          <div className="border rounded-lg p-4">
            <div className="text-2xl font-bold">89</div>
            <div className="text-sm text-muted-foreground">New Signups</div>
            <Separator className="my-2" />
            <div className="text-xs text-red-600">-3% from last month</div>
          </div>
          <div className="border rounded-lg p-4">
            <div className="text-2xl font-bold">$12,345</div>
            <div className="text-sm text-muted-foreground">Revenue</div>
            <Separator className="my-2" />
            <div className="text-xs text-green-600">+15% from last month</div>
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium leading-none mb-4">Profile Card</h4>
        <div className="border rounded-lg p-6 max-w-sm">
          <div className="flex items-center space-x-4 mb-4">
            <Avatar className="h-12 w-12" />
            <div>
              <h5 className="font-medium">Sarah Wilson</h5>
              <p className="text-sm text-muted-foreground">Product Designer</p>
            </div>
          </div>
          <Separator className="mb-4" />
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Projects</span>
              <span className="font-medium">24</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Followers</span>
              <span className="font-medium">1.2k</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Following</span>
              <span className="font-medium">456</span>
            </div>
          </div>
          <Separator className="my-4" />
          <div className="flex space-x-2">
            <Button size="sm" className="flex-1">Follow</Button>
            <Separator orientation="vertical" className="h-8" />
            <Button variant="outline" size="sm" className="flex-1">Message</Button>
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium leading-none mb-4">Timeline Layout</h4>
        <div className="space-y-4 max-w-md">
          <div className="flex items-start space-x-3">
            <div className="flex flex-col items-center">
              <div className="h-2 w-2 bg-primary rounded-full"></div>
              <Separator orientation="vertical" className="h-8 w-[1px] my-1" />
            </div>
            <div className="flex-1 pb-4">
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-sm font-medium">Project Started</span>
                <span className="text-xs text-muted-foreground">2 days ago</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Initial project setup and team onboarding completed.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="flex flex-col items-center">
              <div className="h-2 w-2 bg-primary rounded-full"></div>
              <Separator orientation="vertical" className="h-8 w-[1px] my-1" />
            </div>
            <div className="flex-1 pb-4">
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-sm font-medium">Design Phase</span>
                <span className="text-xs text-muted-foreground">1 day ago</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Wireframes and mockups created and approved by stakeholders.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="flex flex-col items-center">
              <div className="h-2 w-2 bg-muted rounded-full"></div>
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-sm font-medium text-muted-foreground">Development</span>
                <span className="text-xs text-muted-foreground">Upcoming</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Frontend and backend development scheduled to begin.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}